import { StatutUtil, Statut } from "../../model/Statut";

test("Statut model getLibelle", () => {
  expect(StatutUtil.getLibelle()).toBe("");
  expect(StatutUtil.getLibelle(Statut.ACTIF)).toBe("Actif");
  expect(StatutUtil.getLibelle("toto")).toBeUndefined();
});
