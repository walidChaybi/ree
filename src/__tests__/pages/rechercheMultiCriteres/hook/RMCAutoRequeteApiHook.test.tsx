import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import requeteDelivrance from "../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { useRMCAutoRequeteApiHook } from "../../../../views/pages/rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequeteApiHook";

const superagentMock = require("superagent-mock")(request, configRequetes);

const params = {
  requete: requeteDelivrance,
  range: "0-105"
};

const HookConsummerRequete: React.FC = () => {
  const { dataRMCAutoRequete } = useRMCAutoRequeteApiHook(
    params?.requete,
    params?.range
  );
  return (
    <div data-testid="idRequete">{dataRMCAutoRequete?.[0]?.idRequete}</div>
  );
};

test("Test useRMCAutoRequeteApiHook", async () => {
  await act(async () => {
    render(<HookConsummerRequete />);
  });
  await waitFor(() =>
    expect(screen.getByTestId("idRequete").textContent).toBe(
      "54ddf213-d9b7-4747-8e92-68c220f66de3"
    )
  );
});

afterAll(() => {
  superagentMock.unset();
});
