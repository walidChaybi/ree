import { DoubleSubmitUtil } from "../../../views/common/util/DoubleSubmitUtil";

test("Attendu: DoubleSubmitUtil fonctionne correctement", () => {
  const element: any = {};
  DoubleSubmitUtil.eviteDoubleSubmit(element);
  expect(element.onclick).not.toBeNull();

  DoubleSubmitUtil.remetPossibiliteDoubleSubmit(element);
  expect(element.onclick).toBeNull();
});
