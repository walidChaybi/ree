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
import request from "superagent";
import { configAgent } from "../../../../../mock/superagent-config/superagent-mock-agent";
import { configRequetesCreation } from "../../../../../mock/superagent-config/superagent-mock-requetes-creation";
import { entiteRatachementEtablissement } from "./../../../../../mock/data/entiteRatachementEtablissement";

const superagentMock = require("superagent-mock")(request, [
  configAgent[0],
  configRequetesCreation[0]
]);

afterAll(() => {
  superagentMock.unset();
});

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
    if (boutonAjouterParent) {
      fireEvent.click(boutonAjouterParent);
    }
  });

  await waitFor(() => {
    expect(screen.getByText("Parent 2")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(boutonAjouterParent).not.toBeInTheDocument();
    expect(boutonSupprimerParent).toBeDefined();
  });
});

test("DOIT afficher la popin de transfert vers les entités fille (triées) du département Etablissement QUAND l'utilisateur clique sur le bouton de transmission", async () => {
  await act(async () => {
    render(
      <Router history={history}>
        <HookSaisirRCTCForm />
      </Router>
    );
  });

  const boutonTransmettre = screen.queryByText(
    "Transmettre au service compétent"
  );

  await waitFor(() => {
    expect(boutonTransmettre).toBeDefined();
    expect(screen.queryByText("Choisissez une entité")).not.toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(boutonTransmettre!);
  });

  await waitFor(() => {
    expect(screen.queryByText("Choisissez une entité")).toBeInTheDocument();
  });

  const selectElement = screen.getByLabelText(
    "Choix des entités"
  ) as HTMLSelectElement;

  await waitFor(() => {
    expect(screen.queryByText("BTE Genève")).toBeInTheDocument();
  });

  const options: HTMLOptionsCollection = selectElement.options;
  const entiteRatachementEtablissementTriees =
    entiteRatachementEtablissement.data.sort((entite1: any, entite2: any) =>
      entite1.libelleEntite.localeCompare(entite2.libelleEntite)
    );

  for (let i = 0; i < options.length; i++) {
    const libelleOtion = options.item(i)?.text;
    if (i === 0) {
      // Première option vide (Placeholder)
      expect(libelleOtion).toEqual("Entités");
    } else {
      expect(libelleOtion).toEqual(
        entiteRatachementEtablissementTriees[i - 1].libelleEntite
      );
    }
  }
});