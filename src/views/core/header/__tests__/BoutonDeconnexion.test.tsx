import React from "react";
import { BoutonDeconnexion } from "../BoutonDeconnexion";
import { screen, render, fireEvent } from "@testing-library/react";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import { createMemoryHistory } from "history";
import { AppUrls } from "../../../router/UrlManager";
import { Router } from "react-router-dom";

const ressource = require("../../../../ressources/ressource.json");
const officier = require("../../../../api/mock/officier.json");

test("renders BoutonDeconnexion", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);

  render(
    <Router history={history}>
      <OfficierContext.Provider value={officier}>
        <BoutonDeconnexion />
      </OfficierContext.Provider>
    </Router>
  );
  const boutonElement = screen.getByText(/Juliette Garisson/i);
  expect(boutonElement).toBeInTheDocument();
});

test("renders click BoutonDeconnexion", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);

  const handleClickButton = jest.fn();
  render(
    <Router history={history}>
      <>
        <OfficierContext.Provider value={officier}>
          <BoutonDeconnexion onClick={handleClickButton}></BoutonDeconnexion>
        </OfficierContext.Provider>
      </>
    </Router>
  );
  const boutonElement = screen.getByText(/Juliette Garisson/i);
  fireEvent.click(boutonElement);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
  if (ressource.boutonDeconnexion.visible) {
    const linkElement = screen.getByText(/Déconnexion/i);
    expect(linkElement).toBeInTheDocument();
  }
});
