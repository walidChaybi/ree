import { ETypeAutorite, TypeAutoriteUtil } from "@model/etatcivil/enum/TypeAutorite";
import { expect, test } from "vitest";

test("TypeAutorite model", () => {
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.NOTAIRE)).toBe(false);
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.JURIDICTION)).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(ETypeAutorite.JURIDICTION)).toBe(true);

  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.NOTAIRE)).toBe(true);
  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.JURIDICTION)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(ETypeAutorite.JURIDICTION)).toBe(false);

  expect(TypeAutoriteUtil.getLibelle(ETypeAutorite.JURIDICTION)).toBe("Juridiction");

  expect(TypeAutoriteUtil.getLibelle()).toBe("");

  expect(TypeAutoriteUtil.isOnac(ETypeAutorite.ONAC)).toBe(true);

  expect(TypeAutoriteUtil.isOnac(ETypeAutorite.NOTAIRE)).toBe(false);
});
