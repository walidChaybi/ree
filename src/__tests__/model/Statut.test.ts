import {
  StatutFicheUtil,
  StatutFiche
} from "../../model/etatcivil/enum/StatutFiche";

test("Statut model getLibelle", () => {
  expect(StatutFicheUtil.getLibelle()).toBe("");
  expect(StatutFicheUtil.getLibelle(StatutFiche.ACTIF)).toBe("Actif");
  expect(StatutFicheUtil.getLibelle("toto")).toBeUndefined();
});
