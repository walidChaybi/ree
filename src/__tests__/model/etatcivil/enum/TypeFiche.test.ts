import { FicheUtil, TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { expect, test } from "vitest";

test("Attendu: FicheUtil fonctionne correctement", () => {
  expect(FicheUtil.getLibelle(TypeFiche.RC)).toBe("RC");
  expect(FicheUtil.isFicheRca(TypeFiche.RCA)).toBeTruthy();
  expect(FicheUtil.isFicheRca(TypeFiche.RC)).toBeFalsy();

  expect(FicheUtil.isActe("acte")).toBe(true);
  expect(FicheUtil.isActe("ACTE")).toBe(true);
  expect(FicheUtil.isActe("Acte")).toBe(true);
  expect(FicheUtil.isActe("Actes")).toBe(false);

  expect(FicheUtil.getTypeFicheFromString("rc")).toBe(TypeFiche.RC);
  expect(FicheUtil.getTypeFicheFromString("Rca")).toBe(TypeFiche.RCA);
  expect(FicheUtil.getTypeFicheFromString("PACS")).toBe(TypeFiche.PACS);
  expect(FicheUtil.getTypeFicheFromString("acte")).toBe(TypeFiche.ACTE);
});
