import TRAITEMENT_VALIDATION_MISE_A_JOUR from "@api/traitements/TraitementValidationMiseAJour";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import useTraitementApi from "../../../../hooks/api/TraitementApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import Bouton, { IBoutonProps } from "../../../commun/bouton/Bouton";
import PageChargeur from "../../../commun/chargeurs/PageChargeur";

const BoutonValiderEtTerminer: React.FC<IBoutonProps> = ({ ...props }) => {
  const navigate = useNavigate();
  const { idActe, idRequete } = useContext(EditionMiseAJourContext.Valeurs);
  const { desactiverBlocker } = useContext(EditionMiseAJourContext.Actions);
  const { lancerTraitement: lancerValidation, traitementEnCours: validationEnCours } = useTraitementApi(TRAITEMENT_VALIDATION_MISE_A_JOUR);

  const onClick = () => {
    desactiverBlocker();
    lancerValidation({
      parametres: { idActe: idActe, idRequete: idRequete },
      apresSucces: () => {
        navigate(URL_RECHERCHE_ACTE_INSCRIPTION, { replace: true });
        AfficherMessage.succes("L'analyse marginale a été mise à jour avec succès", { fermetureAuto: true });
      }
    });
  };

  return (
    <>
      {validationEnCours && <PageChargeur />}
      <Bouton
        title="Valider et terminer"
        type="button"
        onClick={onClick}
        {...props}
      >
        {"Valider et terminer"}
      </Bouton>
    </>
  );
};

export default BoutonValiderEtTerminer;
