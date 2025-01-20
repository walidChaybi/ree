import { CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS } from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { MiseAJourAnalyseMarginaleValeursForm } from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { RECEContextData } from "@core/contexts/RECEContext";
import { estOfficierHabiliterPourTousLesDroits } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { TErreurApi } from "@model/api/Api";
import { FicheActe } from "@model/etatcivil/acte/IFicheActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import messageManager from "@util/messageManager";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { Form, Formik } from "formik";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import Bouton from "../../commun/bouton/Bouton";
import { ConteneurBoutonBasDePage } from "../../commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import PageChargeur from "../../commun/chargeurs/PageChargeur";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import OngletsContenu from "../../commun/onglets/OngletsContenu";
import AnalyseMarginaleForm from "./formulaires/AnalyseMarginaleForm";
import BoutonActualiserEtVisualiser from "./formulaires/BoutonActualiserEtVisualiser";
import BoutonValiderEtTerminer from "./formulaires/BoutonValiderEtTerminer";
import MentionForm from "./formulaires/MentionForm";
import TableauMentions from "./formulaires/mentions/TableauMentions";

export interface IMentionMiseAJour {
  texte: string;
  idTypeMention: string;
  donneesAideSaisie?: { champs: { [cle: string]: string | number | boolean }; partiesTexte: { [cle: number]: string } };
}

export interface IMentionEnCours {
  index: number | null;
  mention: IMentionMiseAJour;
}

export interface IAnalyseMarginaleMiseAJour {
  nom: string;
  nomSecable: boolean;
  nomPartie1: string;
  nomPartie2: string;
  prenoms: { [cle: string]: string };
  motif: string;
}
export interface IMiseAJourForm {
  mentions: IMentionMiseAJour[];
  analyseMarginale: IAnalyseMarginaleMiseAJour;
}

export const ID_CONTENEUR_FORM_MENTION = "idConteneurFormulaireMention";

export const SCHEMA_VALIDATION_ANALYSE_MARGINALE = Yup.object().shape({
  nom: Yup.string().required("⚠ La saisie du nom est obligatoire"),
  motif: Yup.string().required("⚠ La saisie du motif est obligatoire")
});

export const SCHEMA_VALIDATION_MENTIONS = Yup.object().shape({
  mentions: Yup.array().min(1)
});

export const PartieFormulaire: React.FC = () => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const { estMiseAJourAvecMentions, ongletsActifs, idActe, miseAJourEffectuee } = useContext(EditionMiseAJourContext.Valeurs);
  const { changerOnglet, activerOngletActeMisAJour, setComposerActeMisAJour, setEstActeSigne, desactiverBlocker } = useContext(
    EditionMiseAJourContext.Actions
  );
  const { appelApi: appelApiMiseAJourAnalyseMarginaleEtMentions, enAttenteDeReponseApi: enAttenteMiseAJourAnalyseMarginaleEtMention } =
    useFetchApi(CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS);
  const { appelApi: appelApiMisAJourAnalyseMarginale, enAttenteDeReponseApi: enAttenteMiseAJourAnalyseMarginale } = useFetchApi(
    CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE
  );
  const { appelApi: appelResumeActe } = useFetchApi(CONFIG_GET_RESUME_ACTE);
  const [afficherAnalyseMarginale, setAfficherAnalyseMarginale] = useState(!estMiseAJourAvecMentions);
  const [analyseMarginaleModifiee, setAnalyseMarginaleModifiee] = useState<boolean>(false);
  const [estPopinSignatureOuverte, setEstPopinSignatureOuverte] = useState<boolean>(false);

  const [sexeTitulaire, setSexeTitulaire] = useState<Sexe | null>(null);
  const [valeurDefautFormulaire, setValeurDefautFormulaire] = useState<IMiseAJourForm | null>(null);

  const [formulaireMentionEnCoursDeSaisie, setFormulaireMentionEnCoursDeSaisie] = useState<boolean>(false);

  useEffect(() => {
    appelResumeActe({
      parametres: { path: { idActe: idActe }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
      apresSucces: acte => {
        const analyseMarginale = (FicheActe.getAnalyseMarginaleLaPlusRecente(acte) ?? acte)?.titulaires[0];

        setSexeTitulaire(acte.titulaires[0]?.sexe ?? null);
        setValeurDefautFormulaire({
          mentions: [],
          analyseMarginale: {
            nom: analyseMarginale?.nom ?? "",
            nomSecable: Boolean(analyseMarginale?.nomPartie1 && analyseMarginale?.nomPartie2),
            nomPartie1: analyseMarginale?.nomPartie1 ?? "",
            nomPartie2: analyseMarginale?.nomPartie2 ?? "",
            prenoms:
              analyseMarginale?.prenoms?.reduce(
                (prenoms: { [cle: string]: string }, prenom: string, index: number) => ({ ...prenoms, [`prenom${index + 1}`]: prenom }),
                {}
              ) ?? {},
            motif: ""
          }
        });
      }
    });
  }, []);

  /* v8 ignore start */
  const traitementRetourApi = useCallback(
    (reinitialiser: (valeurs: IMiseAJourForm) => void, analyseMarginale?: IAnalyseMarginaleMiseAJour, mentions?: IMentionMiseAJour[]) => ({
      apresSucces: () => {
        activerOngletActeMisAJour();
        setComposerActeMisAJour(true);
        changerOnglet(ECleOngletsMiseAJour.ACTE_MIS_A_JOUR, null);
        reinitialiser({
          mentions: mentions ?? [],
          analyseMarginale: {
            nom: analyseMarginale?.nom ?? "",
            nomSecable: Boolean(analyseMarginale?.nomPartie1 && analyseMarginale?.nomPartie2),
            nomPartie1: analyseMarginale?.nomPartie1 ?? "",
            nomPartie2: analyseMarginale?.nomPartie2 ?? "",
            prenoms: analyseMarginale?.prenoms ?? {},
            motif: analyseMarginale?.motif ?? ""
          }
        });
      },
      apresErreur: (erreurs: TErreurApi[]) => {
        if (erreurs?.find(erreur => erreur.code === "FCT_16136")) {
          messageManager.showError("Aucune modification de l'analyse marginale n'a été détectée");

          return;
        }
        estMiseAJourAvecMentions
          ? messageManager.showError("Impossible de mettre à jour l'acte")
          : messageManager.showError("Impossible de mettre à jour l'analyse marginale");
      }
    }),
    []
  );

  const actualiserEtVisualiser = ({ mentions, analyseMarginale }: IMiseAJourForm, reinitialiser: (valeurs: IMiseAJourForm) => void) => {
    switch (true) {
      case !estMiseAJourAvecMentions:
        appelApiMisAJourAnalyseMarginale({
          parametres: {
            path: { idActe: idActe },
            body: MiseAJourAnalyseMarginaleValeursForm.versDto(analyseMarginale)
          },
          ...traitementRetourApi(reinitialiser, analyseMarginale)
        });
        break;
      case estMiseAJourAvecMentions:
        appelApiMiseAJourAnalyseMarginaleEtMentions({
          parametres: {
            path: { idActe },
            body: {
              mentionCreationList: mentions.map((mention, key) => ({
                idTypeMention: mention.idTypeMention,
                numeroOrdre: key,
                texteMention: mention.texte
              })),
              analyseMarginale:
                afficherAnalyseMarginale && analyseMarginaleModifiee ? MiseAJourAnalyseMarginaleValeursForm.versDto(analyseMarginale) : null
            }
          },
          ...traitementRetourApi(reinitialiser, analyseMarginale, mentions)
        });
        break;
    }
  };

  const onSignatureValidee = () => {
    changerOnglet(ECleOngletsMiseAJour.ACTE, null);
    setEstActeSigne(true);
    messageManager.showSuccessAndClose("L'acte a été mis à jour avec succès.");
    desactiverBlocker();
  };
  /* v8 ignore end */

  const schemaValidation = useMemo(() => {
    return Yup.object({
      analyseMarginale: afficherAnalyseMarginale ? SCHEMA_VALIDATION_ANALYSE_MARGINALE : Yup.object()
    });
  }, [afficherAnalyseMarginale]);

  return !valeurDefautFormulaire ? (
    <PageChargeur />
  ) : (
    <div className="w-1/2">
      <OngletsBouton<ECleOngletsMiseAJour>
        onglets={[
          ...(estMiseAJourAvecMentions
            ? [
                {
                  cle: ECleOngletsMiseAJour.MENTIONS,
                  libelle: "Mentions"
                }
              ]
            : []),

          ...(afficherAnalyseMarginale
            ? [
                {
                  cle: ECleOngletsMiseAJour.ANALYSE_MARGINALE,
                  libelle: "Analyse Marginale"
                }
              ]
            : [])
        ]}
        cleOngletActif={ongletsActifs.formulaires}
        changerOnglet={valeur => changerOnglet(null, valeur)}
      />

      {(enAttenteMiseAJourAnalyseMarginale || enAttenteMiseAJourAnalyseMarginaleEtMention) && <PageChargeur />}

      <div className="mt-4 flex h-[calc(100vh-16rem)] flex-col overflow-y-auto">
        <Formik<IMiseAJourForm>
          initialValues={valeurDefautFormulaire}
          validationSchema={schemaValidation}
          onSubmit={(values, helpers) => {
            actualiserEtVisualiser(values, valeurs => {
              helpers.resetForm({ values: valeurs });
            });
          }}
        >
          {({ values, isValid, dirty, setFieldValue, resetForm }) => (
            <Form>
              {estMiseAJourAvecMentions && (
                <OngletsContenu estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.MENTIONS}>
                  <TableauMentions
                    setAfficherOngletAnalyseMarginale={(afficher, motifMention = "") => {
                      setAfficherAnalyseMarginale(afficher);

                      if (afficher && Boolean(values.analyseMarginale.motif)) {
                        return;
                      }

                      const valeursSaisies = { ...values };
                      resetForm({
                        values: { mentions: [], analyseMarginale: { ...valeurDefautFormulaire.analyseMarginale, motif: motifMention } }
                      });
                      setFieldValue("mentions", valeursSaisies.mentions);
                      setFieldValue("analyseMarginale", { ...valeursSaisies.analyseMarginale, motif: motifMention });
                    }}
                  />
                </OngletsContenu>
              )}

              {afficherAnalyseMarginale && (
                <OngletsContenu estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.ANALYSE_MARGINALE}>
                  <AnalyseMarginaleForm
                    analyseMarginaleModifiee={analyseMarginaleModifiee}
                    setAnalyseMarginaleModifiee={estModifiee => setAnalyseMarginaleModifiee(estModifiee)}
                  />
                </OngletsContenu>
              )}

              <ConteneurBoutonBasDePage position="droite">
                <BoutonActualiserEtVisualiser
                  type="submit"
                  disabled={!dirty || !isValid || formulaireMentionEnCoursDeSaisie}
                />

                {estMiseAJourAvecMentions ? (
                  estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, [Droit.SIGNER_MENTION, Droit.METTRE_A_JOUR_ACTE]) && (
                    <>
                      <Bouton
                        disabled={formulaireMentionEnCoursDeSaisie || !isValid || dirty}
                        onClick={() => setEstPopinSignatureOuverte(true)}
                      >
                        Terminer et Signer
                      </Bouton>
                      <PopinSignatureMiseAJourMentions
                        estOuvert={estPopinSignatureOuverte}
                        setEstOuvert={setEstPopinSignatureOuverte}
                        actionApresSignatureReussie={onSignatureValidee}
                      />
                    </>
                  )
                ) : (
                  <BoutonValiderEtTerminer disabled={!miseAJourEffectuee || dirty} />
                )}
              </ConteneurBoutonBasDePage>
            </Form>
          )}
        </Formik>

        {estMiseAJourAvecMentions && (
          <OngletsContenu estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.MENTIONS}>
            <MentionForm
              infoTitulaire={{ sexe: sexeTitulaire }}
              onFormDirty={(isDirty: boolean) => setFormulaireMentionEnCoursDeSaisie(isDirty)}
            />
          </OngletsContenu>
        )}
      </div>
    </div>
  );
};

export default PartieFormulaire;
