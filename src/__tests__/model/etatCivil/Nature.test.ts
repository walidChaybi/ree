import {
  NatureFicheUtil,
  TypeNatureFiche
} from "../../../model/etatcivil/Nature";

test("Nature model getLibelle", () => {
  expect(NatureFicheUtil.getLibelle()).toBe("");
  expect(NatureFicheUtil.getLibelle(TypeNatureFiche.CURATELLE_AMENAGEE)).toBe(
    "Curatelle aménagée"
  );
  expect(NatureFicheUtil.getLibelle("toto")).toBeUndefined();
});
