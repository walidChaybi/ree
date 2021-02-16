import { AutresNoms } from "../../../../model/etatcivil/enum/AutresNoms";

test("enum autre nom", () => {
  expect(AutresNoms.isAutre(AutresNoms.getEnumFor("AUTRE"))).toBeTruthy();
  expect(AutresNoms.isAutre(AutresNoms.getEnumFor("USAGE"))).toBeFalsy();
});
