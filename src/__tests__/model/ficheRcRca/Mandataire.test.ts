import {
  MandataireUtil,
  TypeMandataire
} from "../../../model/etatcivil/enum/TypeMandataire";

test("TypeNature model", () => {
  expect(MandataireUtil.getLibelle(TypeMandataire.FAMILLE)).toBe("Famille");

  expect(MandataireUtil.getLibelle()).toBe("");
});
