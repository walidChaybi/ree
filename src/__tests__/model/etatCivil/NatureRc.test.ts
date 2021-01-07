import {
  NatureFicheRcUtil,
  TypeNatureFicheRc
} from "../../../model/etatcivil/NatureRc";

test("Nature model getLibelle", () => {
  expect(NatureFicheRcUtil.getLibelle()).toBe("");
  expect(
    NatureFicheRcUtil.getLibelle(TypeNatureFicheRc.CURATELLE_AMENAGEE)
  ).toBe("Curatelle aménagée");
  expect(NatureFicheRcUtil.getLibelle("toto")).toBeUndefined();
});
