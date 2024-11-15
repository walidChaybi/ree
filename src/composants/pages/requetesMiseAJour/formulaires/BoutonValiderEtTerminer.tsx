import TRAITEMENT_VALIDATION_MISE_A_JOUR from "@api/traitements/TraitementValidationMiseAJour";
import { IMiseAJourAnalyseMarginaleValeursForm } from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import messageManager from "@util/messageManager";
import { useFormikContext } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import useTraitementApi from "../../../../hooks/api/TraitementApiHook";
import Bouton from "../../../commun/bouton/Bouton";
import PageChargeur from "../../../commun/chargeurs/PageChargeur";

const BoutonValiderEtTerminer: React.FC = () => {
  const navigate = useNavigate();
  const { idActe, idRequete, miseAJourEffectuee } = useContext(
    EditionMiseAJourContext.Valeurs,
  );
  const { dirty } = useFormikContext<IMiseAJourAnalyseMarginaleValeursForm>();
  const { desactiverBlocker } = useContext(EditionMiseAJourContext.Actions);
  const {
    lancerTraitement: lancerValidation,
    traitementEnCours: validationEnCours,
  } = useTraitementApi(TRAITEMENT_VALIDATION_MISE_A_JOUR);

  const onClick = () => {
    desactiverBlocker();
    lancerValidation({
      parametres: { idActe: idActe, idRequete: idRequete },
      apresSucces: () => {
        navigate(URL_RECHERCHE_ACTE_INSCRIPTION);
        messageManager.showSuccessAndClose(
          "L'analyse marginale a été mise à jour avec succès",
        );
      },
    });
  };

  return (
    <>
      {validationEnCours && <PageChargeur />}
      <Bouton
        title="Valider et terminer"
        type="button"
        onClick={onClick}
        disabled={dirty || !miseAJourEffectuee}
      >
        {"Valider et terminer"}
      </Bouton>
    </>
  );
};

export default BoutonValiderEtTerminer;
