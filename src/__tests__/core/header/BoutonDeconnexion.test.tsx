import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import officier from "../../../mock/data/connectedUser.json";
import { BoutonDeconnexion } from "../../../views/core/header/BoutonDeconnexion";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import { URL_MES_REQUETES } from "../../../views/router/ReceUrls";

test("renders BoutonDeconnexion", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

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
  history.push(URL_MES_REQUETES);

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
  expect(history).toHaveLength(2);
  await waitFor(() => {
    const linkElement = screen.getByText(/Déconnexion/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);

    expect(history).toHaveLength(3);
  });
});
