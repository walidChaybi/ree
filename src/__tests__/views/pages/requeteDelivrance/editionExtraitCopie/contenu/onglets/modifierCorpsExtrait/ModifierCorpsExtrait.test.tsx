import { corpsNonModifieOuCorpsVide } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/modifierCorpsExtrait/ModifierCorpsExtrait";
import { expect, test } from "vitest";

test("corpsNonModifieOuCorpsVide", () => {
  expect(corpsNonModifieOuCorpsVide("", "rfr")).toBeTruthy();
  expect(corpsNonModifieOuCorpsVide("frrr", "rfr")).toBeFalsy();
});
