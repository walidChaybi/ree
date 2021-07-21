import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { HTTP_NOT_FOUND } from "../../../../api/ApiManager";
import { ReponseAppelMesRequetes } from "../../../../mock/data/EspaceDelivrance";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import {
  gereErreur,
  useGetRequeteAleatoire
} from "../../../../views/pages/espaceDelivrance/v2/hook/PrendreEnChargeAleatoirementHook";
const superagentMock = require("superagent-mock")(request, configRequetesV2);

const HookConsumerUseGetRequeteAleatoire: React.FC = () => {
  const res = useGetRequeteAleatoire(true);

  return <div>{res?.requete?.idRequete}</div>;
};

test("Attendu: PrendreEnChargeAleatoirementHook fonctionne correctement", async () => {
  render(<HookConsumerUseGetRequeteAleatoire />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(ReponseAppelMesRequetes[0].id)).toBeInTheDocument();
  });
});

test("Attendu: La gestion des erreur dans PrendreEnChargeAleatoirementHook fonctionne correctement", async () => {
  await waitFor(() => {
    const fct = jest.fn();
    const error = { response: { status: HTTP_NOT_FOUND } };
    gereErreur(error, fct);
    expect(fct).toBeCalled();
  });
});

afterAll(() => {
  superagentMock.unset();
});
