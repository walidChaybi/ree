import React from "react";
import { act } from "react-dom/test-utils";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { useFichePageApiHook } from "../../../../views/pages/fiche/hook/FichePageApiHook";
import { render, waitFor } from "@testing-library/react";
import { TypeFiche } from "../../../../model/etatcivil/TypeFiche";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const HookConsummerRc: React.FC = () => {
  const { dataFicheState } = useFichePageApiHook(
    TypeFiche.RC,
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

const HookConsummerRca: React.FC = () => {
  const { dataFicheState } = useFichePageApiHook(
    TypeFiche.RCA,
    "135e4dfe-9757-4d5d-8715-359c6e73289b"
  );

  return (
    <>
      {dataFicheState && dataFicheState.dataBandeau && (
        <div data-testid={"test-fiche-hook-rca"}>
          {dataFicheState.dataBandeau.identifiant}
        </div>
      )}
    </>
  );
};

const HookConsummerPacs: React.FC = () => {
  const { dataFicheState } = useFichePageApiHook(
    TypeFiche.PACS,
    "89c9d030-26c3-41d3-bdde-8b4dcc0420e0"
  );

  return (
    <>
      {dataFicheState && dataFicheState.dataBandeau && (
        <div data-testid={"test-fiche-hook-pacs"}>
          {dataFicheState.dataBandeau.identifiant}
        </div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour une fiche rc", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerRc />);

    await waitFor(() => {
      expect(getByTestId("test-fiche-hook").textContent).toEqual(
        "7566e16c-2b0e-11eb-adc1-0242ac120002"
      );
    });
  });
});

test("l'appel au WS fonctionne correctement pour une fiche rca", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerRca />);

    await waitFor(() => {
      expect(getByTestId("test-fiche-hook-rca").textContent).toEqual(
        "135e4dfe-9757-4d5d-8715-359c6e73289b"
      );
    });
  });
});

test("l'appel au WS fonctionne correctement pour une fiche pacs", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerPacs />);
    await waitFor(() => {
      expect(getByTestId("test-fiche-hook-pacs").textContent).toEqual(
        "89c9d030-26c3-41d3-bdde-8b4dcc0420e0"
      );
    });
  });
});

afterAll(() => {
  superagentMock.unset();
});
