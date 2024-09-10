import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { useFichePageApiHook } from "@pages/fiche/hook/FichePageApiHook";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

const HookConsummerRc: React.FC = () => {
  const { dataFicheState } = useFichePageApiHook(
    false,
    TypeFiche.RC,
    "7566e16c-2b0e-11eb-adc1-0242ac120002"
  );

  return (
    <>
      {dataFicheState && dataFicheState.data && (
        <div data-testid={"test-fiche-hook"}>{dataFicheState.data.id}</div>
      )}
    </>
  );
};

const HookConsummerRca: React.FC = () => {
  const { dataFicheState } = useFichePageApiHook(
    false,
    TypeFiche.RCA,
    "135e4dfe-9757-4d5d-8715-359c6e73289b"
  );

  return (
    <>
      {dataFicheState && dataFicheState.data && (
        <div data-testid={"test-fiche-hook-rca"}>{dataFicheState.data.id}</div>
      )}
    </>
  );
};

const HookConsummerPacs: React.FC = () => {
  const { dataFicheState } = useFichePageApiHook(
    false,
    TypeFiche.PACS,
    "89c9d030-26c3-41d3-bdde-8b4dcc0420e0"
  );

  return (
    <>
      {dataFicheState && dataFicheState.data && (
        <div data-testid={"test-fiche-hook-pacs"}>{dataFicheState.data.id}</div>
      )}
    </>
  );
};

const HookConsummerActe: React.FC = () => {
  const { dataFicheState } = useFichePageApiHook(
    false,
    TypeFiche.ACTE,
    "b41079a5-9e8d-478c-b04c-c4c2ac67134f"
  );

  return (
    <>
      {dataFicheState && dataFicheState.data && (
        <div data-testid={"test-fiche-hook-acte"}>{dataFicheState.data.id}</div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour une fiche rc", () => {
  const { getByTestId } = render(<HookConsummerRc />);

  waitFor(() => {
    expect(getByTestId("test-fiche-hook").textContent).toEqual(
      "7566e16c-2b0e-11eb-adc1-0242ac120002"
    );
  });
});

test("l'appel au WS fonctionne correctement pour une fiche rca", () => {
  const { getByTestId } = render(<HookConsummerRca />);

  waitFor(() => {
    expect(getByTestId("test-fiche-hook-rca").textContent).toEqual(
      "135e4dfe-9757-4d5d-8715-359c6e73289b"
    );
  });
});

test("l'appel au WS fonctionne correctement pour une fiche pacs", () => {
  const { getByTestId } = render(<HookConsummerPacs />);
  waitFor(() => {
    expect(getByTestId("test-fiche-hook-pacs").textContent).toEqual(
      "89c9d030-26c3-41d3-bdde-8b4dcc0420e0"
    );
  });
});

test("l'appel au WS fonctionne correctement pour une fiche acte", () => {
  const { getByTestId } = render(<HookConsummerActe />);

  waitFor(() => {
    expect(getByTestId("test-fiche-hook-acte").textContent).toEqual(
      "b41079a5-9e8d-478c-b04c-c4c2ac67134f"
    );
  });
});


