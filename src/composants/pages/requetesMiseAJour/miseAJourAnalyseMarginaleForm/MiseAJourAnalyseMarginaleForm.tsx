import { CONFIG_PATCH_VALIDATION_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PatchValidationAnalyseMarginaleConfigApi";
import { CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjour";
import {
  IMiseAJourAnalyseMarginaleValeursForm,
  MiseAJourAnalyseMarginaleValeursForm,
  SCHEMA_VALIDATION_MISE_A_JOUR_ANALYSE_MARGINALE
} from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { logError } from "@util/LogManager";
import messageManager from "@util/messageManager";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ECleOngletsMiseAJour,
  EditionMiseAJourContext
} from "../../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../../hooks/FetchApiHook";
import PageChargeur from "../../../commun/chargeurs/PageChargeur";
import ModificationAnalyseMarginale from "./ModificationAnalyseMarginale";

interface IMiseAJourAnalyseMarginaleForm {
  derniereAnalyseMarginal?: IDerniereAnalyseMarginalResultat;
}

export const MiseAJourAnalyseMarginaleForm: React.FC<
  IMiseAJourAnalyseMarginaleForm
> = ({ derniereAnalyseMarginal }) => {
  const { idActe, idRequete } = useContext(EditionMiseAJourContext.Valeurs);
  const {
    activerOngletActeMisAJour,
    setComposerActeMisAJour,
    changerOnglet,
    desactiverBlocker
  } = useContext(EditionMiseAJourContext.Actions);

  const navigate = useNavigate();

  const {
    appelApi: appelPatchValidationAnalyseMarginale,
    enAttenteDeReponseApi: enAttenteValidationAnalyseMarginale
  } = useFetchApi(CONFIG_PATCH_VALIDATION_ANALYSE_MARGINALE);
  const {
    appelApi: appelApiMisAJourAnalyseMarginale,
    enAttenteDeReponseApi: enAttenteMiseAJourAnalyseMarginale
  } = useFetchApi(CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE);
  const {
    appelApi: appelApiModifierStatutRequeteMiseAJour,
    enAttenteDeReponseApi: enAttenteClotureRequete
  } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR);

  const [valeursParDefaut, setValeursParDefaut] =
    useState<IMiseAJourAnalyseMarginaleValeursForm>(
      MiseAJourAnalyseMarginaleValeursForm.valeurParDefaut(
        derniereAnalyseMarginal
      )
    );

  const onSubmit = (valeurs: IMiseAJourAnalyseMarginaleValeursForm) => {
    appelApiMisAJourAnalyseMarginale({
      parametres: {
        path: { idActe: idActe },
        body: MiseAJourAnalyseMarginaleValeursForm.versDto(valeurs)
      },
      apresSucces: () => {
        setValeursParDefaut(valeurs);
        activerOngletActeMisAJour();
        setComposerActeMisAJour(true);
        changerOnglet(ECleOngletsMiseAJour.ACTE_MIS_A_JOUR, null);
      },
      apresErreur: () =>
        messageManager.showError(
          "Impossible de mettre à jour l'analyse marginale"
        )
    });
  };

  const onClickValiderEtTerminer = () => {
    appelPatchValidationAnalyseMarginale({
      parametres: {
        path: {
          idActe: idActe
        }
      },
      apresSucces: () => {
        appelApiModifierStatutRequeteMiseAJour({
          parametres: {
            path: {
              idRequete: idRequete,
              statut: StatutRequete.getKey(StatutRequete.TRAITEE_MIS_A_JOUR)
            }
          },
          apresErreur: () =>
            messageManager.showWarningAndClose(
              "Erreur lors de la clôture de la requête de mise à jour."
            ),
          finalement: () => {
            desactiverBlocker();
            navigate(URL_RECHERCHE_ACTE_INSCRIPTION);
            messageManager.showSuccessAndClose(
              "L'analyse marginale a été mise à jour avec succès"
            );
          }
        });
      },
      apresErreur: erreur => {
        logError({
          error: erreur,
          messageUtilisateur: "Impossible de mettre à jour l'analyse marginale"
        });
      }
    });
  };

  return (
    <>
      {(enAttenteValidationAnalyseMarginale ||
        enAttenteMiseAJourAnalyseMarginale ||
        enAttenteClotureRequete) && <PageChargeur />}

      <Formulaire
        formDefaultValues={valeursParDefaut}
        formValidationSchema={SCHEMA_VALIDATION_MISE_A_JOUR_ANALYSE_MARGINALE}
        onSubmit={valeurs =>
          onSubmit(valeurs as IMiseAJourAnalyseMarginaleValeursForm)
        }
        className="sans-marge"
      >
        <ModificationAnalyseMarginale
          onValiderEtTerminer={onClickValiderEtTerminer}
        />
      </Formulaire>
    </>
  );
};
