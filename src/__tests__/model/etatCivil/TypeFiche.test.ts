import { FicheUtil, TypeFiche } from "../../../model/etatcivil/TypeFiche";

test("Nature model getLibelle", () => {
  expect(FicheUtil.getLibelle(TypeFiche.RC)).toBe("RC");
  expect(FicheUtil.isFicheRca("RCA")).toBeTruthy();
  expect(FicheUtil.isFicheRca("RC")).toBeFalsy();
});
