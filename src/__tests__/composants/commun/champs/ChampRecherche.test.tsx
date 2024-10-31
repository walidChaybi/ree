import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { OPTION_VIDE, Option } from "@util/Type";
import { Form, Formik } from "formik";
import { expect, test, vi } from "vitest";
import ChampRecherche from "../../../../composants/commun/champs/ChampRecherche";

const onChange = vi.fn();
const onInput = vi.fn();
const options: Option[] = [
  { cle: "k1", libelle: "str1" },
  { cle: "k2", libelle: "str2" }
];
const MockForm = ({ initialValues }: any) => (
  <Formik
    initialValues={initialValues}
    onSubmit={() => {}}
  >
    <Form>
      <ChampRecherche
        name="autocomplete"
        options={options}
        onChange={onChange}
        onInput={onInput}
      />
    </Form>
  </Formik>
);

// Pour un test du composant dans un formulaire voir RegistreActeFiltre.test.tsx
test("Attendu: composant ChampRecherche fonctionne correctement", () => {
  render(<MockForm initialValues={{ autocomplete: OPTION_VIDE }} />);

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByTestId("inputChampRecherche");
  const iconeCroix = screen.getByTitle("Vider le champ");

  waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
    expect(iconeCroix).toBeDefined();
  });

  autocomplete.focus();

  fireEvent.change(inputChampRecherche, {
    target: {
      value: "s"
    }
  });

  waitFor(() => {
    expect(screen.getByText("str1")).toBeDefined();
    expect(screen.getByText("str2")).toBeDefined();
    expect(onInput).toBeCalled();
    expect(onChange).not.toBeCalled();
  });

  fireEvent.keyDown(inputChampRecherche, { key: "ArrowDown" });
  fireEvent.keyDown(inputChampRecherche, { key: "Enter" });

  waitFor(() => {
    expect(onChange).toBeCalled();
  });

  fireEvent.click(iconeCroix);
  waitFor(() => {
    expect(inputChampRecherche).toBeNull();
  });
});
