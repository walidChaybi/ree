import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MesRequetesPage } from "../pages/requete/MesRequetesPage";
import { RequetePage } from "../pages/requete/RequetePage";
import { AccueilPage } from "../pages/accueil/AccueilPage";

export const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/accueil" />
      </Route>
      <Route exact path="/mesrequetes" component={MesRequetesPage} />
      <Route exact path="/requetes/:idSagaDila" component={RequetePage} />
      <Route exact path="/accueil" component={AccueilPage} />
    </Switch>
  );
};
