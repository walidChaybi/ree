import { RECEContextData } from "@core/contexts/RECEContext";
import {
  estOfficierHabiliterPourSeulementLesDroits,
  estOfficierHabiliterPourTousLesDroits,
  estOfficierHabiliterPourUnDesDroits,
  officierALeDroitSurUnDesPerimetres
} from "@model/agent/IOfficier";
import messageManager from "@util/messageManager";
import { IRoute } from "@util/route/IRoute";
import { useContext, useMemo } from "react";
import { Navigate, Outlet } from "react-router";
import { URL_ACCUEIL } from "./ReceUrls";

interface IReceRouteProps {
  route: IRoute;
}

const ReceRoute: React.FC<React.PropsWithChildren<IReceRouteProps>> = ({ route, children }): any => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const auth = useMemo(
    () =>
      !(
        route.canAccess?.() === false ||
        !(
          estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, route.droits) &&
          estOfficierHabiliterPourUnDesDroits(utilisateurConnecte, route.auMoinsUnDesDroits)
        ) ||
        !estOfficierHabiliterPourSeulementLesDroits(utilisateurConnecte, route.uniquementLesdroits) ||
        !(
          !route.droitPerimetres ||
          officierALeDroitSurUnDesPerimetres(route.droitPerimetres.droit, route.droitPerimetres.perimetres, utilisateurConnecte)
        )
      ),
    [route, utilisateurConnecte]
  );

  if (!auth) {
    messageManager.showWarningAndClose("La page demandée n'est pas autorisée, vous avez été redirigé sur la page d'accueil");
    return (
      <Navigate
        to={URL_ACCUEIL}
        replace
      />
    );
  }
  return children ?? <Outlet />;
};

export default ReceRoute;
