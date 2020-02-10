import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

export const RouterComponent: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/accueil" />
      </Route>
      <Route exact path="/accueil"></Route>
    </Switch>
  );
};
