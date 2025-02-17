import { Identite } from "@model/etatcivil/enum/Identite";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocFormuleFinale from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisirProjet/BlocFormuleFinale";

describe("BlocFormuleFinale", () => {
  const renderComponentPere = () => {
    return render(
      <Formik
        initialValues={{
          formuleFinale: {
            identiteDemandeur: Identite.getKey(Identite.PERE),
            nom: "",
            prenomsChemin: { prenom1: "" },
            qualite: "",
            piecesProduites: "COPIE",
            autresPieces: "",
            legalisationApostille: "",
            modeDepot: "Transmise",
            identiteTransmetteur: "Identique au demandeur"
          }
        }}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        <BlocFormuleFinale />
      </Formik>
    );
  };
  const renderComponentTiers = () => {
    return render(
      <Formik
        initialValues={{
          formuleFinale: {
            identiteDemandeur: Identite.getKey(Identite.TIERS),
            nom: "",
            prenomsChemin: { prenom1: "" },
            qualite: "",
            piecesProduites: "COPIE",
            autresPieces: "",
            legalisationApostille: "",
            modeDepot: "Transmise",
            identiteTransmetteur: "Identique au demandeur"
          }
        }}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        <BlocFormuleFinale />
      </Formik>
    );
  };

  describe("Tests d'affichage initial", () => {
    test("Doit afficher le formulaire formule finale Père", () => {
      renderComponentPere();
      const selectValue: HTMLSelectElement = screen.getByLabelText("Identité du demandeur", {
        selector: 'select[name="formuleFinale.identiteDemandeur"]'
      });
      expect(selectValue).toBeDefined();
      expect(selectValue.value).toBe(Identite.getKey(Identite.PERE));
    });
    test("Doit pas afficher le formulaire formule finale pour Père sans les champs d'identité", () => {
      renderComponentPere();
      expect(screen.queryByText("Nom*")).toBeNull();
      expect(screen.queryByText("Prénom")).toBeNull();
      expect(screen.queryByText("Qualité")).toBeNull();
      expect(screen.queryByText("Pièces")).toBeTruthy();
      screen.debug();
      expect(
        screen.getByLabelText("Pièces produites", {
          selector: 'select[name="formuleFinale.piecesProduites"]'
        })
      ).toBeTruthy();
      expect(
        screen.getByLabelText("Légalisation / Apostille", {
          selector: 'select[name="formuleFinale.legalisationApostille"]'
        })
      ).toBeTruthy();
      expect(screen.queryByText("Autres pièces*")).toBeNull();
      expect(screen.queryByText("Mode de dépôt de la demande")).toBeTruthy();
      expect(screen.getByLabelText("Transmise")).toBeDefined();
      expect(screen.getByLabelText("Remise")).toBeDefined();
      const radioModeDepot: HTMLInputElement = screen.getByLabelText("Transmise", {
        selector: 'input[name="formuleFinale.modeDepot"]'
      });
      expect(radioModeDepot.value).toBe("TRANSMISE");
      expect(
        screen.getByLabelText("Identité du transmetteur", {
          selector: 'select[name="formuleFinale.identiteTransmetteur"]'
        })
      ).toBeTruthy();
      expect(
        screen.getByLabelText("Identité du transmetteur", {
          selector: 'select[name="formuleFinale.identiteTransmetteur"]'
        })
      ).toHaveProperty("disabled");
    });
  });

  describe("Tests de saisie des informations d'identité'", () => {
    test("Doit affficher les champs 'Idendité' pour 'Un tiers'", async () => {
      renderComponentTiers();
      const selectValue: HTMLSelectElement = screen.getByLabelText("Identité du demandeur", {
        selector: 'select[name="formuleFinale.identiteDemandeur"]'
      });
      expect(selectValue).toBeDefined();
      expect(selectValue.value).toBe(Identite.getKey(Identite.TIERS));
    });

    test("Doit gérer la saisie des champs du formulaire", async () => {
      renderComponentTiers();
      const nameInput: HTMLInputElement = screen.getByLabelText("Nom*");

      expect(nameInput).toBeDefined();
      expect(screen.getByLabelText("Prénom")).toBeDefined();
      expect(screen.getByLabelText("Qualité")).toBeDefined();

      await act(async () => fireEvent.change(nameInput, { target: { value: "Roger" } }));
      await waitFor(() => {
        expect(nameInput.value).toBe("Roger");
      });
    });
  });

  describe("Test d'affichage des pièces annexes", () => {
    test("Doit afficher le champ 'pièces annexes'", async () => {
      renderComponentTiers();
      screen.debug();
      expect(
        screen.getByLabelText("Pièces produites", {
          selector: 'select[name="formuleFinale.piecesProduites"]'
        })
      ).toBeTruthy();
      const selectPiecesProduites: HTMLSelectElement = screen.getByLabelText("Pièces produites", {
        selector: 'select[name="formuleFinale.piecesProduites"]'
      });

      expect(selectPiecesProduites.value).toBe("COPIE");
      expect(screen.queryByText("Autres pièces*")).toBeNull();

      await act(async () => fireEvent.change(selectPiecesProduites, { target: { value: "COPIES" } }));
      await waitFor(() => {
        expect(selectPiecesProduites.value).toBe("COPIES");
        expect(screen.getByLabelText("Autres pièces*")).toBeDefined();
      });
    });
  });
});
