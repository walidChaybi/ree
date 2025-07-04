import { RECEContextData } from "@core/contexts/RECEContext";
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
  const auth = useMemo(() => {
    const utilisateur = {
      peutAccederALaPage: route.canAccess ? route.canAccess() : true,
      aLesDroits: route.droits?.length ? utilisateurConnecte.estHabilitePour({ tousLesDroits: route.droits }) : true,
      aAuMoinsUnDesDroits: route.auMoinsUnDesDroits?.length
        ? utilisateurConnecte.estHabilitePour({ unDesDroits: route.auMoinsUnDesDroits })
        : true,
      aUniquementLesdroits: route.uniquementLesdroits?.length
        ? utilisateurConnecte.nombreHabilitations === route.uniquementLesdroits.length &&
          utilisateurConnecte.estHabilitePour({ tousLesDroits: route.uniquementLesdroits })
        : true,
      aDroitSurUnDesPerimetres: route.droitPerimetres
        ? utilisateurConnecte.estHabilitePour({
            leDroit: route.droitPerimetres.droit,
            surUnDesPerimetres: route.droitPerimetres.perimetres
          })
        : true
    };

    return (
      utilisateur.peutAccederALaPage &&
      utilisateur.aLesDroits &&
      utilisateur.aAuMoinsUnDesDroits &&
      utilisateur.aUniquementLesdroits &&
      utilisateur.aDroitSurUnDesPerimetres
    );
  }, [route, utilisateurConnecte]);

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
