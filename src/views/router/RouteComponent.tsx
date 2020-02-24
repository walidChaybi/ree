import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MesRequetesPage } from "../pages/requete/MesRequetesPage";
import { RequetePage } from "../pages/requete/RequetePage";

export const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/mesrequetes" />
      </Route>
      <Route exact path="/mesrequetes" component={MesRequetesPage} />
      <Route exact path="/requetes/:idSagaDila" component={RequetePage} />
    </Switch>
  );
};
