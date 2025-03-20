import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampNationalite from "../../../../composants/commun/champs/ChampNationalite";

describe("Test du composant ChampNationalite", () => {
  const valeurInitiale = { nationalite: { nationalitesAffichees: 1, nationalite1: "française", nationalite2: "", nationalite3: "" } };

  const afficherChampNationalite = (props = {}) => {
    return render(
      <Formik
        initialValues={valeurInitiale}
        onSubmit={() => {}}
      >
        <ChampNationalite
          nom="nationalite"
          libelle="Nationalité"
          {...props}
        />
      </Formik>
    );
  };

  test("Doit afficher correctement les champs nationalités", async () => {
    await act(async () => afficherChampNationalite());

    const boutonAjout: HTMLButtonElement = screen.getByTitle("Ajouter une nationalité");

    const champNationalite = screen.getByLabelText("Nationalité");
    expect(champNationalite).toBeDefined();
    expect((champNationalite as HTMLInputElement).value).toBe("française");

    await act(() => userEvent.click(boutonAjout));

    expect(screen.getByLabelText("Nationalité 1")).toBeDefined();
    expect(screen.getByLabelText("Nationalité 2")).toBeDefined();

    await act(() => userEvent.click(boutonAjout));

    expect(screen.getByLabelText("Nationalité 3")).toBeDefined();
    expect(boutonAjout.disabled).toBeTruthy();
  });

  test("Doit être désactivé quand la propriété desactive est true", async () => {
    await act(async () => afficherChampNationalite({ desactive: true }));

    const champNationalite = screen.getByLabelText("Nationalité");
    expect(champNationalite.getAttribute("disabled")).not.toBeNull();
  });

  test("Doit permettre la saisie de données", async () => {
    await act(async () => afficherChampNationalite());

    const champNationalite = screen.getByLabelText("Nationalité");
    fireEvent.change(champNationalite, { target: { value: "italienne" } });

    await waitFor(() => {
      expect((champNationalite as HTMLInputElement).value).toBe("italienne");
    });
  });
});
