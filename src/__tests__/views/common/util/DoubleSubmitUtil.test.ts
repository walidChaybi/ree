import { DoubleClicUtil } from "@util/DoubleClicUtil";

test("DOIT être non cliquable QUAND on désactive le clique", () => {
  const element: any = {};
  DoubleClicUtil.desactiveOnClick(element);
  expect(element.onclick).not.toBeNull();

  DoubleClicUtil.reactiveOnClick(element);
  expect(element.onclick).toBeNull();
});
