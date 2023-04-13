import {
  TypeDecision,
  TypeDecisionUtil
} from "@model/etatcivil/enum/TypeDecision";

test("TypeDecision model", () => {
  expect(TypeDecisionUtil.isJugement(TypeDecision.JUGEMENT)).toBe(true);
  expect(TypeDecisionUtil.isJugement(TypeDecision.ARRET)).toBe(false);
  expect(TypeDecisionUtil.isJugement(TypeDecision.CONVENTION)).toBe(false);
  expect(TypeDecisionUtil.isJugement(TypeDecision.ACTE_NOTARIE)).toBe(false);

  expect(TypeDecisionUtil.getLibelle(TypeDecision.JUGEMENT)).toBe("Jugement");

  expect(TypeDecisionUtil.getLibelle()).toBe("");
});
