import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import Add from "@mui/icons-material/Add";
import { useContext, useMemo } from "react";
import LiensRECE from "../../../router/LiensRECE";
import { INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER } from "../../../router/infoPages/InfoPagesEspaceConsulaire";
import Bouton from "../../commun/bouton/Bouton";
import BoutonListeDeroulante from "../../commun/bouton/BoutonListeDeroulante";

const BoutonsTableauConsulaire: React.FC = () => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const peutSaisirRequete = useMemo(
    () => utilisateurConnecte.estHabilitePour({ leDroit: Droit.TRANSCRIPTION_SAISIR_REQUETE }),
    [utilisateurConnecte]
  );

  return peutSaisirRequete ? (
    <div className="flex justify-end">
      <BoutonListeDeroulante
        titre="Saisir requête courrier"
        pointAncrageMenu="bas-droite"
      >
        <Bouton
          className="shadow-xl"
          title="Création suite transcription courrier"
          lienVers={LiensRECE.genererLien(INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER.url)}
        >
          <span className="flex items-center gap-1 normal-case">
            <Add fontSize="small" />
            {"Création suite transcription courrier"}
          </span>
        </Bouton>
      </BoutonListeDeroulante>
    </div>
  ) : (
    <></>
  );
};

export default BoutonsTableauConsulaire;
