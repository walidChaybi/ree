import {
  MandataireUtil,
  TypeMandataire
} from "../../../model/ficheRcRca/Mandataires";

test("TypeNature model", () => {
  expect(MandataireUtil.getLibelle(TypeMandataire.FAMILLE)).toBe("Famille");

  expect(MandataireUtil.getLibelle()).toBe("");
});
