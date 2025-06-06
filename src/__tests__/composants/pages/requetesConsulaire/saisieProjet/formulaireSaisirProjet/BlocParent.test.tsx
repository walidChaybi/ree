import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { IParentTranscription } from "@model/requete/IParentsRequeteTranscription";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocParent from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocParent";

describe("BlocParents", () => {
  const parent2: IParentTranscription = {
    sexe: "Feminin",
    nom: "",
    prenoms: [{ prenom: "", numeroOrdre: 1 }],
    prenomsChemin: PrenomsForm.valeursInitiales(),
    dateNaissance: undefined,
    lieuNaissance: { typeLieu: "" },
    sansProfession: false,
    domicile: { typeLieu: "" },
    renseignerAge: false,
    age: ""
  };
  const parent1: IParentTranscription = {
    sexe: "Masculin",
    nom: "",
    prenoms: [{ prenom: "", numeroOrdre: 1 }],
    prenomsChemin: PrenomsForm.valeursInitiales(),
    dateNaissance: undefined,
    lieuNaissance: { typeLieu: "" },
    sansProfession: false,
    domicile: { typeLieu: "" },
    renseignerAge: false,
    age: ""
  };
  const renderComponent = () => {
    return render(
      <Formik
        initialValues={{
          parents: {
            parent1,
            parent2
          }
        }}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        <>
          <BlocParent estParent1 />
          <BlocParent />
        </>
      </Formik>
    );
  };

  describe("Tests d'affichage initial", () => {
    test("doit afficher les formulaires des deux parents avec les champs appropriés", async () => {
      renderComponent();
      await waitFor(() => {
        expect(screen.getByText("Parent 1")).toBeDefined();
        expect(screen.getByText("Parent 2")).toBeDefined();
      });

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

      Object.values(dateFields1).forEach(field => expect(field).toBeDefined());
      Object.values(dateFields2).forEach(field => expect(field).toBeDefined());

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

    test("DOIT remplacer les champs de date par le champ âge QUAND 'Saisir l'âge' est coché", async () => {
      renderComponent();
      const renseignerAgeCheckbox = screen.getAllByLabelText("Saisir l'âge")[0];

      const dayInput = screen.getAllByPlaceholderText("JJ")[0] as HTMLInputElement;
      fireEvent.change(dayInput, { target: { value: "15" } });

      fireEvent.click(renseignerAgeCheckbox);

      await waitFor(() => {
        expect(screen.queryAllByPlaceholderText("JJ")).toHaveLength(1);
        expect(screen.queryAllByPlaceholderText("MM")).toHaveLength(1);
        expect(screen.queryAllByPlaceholderText("AAAA")).toHaveLength(1);
        expect(screen.queryAllByLabelText("Âge (en années)")).toHaveLength(1);
      });
    });

    test("doit réinitialiser l'âge quand renseignerAge devient false", async () => {
      renderComponent();
      const renseignerAgeCheckbox = screen.getAllByLabelText("Saisir l'âge")[0];

      fireEvent.click(renseignerAgeCheckbox);
      const ageInput: HTMLInputElement = screen.getByLabelText("Âge (en années)");
      fireEvent.change(ageInput, { target: { value: "25" } });

      fireEvent.click(renseignerAgeCheckbox);

      await waitFor(() => {
        expect(screen.queryByLabelText("Âge (en années)")).toBeNull();
      });
    });
  });

  describe("Tests de gestion du domicile", () => {
    test("doit gérer la case à cocher 'domicile commun'", async () => {
      renderComponent();
      const checkbox: HTMLInputElement = screen.getByLabelText("Domicile commun avec parent 1");
      fireEvent.click(checkbox);
      await waitFor(() => expect(checkbox.checked).toBe(true));
    });

    test("doit gérer le changement de ville pour Paris", async () => {
      renderComponent();

      const franceRadio = screen.getAllByLabelText("France")[0];
      fireEvent.click(franceRadio);

      const villeInput = screen.getAllByLabelText(/^Ville/)[0] as HTMLInputElement;
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

      const villeInput = screen.getAllByLabelText(/^Ville/)[0] as HTMLInputElement;
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
      const professionInput: HTMLInputElement = screen.getByTestId("parents.parent1-profession");
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
        expect(screen.getAllByLabelText(/^Ville/)[0]).toBeDefined();
        expect(screen.getAllByLabelText(/^Département/)[0]).toBeDefined();
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
        expect(screen.queryByLabelText(/^Ville/)).toBeNull();
        expect(screen.queryByLabelText("Pays")).toBeNull();
      });
    });
  });
});
