import React from "react";
import {
  render,
  fireEvent,
  act,
  waitFor,
  screen
} from "@testing-library/react";
import { RMCResultatsActe } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/resultats/RMCResultatsActe";
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../../../mock/data/RMCActe";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import request from "superagent";
const superagentMock = require("superagent-mock")(request, configEtatcivil);

test("renders Resultat Acte Recherche Multi Critères => Avec résultat", () => {
  const { getAllByText } = render(
    <RMCResultatsActe
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
    />
  );

  const rose = getAllByText("ROSE");
  expect(rose).toHaveLength(2);
});

test("Ouverture d'un acte", async () => {
  global.open = () => {
    return { ...window };
  };
  global.close = jest.fn();

  const { getByTestId } = render(
    <RMCResultatsActe
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
    />
  );

  const ligne = getByTestId("d8708d77-a359-4553-be72-1eb5f246d4da");

  act(() => {
    fireEvent.click(ligne);
  });

  const titreBandeau = "ACTE D'ABSENCE N° 1921 - 413";
  const titreAccordeaon = "Résumé de l'acte";

  await waitFor(() => {
    const numero = screen.getByText(titreBandeau);
    expect(numero).toBeDefined();

    const vue = screen.getByText(titreAccordeaon);
    expect(vue).toBeDefined();
  });

  act(() => {
    const event = new CustomEvent("beforeunload");
    window.top.dispatchEvent(event);
  });

  await waitFor(() => {
    const numero = screen.queryByText(titreBandeau);
    expect(numero).toBeNull();

    const vue = screen.queryByText(titreAccordeaon);
    expect(vue).toBeNull();
  });
});
