import {
  DecisionUtil,
  TypeDecision
} from "../../../model/ficheRcRca/TypeDecision";

test("TypeDecision model", () => {
  expect(DecisionUtil.isJugement(TypeDecision.JUGEMENT)).toBe(true);
  expect(DecisionUtil.isJugement(TypeDecision.ARRET)).toBe(false);
  expect(DecisionUtil.isJugement(TypeDecision.CONVENTION)).toBe(false);
  expect(DecisionUtil.isJugement(TypeDecision.ACTE_NOTARIE)).toBe(false);

  expect(DecisionUtil.getLibelle(TypeDecision.JUGEMENT)).toBe("Jugement");

  expect(DecisionUtil.getLibelle()).toBe("");
});
