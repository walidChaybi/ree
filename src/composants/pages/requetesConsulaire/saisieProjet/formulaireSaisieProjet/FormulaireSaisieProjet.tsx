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
import BlocTitulaire from "./BlocTitulaire";
import ValeursVersApercuProjet from "./ValeursVersApercuProjet";

import { RECEContextData } from "@core/contexts/RECEContext";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { SaisieProjetActeTranscritContext } from "../../../../../contexts/SaisieProjetActeTranscritContextProvider";
import BlocActeEtranger from "./BlocActeEtranger";
import BlocAutresEnonciations from "./BlocAutresEnonciations";
import BlocDeclarant from "./BlocDeclarant";
import BlocFormuleFinale from "./BlocFormuleFinale";
import BlocMentions from "./BlocMentions";
import BlocParent from "./BlocParent";
import ModaleProjetActe from "./ModaleProjetActe";

const FormulaireSaisieProjet: React.FC = () => {
  const { requete, projetActe, mettreAJourDonneesContext } = useContext(SaisieProjetActeTranscritContext);

  const [modaleOuverte, setModaleOuverte] = useState(false);

  const valeursInitiales = useMemo(() => ProjetTranscriptionForm.valeursInitiales(requete, projetActe), [requete, projetActe]);

  const { utilisateurConnecte } = useContext(RECEContextData);

  const peutSigner = useMemo(() => {
    return officierHabiliterPourLeDroit(utilisateurConnecte, Droit.SIGNER_ACTE);
  }, [utilisateurConnecte]);

  const { lancerTraitement: lancerEnregistrement, traitementEnCours: enregistrementEnCours } = useTraitementApi(
    TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT
  );

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

        mettreAJourDonneesContext(projetActe, requete.statutCourant.statut !== StatutRequete.A_SIGNER ? StatutRequete.A_SIGNER : null);
        setModaleOuverte(true);
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
                <>
                  {dirty || requete.statutCourant.statut === StatutRequete.EN_TRAITEMENT ? (
                    <Bouton
                      title="Terminer et signer"
                      type="submit"
                      disabled={enregistrementEnCours}
                    >
                      {"Terminer et signer"}
                    </Bouton>
                  ) : (
                    <Bouton
                      title="Terminer et signer"
                      type="button"
                      onClick={() => setModaleOuverte(true)}
                    >
                      {"Terminer et signer"}
                    </Bouton>
                  )}
                </>
              )}
            </ConteneurBoutonBasDePage>

            {modaleOuverte && projetActe && (
              <ModaleProjetActe
                projetActe={projetActe}
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
