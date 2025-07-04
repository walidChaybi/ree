import { RECEContextData } from "@core/contexts/RECEContext";
import { URL_MES_REQUETES_CONSULAIRE } from "@router/ReceUrls";
import { useContext } from "react";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import OngletsLien from "../../composants/commun/onglets/OngletsLien";
import BoutonsTableauConsulaire from "../../composants/pages/requetesConsulaire/BoutonsTableauConsulaire";
import { useTitreDeLaFenetre } from "../../hooks/utilitaires/TitreDeLaFenetreHook";

interface IPageRequetesServiceConsulaireProps {
  query: any;
}

const PageRequetesServiceConsulaire: React.FC<IPageRequetesServiceConsulaireProps> = () => {
  useTitreDeLaFenetre("Espace consulaire");
  const { utilisateurs } = useContext(RECEContextData);

  return (
    <div>
      {!utilisateurs && <PageChargeur />}
      <OngletsLien
        liens={[
          {
            libelle: "Mes requêtes consulaires",
            url: URL_MES_REQUETES_CONSULAIRE
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
