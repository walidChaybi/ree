import { CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS } from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { MiseAJourAnalyseMarginaleValeursForm } from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { RECEContextData } from "@core/contexts/RECEContext";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { estOfficierHabiliterPourTousLesDroits } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { TErreurApi } from "@model/api/Api";
import { FicheActe } from "@model/etatcivil/acte/IFicheActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { TObjetFormulaire, TValeurFormulaire } from "@model/form/commun/ObjetFormulaire";
import messageManager from "@util/messageManager";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { Form, Formik } from "formik";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import MiseAJourForm from "../../../model/form/miseAJour/MiseAJourForm";
import Bouton from "../../commun/bouton/Bouton";
import { ConteneurBoutonBasDePage } from "../../commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import PageChargeur from "../../commun/chargeurs/PageChargeur";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import OngletsContenu from "../../commun/onglets/OngletsContenu";
import AnalyseMarginaleForm from "./formulaires/AnalyseMarginaleForm";
import BoutonValiderEtTerminer from "./formulaires/BoutonValiderEtTerminer";
import MentionForm from "./formulaires/MentionForm";
import TableauMentions from "./formulaires/mentions/TableauMentions";

interface IDonneesAideSaisie {
  champs: TObjetFormulaire;
  textesEdites: { [cle: string]: { edite: string; original: string } };
}

export interface IMentionMiseAJour {
  texte: string;
  idTypeMention: string;
  affecteAnalyseMarginale: boolean;
  donneesAideSaisie?: IDonneesAideSaisie;
}

export interface IMentionEnCours {
  index: number | null;
  mention: IMentionMiseAJour;
}

export interface IMentionEnregistree {
  idTypeMention: string;
  texteMention: string;
  numeroOrdre: number;
  evenement?: TValeurFormulaire | null;
  estSaisieAssistee?: boolean;
}

export interface IAnalyseMarginaleMiseAJour extends TObjetFormulaire {
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
  const { appelApi: appelResumeActe, enAttenteDeReponseApi: enAttenteResumeActe } = useFetchApi(CONFIG_GET_RESUME_ACTE);
  const [afficherAnalyseMarginale, setAfficherAnalyseMarginale] = useState(!estMiseAJourAvecMentions);
  const [analyseMarginaleModifiee, setAnalyseMarginaleModifiee] = useState<boolean>(false);
  const [estPopinSignatureOuverte, setEstPopinSignatureOuverte] = useState<boolean>(false);

  const [sexeTitulaire, setSexeTitulaire] = useState<Sexe | null>(null);
  const [valeurDefautFormulaire, setValeurDefautFormulaire] = useState<MiseAJourForm | null>(null);

  const [formulaireMentionEnCoursDeSaisie, setFormulaireMentionEnCoursDeSaisie] = useState<boolean>(false);

  useEffect(() => {
    appelResumeActe({
      parametres: { path: { idActe: idActe }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
      apresSucces: acteDto => {
        const acte = mapActe(acteDto);
        const analyseMarginale = (FicheActe.getAnalyseMarginaleLaPlusRecente(acte) ?? acte)?.titulaires[0];

        setSexeTitulaire(acte.titulaires[0]?.sexe ?? null);
        setValeurDefautFormulaire(MiseAJourForm.genererValeursDefautFormulaire(analyseMarginale));
      },
      apresErreur: () => messageManager.showError("Une erreur est survenue lors de la récupération des informations de l'acte")
    });
  }, []);

  const schemaValidation = useMemo(() => {
    MiseAJourForm.getSchemaValidation(afficherAnalyseMarginale);
  }, [afficherAnalyseMarginale]);

  const traitementRetourApi = useCallback(
    (reinitialiser: () => void) => ({
      apresSucces: () => {
        activerOngletActeMisAJour();
        setComposerActeMisAJour(true);
        changerOnglet(ECleOngletsMiseAJour.ACTE_MIS_A_JOUR, null);
        reinitialiser();
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
    [activerOngletActeMisAJour, setComposerActeMisAJour, changerOnglet]
  );

  const actualiserEtVisualiser = useCallback(
    (valeurs: MiseAJourForm, reinitialiser: () => void) => {
      estMiseAJourAvecMentions
        ? appelApiMiseAJourAnalyseMarginaleEtMentions({
            parametres: {
              body: valeurs.versDto(idActe, afficherAnalyseMarginale && analyseMarginaleModifiee)
            },
            ...traitementRetourApi(reinitialiser)
          })
        : appelApiMisAJourAnalyseMarginale({
            parametres: {
              path: { idActe: idActe },
              body: MiseAJourAnalyseMarginaleValeursForm.versDto(valeurs.analyseMarginale)
            },
            ...traitementRetourApi(reinitialiser)
          });
    },
    [appelApiMisAJourAnalyseMarginale, appelApiMiseAJourAnalyseMarginaleEtMentions, traitementRetourApi]
  );

  const onSignatureValidee = useCallback(() => {
    changerOnglet(ECleOngletsMiseAJour.ACTE, null);
    setEstActeSigne(true);
    messageManager.showSuccessAndClose("L'acte a été mis à jour avec succès.");
    desactiverBlocker();
  }, [changerOnglet, setEstActeSigne, desactiverBlocker]);

  return (
    <>
      {(enAttenteResumeActe || enAttenteMiseAJourAnalyseMarginale || enAttenteMiseAJourAnalyseMarginaleEtMention) && <PageChargeur />}

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

        {valeurDefautFormulaire !== null && (
          <div className="mt-4 flex h-[calc(100vh-16rem)] flex-col overflow-y-auto">
            <Formik<MiseAJourForm>
              initialValues={valeurDefautFormulaire}
              validationSchema={schemaValidation}
              onSubmit={(values, helpers) =>
                actualiserEtVisualiser(MiseAJourForm.depuisFormulaire(values), () => {
                  helpers.resetForm({ values });
                })
              }
            >
              {({ isValid, dirty }) => (
                <Form>
                  {estMiseAJourAvecMentions && (
                    <OngletsContenu estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.MENTIONS}>
                      <TableauMentions setAfficherOngletAnalyseMarginale={setAfficherAnalyseMarginale} />
                    </OngletsContenu>
                  )}

                  {afficherAnalyseMarginale && (
                    <OngletsContenu estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.ANALYSE_MARGINALE}>
                      <AnalyseMarginaleForm
                        analyseMarginaleModifiee={analyseMarginaleModifiee}
                        setAnalyseMarginaleModifiee={setAnalyseMarginaleModifiee}
                      />
                    </OngletsContenu>
                  )}

                  <ConteneurBoutonBasDePage position="droite">
                    <Bouton
                      title="Actualiser et visualiser"
                      type="submit"
                      disabled={!dirty || !isValid || formulaireMentionEnCoursDeSaisie}
                    >
                      {"Actualiser et visualiser"}
                    </Bouton>

                    {estMiseAJourAvecMentions ? (
                      estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, [Droit.SIGNER_MENTION, Droit.METTRE_A_JOUR_ACTE]) && (
                        <>
                          <Bouton
                            title="Terminer et Signer"
                            disabled={formulaireMentionEnCoursDeSaisie || !isValid || dirty}
                            onClick={() => setEstPopinSignatureOuverte(true)}
                          >
                            {"Terminer et Signer"}
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
                  setEnCoursDeSaisie={estEnCours => setFormulaireMentionEnCoursDeSaisie(estEnCours)}
                />
              </OngletsContenu>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PartieFormulaire;
