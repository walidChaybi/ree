import { Body } from "@core/body/Body";
import { Header } from "@core/header/Header";
import { PageMessage } from "@core/login/PageMessage";
import {
  estOfficierHabiliterPourSeulementLesDroits,
  estOfficierHabiliterPourTousLesDroits,
  estOfficierHabiliterPourUnDesDroits,
  officierALeDroitSurUnDesPerimetres
} from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { getLibelle } from "@util/Utils";
import messageManager from "@util/messageManager";
import { IDroitPerimetre, IRoute } from "@util/route/IRoute";
import { storeRece } from "@util/storeRece";
import {
  Navigate,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { routesRece } from "./ReceRoutes";
import { URL_CONTEXT_APP, URL_DECONNEXION } from "./ReceUrls";

interface IReceRoute {
  route: IRoute;
}

const ReceRoute: React.FC<IReceRoute> = ({ route, children }): any => {
  const auth = afficheComposantSiAuthorise(route);
  if (!auth) {
    messageManager.showWarningAndClose(
      getLibelle(
        "La page demandée n'est pas autorisée, vous avez été redirigé sur la page d'accueil"
      )
    );
    return <Navigate to={URL_CONTEXT_APP} replace />;
  }
  return children ? children : <Outlet />;
};

const afficheComposantSiAuthorise = (route: IRoute) => {
  return !(
    route.canAccess === false ||
    !estAutorise(route.droits, route.auMoinsUnDesDroits) ||
    !estAutoriseDroitsStricts(route.uniquementLesdroits) ||
    !estAutoriseDroitPerimetres(route.droitPerimetres)
  );
};

function estAutorise(droits?: Droit[], auMoinsUnDesDroits?: Droit[]) {
  return (
    estOfficierHabiliterPourTousLesDroits(droits) &&
    estOfficierHabiliterPourUnDesDroits(auMoinsUnDesDroits)
  );
}

function estAutoriseDroitsStricts(droits: Droit[] | undefined) {
  return estOfficierHabiliterPourSeulementLesDroits(droits);
}

function estAutoriseDroitPerimetres(droitPerimetres?: IDroitPerimetre) {
  return (
    !droitPerimetres ||
    (storeRece.utilisateurCourant != null &&
      officierALeDroitSurUnDesPerimetres(
        droitPerimetres.droit,
        droitPerimetres.perimetres
      ))
  );
}

export const receRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={URL_CONTEXT_APP}
        element={
          <>
            <Header />
            <Body />
          </>
        }
      >
        {routesRece.map((route: IRoute, index: number) => {
          return (
            <Route
              key={index}
              {...(Boolean(route.url.length)
                ? { path: route.url }
                : { index: true })}
              element={
                <ReceRoute route={route}>
                  <route.component {...route.props} />
                </ReceRoute>
              }
            />
          );
        })}
      </Route>
      <Route path={URL_DECONNEXION} element={<PageMessage />} />
      <Route path="*" element={<Navigate to={URL_CONTEXT_APP} />} />
    </>
  )
);
