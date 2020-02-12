import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { RequetePage } from "../pages/requete/RequetePage";

export const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/requetes" />
      </Route>
      <Route exact path="/requetes" component={RequetePage} />
    </Switch>
  );
};
