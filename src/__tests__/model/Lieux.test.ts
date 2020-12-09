import { LieuxUtils } from "../../model/Lieux";

test("Lieux model", () => {
  expect(LieuxUtils.isPaysFrance("france")).toBe(true);
  expect(LieuxUtils.isVilleParis("paris")).toBe(true);
  expect(LieuxUtils.isVilleAvecArrondissement("paris")).toBe(true);
  expect(LieuxUtils.isVilleAvecArrondissement("lyon")).toBe(true);
  expect(LieuxUtils.isVilleAvecArrondissement("nantes")).toBe(false);
  expect(LieuxUtils.isVilleAvecArrondissement("Marseille")).toBe(true);
});
