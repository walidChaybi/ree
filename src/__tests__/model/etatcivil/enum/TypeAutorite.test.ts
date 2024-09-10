import {
  TypeAutorite,
  TypeAutoriteUtil
} from "@model/etatcivil/enum/TypeAutorite";
import { expect, test } from "vitest";

test("TypeAutorite model", () => {
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.NOTAIRE)).toBe(false);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION)).toBe(true);

  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.NOTAIRE)).toBe(true);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION)).toBe(false);

  expect(TypeAutoriteUtil.getLibelle(TypeAutorite.JURIDICTION)).toBe(
    "Juridiction"
  );

  expect(TypeAutoriteUtil.getLibelle()).toBe("");

  expect(TypeAutoriteUtil.isOnac(TypeAutorite.ONAC)).toBe(true);

  expect(TypeAutoriteUtil.isOnac(TypeAutorite.NOTAIRE)).toBe(false);
});
