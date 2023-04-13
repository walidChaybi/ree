import requeteDelivrance from "@mock/data/requeteDelivrance";
import { NORESULT } from "@mock/superagent-config/superagent-mock-requetes";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { ApercuRequetePartieGauche } from "@pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/ApercuRequetePartieGauche";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

beforeEach(() => {
  TypePieceJustificative.init();
});

const history = createMemoryHistory();

test("render ApercuRequetePartieGauche", async () => {
  await act(async () => {
    render(
      <Router history={history}>
        <ApercuRequetePartieGauche requete={requeteDelivrance} />
      </Router>
    );
  });

  const boutonNouvelleRMC = screen.getByLabelText(
    "NouvelleRMCRequete"
  ) as HTMLButtonElement;
  expect(boutonNouvelleRMC).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(boutonNouvelleRMC);
  });

  const popinNouvelleRMC = screen.getByRole("dialog", {
    hidden: true
  });
  const nomTitulaire = screen.getByLabelText(
    "titulaire.nom"
  ) as HTMLInputElement;

  const anneeNaissanceTitulaire = screen.getByLabelText(
    "titulaire.dateNaissance.annee"
  ) as HTMLInputElement;

  const boutonRechercher = screen.getByText("Rechercher") as HTMLButtonElement;

  await waitFor(() => {
    expect(popinNouvelleRMC).toBeInTheDocument();
    expect(nomTitulaire).toBeInTheDocument();
    expect(anneeNaissanceTitulaire).toBeInTheDocument();
    expect(boutonRechercher).toBeInTheDocument();
    expect(boutonRechercher.disabled).toBeTruthy();
  });

  await act(async () => {
    fireEvent.change(nomTitulaire, {
      target: { value: NORESULT }
    });
  });

  await act(async () => {
    fireEvent.change(anneeNaissanceTitulaire, {
      target: { value: "2000" }
    });
  });

  await waitFor(() => {
    expect(nomTitulaire.value).toEqual(NORESULT);
    expect(anneeNaissanceTitulaire.value).toEqual("2000");
  });

  await act(async () => {
    expect(boutonRechercher.disabled).toBeFalsy();
    fireEvent.click(boutonRechercher);
  });

  await waitFor(() => {
    expect(popinNouvelleRMC).not.toBeInTheDocument();
    expect(screen.getByText("Aucune requête n'a été trouvée")).toBeDefined();
  });
});
