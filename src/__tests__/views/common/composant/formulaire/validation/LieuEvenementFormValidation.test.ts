import { valideCompletudeLieu } from "@composant/formulaire/validation/LieuEvenementFormValidation";
test("Attendu: la validation du formulaire LieuEvenementForm fonctionne correctement", () => {
  const mockFormik = {
    getFieldProps(): any {
      return "";
    }
  };
  expect(valideCompletudeLieu(mockFormik, "lieuComplet", "", "")).toBe(
    "Au moins un des champs est obligatoire"
  );
  expect(valideCompletudeLieu(mockFormik, "ville", "", "")).toBe(
    "Au moins un des champs est obligatoire"
  );
  expect(valideCompletudeLieu(mockFormik, "regionDepartement", "", "")).toBe(
    "Au moins un des champs est obligatoire"
  );
  expect(valideCompletudeLieu(mockFormik, "pays", "", "")).toBe(
    "Au moins un des champs est obligatoire"
  );

  mockFormik.getFieldProps = function () {
    return { value: "non vide" };
  };

  expect(
    valideCompletudeLieu(mockFormik, "lieuComplet", "", "")
  ).toBeUndefined();
  expect(valideCompletudeLieu(mockFormik, "ville", "", "")).toBeUndefined();
  expect(
    valideCompletudeLieu(mockFormik, "regionDepartement", "", "")
  ).toBeUndefined();
  expect(valideCompletudeLieu(mockFormik, "pays", "", "")).toBeUndefined();
});
