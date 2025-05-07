import TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT from "@api/traitements/projetActe/transcription/TraitementProjetActeTranscrit";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import useTraitementApi from "../../../../../hooks/api/TraitementApiHook";

import {
  IProjetActeTranscritForm,
  IProjetActeTranscritProps,
  ProjetTranscriptionForm
} from "@model/form/creation/transcription/IProjetActeTranscritForm";
import messageManager from "@util/messageManager";
import Bouton from "../../../../commun/bouton/Bouton";
import { ConteneurBoutonBasDePage } from "../../../../commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import PageChargeur from "../../../../commun/chargeurs/PageChargeur";
import ConteneurAccordeon from "../../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import ScrollVersErreur from "../../../../commun/formulaire/ScrollVersErreur";
import { mapProjetActeTranscritFormVersDto } from "../mapping/mapProjetActeTranscritFormVersDto";
import BlocActeEtranger from "./BlocActeEtranger";
import BlocAutresEnonciations from "./BlocAutresEnonciations";
import BlocDeclarant from "./BlocDeclarant";
import BlocFormuleFinale from "./BlocFormuleFinale";
import BlocMentions from "./BlocMentions";
import BlocParent from "./BlocParent";
import BlocTitulaire from "./BlocTitulaire";
import ValeursVersApercuProjet from "./ValeursVersApercuProjet";

import { ITitulaireDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ITitulaireDto";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import ModaleProjetActe from "./ModaleProjetActe";

// /!\ À supprimer après le FIX dans Composition API /ACTE_TEXTE/1
/*v8 ignore start */
const formaterNomPrenomTitulaire = (titulaire: ITitulaireDto): string => {
  if (!titulaire) {
    return "";
  }

  let nomPrenomsFormates = "de ";

  if (titulaire.prenoms && titulaire.prenoms.length > 0) {
    nomPrenomsFormates += titulaire.prenoms.join(", ") + " ";
  }

  nomPrenomsFormates += titulaire?.nom;

  return nomPrenomsFormates;
};
/*v8 ignore stop */

const FormulaireSaisieProjet: React.FC<IProjetActeTranscritProps> = ({ requete }) => {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [modaleOuverte, setModaleOuverte] = useState(false);

  const donneesFormulaire = useMemo(
    () => ({
      valeursInitiales: ProjetTranscriptionForm.valeursInitiales(requete),
      schemaValidation: ProjetTranscriptionForm.schemaValidation()
    }),
    [requete]
  );

  // /!\ À utiliser après pour signature
  /*   const { utilisateurConnecte } = useContext(RECEContextData);

  const peutSigner = useMemo(() => {
    return (
      officierHabiliterPourLeDroit(utilisateurConnecte, Droit.DELIVRER) ||
      officierHabiliterPourLeDroit(utilisateurConnecte, Droit.DELIVRER_COMEDEC)
    );
  }, [utilisateurConnecte]); */

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

  const enregistrerEtVisualiser = (valeurProjectActeForm: IProjetActeTranscritForm) => {
    const donnees: IProjetActeTranscritDto = mapProjetActeTranscritFormVersDto(valeurProjectActeForm);

    lancerEnregistrement({
      parametres: {
        projetActe: donnees,
        idRequete: requete.id,
        numeroDossierNational: requete.numero,
        nature_acte: nature_acte,
        formaterTitulaire: formaterNomPrenomTitulaire
      },
      apresSucces: resultat => {
        messageManager.showSuccessAndClose("Le projet d'acte a bien été enregistré");

        if (resultat.pdf) {
          setPdfBase64(resultat.pdf.contenu);
          setModaleOuverte(true);
        } else {
          messageManager.showWarning("L'aperçu PDF n'a pas pu être généré");
        }
      },
      apresErreur: messageErreur => {
        console.error(`Erreur: ${messageErreur}`);
        messageManager.showError("Une erreur est survenue lors du traitement");
      }
    });
  };

  return (
    <Formik<IProjetActeTranscritForm>
      validationSchema={donneesFormulaire.schemaValidation}
      initialValues={donneesFormulaire.valeursInitiales}
      onSubmit={values => {
        enregistrerEtVisualiser(values);
      }}
    >
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
            <BlocParent estparent1 />
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
            <Bouton
              title="Terminer et signer"
              type="submit"
              disabled={enregistrementEnCours}
            >
              {"Terminer et signer"}
            </Bouton>
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
    </Formik>
  );
};

export default FormulaireSaisieProjet;
