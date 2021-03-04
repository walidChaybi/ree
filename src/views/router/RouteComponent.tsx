import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routesRece } from "./ReceRoutes";
import { storeRece } from "../common/util/storeRece";
import messageManager from "../common/util/messageManager";
import { estOfficierHabiliterPourUnDesDroits } from "../../model/Habilitation";
import { Droit } from "../../model/Droit";
import { URL_ACCUEIL } from "./ReceUrls";
import { getLibelle } from "../common/widget/Text";
import { IRoute } from "../common/util/route/IRoute";

export const RouterComponent: React.FC = () => {
  return (
    <Switch>
      {routesRece.map((route: IRoute, index: number) => {
        return (
          <Route
            key={index}
            exact={true}
            path={route.url}
            render={props => {
              if (route.canAccess === false || !estAutorise(route.droits)) {
                messageManager.showWarningAndClose(
                  getLibelle(
                    "La page demandée n'est pas autorisée, vous avez été redirigé sur la page d'accueil"
                  )
                );
                return <Redirect to={URL_ACCUEIL} />;
              } else {
                if (route.render) {
                  return route.render(props);
                }
              }
              return <route.component {...route.props} />;
            }}
          ></Route>
        );
      })}
      <Route
        render={() => {
          messageManager.showWarningAndClose(
            getLibelle(
              "La page demandée n'existe pas, vous avez été redirigé sur la page d'accueil"
            )
          );
          return <Redirect to={URL_ACCUEIL} />;
        }}
      />
    </Switch>
  );
};

function estAutorise(droits: Droit[] | undefined) {
  return (
    !droits ||
    (storeRece.utilisateurCourant &&
      estOfficierHabiliterPourUnDesDroits(storeRece.utilisateurCourant, droits))
  );
}
