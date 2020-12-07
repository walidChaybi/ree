import React from "react";
import { act } from "react-dom/test-utils";
import request from "superagent";
import { configEtatcivil } from "../../../../api/mock/superagent-config/superagent-mock-etatcivil";
import { useFichePageApiHook } from "../../../../views/pages/fiche/hook/FichePageApiHook";
import { render, waitFor } from "@testing-library/react";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const HookConsummer: React.FC = () => {
  const { dataFicheState } = useFichePageApiHook(
    "rc",
    "7566e16c-2b0e-11eb-adc1-0242ac120002"
  );

  return (
    <>
      {dataFicheState && dataFicheState.dataBandeau && (
        <div data-testid={"test-fiche-hook"}>
          {dataFicheState.dataBandeau.identifiant}
        </div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummer />);

    await waitFor(() => {
      expect(getByTestId("test-fiche-hook").textContent).toEqual(
        "7566e16c-2b0e-11eb-adc1-0242ac120002"
      );
    });
  });
});

afterAll(() => {
  superagentMock.unset();
});
