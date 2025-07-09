import TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT from "@api/traitements/projetActe/transcription/TraitementEnregistrerProjetActeTranscrit";
import { Form, Formik } from "formik";
import React, { useContext, useMemo, useState } from "react";
import useTraitementApi from "../../../../../hooks/api/TraitementApiHook";

import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import {
  EActionFormulaireProjetActeTranscrit,
  IProjetActeTranscritForm,
  ProjetActeNaissanceTranscriptionForm
} from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import messageManager from "@util/messageManager";
import { SaisieProjetActeTranscritContext } from "../../../../../contexts/SaisieProjetActeTranscritContextProvider";
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
import ModaleProjetActe from "./ModaleProjetActe";
import ValeursVersApercuProjet from "./ValeursVersApercuProjet";

const FormulaireSaisieProjet: React.FC = () => {
  const { requete, projetActe, mettreAJourDonneesContext } = useContext(SaisieProjetActeTranscritContext);
  const [modaleOuverte, setModaleOuverte] = useState(false);

  const valeursInitiales = useMemo(() => ProjetActeNaissanceTranscriptionForm.valeursInitiales(requete, projetActe), [requete, projetActe]);

  const { utilisateurConnecte } = useContext(RECEContextData);

  const peutSigner = useMemo(() => utilisateurConnecte.estHabilitePour({ leDroit: Droit.SIGNER_ACTE }), [utilisateurConnecte]);

  const { lancerTraitement: lancerEnregistrement, traitementEnCours: enregistrementEnCours } = useTraitementApi(
    TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT
  );

  const terminerEtSigner = (valeursSaisies: IProjetActeTranscritForm) => {
    if (!valeursSaisies.soumissionFormulaire.avecEnregistrement && !valeursSaisies.soumissionFormulaire.avecMajStatut) {
      setModaleOuverte(true);
      return;
    }

    lancerEnregistrement({
      parametres: {
        valeursSaisies: valeursSaisies,
        projetActe: projetActe,
        idRequete: requete.id,
        idSuiviDossier: requete.titulaires?.[0]?.suiviDossiers?.[0]?.idSuiviDossier ?? ""
      },
      apresSucces: projetActeReponse => {
        mettreAJourDonneesContext(
          projetActeReponse || projetActe,
          requete.statutCourant.statut !== StatutRequete.A_SIGNER ? StatutRequete.A_SIGNER : null
        );

        setModaleOuverte(true);
        messageManager.showSuccessAndClose("Le projet d'acte a bien été enregistré");
      },
      apresErreur: messageErreur => {
        console.error(`Erreur: ${messageErreur}`);
        messageManager.showError("Une erreur est survenue lors du traitement");
      }
    });
  };

  const enregistrer = (valeursSaisies: IProjetActeTranscritForm) => {
    if (!valeursSaisies.soumissionFormulaire.avecEnregistrement) return;

    lancerEnregistrement({
      parametres: {
        valeursSaisies: valeursSaisies,
        projetActe: projetActe,
        idRequete: requete.id,
        idSuiviDossier: requete.titulaires?.[0]?.suiviDossiers?.[0]?.idSuiviDossier ?? ""
      },
      apresSucces: projetActeReponse => {
        mettreAJourDonneesContext(projetActeReponse || projetActe, null);
        messageManager.showSuccessAndClose("Le projet d'acte a bien été enregistré");
      },
      apresErreur: messageErreur => {
        console.error(`Erreur: ${messageErreur}`);
        messageManager.showError("Une erreur est survenue lors du traitement");
      }
    });
  };

  return (
    <Formik<IProjetActeTranscritForm>
      validationSchema={ProjetActeNaissanceTranscriptionForm.schemaValidation()}
      initialValues={valeursInitiales}
      enableReinitialize
      onSubmit={(values, helper) => {
        if (values.soumissionFormulaire.action === EActionFormulaireProjetActeTranscrit.ENREGISTRER) {
          enregistrer(values);
        } else {
          terminerEtSigner(values);
        }

        helper.resetForm({
          values: values
        });
      }}
    >
      {({ setFieldValue, dirty, submitForm }) => {
        return (
          <Form>
            <>
              {enregistrementEnCours && <PageChargeur />}

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

              <ConteneurBoutonBasDePage position="droite">
                <Bouton
                  title="Enregistrer"
                  type="button"
                  disabled={enregistrementEnCours}
                  onClick={() => {
                    setFieldValue("soumissionFormulaire", {
                      action: EActionFormulaireProjetActeTranscrit.ENREGISTRER,
                      avecEnregistrement: dirty
                    }).then(() => {
                      submitForm();
                    });
                  }}
                >
                  {"Enregistrer"}
                </Bouton>

                {peutSigner && (
                  <Bouton
                    title="Terminer et signer"
                    type="button"
                    disabled={enregistrementEnCours}
                    onClick={() => {
                      setFieldValue("soumissionFormulaire", {
                        action: EActionFormulaireProjetActeTranscrit.TERMINER_SIGNER,
                        avecEnregistrement: dirty,
                        avecMajStatut: requete.statutCourant.statut !== StatutRequete.A_SIGNER
                      }).then(() => {
                        submitForm();
                      });
                    }}
                  >
                    {"Terminer et signer"}
                  </Bouton>
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
        );
      }}
    </Formik>
  );
};

export default FormulaireSaisieProjet;
