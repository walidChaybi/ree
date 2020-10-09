import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import officier from "../../../api/mock/data/connectedUser.json";
import { BoutonDeconnexion } from "../../../views/core/header/BoutonDeconnexion";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import { AppUrls } from "../../../views/router/UrlManager";

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
    const linkElement = screen.getByText(/Déconnexion/i);
    expect(linkElement).toBeInTheDocument();
  });
});
