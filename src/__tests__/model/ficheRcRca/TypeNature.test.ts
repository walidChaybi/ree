import {
  NatureFicheRcUtil,
  TypeNatureFicheRc
} from "../../../model/etatcivil/enum/TypeNatureFicheRc";

test("TypeNature model", () => {
  expect(
    NatureFicheRcUtil.getLibelle(TypeNatureFicheRc.CURATELLE_AMENAGEE)
  ).toBe("Curatelle aménagée");

  expect(NatureFicheRcUtil.getLibelle()).toBe("");
});
