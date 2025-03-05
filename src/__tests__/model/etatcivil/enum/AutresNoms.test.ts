import { AutresNoms } from "@model/etatcivil/enum/ETypeAutreNom";
import { expect, test } from "vitest";

test("enum autre nom", () => {
  expect(AutresNoms.isAutre(AutresNoms.getEnumFor("AUTRE"))).toBeTruthy();
  expect(AutresNoms.isAutre(AutresNoms.getEnumFor("USAGE"))).toBeFalsy();
});
