import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { DataRMCRequeteAvecResultat } from "../../../../mock/data/RMCRequete";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { useRMCAutoRequeteApiHook } from "../../../../views/pages/rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequeteApiHook";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const params = {
  idRequete: "54ddf213-d9b7-4747-8e92-68c220f66de3",
  dataRequetes: DataRMCRequeteAvecResultat,
  range: "0-105"
};

const HookConsummerRequete: React.FC = () => {
  const { dataRMCAutoRequete } = useRMCAutoRequeteApiHook(
    params?.idRequete,
    params?.dataRequetes,
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
