import React from "react";
import { Body } from "../Body";
import { screen, render } from "@testing-library/react";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import { createMemoryHistory } from "history";
import { AppUrls } from "../../../router/UrlManager";
import { Router } from "react-router-dom";

import officier from "../../../../api/mock/officier.json";

test("renders BoutonDeconnexion", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxAccueilUrl);

  render(
    <Router history={history}>
      <OfficierContext.Provider value={officier}>
        <Body />
      </OfficierContext.Provider>
    </Router>
  );
  const boutonElement = screen.getByText(/Juliette Garisson/i);
  expect(boutonElement).toBeInTheDocument();
});
