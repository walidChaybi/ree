import React from "react";
import { Body } from "../../../views/core/body/Body";
import { screen, render } from "@testing-library/react";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import { createMemoryHistory } from "history";
import { URL_ACCUEIL } from "../../../views/router/ReceUrls";
import { Router } from "react-router-dom";
import officier from "../../../mock/data/connectedUser.json";

test("renders BoutonDeconnexion", () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);
  officier.profils.push("RECE_ADMIN");

  render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{ officierDataState: { idSSO: officier.id_sso, ...officier } }}
      >
        <Body />
      </OfficierContext.Provider>
    </Router>
  );
  const boutonElement = screen.getByText(
    /prenomConnectedUser nomConnectedUser/i
  );
  expect(boutonElement).toBeInTheDocument();
});
