import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocParent from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocParent";
/** TODO: Réparation des TU le Lundi 31 Mars @ Adrien_Bonvin */

describe.skip("BlocParents", () => {
  const renderComponent = () => {
    return render(
      <Formik
        initialValues={{
          parents: {
            parent1: {
              sexe: "Masculin",
              nom: "",
              prenoms: {},
              dateNaissance: undefined,
              lieuNaissance: { typeLieu: "" },
              sansProfession: false,
              domicile: { typeLieu: "" },
              renseignerAge: false,
              age: ""
            },
            parent2: {
              sexe: "Feminin",
              nom: "",
              prenoms: {},
              dateNaissance: undefined,
              lieuNaissance: { typeLieu: "" },
              sansProfession: false,
              domicile: { typeLieu: "" },
              renseignerAge: false,
              age: ""
            }
          }
        }}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        <>
          <BlocParent estparent1 />
          <BlocParent />
        </>
      </Formik>
    );
  };

  describe("Tests d'affichage initial", () => {
    test("doit afficher les formulaires des deux parents avec les champs appropriés", () => {
      renderComponent();
      // Vérification des titres
      expect(screen.getByText("Parent 1")).toBeDefined();
      expect(screen.getByText("Parent 2")).toBeDefined();

      const dateFields1 = {
        jour: screen.getAllByPlaceholderText("JJ")[0],
        mois: screen.getAllByPlaceholderText("MM")[0],
        annee: screen.getAllByPlaceholderText("AAAA")[0]
      };
      const dateFields2 = {
        jour: screen.getAllByPlaceholderText("JJ")[1],
        mois: screen.getAllByPlaceholderText("MM")[1],
        annee: screen.getAllByPlaceholderText("AAAA")[1]
      };

      // Vérifier que tous les champs de date sont présents
      Object.values(dateFields1).forEach(field => expect(field).toBeDefined());
      Object.values(dateFields2).forEach(field => expect(field).toBeDefined());

      // Vérification des cases à cocher "Saisir l'âge" pour chaque parent
      expect(screen.getByLabelText("Saisir l'âge", { selector: 'input[name="parents.parent1.renseignerAge"]' })).toBeDefined();
      expect(screen.getByLabelText("Saisir l'âge", { selector: 'input[name="parents.parent2.renseignerAge"]' })).toBeDefined();
    });
  });

  describe("Tests de saisie des informations de base", () => {
    test("doit gérer la sélection du sexe", async () => {
      renderComponent();
      const femininRadio = screen.getAllByLabelText("Féminin")[0] as HTMLInputElement;
      fireEvent.click(femininRadio);
      await waitFor(() => expect(femininRadio.checked).toBe(true));
    });

    test("doit gérer la saisie du nom", async () => {
      renderComponent();
      const nameInput = screen.getAllByLabelText("Nom")[0] as HTMLInputElement;
      fireEvent.change(nameInput, { target: { value: "Dupont" } });
      await waitFor(() => expect(nameInput.value).toBe("Dupont"));
    });
  });

  describe("Tests de gestion de l'âge et date de naissance", () => {
    test("doit gérer la saisie de la date de naissance quand renseignerAge est false", async () => {
      renderComponent();
      const dayInput = screen.getAllByPlaceholderText("JJ")[0] as HTMLInputElement;
      const monthInput = screen.getAllByPlaceholderText("MM")[0] as HTMLInputElement;
      const yearInput = screen.getAllByPlaceholderText("AAAA")[0] as HTMLInputElement;

      fireEvent.change(dayInput, { target: { value: "15" } });
      fireEvent.change(monthInput, { target: { value: "06" } });
      fireEvent.change(yearInput, { target: { value: "1980" } });

      await waitFor(() => {
        expect(dayInput.value).toBe("15");
        expect(monthInput.value).toBe("06");
        expect(yearInput.value).toBe("1980");
      });
    });

    test("doit réinitialiser la date de naissance quand renseignerAge devient true", async () => {
      renderComponent();
      const renseignerAgeCheckbox = screen.getAllByLabelText("Saisir l'âge")[0];

      // Remplir d'abord la date
      const dayInput = screen.getAllByPlaceholderText("JJ")[0] as HTMLInputElement;
      fireEvent.change(dayInput, { target: { value: "15" } });

      // Activer renseignerAge
      fireEvent.click(renseignerAgeCheckbox);

      await waitFor(() => {
        expect(dayInput.value).toBe("");
      });
    });

    test("doit réinitialiser l'âge quand renseignerAge devient false", async () => {
      renderComponent();
      const renseignerAgeCheckbox = screen.getAllByLabelText("Saisir l'âge")[0];

      // Activer renseignerAge et saisir un âge
      fireEvent.click(renseignerAgeCheckbox);
      const ageInput = screen.getByLabelText("Âge (en années)") as HTMLInputElement;
      fireEvent.change(ageInput, { target: { value: "25" } });

      // Désactiver renseignerAge
      fireEvent.click(renseignerAgeCheckbox);

      await waitFor(() => {
        expect(screen.queryByLabelText("Âge (en années)")).toBeNull();
      });
    });
  });

  describe("Tests de gestion du domicile", () => {
    test("doit gérer la case à cocher 'domicile commun'", async () => {
      renderComponent();
      const checkbox = screen.getByLabelText("Domicile commun avec parent 1") as HTMLInputElement;
      fireEvent.click(checkbox);
      await waitFor(() => expect(checkbox.checked).toBe(true));
    });

    test("doit gérer le changement de ville pour Paris", async () => {
      renderComponent();

      // Sélectionner France comme type de domicile
      const franceRadio = screen.getAllByLabelText("France")[0];
      fireEvent.click(franceRadio);

      // Saisir Paris comme ville
      const villeInput = screen.getAllByLabelText("Ville")[0] as HTMLInputElement;
      fireEvent.change(villeInput, { target: { value: "Paris" } });

      await waitFor(() => {
        expect(screen.getByLabelText("Arrondissement")).toBeDefined();
        expect(villeInput.value).toBe("Paris");
      });
    });

    test("doit gérer le changement de ville pour une ville normale", async () => {
      renderComponent();

      const franceRadio = screen.getAllByLabelText("France")[0];
      fireEvent.click(franceRadio);

      const villeInput = screen.getAllByLabelText("Ville")[0] as HTMLInputElement;
      fireEvent.change(villeInput, { target: { value: "Toulouse" } });

      await waitFor(() => {
        expect(screen.queryByLabelText("Arrondissement")).toBeNull();
        expect(villeInput.value).toBe("Toulouse");
      });
    });
  });

  describe("Tests de gestion de la profession", () => {
    test("doit gérer la case à cocher 'sans profession'", async () => {
      renderComponent();
      const professionInput = screen.getByTestId("parents.parent1-profession") as HTMLInputElement;
      const checkbox = screen.getAllByLabelText("Sans profession")[0] as HTMLInputElement;

      fireEvent.change(professionInput, { target: { value: "Ingénieur" } });
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(professionInput.disabled).toBe(true);
        expect(professionInput.value).toBe("");
      });
    });
  });

  describe("Tests du lieu de naissance", () => {
    test("doit gérer les lieux de naissance en France", async () => {
      renderComponent();
      const franceRadio = screen.getAllByLabelText("France")[0];
      fireEvent.click(franceRadio);

      await waitFor(() => {
        expect(screen.getAllByLabelText("Ville")[0]).toBeDefined();
        expect(screen.getAllByLabelText("Département")[0]).toBeDefined();
      });
    });

    test("doit gérer les lieux de naissance à l'étranger", async () => {
      renderComponent();
      const etrangerRadio = screen.getAllByLabelText("Étranger")[0] as HTMLInputElement;
      fireEvent.click(etrangerRadio);

      await waitFor(() => {
        expect(screen.getByLabelText("Pays")).toBeDefined();
        expect(screen.getByLabelText("État, canton, province")).toBeDefined();
      });
    });

    test("doit gérer le lieu de naissance inconnu", async () => {
      renderComponent();
      const inconnuRadio = screen.getAllByLabelText("Inconnu")[0];
      fireEvent.click(inconnuRadio);

      await waitFor(() => {
        expect(screen.queryByLabelText("Ville")).toBeNull();
        expect(screen.queryByLabelText("Pays")).toBeNull();
      });
    });
  });
});
