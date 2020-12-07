import React from "react";
import request from "superagent";
import connectedUser from "../../../../mock/data/connectedUser.json";
import { useCompteurRequeteHook } from "../../../../views/pages/espaceDelivrance/hook/CompteurRequeteHook";
import { render, waitFor, act } from "@testing-library/react";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

const off = { idSSO: connectedUser.id_sso, ...connectedUser };

const superagentMock = require("superagent-mock")(request, configRequetes);

const HookConsummer: React.FC = () => {
  const { nombreRequetesState } = useCompteurRequeteHook(off);

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
