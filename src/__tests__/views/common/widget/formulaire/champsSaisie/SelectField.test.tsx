import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Options } from "@util/Type";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { Formik } from "formik";
import { expect, test, vi } from "vitest";

// Pour un test du composant dans un formulaire voir RegistreActeFiltre.test.tsx
test("Attendu: composant SelectField fonctionne correctement", () => {
  const onChange = vi.fn();
  const options: Options = [
    { cle: "k1", libelle: "str1" },
    { cle: "k2", libelle: "str2" }
  ];
  const formik = {} as FormikComponentProps;
  render(
    <Formik initialValues={{ gt: "gfr" }} onSubmit={vi.fn()}>
      <SelectField
        name="testSelectField"
        options={options}
        onChange={onChange}
        label="testSelectField"
        formik={formik.formik}
      />
    </Formik>
  );

  const select = screen.getByTestId("testSelectField") as HTMLSelectElement;

  expect(select).toBeDefined();

  fireEvent.change(select, {
    target: {
      value: "k1"
    }
  });

    waitFor(() => {
      expect(select.value).toBe("k1");
    });
});
