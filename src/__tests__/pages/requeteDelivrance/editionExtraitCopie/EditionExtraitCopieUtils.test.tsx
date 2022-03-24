import { checkDirty } from "../../../../views/pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopieUtils";

test("checkDirty", () => {
  window.confirm = () => true;
  expect(checkDirty(true, jest.fn())).toBeTruthy();
  window.confirm = () => false;
  expect(checkDirty(true, jest.fn())).toBeFalsy();
});
