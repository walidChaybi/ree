import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import AppChargeur from "../composants/commun/chargeurs/AppChargeur";
import CorpsDePage from "../composants/miseEnPage/corpsDePage/CorpsDePage";
import EnTete from "../composants/miseEnPage/enTete/EnTete";
import PageAccueil from "../pages/accueil/PageAccueil";
import ElementPageRECE from "./ElementPageRECE";
import { INFO_PAGE_ACCUEIL, URL_ACCUEIL, URL_DECONNEXION } from "./infoPages/InfoPagesBase";
import { ROUTES_ESPACE_CONSULAIRE } from "./routes/RoutesEspaceConsulaire";
import { ROUTES_ESPACE_DELIVRANCE } from "./routes/RoutesEspaceDelivrance";
import { ROUTES_ESPACE_ETABLISSEMENT } from "./routes/RoutesEspaceEtablissement";
import { ROUTES_ESPACE_INFORMATION } from "./routes/RoutesEspaceInformation";
import { ROUTES_ESPACE_MISE_A_JOUR } from "./routes/RoutesEspaceMiseAJour";
import { ROUTES_ESPACE_RECHERCHE } from "./routes/RoutesEspaceRecherche";

const ROUTER = createBrowserRouter([
  {
    path: URL_ACCUEIL,
    element: (
      <>
        <EnTete />
        <CorpsDePage />
      </>
    ),
    children: [
      {
        path: INFO_PAGE_ACCUEIL.url,
        element: (
          <ElementPageRECE infoPage={INFO_PAGE_ACCUEIL}>
            <PageAccueil />
          </ElementPageRECE>
        )
      },

      ...ROUTES_ESPACE_DELIVRANCE,

      ...ROUTES_ESPACE_ETABLISSEMENT,

      ...ROUTES_ESPACE_CONSULAIRE,

      ...ROUTES_ESPACE_MISE_A_JOUR,

      ...ROUTES_ESPACE_INFORMATION,

      ...ROUTES_ESPACE_RECHERCHE
    ]
  },

  {
    path: URL_DECONNEXION,
    element: <AppChargeur />
  },

  {
    path: "*",
    element: <Navigate to={URL_ACCUEIL} />
  }
]);

const RouterRECE: React.FC = () => <RouterProvider router={ROUTER} />;

export default RouterRECE;
