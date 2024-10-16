import { CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import TRAITEMENT_VALIDATION_MISE_A_JOUR from "@api/traitements/TraitementValidationMiseAJour";
import {
  IMiseAJourAnalyseMarginaleValeursForm,
  MiseAJourAnalyseMarginaleValeursForm,
  SCHEMA_VALIDATION_MISE_A_JOUR_ANALYSE_MARGINALE
} from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import messageManager from "@util/messageManager";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ECleOngletsMiseAJour,
  EditionMiseAJourContext
} from "../../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import useTraitementApi from "../../../../hooks/api/TraitementApiHook";
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
    appelApi: appelApiMisAJourAnalyseMarginale,
    enAttenteDeReponseApi: enAttenteMiseAJourAnalyseMarginale
  } = useFetchApi(CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE);

  const [valeursParDefaut, setValeursParDefaut] = useState<IMiseAJourAnalyseMarginaleValeursForm>(
    MiseAJourAnalyseMarginaleValeursForm.valeurParDefaut(derniereAnalyseMarginal)
  );

  const { lancerTraitement: lancerValidation, traitementEnCours: validationEnCours } = useTraitementApi(TRAITEMENT_VALIDATION_MISE_A_JOUR);

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
      apresErreur: () => messageManager.showError("Impossible de mettre à jour l'analyse marginale")
    });
  };

  const onClickValiderEtTerminer = () => {
    desactiverBlocker();
    lancerValidation({ idActe, idRequete }, () => {
      navigate(URL_RECHERCHE_ACTE_INSCRIPTION);
      messageManager.showSuccessAndClose("L'analyse marginale a été mise à jour avec succès");
    });
  };

  return (
    <>
      {enAttenteMiseAJourAnalyseMarginale || (validationEnCours && <PageChargeur />)}

      <Formulaire
        formDefaultValues={valeursParDefaut}
        formValidationSchema={SCHEMA_VALIDATION_MISE_A_JOUR_ANALYSE_MARGINALE}
        onSubmit={valeurs => onSubmit(valeurs as IMiseAJourAnalyseMarginaleValeursForm)}
        className="sans-marge"
      >
        <ModificationAnalyseMarginale onValiderEtTerminer={onClickValiderEtTerminer} />
      </Formulaire>
    </>
  );
};
