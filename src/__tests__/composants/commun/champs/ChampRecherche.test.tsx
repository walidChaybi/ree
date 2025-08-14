import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { OPTION_VIDE, Option } from "@util/Type";
import { Form, Formik } from "formik";
import { act } from "react";
import { describe, expect, test, vi } from "vitest";
import ChampRecherche from "../../../../composants/commun/champs/ChampRecherche";

describe("Test ChampRecherche", () => {
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
  test("Attendu: composant ChampRecherche fonctionne correctement", async () => {
    render(<MockForm initialValues={{ autocomplete: OPTION_VIDE }} />);

    const autocomplete = screen.getByTestId("autocomplete");
    const inputChampRecherche: HTMLInputElement = screen.getByTestId("inputChampRecherche");
    const iconeCroix = screen.getByLabelText("Vider le champ");

    await waitFor(() => {
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

    await waitFor(() => {
      expect(screen.getByText("str1")).toBeDefined();
      expect(screen.getByText("str2")).toBeDefined();
      expect(onInput).toBeCalled();
      expect(onChange).not.toBeCalled();
    });

    fireEvent.keyDown(inputChampRecherche, { key: "ArrowDown" });
    fireEvent.keyDown(inputChampRecherche, { key: "Enter" });

    await waitFor(() => {
      expect(onChange).toBeCalled();
    });

    act(() => fireEvent.click(iconeCroix));

    await waitFor(() => {
      expect(inputChampRecherche.value).toBe("");
    });
  });
});
