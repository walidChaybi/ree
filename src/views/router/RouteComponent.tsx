import { Droit } from "@model/agent/enum/Droit";
import {
  estOfficierHabiliterPourSeulementLesDroits,
  estOfficierHabiliterPourTousLesDroits,
  estOfficierHabiliterPourUnDesDroits,
  officierALeDroitSurUnDesPerimetres
} from "@model/agent/IOfficier";
import messageManager from "@util/messageManager";
import { IDroitPerimetre, IRoute } from "@util/route/IRoute";
import { storeRece } from "@util/storeRece";
import { getLibelle } from "@util/Utils";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { routesRece } from "./ReceRoutes";
import { URL_ACCUEIL } from "./ReceUrls";

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
              if (
                route.canAccess === false ||
                !estAutorise(route.droits, route.auMoinsUnDesDroits) ||
                !estAutoriseDroitsStricts(route.uniquementLesdroits) ||
                !estAutoriseDroitPerimetres(route.droitPerimetres)
              ) {
                messageManager.showWarningAndClose(
                  getLibelle(
                    "La page demandée n'est pas autorisée, vous avez été redirigé sur la page d'accueil"
                  )
                );
                return <Redirect to={URL_ACCUEIL} />;
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
