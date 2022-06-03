import { corpsNonModifierOuCorpsVide } from "../../../../views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/modifierCorpsExtrait/ModifierCorpsExtrait";

test("corpsNonModifierOuCorpsVide", () => {
  expect(corpsNonModifierOuCorpsVide("", "rfr")).toBeTruthy();
  expect(corpsNonModifierOuCorpsVide("frrr", "rfr")).toBeFalsy();
});
