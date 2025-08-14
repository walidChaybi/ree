import { RECEContextData } from "@core/contexts/RECEContext";
import { useContext } from "react";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import OngletsLien from "../../composants/commun/onglets/OngletsLien";
import BoutonsTableauConsulaire from "../../composants/pages/requetesConsulaire/BoutonsTableauConsulaire";
import LiensRECE from "../../router/LiensRECE";
import { INFO_PAGE_MES_REQUETES_CONSULAIRES } from "../../router/infoPages/InfoPagesEspaceConsulaire";

const PageRequetesServiceConsulaire: React.FC = () => {
  const { utilisateurs } = useContext(RECEContextData);

  return (
    <div>
      {!utilisateurs && <PageChargeur />}
      <OngletsLien
        liens={[
          {
            libelle: "Mes requêtes consulaires",
            url: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_CONSULAIRES.url)
          },
          {
            libelle: "Les requêtes consulaires de mon service"
          }
        ]}
      />

      <BoutonsTableauConsulaire />

      <div>RequetesServiceConsulaire</div>
    </div>
  );
};

export default PageRequetesServiceConsulaire;
