import {
  InscriptionRcUtil,
  TypeInscriptionRc
} from "../../../model/etatcivil/InscriptionRc";

test("TypeNature model", () => {
  expect(InscriptionRcUtil.getLibelle(TypeInscriptionRc.CADUCITE)).toBe(
    "Caducité"
  );

  expect(InscriptionRcUtil.getLibelle()).toBe("Autre");
});
