import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AccueilPage } from "../pages/accueil/AccueilPage";
import { LoginPage } from "../core/login/LoginPage";
import { ApercuRequetePage } from "../pages/apercuRequete/ApercuRequetePage";
import { AppUrls } from "./UrlManager";
import DelivrancePage from "../pages/espaceDelivrance/EspaceDelivrancePage";
import { OfficierContext } from "../core/contexts/OfficierContext";
import { RcRcaPage } from "../pages/RcRcaPage";

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

      <Route
        exact
        path={AppUrls.ctxIdRequeteUrl}
        render={props => (
          <OfficierContext.Consumer>
            {officier => (
              <ApercuRequetePage
                {...props}
                officier={officier?.officierDataState}
              />
            )}
          </OfficierContext.Consumer>
        )}
      />

      <Route exact path={AppUrls.DeconnexionAppUrl}>
        <LoginPage messageLogin="pages.login.deconnexion" />
      </Route>

      <Route
        exact
        path={AppUrls.ctxIdRequeteServiceUrl}
        render={props => (
          <OfficierContext.Consumer>
            {officier => (
              <ApercuRequetePage
                {...props}
                officier={officier?.officierDataState}
              />
            )}
          </OfficierContext.Consumer>
        )}
      />
      <Route exact path={AppUrls.ctxAccueilUrl} component={AccueilPage} />

      <Route exact path={AppUrls.ctxRcRcaUrl}>
        <RcRcaPage />
      </Route>
    </Switch>
  );
};
