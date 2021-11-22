import {
  InscriptionRcUtil,
  TypeInscriptionRc
} from "../../../model/etatcivil/enum/TypeInscriptionRc";

test("TypeNature model", () => {
  expect(InscriptionRcUtil.getLibelle(TypeInscriptionRc.CADUCITE)).toBe(
    "Caducité"
  );

  expect(InscriptionRcUtil.getLibelle()).toBe("");
});
