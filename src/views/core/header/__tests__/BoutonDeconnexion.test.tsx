import React from "react";
import { BoutonDeconnexion } from "../BoutonDeconnexion";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import { createMemoryHistory } from "history";
import { AppUrls } from "../../../router/UrlManager";
import { Router } from "react-router-dom";
import officier from "../../../../api/mock/data/connectedUser.json";
import ressource from "../../../../ressources/ressource.json";

test("renders BoutonDeconnexion", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);

  render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{ officierDataState: { idSSO: officier.id_sso, ...officier } }}
      >
        <BoutonDeconnexion />
      </OfficierContext.Provider>
    </Router>
  );
  const boutonElement = screen.getByText(
    /prenomConnectedUser nomConnectedUser/i
  );
  expect(boutonElement).toBeInTheDocument();
});

test("renders click BoutonDeconnexion", async () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);

  const handleClickButton = jest.fn();
  render(
    <Router history={history}>
      <>
        <OfficierContext.Provider
          value={{ officierDataState: { idSSO: officier.id_sso, ...officier } }}
        >
          <BoutonDeconnexion onClick={handleClickButton}></BoutonDeconnexion>
        </OfficierContext.Provider>
      </>
    </Router>
  );
  const boutonElement = screen.getByText(
    /prenomConnectedUser nomConnectedUser/i
  );
  fireEvent.click(boutonElement);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
  await waitFor(() => {
    if (ressource.boutonDeconnexion.visible) {
      const linkElement = screen.getByText(/Déconnexion/i);
      expect(linkElement).toBeInTheDocument();
    }
  });
});
