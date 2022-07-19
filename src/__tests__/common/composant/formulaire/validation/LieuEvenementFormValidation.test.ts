import { valideLieu } from "./../../../../../views/common/composant/formulaire/validation/LieuEvenementFormValidation";
test("Attendu: la validation du formulaire LieuEvenementForm fonctionne correctement", () => {
  const mockFormik = {
    getFieldProps(): any {
      return "";
    }
  };
  expect(valideLieu(mockFormik, "lieuComplet", "", "")).toBe(
    "Au moins un des champs est obligatoire"
  );
  expect(valideLieu(mockFormik, "ville", "", "")).toBe(
    "Au moins un des champs est obligatoire"
  );
  expect(valideLieu(mockFormik, "regionDepartement", "", "")).toBe(
    "Au moins un des champs est obligatoire"
  );
  expect(valideLieu(mockFormik, "pays", "", "")).toBe(
    "Au moins un des champs est obligatoire"
  );

  mockFormik.getFieldProps = function () {
    return { value: "non vide" };
  };

  expect(valideLieu(mockFormik, "lieuComplet", "", "")).toBeUndefined();
  expect(valideLieu(mockFormik, "ville", "", "")).toBeUndefined();
  expect(valideLieu(mockFormik, "regionDepartement", "", "")).toBeUndefined();
  expect(valideLieu(mockFormik, "pays", "", "")).toBeUndefined();
});
