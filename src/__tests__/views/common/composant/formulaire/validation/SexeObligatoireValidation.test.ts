import { sexeObligatoireValidation } from "@composant/formulaire/validation/SexeObligatoireValidation";
import { IParentNaissanceForm } from "@model/form/delivrance/ISaisieExtraitForm";
import { expect, test, vi } from "vitest";
test("Attendu: sexeObligatoireValidation fonctionne correctement", () => {
  const createError = vi.fn(() => "erreur");
  const mockContext = {
    createError
  };
  expect(
    sexeObligatoireValidation(
      mockContext,
      { nomNaissance: "nom", sexe: undefined } as IParentNaissanceForm,
      { path: "" }
    )
  ).toBe("erreur");

  expect(
    sexeObligatoireValidation(
      mockContext,
      { nomNaissance: "nom", sexe: "INCONNU" } as IParentNaissanceForm,
      { path: "" }
    )
  ).toBe("erreur");

  expect(
    sexeObligatoireValidation(
      mockContext,
      { nomNaissance: "nom", sexe: "MASCULIN" } as IParentNaissanceForm,
      { path: "" }
    )
  ).toBe(true);
});
