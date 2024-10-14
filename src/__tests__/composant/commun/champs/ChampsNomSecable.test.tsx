import { fireEvent, render, screen } from "@testing-library/react";
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

  test("Affichage du composant nom sécable", async () => {
    afficherFormulaire();

    expect(screen.getByText("Nom")).toBeDefined();
    const champsNom = screen.getByDisplayValue("Dupont");
    expect(champsNom).toBeDefined();
    expect(
      (screen.getByLabelText("Sécable") as HTMLInputElement).disabled // NOSONAR typage obligatoire
    ).toBeTruthy();

    await userEvent.type(champsNom, " Test");

    expect(screen.getByDisplayValue("Dupont Test")).toBeDefined();
    const champsSecable = screen.getByLabelText("Sécable") as HTMLInputElement; // NOSONAR typage obligatoire
    expect(champsSecable.disabled).toBeFalsy();

    fireEvent.click(champsSecable);

    expect(screen.getByDisplayValue("Dupont")).toBeDefined();
    expect(screen.getByDisplayValue("Test")).toBeDefined();

    await userEvent.type(champsNom, " Test2");

    expect(screen.getByDisplayValue("Dupont")).toBeDefined();
    expect(screen.getByDisplayValue("Test Test2")).toBeDefined();

    expect(screen.queryByTitle("Descendre la dernière vocable")).toBeNull();
    const boutonRemonterVocable = screen.getByTitle(
      "Remonter la première vocable"
    );
    expect(boutonRemonterVocable).toBeDefined();

    fireEvent.click(boutonRemonterVocable);

    expect(screen.getByDisplayValue("Dupont Test")).toBeDefined();
    expect(screen.getByDisplayValue("Test2")).toBeDefined();
    expect(screen.queryByTitle("Remonter la première vocable")).toBeNull();
    const boutonDescendreVocable = screen.getByTitle(
      "Descendre la dernière vocable"
    );
    expect(boutonDescendreVocable).toBeDefined();

    fireEvent.click(boutonDescendreVocable);

    expect(screen.getByDisplayValue("Dupont")).toBeDefined();
    expect(screen.getByDisplayValue("Test Test2")).toBeDefined();
  });
});
