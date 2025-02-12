import { Identite } from "@model/etatcivil/enum/Identite";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocDeclarant from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisirProjet/BlocDeclarant";

describe("BlocDeclarant", () => {
  const renderComponentVide = () => {
    return render(
      <Formik
        initialValues={{
          declarant: {
            identite: Identite.getKey(Identite.PERE),
            nom: "",
            prenomsChemin: { prenom1: "" },
            sexe: "",
            age: null,
            qualite: null,
            profession: null,
            sansProfession: false,
            domicile: {}
          }
        }}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        <BlocDeclarant />
      </Formik>
    );
  };
  const renderComponentTiers = () => {
    return render(
      <Formik
        initialValues={{
          declarant: {
            identite: Identite.getKey(Identite.TIERS),
            nom: "",
            prenomsChemin: { prenom1: "" },
            sexe: "",
            age: null,
            qualite: null,
            profession: null,
            sansProfession: false,
            domicile: {}
          }
        }}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        <BlocDeclarant />
      </Formik>
    );
  };

  describe("Tests d'affichage initial", () => {
    test("Doit afficher le formulaire du déclarant Père sans les champs", () => {
      renderComponentVide();
      const selectValue: HTMLSelectElement = screen.getByLabelText("Identité", { selector: 'select[name="declarant.identite"]' });
      expect(selectValue).toBeDefined();
      expect(selectValue.value).toBe(Identite.getKey(Identite.PERE));
    });
  });

  describe("Tests de saisie des informations de base", () => {
    test("Doit sélectionenr 'Un tiers'", async () => {
      renderComponentTiers();
      const selectValue: HTMLSelectElement = screen.getByLabelText("Identité", { selector: 'select[name="declarant.identite"]' });
      expect(selectValue).toBeDefined();
      expect(selectValue.value).toBe(Identite.getKey(Identite.TIERS));
    });

    test("Doit gérer la saisie des champs du formulaire", async () => {
      renderComponentTiers();
      const nameInput = screen.getByLabelText("Nom*") as HTMLInputElement;
      const prenomInput = screen.getByLabelText("Prénom") as HTMLInputElement;
      const inputRadioMasculin: HTMLInputElement = screen.getByLabelText("Masculin");
      const inputRadioFeminin: HTMLInputElement = screen.getByLabelText("Féminin");
      const ageInput: HTMLInputElement = screen.getByLabelText("Âge");
      const qualiteInput: HTMLInputElement = screen.getByLabelText("Qualité");
      const professionInput: HTMLInputElement = screen.getByLabelText("Profession");
      const checkboxSansProfession = screen.getAllByRole("checkbox")[0] as HTMLInputElement;

      expect(nameInput).toBeDefined();
      expect(prenomInput).toBeDefined();
      expect(inputRadioMasculin).toBeDefined();
      expect(inputRadioFeminin).toBeDefined();
      expect(ageInput).toBeDefined();
      expect(qualiteInput).toBeDefined();
      expect(professionInput).toBeDefined();
      expect(checkboxSansProfession).toBeDefined();
      fireEvent.change(nameInput, { target: { value: "Dupont" } });
      await waitFor(() => {
        expect(nameInput.value).toBe("Dupont");
      });
    });
    test("Doit gérer la case à cocher 'sans profession'", async () => {
      renderComponentTiers();
      const professionInput: HTMLInputElement = screen.getByLabelText("Profession");
      const checkbox = screen.getAllByLabelText("Sans profession")[0] as HTMLInputElement;

      fireEvent.change(professionInput, { target: { value: "Ingénieur" } });
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(professionInput.disabled).toBe(true);
        expect(professionInput.value).toBe("");
      });
    });
  });

  describe("Tests de gestion du domicile", () => {
    test("Doit gérer le changement de ville pour Paris", async () => {
      renderComponentTiers();

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

    test("Doit gérer le changement de ville pour une ville normale", async () => {
      renderComponentTiers();

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

  describe("Tests du lieu", () => {
    test("Doit gérer les lieux en France", async () => {
      renderComponentTiers();
      const franceRadio = screen.getAllByLabelText("France")[0];
      fireEvent.click(franceRadio);

      await waitFor(() => {
        expect(screen.getAllByLabelText("Ville")[0]).toBeDefined();
        expect(screen.getAllByLabelText("Département")[0]).toBeDefined();
      });
    });

    test("Doit gérer les lieux de naissance à l'étranger", async () => {
      renderComponentTiers();
      const etrangerRadio = screen.getAllByLabelText("Étranger")[0] as HTMLInputElement;
      fireEvent.click(etrangerRadio);

      await waitFor(() => {
        expect(screen.getByLabelText("Pays")).toBeDefined();
        expect(screen.getByLabelText("État, canton, province")).toBeDefined();
      });
    });

    test("Doit gérer le lieu inconnu", async () => {
      renderComponentTiers();
      const inconnuRadio = screen.getAllByLabelText("Inconnu")[0];
      fireEvent.click(inconnuRadio);

      await waitFor(() => {
        expect(screen.queryByLabelText("Ville")).toBeNull();
        expect(screen.queryByLabelText("Pays")).toBeNull();
      });
    });
  });
});
