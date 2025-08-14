import OngletsLien from "../../composants/commun/onglets/OngletsLien";
import BoutonsTableauConsulaire from "../../composants/pages/requetesConsulaire/BoutonsTableauConsulaire";
import TableauMesRequetesConsulaire from "../../composants/pages/requetesConsulaire/mesRequetes/TableauMesRequetesConsulaire";
import LiensRECE from "../../router/LiensRECE";
import { INFO_PAGE_REQUETES_CONSULAIRES_SERVICE } from "../../router/infoPages/InfoPagesEspaceConsulaire";
interface IPageMesRequetesConsulaireProps {}

const PageMesRequetesConsulaires: React.FC<IPageMesRequetesConsulaireProps> = () => (
  <>
    <OngletsLien
      liens={[
        {
          libelle: "Mes requêtes consulaires"
        },
        {
          libelle: "Les requêtes consulaires de mon service",
          url: LiensRECE.genererLien(INFO_PAGE_REQUETES_CONSULAIRES_SERVICE.url)
        }
      ]}
    />

    <BoutonsTableauConsulaire />

    <TableauMesRequetesConsulaire />
  </>
);

export default PageMesRequetesConsulaires;
