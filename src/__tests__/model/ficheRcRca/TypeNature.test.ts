import {
  NatureFicheUtil,
  TypeNatureFiche
} from "../../../model/etatcivil/Nature";

test("TypeNature model", () => {
  expect(NatureFicheUtil.getLibelle(TypeNatureFiche.CURATELLE_AMENAGEE)).toBe(
    "Curatelle aménagée"
  );

  expect(NatureFicheUtil.getLibelle()).toBe("");
});
