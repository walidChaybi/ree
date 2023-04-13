import { DoubleSubmitUtil } from "@util/DoubleSubmitUtil";

test("Attendu: DoubleSubmitUtil fonctionne correctement", () => {
  const element: any = {};
  DoubleSubmitUtil.desactiveOnClick(element);
  expect(element.onclick).not.toBeNull();

  DoubleSubmitUtil.reactiveOnClick(element);
  expect(element.onclick).toBeNull();
});
