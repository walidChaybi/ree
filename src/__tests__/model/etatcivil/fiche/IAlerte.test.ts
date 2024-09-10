import {
  A_NE_PAS_DELIVRER,
  DESCRIPTION_SAGA
} from "@model/etatcivil/enum/TypeAlerte";
import { Alerte, IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { expect, test } from "vitest";

test("test estDeTypeANePasDelivrer à true", () => {
  const alerte = {
    type: {
      type: A_NE_PAS_DELIVRER
    }
  } as IAlerte;

  expect(Alerte.estDeTypeANePasDelivrer(alerte)).toBe(true);
});

test("test estDeTypeANePasDelivrer à false", () => {
  const alerte = {
    type: {
      type: DESCRIPTION_SAGA
    }
  } as IAlerte;

  expect(Alerte.estDeTypeANePasDelivrer(alerte)).toBe(false);
});
