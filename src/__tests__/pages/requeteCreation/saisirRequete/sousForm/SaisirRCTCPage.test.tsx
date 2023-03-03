import { SaisirRCTCPage } from "@pages/requeteCreation/saisirRequete/SaisirRCTCPage";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router";

const HookSaisirRCTCForm: React.FC = () => {
  return <SaisirRCTCPage />;
};

const history = createMemoryHistory();

test("DOIT rendre la page de saisie du formulaire de création correctement", async () => {
  await act(async () => {
    render(
      <Router history={history}>
        <HookSaisirRCTCForm />
      </Router>
    );
  });

  // const boutonAjouterParent = screen.getByText("Ajouter un parent");
  const boutonAjouterParent = screen.queryByText("Ajouter un parent");

  const boutonSupprimerParent = screen.queryByText("Supprimer un parent");

  await waitFor(() => {
    expect(boutonAjouterParent).toBeInTheDocument();
  });

  await act(async () => {
    if (boutonAjouterParent) fireEvent.click(boutonAjouterParent);
  });

  await waitFor(() => {
    expect(screen.getByText("Parent 2")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(boutonAjouterParent).not.toBeInTheDocument();
    expect(boutonSupprimerParent).toBeDefined();
  });
});
