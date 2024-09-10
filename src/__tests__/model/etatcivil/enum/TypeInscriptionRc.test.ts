import {
  InscriptionRcUtil,
  TypeInscriptionRc
} from "@model/etatcivil/enum/TypeInscriptionRc";
import { expect, test } from "vitest";

test("TypeNature model", () => {
  expect(InscriptionRcUtil.getLibelle(TypeInscriptionRc.CADUCITE)).toBe(
    "Caducité"
  );

  expect(InscriptionRcUtil.getLibelle()).toBe("");
});
