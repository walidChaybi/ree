import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocFormuleFinale from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocFormuleFinale";
import BlocParent from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocParent";

describe("BlocFormuleFinale", () => {
  const renderComponentPere = () => {
    return render(
      <Formik
        initialValues={{
          parents: {
            parent1: {},
            parent2: {}
          },
          formuleFinale: {
            identiteDemandeur: "PARENT_1",
            nom: "",
            prenomsChemin: { prenom1: "" },
            qualite: "",
            pieceProduite: "COPIE",
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
          parents: {
            parent1: {},
            parent2: {}
          },
          formuleFinale: {
            identiteDemandeur: "TIERS",
            nom: "",
            prenomsChemin: { prenom1: "" },
            qualite: "",
            pieceProduite: "COPIE",
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
    test("Doit afficher le formulaire formule finale avec Parent 1", async () => {
      renderComponentPere();
      const selectValue: HTMLSelectElement = screen.getByLabelText("Identité du demandeur", {
        selector: 'select[name="formuleFinale.identiteDemandeur"]'
      });
      await waitFor(() => {
        expect(selectValue).toBeDefined();
        expect(selectValue.value).toBe("PARENT_1");
      });
    });
    test("Doit pas afficher le formulaire formule finale pour Père sans les champs d'identité", async () => {
      renderComponentPere();
      await waitFor(() => {
        expect(screen.queryByText("Nom*")).toBeNull();
        expect(screen.queryByText("Prénom")).toBeNull();
        expect(screen.queryByText("Qualité")).toBeNull();
        expect(screen.queryByText("Pièces")).toBeTruthy();
        expect(
          screen.getByLabelText("Pièces produites", {
            selector: 'select[name="formuleFinale.pieceProduite"]'
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
  });

  describe("Tests de saisie des informations d'identité'", () => {
    test("Doit affficher les champs 'Idendité' pour 'Un tiers'", async () => {
      renderComponentTiers();
      const selectValue: HTMLSelectElement = screen.getByLabelText("Identité du demandeur", {
        selector: 'select[name="formuleFinale.identiteDemandeur"]'
      });
      await waitFor(() => {
        expect(selectValue).toBeDefined();
        expect(selectValue.value).toBe("TIERS");
      });
    });

    test("Doit gérer la saisie des champs du formulaire", async () => {
      renderComponentTiers();
      const nameInput: HTMLInputElement = screen.getByLabelText("Nom*");
      await waitFor(() => {
        expect(nameInput).toBeDefined();
        expect(screen.getByLabelText("Prénom")).toBeDefined();
        expect(screen.getByLabelText("Qualité")).toBeDefined();
      });
      await act(async () => fireEvent.change(nameInput, { target: { value: "Roger" } }));
      await waitFor(() => {
        expect(nameInput.value).toBe("Roger");
      });
    });
  });

  describe("Test d'affichage des pièces annexes", () => {
    test("Doit afficher le champ 'pièces annexes'", async () => {
      renderComponentTiers();
      await waitFor(() => {
        expect(
          screen.getByLabelText("Pièces produites", {
            selector: 'select[name="formuleFinale.pieceProduite"]'
          })
        ).toBeTruthy();
      });
      const selectPiecesProduites: HTMLSelectElement = screen.getByLabelText("Pièces produites", {
        selector: 'select[name="formuleFinale.pieceProduite"]'
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

  describe("Gestion du select identité demandeur", () => {
    test("DOIT disabled Parent 2 et Les parents dans le select QUAND le parent 2 est incomplet", () => {
      renderComponentPere();

      const optionParent1 = screen.getByRole("option", { name: "Parent 1" });
      const optionParent2 = screen.getByRole("option", { name: "Parent 2" });
      const optionLesParents = screen.getByRole("option", { name: "Les parents" });
      const optionTiers = screen.getByRole("option", { name: "Un tiers" });

      expect(optionParent2).toBeTruthy();
      expect(optionLesParents).toBeTruthy();
      expect(optionParent1).not.toBeFalsy();
      expect(optionTiers).not.toBeFalsy();
    });

    test("DOIT repasser le select à Parent 1 QUAND on supprime le nom ou le prénom du parent 2", async () => {
      render(
        <Formik
          initialValues={{
            parents: {
              parent1: {},
              parent2: {
                nom: "Martin",
                prenomsChemin: { prenom1: "" },
                lieuNaissance: {
                  typeLieu: "FRANCE"
                },
                domicile: {
                  typeLieu: "FRANCE"
                }
              }
            },
            formuleFinale: {
              identiteDemandeur: "PARENT_2",
              nom: "",
              prenomsChemin: { prenom1: "" },
              qualite: "",
              pieceProduite: "COPIE",
              autresPieces: "",
              legalisationApostille: "",
              modeDepot: "Transmise",
              identiteTransmetteur: "Identique au demandeur"
            }
          }}
          onSubmit={() => {}}
          enableReinitialize={true}
        >
          <>
            <BlocParent />
            <BlocFormuleFinale />
          </>
        </Formik>
      );

      const selectDemandeur: HTMLSelectElement = screen.getByRole("combobox", {
        name: /identité.*demandeur/i
      });

      expect(selectDemandeur.value).toBe("PARENT_2");
      const nameInput = screen.getByLabelText("Nom") as HTMLInputElement;

      await act(async () => {
        fireEvent.change(nameInput, { target: { value: "" } });
      });

      expect(selectDemandeur.value).toBe("PARENT_1");

      const prenomInput = screen.getByLabelText("Prénom") as HTMLInputElement;

      await act(async () => {
        fireEvent.change(prenomInput, { target: { value: "Martin" } });
        fireEvent.change(selectDemandeur, { target: { value: "PARENT_2" } });
        fireEvent.change(prenomInput, { target: { value: "" } });
      });

      expect(selectDemandeur.value).toBe("PARENT_1");
    });
  });
});
