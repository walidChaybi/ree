import TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT from "@api/traitements/projetActe/transcription/TraitementEnregistrerProjetActeTranscrit";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
import useTraitementApi from "../../../../../hooks/api/TraitementApiHook";

import { CONFIG_GET_LIBELLE_DECRET } from "@api/configurations/etatCivil/typesRegistres/GetLibelleDecretConfigApi";
import { Droit } from "@model/agent/enum/Droit";
import {
  EActionFormulaireProjetActeTranscrit,
  IProjetActeTranscritForm,
  ProjetActeNaissanceTranscriptionForm
} from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import { SaisieProjetActeTranscritContext } from "../../../../../contexts/SaisieProjetActeTranscritContextProvider";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../../utils/AfficherMessage";
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
import BloqueurNavigationSaisieProjet from "./BloqueurNavigationSaisieProjet";
import ModaleProjetActe from "./ModaleProjetActe";
import ValeursVersApercuProjet from "./ValeursVersApercuProjet";

const FormulaireSaisieProjet: React.FC = () => {
  const { requete, projetActe, mettreAJourDonneesContext } = useContext(SaisieProjetActeTranscritContext);
  const [modaleOuverte, setModaleOuverte] = useState(false);
  const [libelleDecret, setLibelleDecret] = useState<string>("");
  const { appelApi: getLibelleDecret } = useFetchApi(CONFIG_GET_LIBELLE_DECRET);

  const valeursInitiales = useMemo(
    () => ProjetActeNaissanceTranscriptionForm.valeursInitiales(requete, projetActe, libelleDecret),
    [requete, projetActe, libelleDecret]
  );

  const { utilisateurConnecte } = useContext(RECEContextData);

  const aLeDroitDeSignerActe = useMemo(
    () => utilisateurConnecte.estHabilitePour({ leDroit: Droit.TRANSCRIPTION_SIGNER_ACTE }),
    [utilisateurConnecte]
  );

  useEffect(() => {
    if (!requete) return;
    getLibelleDecret({
      parametres: { path: { idTypeRegistre: requete.typeRegistre.id } },
      apresSucces: reponse => {
        if (reponse?.libelleDecret) {
          setLibelleDecret(reponse?.libelleDecret);
        }
      },
      apresErreur: messageErreur => {
        console.error(`Erreur: ${messageErreur}`);
        AfficherMessage.erreur("Une erreur est survenue lors de la récupération du libellé de décret");
      }
    });
  }, [requete]);

  const { lancerTraitement: lancerEnregistrement, traitementEnCours: enregistrementEnCours } = useTraitementApi(
    TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT
  );

  const terminerEtSigner = (valeursSaisies: IProjetActeTranscritForm) => {
    if (!aLeDroitDeSignerActe) {
      AfficherMessage.erreur("Vous n'avez pas l'habilitation nécessaire pour terminer et signer le projet d'acte");
      return;
    }

    if (!valeursSaisies.soumissionFormulaire.avecEnregistrement && !valeursSaisies.soumissionFormulaire.avecMajStatut) {
      setModaleOuverte(true);
      return;
    }

    lancerEnregistrement({
      parametres: {
        valeursSaisies: valeursSaisies,
        projetActe: projetActe,
        requete: requete
      },
      apresSucces: projetActeReponse => {
        mettreAJourDonneesContext(
          projetActeReponse || projetActe,
          requete.statutCourant.statut !== StatutRequete.A_SIGNER ? StatutRequete.A_SIGNER : null
        );

        setModaleOuverte(true);
        AfficherMessage.succes("Le projet d'acte a bien été enregistré", { fermetureAuto: true });
      },
      apresErreur: messageErreur => {
        console.error(`Erreur: ${messageErreur}`);

        AfficherMessage.erreur("Une erreur est survenue lors du traitement");
      }
    });
  };

  const enregistrer = (valeursSaisies: IProjetActeTranscritForm) => {
    if (!valeursSaisies.soumissionFormulaire.avecEnregistrement) {
      return;
    }

    lancerEnregistrement({
      parametres: {
        valeursSaisies: valeursSaisies,
        projetActe: projetActe,
        requete: requete
      },
      apresSucces: projetActeReponse => {
        mettreAJourDonneesContext(projetActeReponse || projetActe, null);
        AfficherMessage.succes("Le projet d'acte a bien été enregistré", { fermetureAuto: true });

        valeursSaisies.soumissionFormulaire.apresEnregistrement && valeursSaisies.soumissionFormulaire.apresEnregistrement();
      },
      apresErreur: messageErreur => {
        console.error(`Erreur: ${messageErreur}`);
        AfficherMessage.erreur("Une erreur est survenue lors du traitement");
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
          <BloqueurNavigationSaisieProjet>
            <Form>
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

                {aLeDroitDeSignerActe && (
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

              <ScrollVersErreur />
            </Form>
          </BloqueurNavigationSaisieProjet>
        );
      }}
    </Formik>
  );
};

export default FormulaireSaisieProjet;
