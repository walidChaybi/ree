import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampsNomSecable from "../../../../composants/commun/champs/ChampsNomSecable";

describe("Test du composant Champs nom sécable", () => {
  const afficherFormulaire = () =>
    render(
      <Formik
        initialValues={{ nom: "Dupont", secable: false, nom1: "", nom2: "" }}
        onSubmit={() => {}}
      >
        <ChampsNomSecable
          nom={{ name: "nom", libelle: "Nom" }}
          secable={{ name: "secable", libelle: "Sécable" }}
          nomPartie1={{ name: "nom1", libelle: "Nom 1" }}
          nomPartie2={{ name: "nom2", libelle: "Nom 2" }}
        />
      </Formik>
    );

  test("Doit afficher correctement le composant et gérer les interactions avec le nom sécable", async () => {
    await act(async () => afficherFormulaire());

    expect(screen.getByText("Nom")).toBeDefined();
    const champsNom = screen.getByDisplayValue("Dupont");
    expect(champsNom).toBeDefined();
    expect(screen.getByLabelText<HTMLInputElement>("Sécable").disabled).toBeTruthy();

    await userEvent.type(champsNom, " Test");

    await waitFor(() => {
      expect(screen.getByDisplayValue("Dupont Test")).toBeDefined();
      const champsSecable: HTMLInputElement = screen.getByLabelText("Sécable");
      expect(champsSecable.disabled).toBeFalsy();
    });

    fireEvent.click(screen.getByLabelText("Sécable"));

    await waitFor(() => {
      expect(screen.getByDisplayValue("Dupont")).toBeDefined();
      expect(screen.getByDisplayValue("Test")).toBeDefined();
    });

    await userEvent.type(champsNom, " Test2");

    await waitFor(() => {
      expect(screen.getByDisplayValue("Dupont")).toBeDefined();
      expect(screen.getByDisplayValue("Test Test2")).toBeDefined();
      expect(screen.queryByTitle("Déplacer le premier vocable")).toHaveProperty("disabled");
      const boutonDéplacerVocable = screen.getByTitle("Déplacer le dernier vocable");
      expect(boutonDéplacerVocable).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Déplacer le dernier vocable"));

    await waitFor(() => {
      const input1: HTMLInputElement = screen.getByLabelText("Nom 1");
      const input2: HTMLInputElement = screen.getByLabelText("Nom 2");

      expect(input1.value).toBe("Dupont");
      expect(input2.value).toBe("Test Test2");

      expect(screen.queryByTitle("Déplacer le dernier vocable")).toHaveProperty("disabled", true);
      const boutonDéplacerVocable = screen.getByTitle("Déplacer le premier vocable");
      expect(boutonDéplacerVocable).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Déplacer le premier vocable"));

    await waitFor(() => {
      const input1: HTMLInputElement = screen.getByLabelText("Nom 1");
      const input2: HTMLInputElement = screen.getByLabelText("Nom 2");

      expect(input1.value).toBe("Dupont Test");
      expect(input2.value).toBe("Test2");

      expect(screen.queryByTitle("Déplacer le premier vocable")).toHaveProperty("disabled", true);
    });
  });

  test("Doit désactiver l'option sécable pour un nom avec un seul vocable", async () => {
    await act(async () => afficherFormulaire());

    const champsSecable = screen.getByLabelText<HTMLInputElement>("Sécable");
    expect(champsSecable.disabled).toBeTruthy();

    fireEvent.click(champsSecable);
    await waitFor(() => {
      expect(champsSecable.checked).toBeFalsy();
    });
  });

  test("Doit correctement gérer la suppression d'un mot dans le nom complet", async () => {
    await act(async () => afficherFormulaire());

    const champsNom = screen.getByDisplayValue("Dupont");
    await userEvent.type(champsNom, " Test");

    await waitFor(() => {
      const champsSecable = screen.getByLabelText<HTMLInputElement>("Sécable");
      expect(champsSecable.disabled).toBeFalsy();
    });

    fireEvent.click(screen.getByLabelText("Sécable"));

    await waitFor(() => {
      expect(screen.getByDisplayValue("Dupont")).toBeDefined();
      expect(screen.getByDisplayValue("Test")).toBeDefined();
    });

    await userEvent.clear(champsNom);
    await userEvent.type(champsNom, "NouveauNom");

    await waitFor(() => {
      const champsSecable = screen.getByLabelText<HTMLInputElement>("Sécable");
      expect(champsSecable.disabled).toBeTruthy();
      expect(champsSecable.checked).toBeFalsy();
    });
  });
});
