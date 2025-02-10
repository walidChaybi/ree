import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { OPTION_VIDE } from "@util/Type";
import { Form, Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampRecherchePocopas from "../../../../composants/commun/champs/ChampRecherchePocopas";

describe("Test ChampRecherche", () => {
  const MockForm = ({ initialValues }: any) => (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      <Form>
        <ChampRecherchePocopas
          name="autocomplete"
          libelle="RecherchePocopa"
          optionsRecherchePocopa={{ nombreResultatsMax: 15, familleRegistre: "CSL" }}
        />
      </Form>
    </Formik>
  );

  test("La recherche pocopa fonctionne correctement", async () => {
    render(<MockForm initialValues={{ autocomplete: OPTION_VIDE }} />);

    const inputChampRecherche: HTMLInputElement = screen.getByPlaceholderText("Recherche...");

    await waitFor(() => {
      expect(inputChampRecherche).toBeDefined();
    });

    act(() => {
      inputChampRecherche.focus();
    });

    fireEvent.change(inputChampRecherche, {
      target: {
        value: "tu"
      }
    });

    await waitFor(() => {
      expect(screen.getByText("TUNIS")).toBeDefined();
    });

    fireEvent.keyDown(inputChampRecherche, { key: "ArrowDown" });
    fireEvent.keyDown(inputChampRecherche, { key: "Enter" });

    await waitFor(() => {
      expect(inputChampRecherche.value === "TUNIS").toBeTruthy();
    });
  });
});
