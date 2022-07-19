import { sexeObligatoireValidation } from "./../../../../../views/common/composant/formulaire/validation/SexeObligatoireValidation";
import { IParentNaissanceForm } from "./../../../../../views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/mapping/mappingActeVerFormulaireSaisirExtrait";
test("Attendu: sexeObligatoireValidation fonctionne correctement", () => {
  const createError = jest.fn(() => "erreur");
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
