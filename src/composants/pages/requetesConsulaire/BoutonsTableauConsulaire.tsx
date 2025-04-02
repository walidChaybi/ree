import { RECEContextData } from "@core/contexts/RECEContext";
import { utilisateurADroit } from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import Add from "@mui/icons-material/Add";
import { URL_MES_REQUETES_CONSULAIRE_SAISIR_RCTC } from "@router/ReceUrls";
import { useContext, useMemo } from "react";
import Bouton from "../../commun/bouton/Bouton";
import BoutonListeDeroulante from "../../commun/bouton/BoutonListeDeroulante";

const BoutonsTableauConsulaire: React.FC = () => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const peutSaisirRequete = useMemo(() => utilisateurADroit(Droit.SAISIR_REQUETE, utilisateurConnecte), [utilisateurConnecte]);

  return peutSaisirRequete ? (
    <div className="flex justify-end">
      <BoutonListeDeroulante
        titre="Saisir requête courrier"
        pointAncrageMenu="bas-droite"
      >
        <Bouton
          className="shadow-xl"
          title="Création suite transcription courrier"
          lienVers={URL_MES_REQUETES_CONSULAIRE_SAISIR_RCTC}
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
