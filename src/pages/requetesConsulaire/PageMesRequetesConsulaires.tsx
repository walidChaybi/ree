import { URL_REQUETES_CONSULAIRE_SERVICE } from "@router/ReceUrls";
import OngletsLien from "../../composants/commun/onglets/OngletsLien";
import BoutonsTableauConsulaire from "../../composants/pages/requetesConsulaire/BoutonsTableauConsulaire";
import TableauMesRequetesConsulaire from "../../composants/pages/requetesConsulaire/mesRequetes/TableauMesRequetesConsulaire";
import { useTitreDeLaFenetre } from "../../hooks/utilitaires/TitreDeLaFenetreHook";
interface IPageMesRequetesConsulaireProps {}

const PageMesRequetesConsulaires: React.FC<IPageMesRequetesConsulaireProps> = () => {
  useTitreDeLaFenetre("Espace consulaire");

  return (
    <>
      <OngletsLien
        liens={[
          {
            libelle: "Mes requêtes consulaires"
          },
          {
            libelle: "Les requêtes consulaires de mon service",
            url: URL_REQUETES_CONSULAIRE_SERVICE
          }
        ]}
      />

      <BoutonsTableauConsulaire />

      <TableauMesRequetesConsulaire />
    </>
  );
};

export default PageMesRequetesConsulaires;
