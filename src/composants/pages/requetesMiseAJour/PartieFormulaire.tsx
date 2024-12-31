import { CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS } from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import {
  IMiseAJourAnalyseMarginaleValeursForm,
  MiseAJourAnalyseMarginaleValeursForm
} from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { RECEContextData } from "@core/contexts/RECEContext";
import { estOfficierHabiliterPourTousLesDroits } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { TErreurApi } from "@model/api/Api";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { shallowEgalTableau } from "@util/Utils";
import messageManager from "@util/messageManager";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { FormikProps, FormikValues } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import Bouton from "../../commun/bouton/Bouton";
import { ConteneurBoutonBasDePage } from "../../commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import PageChargeur from "../../commun/chargeurs/PageChargeur";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import BoutonActualiserEtVisualiser from "./formulaires/BoutonActualiserEtVisualiser";
import BoutonValiderEtTerminer from "./formulaires/BoutonValiderEtTerminer";
import OngletAnalyseMarginale from "./onglets/OngletAnalyseMarginale";
import OngletMention from "./onglets/OngletMention";

export const PartieFormulaire: React.FC = () => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const {
    listeMentions,
    estMiseAJourAvecMentions,
    ongletsActifs,
    estFormulaireAnalyseMarginaleModifie,
    listeMentionsEnregistrees,
    idActe,
    miseAJourEffectuee,
    estMentionEnCoursDeSaisie
  } = useContext(EditionMiseAJourContext.Valeurs);
  const {
    changerOnglet,
    activerOngletActeMisAJour,
    setComposerActeMisAJour,
    setEstFormulaireAnalyseMarginaleModifie,
    setListeMentionsEnregistrees,
    setEstActeSigne,
    desactiverBlocker
  } = useContext(EditionMiseAJourContext.Actions);
  const { appelApi: appelApiMiseAJourAnalyseMarginaleEtMentions, enAttenteDeReponseApi: enAttenteMiseAJourAnalyseMarginaleEtMention } =
    useFetchApi(CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS);
  const { appelApi: appelApiMisAJourAnalyseMarginale, enAttenteDeReponseApi: enAttenteMiseAJourAnalyseMarginale } = useFetchApi(
    CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE
  );
  const [afficherAnalyseMarginale, setAfficherAnalyseMarginale] = useState(!estMiseAJourAvecMentions);
  const [estPopinSignatureOuverte, setEstPopinSignatureOuverte] = useState<boolean>(false);

  const mentionsFormRef = useRef<FormikProps<FormikValues> | null>(null);
  const analyseMarginaleFormRef = useRef<FormikProps<FormikValues> | null>(null);

  useEffect(() => {
    if (!estMiseAJourAvecMentions) {
      return;
    }
    setAfficherAnalyseMarginale(
      listeMentions.some(
        mention =>
          TypeMention.getTypeMentionById(
            mention.typeMention.idMentionNiveauTrois || mention.typeMention.idMentionNiveauDeux || mention.typeMention.idMentionNiveauUn
          )?.affecteAnalyseMarginale
      )
    );
  }, [estMiseAJourAvecMentions, listeMentions]);

  const actualiserEtVisualiser = () => {
    switch (true) {
      case !estMiseAJourAvecMentions && analyseMarginaleFormRef.current?.isValid:
        appelApiMisAJourAnalyseMarginale({
          parametres: {
            path: { idActe: idActe },
            body: MiseAJourAnalyseMarginaleValeursForm.versDto(
              analyseMarginaleFormRef.current?.values as unknown as IMiseAJourAnalyseMarginaleValeursForm
            )
          },
          apresSucces: () => {
            analyseMarginaleFormRef.current?.submitForm();
            activerOngletActeMisAJour();
            setComposerActeMisAJour(true);
            changerOnglet(ECleOngletsMiseAJour.ACTE_MIS_A_JOUR, null);
            setEstFormulaireAnalyseMarginaleModifie(false);
          },
          apresErreur: erreurs => {
            if (erreurs.find((erreur: TErreurApi) => erreur.code === "FCT_16136")) {
              messageManager.showError("Aucune modification de l'analyse marginale n'a été détectée");

              return;
            }
            messageManager.showError("Impossible de mettre à jour l'analyse marginale");
          }
        });
        break;
      case estMiseAJourAvecMentions &&
        (!afficherAnalyseMarginale || analyseMarginaleFormRef.current?.isValid) &&
        (mentionsFormRef.current?.isValid === undefined || mentionsFormRef.current?.isValid):
        appelApiMiseAJourAnalyseMarginaleEtMentions({
          parametres: {
            path: { idActe },
            body: {
              mentionCreationList: listeMentions.map(mention => ({
                idTypeMention:
                  mention.typeMention.idMentionNiveauTrois ||
                  mention.typeMention.idMentionNiveauDeux ||
                  mention.typeMention.idMentionNiveauUn,
                numeroOrdre: mention.numeroOrdre,
                texteMention: mention.texte
              })),
              analyseMarginale:
                afficherAnalyseMarginale && analyseMarginaleFormRef.current?.dirty
                  ? MiseAJourAnalyseMarginaleValeursForm.versDto(
                      analyseMarginaleFormRef.current?.values as unknown as IMiseAJourAnalyseMarginaleValeursForm
                    )
                  : null
            }
          },
          apresSucces: () => {
            analyseMarginaleFormRef.current?.dirty && analyseMarginaleFormRef.current?.submitForm();
            activerOngletActeMisAJour();
            setComposerActeMisAJour(true);
            changerOnglet(ECleOngletsMiseAJour.ACTE_MIS_A_JOUR, null);
            setEstFormulaireAnalyseMarginaleModifie(false);
            setListeMentionsEnregistrees(listeMentions);
          },
          apresErreur: erreurs => {
            if (erreurs?.find(erreur => erreur.code === "FCT_16136")) {
              messageManager.showError("Aucune modification de l'analyse marginale n'a été détectée");

              return;
            }
            messageManager.showError("Impossible de mettre à jour l'acte");
          }
        });
        break;
      case !analyseMarginaleFormRef.current?.isValid && afficherAnalyseMarginale && analyseMarginaleFormRef.current?.dirty:
        analyseMarginaleFormRef.current?.submitForm();
        changerOnglet(null, ECleOngletsMiseAJour.ANALYSE_MARGINALE);
        break;
    }
  };

  const estActualiserEtVisualiserdisabled =
    !estFormulaireAnalyseMarginaleModifie &&
    (!estMiseAJourAvecMentions || shallowEgalTableau(listeMentions, listeMentionsEnregistrees) || estMentionEnCoursDeSaisie);

  const estTerminerEtSignerDisabled =
    listeMentions.length < 1 ||
    estMentionEnCoursDeSaisie ||
    !(analyseMarginaleFormRef.current ? analyseMarginaleFormRef.current?.isValid : true) ||
    analyseMarginaleFormRef.current?.dirty ||
    !estActualiserEtVisualiserdisabled;

  const onSignatureValidee = () => {
    changerOnglet(ECleOngletsMiseAJour.ACTE, null);
    setEstActeSigne(true);
    messageManager.showSuccessAndClose("L'acte a été mis à jour avec succès.");
    desactiverBlocker();
  };

  return (
    <div className="partie-formulaire">
      <OngletsBouton
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
        changerOnglet={(valeur: string) => changerOnglet(null, valeur as ECleOngletsMiseAJour)}
      />

      {(enAttenteMiseAJourAnalyseMarginale || enAttenteMiseAJourAnalyseMarginaleEtMention) && <PageChargeur />}

      <OngletMention
        estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.MENTIONS}
        refFormulaire={mentionsFormRef}
      />

      {afficherAnalyseMarginale && (
        <OngletAnalyseMarginale
          estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.ANALYSE_MARGINALE}
          refFormulaire={analyseMarginaleFormRef}
        />
      )}

      <ConteneurBoutonBasDePage position="droite">
        <BoutonActualiserEtVisualiser
          onClick={actualiserEtVisualiser}
          disabled={estActualiserEtVisualiserdisabled}
        />
        {estMiseAJourAvecMentions ? (
          estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, [Droit.SIGNER_MENTION, Droit.METTRE_A_JOUR_ACTE]) && (
            <>
              <Bouton
                disabled={estTerminerEtSignerDisabled}
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
          <BoutonValiderEtTerminer disabled={analyseMarginaleFormRef.current?.dirty || !miseAJourEffectuee} />
        )}
      </ConteneurBoutonBasDePage>
    </div>
  );
};

export default PartieFormulaire;
