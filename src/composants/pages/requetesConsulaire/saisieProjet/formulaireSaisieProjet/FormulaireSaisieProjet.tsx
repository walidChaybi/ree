import TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT from "@api/traitements/projetActe/transcription/TraitementEnregistrerProjetActeTranscrit";
import { Form, Formik } from "formik";
import React, { useContext, useMemo, useState } from "react";
import useTraitementApi from "../../../../../hooks/api/TraitementApiHook";

import { IProjetActeTranscritForm, ProjetTranscriptionForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import messageManager from "@util/messageManager";
import Bouton from "../../../../commun/bouton/Bouton";
import { ConteneurBoutonBasDePage } from "../../../../commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import PageChargeur from "../../../../commun/chargeurs/PageChargeur";
import ConteneurAccordeon from "../../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import ScrollVersErreur from "../../../../commun/formulaire/ScrollVersErreur";
import BlocActeEtranger from "./BlocActeEtranger";
import BlocAutresEnonciations from "./BlocAutresEnonciations";
import BlocDeclarant from "./BlocDeclarant";
import BlocFormuleFinale from "./BlocFormuleFinale";
import BlocMentions from "./BlocMentions";
import BlocParent from "./BlocParent";
import BlocTitulaire from "./BlocTitulaire";
import ValeursVersApercuProjet from "./ValeursVersApercuProjet";

import {
  CONFIG_POST_COMPOSITION_ACTE_TEXTE,
  IReponseCompositionActePDF
} from "@api/configurations/composition/PostCompositionActeTexteApiConfigApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { TitulaireProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/TitulaireProjetActeTranscrit";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { SaisieProjetActeTranscritContext } from "../../../../../contexts/SaisieProjetActeTranscritContextProvider";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import ModaleProjetActe from "./ModaleProjetActe";

// /!\ À supprimer après le FIX dans Composition API /ACTE_TEXTE/1
/*v8 ignore start */
const formaterNomPrenomTitulaire = (titulaire: TitulaireProjetActeTranscrit): string => {
  if (!titulaire) {
    return "";
  }

  let nomPrenomsFormates = "de\u00A0";

  if (titulaire.prenoms && titulaire.prenoms.length > 0) {
    nomPrenomsFormates += titulaire.prenoms.join(", ") + " ";
  }

  nomPrenomsFormates += titulaire?.nom;

  return nomPrenomsFormates;
};
/*v8 ignore stop */

const FormulaireSaisieProjet: React.FC = () => {
  const { requete, projetActe } = useContext(SaisieProjetActeTranscritContext);

  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [modaleOuverte, setModaleOuverte] = useState(false);

  const valeursInitiales = useMemo(() => ProjetTranscriptionForm.valeursInitiales(requete, projetActe), [requete, projetActe]);

  const { utilisateurConnecte } = useContext(RECEContextData);

  const peutSigner = useMemo(() => {
    return officierHabiliterPourLeDroit(utilisateurConnecte, Droit.SIGNER_ACTE);
  }, [utilisateurConnecte]);

  const { appelApi: appelerCompositionPdf } = useFetchApi(CONFIG_POST_COMPOSITION_ACTE_TEXTE);

  const { lancerTraitement: lancerEnregistrement, traitementEnCours: enregistrementEnCours } = useTraitementApi(
    TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT
  );

  const nature_acte = useMemo(() => {
    const { prefixeTitre, natureActe } = (() => {
      switch (requete.natureActeTranscrit) {
        case ENatureActeTranscrit.NAISSANCE_MINEUR:
        case ENatureActeTranscrit.NAISSANCE_MAJEUR:
          return { prefixeTitre: "ACTE DE", natureActe: "NAISSANCE" };
        default:
          return { prefixeTitre: "ACTE", natureActe: "<nature acte>" };
      }
    })();

    return `${prefixeTitre} ${natureActe}`;
  }, [requete.natureActeTranscrit]);

  /* v8 ignore start */
  const enregistrerEtVisualiser = (valeursSaisies: IProjetActeTranscritForm) => {
    lancerEnregistrement({
      parametres: {
        valeursSaisies: valeursSaisies,
        projetActe: projetActe,
        idRequete: requete.id,
        idSuiviDossier: requete.titulaires?.[0]?.suiviDossiers?.[0]?.idSuiviDossier ?? ""
      },
      apresSucces: projetActe => {
        messageManager.showSuccessAndClose("Le projet d'acte a bien été enregistré");

        if (!projetActe) return;

        appelerCompositionPdf({
          parametres: {
            body: {
              nature_acte: nature_acte,
              texte_corps_acte: projetActe.corpsTexte.texte || "",
              titulaires: formaterNomPrenomTitulaire(projetActe.titulaires[0])
            }
          },
          apresSucces: (reponse: IReponseCompositionActePDF) => {
            if (reponse.contenu) {
              setPdfBase64(reponse.contenu);
              setModaleOuverte(true);
            } else {
              messageManager.showWarning("L'aperçu PDF n'a pas pu être généré");
            }
          },
          apresErreur: messageErreur => {
            console.error(`Erreur lors de la génération du PDF : ${messageErreur}`);
            messageManager.showError("Une erreur est survenue lors de la composition de l'acte");
          }
        });
      },
      apresErreur: messageErreur => {
        console.error(`Erreur: ${messageErreur}`);
        messageManager.showError("Une erreur est survenue lors du traitement");
      }
    });
  };
  /*v8 ignore stop*/

  return (
    <Formik<IProjetActeTranscritForm>
      validationSchema={ProjetTranscriptionForm.schemaValidation()}
      initialValues={valeursInitiales}
      onSubmit={values => {
        enregistrerEtVisualiser(values);
      }}
      enableReinitialize
    >
      {({ dirty }) => (
        <Form>
          <>
            <ValeursVersApercuProjet />

            <ConteneurAccordeon
              titre="Titulaire"
              ouvertParDefaut
            >
              <BlocTitulaire />
            </ConteneurAccordeon>

            <ConteneurAccordeon
              titre="Parents"
              ouvertParDefaut
            >
              <BlocParent estParent1 />
              <BlocParent />
            </ConteneurAccordeon>

            <ConteneurAccordeon
              titre="Déclarant"
              ouvertParDefaut
            >
              <BlocDeclarant />
            </ConteneurAccordeon>

            <ConteneurAccordeon
              titre="Autres énonciations intéressant l'état civil"
              ouvertParDefaut
            >
              <BlocAutresEnonciations />
            </ConteneurAccordeon>

            <ConteneurAccordeon
              titre="Acte étranger"
              ouvertParDefaut
            >
              <BlocActeEtranger />
            </ConteneurAccordeon>

            <ConteneurAccordeon
              titre="Mentions figurant dans l'acte étranger"
              ouvertParDefaut
            >
              <BlocMentions />
            </ConteneurAccordeon>

            <ConteneurAccordeon
              titre="Formule finale"
              ouvertParDefaut
            >
              <BlocFormuleFinale />
            </ConteneurAccordeon>

            {enregistrementEnCours && <PageChargeur />}

            <ConteneurBoutonBasDePage position="droite">
              {peutSigner && (
                <Bouton
                  title="Terminer et signer"
                  type="submit"
                  disabled={enregistrementEnCours || !dirty}
                >
                  {"Terminer et signer"}
                </Bouton>
              )}
            </ConteneurBoutonBasDePage>

            {modaleOuverte && pdfBase64 && (
              <ModaleProjetActe
                pdfBase64={pdfBase64}
                fermerModale={() => setModaleOuverte(false)}
              />
            )}
          </>
          <ScrollVersErreur />
        </Form>
      )}
    </Formik>
  );
};

export default FormulaireSaisieProjet;
