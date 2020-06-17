import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MesRequetesPage } from "../pages/requete/MesRequetesPage";
import { AccueilPage } from "../pages/accueil/AccueilPage";
import { RequetePage } from "../pages/requete/visualisation/RequetePage";
import { getAppUrl, AppUrls } from "./UrlManager";

export const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route
        exact
        path={
          process.env.NODE_ENV === "production"
            ? AppUrls.ctxSeparateurUrl
            : AppUrls.SeparateurUrl
        }
      >
        <Redirect to={getAppUrl(AppUrls.AccueilUrl)} />
      </Route>
      <Route
        exact
        path={getAppUrl(AppUrls.MesRequetesUrl)}
        component={MesRequetesPage}
      />
      <Route
        exact
        path={getAppUrl(AppUrls.IdRequeteUrl)}
        component={RequetePage}
      />
      <Route
        exact
        path={getAppUrl(AppUrls.AccueilUrl)}
        component={AccueilPage}
      />
    </Switch>
  );
};
