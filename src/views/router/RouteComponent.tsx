import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MesRequetesPage } from "../pages/requete/MesRequetesPage";
import { AccueilPage } from "../pages/accueil/AccueilPage";
import { RequetePage } from "../pages/requete/visualisation/RequetePage";
import { AppUrls } from "./UrlManager";

export const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route exact path={AppUrls.SeparateurUrl}>
        <Redirect to={AppUrls.ctxAccueilUrl} />
      </Route>
      <Route exact path={AppUrls.ctxSeparateurUrl}>
        <Redirect to={AppUrls.ctxAccueilUrl} />
      </Route>
      <Route
        exact
        path={AppUrls.ctxMesRequetesUrl}
        component={MesRequetesPage}
      />
      <Route exact path={AppUrls.ctxIdRequeteUrl} component={RequetePage} />
      <Route exact path={AppUrls.ctxAccueilUrl} component={AccueilPage} />
    </Switch>
  );
};
