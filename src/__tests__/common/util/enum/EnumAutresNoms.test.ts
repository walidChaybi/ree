import { EnumTypeAutresNoms } from "../../../../views/common/util/enum/EnumAutresNoms";

test("enum autre nom", () => {
  expect(
    EnumTypeAutresNoms.isAutre(EnumTypeAutresNoms.getEnumFor("AUTRE"))
  ).toBeTruthy();
  expect(
    EnumTypeAutresNoms.isAutre(EnumTypeAutresNoms.getEnumFor("USAGE"))
  ).toBeFalsy();
});
