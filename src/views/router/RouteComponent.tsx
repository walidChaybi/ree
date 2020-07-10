import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AccueilPage } from "../pages/accueil/AccueilPage";
import { RequetePage } from "../pages/requete/visualisation/RequetePage";
import { AppUrls } from "./UrlManager";
import DelivrancePage from "../pages/requete/DelivrancePage";

export const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route exact path={AppUrls.SeparateurUrl}>
        <Redirect to={AppUrls.ctxAccueilUrl} />
      </Route>
      <Route exact path={AppUrls.ctxSeparateurUrl}>
        <Redirect to={AppUrls.ctxAccueilUrl} />
      </Route>
      <Route exact path={AppUrls.ctxMesRequetesUrl}>
        <DelivrancePage selectedTab={0} />
      </Route>
      <Route exact path={AppUrls.ctxRequetesServiceUrl}>
        <DelivrancePage selectedTab={1} />
      </Route>
      <Route exact path={AppUrls.ctxIdRequeteUrl} component={RequetePage} />
      <Route
        exact
        path={AppUrls.ctxIdRequeteServiceUrl}
        component={RequetePage}
      />
      <Route exact path={AppUrls.ctxAccueilUrl} component={AccueilPage} />
    </Switch>
  );
};
