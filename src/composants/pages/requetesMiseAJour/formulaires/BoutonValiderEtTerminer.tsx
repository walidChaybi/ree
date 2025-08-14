import TRAITEMENT_VALIDATION_MISE_A_JOUR from "@api/traitements/TraitementValidationMiseAJour";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import useTraitementApi from "../../../../hooks/api/TraitementApiHook";
import LiensRECE from "../../../../router/LiensRECE";
import { INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION } from "../../../../router/infoPages/InfoPagesEspaceRecherche";
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
        AfficherMessage.succes("L'analyse marginale a été mise à jour avec succès", { fermetureAuto: true });
        navigate(LiensRECE.genererLien(INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION.url), { replace: true });
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
