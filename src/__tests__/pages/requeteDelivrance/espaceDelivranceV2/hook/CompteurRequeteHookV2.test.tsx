import { act, render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { useCompteurRequeteHook } from "../../../../../views/pages/requeteDelivrance/espaceDelivrance/v2/hook/CompteurRequeteHookV2";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const HookConsummer: React.FC = () => {
  const { nombreRequetesState } = useCompteurRequeteHook(false);

  return <div data-testid={"test-compteur-requete"}>{nombreRequetesState}</div>;
};

test("l'appel au WS du compteur de requêtes à signer fonctionne correctement", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummer />);

    await waitFor(() =>
      expect(getByTestId("test-compteur-requete").textContent).toBe("20")
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
