import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampsCoordonnees from "../../../../composants/commun/champs/ChampsCoordonnees";

describe("Test du composant ChampsCoordonnees", () => {
  const afficherFormulaire = () =>
    render(
      <Formik
        initialValues={{}}
        onSubmit={() => {}}
      >
        <ChampsCoordonnees nom="contact" />
      </Formik>
    );

  test("Doit afficher correctement tous les champs du formulaire", async () => {
    await act(async () => afficherFormulaire());

    // Vérifie que tous les champs sont présents
    expect(screen.getByText("Numéro, type et nom de la voie")).toBeDefined();
    expect(screen.getByText("Lieu-dit, boite postale ou état/province (à l'étranger)")).toBeDefined();
    expect(screen.getByText("Complément d'identification du destinataire")).toBeDefined();
    expect(screen.getByText("Complément d'identification du point géographique")).toBeDefined();
    expect(screen.getByText("Code postal")).toBeDefined();
    expect(screen.getByText("Commune")).toBeDefined();
    expect(screen.getByText("Pays")).toBeDefined();
    expect(screen.getByText("Adresse courriel du requérant")).toBeDefined();
    expect(screen.getByText("Numéro téléphone du requérant")).toBeDefined();
    expect(screen.getByText("Autre adresse courriel")).toBeDefined();
    expect(screen.getByText("Autre numéro de téléphone")).toBeDefined();
  });

  test("Doit permettre la saisie des données et les valider correctement", async () => {
    await act(async () => afficherFormulaire());

    // Saisie des données valides
    const champVoie = screen.getByLabelText("Numéro, type et nom de la voie");
    const champCodePostal = screen.getByLabelText("Code postal");
    const champCommune = screen.getByLabelText("Commune");
    const champCourriel = screen.getByLabelText("Adresse courriel du requérant");
    const champTelephone = screen.getByLabelText("Numéro téléphone du requérant");

    await userEvent.type(champVoie, "42 Avenue des Tests");
    await userEvent.type(champCodePostal, "75001");
    await userEvent.type(champCommune, "Paris");
    await userEvent.type(champCourriel, "test@exemple.fr");
    await userEvent.type(champTelephone, "0123456789");

    await waitFor(() => {
      expect((champVoie as HTMLInputElement).value).toBe("42 Avenue des Tests");
      expect((champCodePostal as HTMLInputElement).value).toBe("75001");
      expect((champCommune as HTMLInputElement).value).toBe("Paris");
      expect((champCourriel as HTMLInputElement).value).toBe("test@exemple.fr");
      expect((champTelephone as HTMLInputElement).value).toBe("0123456789");
    });
  });

  test("Doit masquer certains champs en mode formulaireReduit", async () => {
    await act(async () => {
      render(
        <Formik
          initialValues={{}}
          onSubmit={() => {}}
        >
          <ChampsCoordonnees
            nom="contact"
            formulaireReduit={true}
          />
        </Formik>
      );
    });

    // Vérifie que les champs du formulaire réduit sont masqués
    expect(screen.queryByText("Adresse courriel du requérant")).toBeNull();
    expect(screen.queryByText("Numéro téléphone du requérant")).toBeNull();

    // Vérifie que les autres champs sont toujours présents
    expect(screen.getByText("Numéro, type et nom de la voie")).toBeDefined();
    expect(screen.getByText("Code postal")).toBeDefined();
    expect(screen.getByText("Commune")).toBeDefined();
  });
});
