import { corpsNonModifierOuCorpsVide } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/modifierCorpsExtrait/ModifierCorpsExtrait";
import { expect, test } from "vitest";

test("corpsNonModifierOuCorpsVide", () => {
  expect(corpsNonModifierOuCorpsVide("", "rfr")).toBeTruthy();
  expect(corpsNonModifierOuCorpsVide("frrr", "rfr")).toBeFalsy();
});
