import {
  NatureFicheRcaUtil,
  TypeNatureFicheRca
} from "../../../model/etatcivil/enum/TypeNatureFicheRca";

test("Nature model getLibelle", () => {
  expect(NatureFicheRcaUtil.getLibelle()).toBe("");
  expect(
    NatureFicheRcaUtil.getLibelle(TypeNatureFicheRca.ADOPTION_SIMPLE)
  ).toBe("Adoption simple");
  expect(NatureFicheRcaUtil.getLibelle("toto")).toBeUndefined();
});
