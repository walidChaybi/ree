import {
  NatureFicheRcaUtil,
  TypeNatureFicheRca
} from "../../../model/etatcivil/NatureRca";

test("Nature model getLibelle", () => {
  expect(NatureFicheRcaUtil.getLibelle()).toBe("");
  expect(
    NatureFicheRcaUtil.getLibelle(TypeNatureFicheRca.ADOPTION_SIMPLE)
  ).toBe("Adoption simple");
  expect(NatureFicheRcaUtil.getLibelle("toto")).toBeUndefined();
});
