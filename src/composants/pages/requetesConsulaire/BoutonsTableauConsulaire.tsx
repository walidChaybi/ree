import { Droit } from "@model/agent/enum/Droit";
import { useContext, useMemo } from "react";
import { MdAdd } from "react-icons/md";
import { RECEContextData } from "../../../contexts/RECEContextProvider";
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
            <MdAdd
              className="text-md"
              aria-hidden
            />
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
