import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import request from "superagent";
import { useRMCActeApiHook } from "../../../../views/pages/rechercheMultiCriteres/hook/RMCActeApiHook";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const criteres = {
  titulaire: {
    nom: "Nom",
    prenom: "Prénom",
    paysNaissance: "France",
    dateNaissance: { jour: "10", mois: "01", annee: "2020" }
  }
};

const HookConsummerRMCActe: React.FC = () => {
  const { dataRMCActe } = useRMCActeApiHook(criteres);

  return (
    <>
      {dataRMCActe && dataRMCActe.length > 0 && (
        <div data-testid="test-rmc-acte-hook">{dataRMCActe[0].id}</div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Acte", async () => {
  await act(async () => {
    render(<HookConsummerRMCActe />);
  });
  await waitFor(() => {
    expect(screen.getByTestId("test-rmc-acte-hook").textContent).toEqual(
      "2748bb45-22cd-41ea-90db-0483b8ffc892"
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
