import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import request from "superagent";
import { useRMCInscriptionApiHook } from "../../../../views/pages/rechercheMultiCriteres/hook/RMCInscriptionApiHook";
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

const HookConsummerRMCInscription: React.FC = () => {
  const { dataRMCInscription } = useRMCInscriptionApiHook(criteres);

  return (
    <>
      {dataRMCInscription && dataRMCInscription.length > 0 && (
        <div data-testid="test-rmc-inscription-hook">
          {dataRMCInscription[0].id}
        </div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Inscription", async () => {
  await act(async () => {
    render(<HookConsummerRMCInscription />);
  });
  await waitFor(() => {
    expect(screen.getByTestId("test-rmc-inscription-hook").textContent).toEqual(
      "85160d6e-893b-47c2-a9a8-b25573189f0c"
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
