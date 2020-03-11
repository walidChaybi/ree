import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MesRequetesPage } from "../pages/requete/MesRequetesPage";
import { AccueilPage } from "../pages/accueil/AccueilPage";
import { RequetePage } from "../pages/requete/visualisation/RequetePage";

export const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/accueil" />
      </Route>
      <Route exact path="/mesrequetes" component={MesRequetesPage} />
      <Route exact path="/requetes/:idRequete" component={RequetePage} />
      <Route exact path="/accueil" component={AccueilPage} />
    </Switch>
  );
};
