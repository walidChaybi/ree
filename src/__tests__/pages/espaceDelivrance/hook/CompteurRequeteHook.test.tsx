import React from "react";
import { act } from "react-dom/test-utils";
import request from "superagent";
import { configRequetes } from "../../../../api/mock/superagent-config/superagent-mock-requetes";
import connectedUser from "../../../../api/mock/data/connectedUser.json";
import { useCompteurRequeteHook } from "../../../../views/pages/espaceDelivrance/hook/CompteurRequeteHook";
import { render, waitFor } from "@testing-library/react";

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
