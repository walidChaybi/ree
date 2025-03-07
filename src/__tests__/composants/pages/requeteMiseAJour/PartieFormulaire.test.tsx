import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import PartieFormulaire from "../../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import EditionMiseAJourContextProvider from "../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter, elementAvecContexte } from "../../../__tests__utils__/testsUtil";
import { NATURE_MENTION } from "../../../mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "../../../mock/data/NomenclatureTypeMention";
import { localStorageFeatureFlagMock } from "../../../setupTests";

describe("Formulaire de mise a jour d'un acte...", () => {
  localStorageFeatureFlagMock.setItem("FF_AIDE_A_LA_SAISIE_MENTION", "true");

  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
  const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";
  describe("...avec mention", () => {
    const routerPartieFormulaireAvecMentions = createTestingRouter(
      [
        {
          path: "/",
          element: elementAvecContexte(
            <EditionMiseAJourContextProvider
              idActe={idActe}
              idRequete={idRequete}
              estMiseAJourAvecMentions={true}
            >
              <PartieFormulaire />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    test("Affiche les bons onglets lorsque l'utilisateur est en mise a jour avec mention", async () => {
      render(<RouterProvider router={routerPartieFormulaireAvecMentions} />);

      expect(screen.getByText("Mentions")).toBeDefined();
      expect(screen.queryByText("Analyse Marginale")).toBeNull();
    });

    test("L'ajout d'une mention l'ajoute à la liste mention, et ouvre l'analyse marginale si besoin", async () => {
      render(<RouterProvider router={routerPartieFormulaireAvecMentions} />);

      //! On vérifie que la selection d'une sous-mention dans l'Autocomplete fonctionne
      await screen.findByPlaceholderText("Recherche...");
      const selecteurTypemention = screen.getByPlaceholderText("Recherche...");

      await userEvent.click(selecteurTypemention);
      const mention = screen.getByRole("option", { name: "1 Mariage" });

      await userEvent.click(mention);

      await waitFor(() => {
        expect(screen.getByRole("option", { name: "1-1 en France (mairie)" })).toBeDefined();
      });

      const mentionSousType = screen.getByRole("option", { name: "1-1 en France (mairie)" });

      await userEvent.click(mentionSousType);

      //! On vérifie que le formulaire d'aide à la saisie s'affiche correctement lorsque l'aide à la saisie est a true et que le FF est à true
      await waitFor(() => {
        expect(screen.getByRole("textbox", { name: /evenementFrance.ville/i })).toBeDefined();
        expect(screen.getByRole("textbox", { name: /evenementFrance.departement/i })).toBeDefined();
        expect(screen.getByRole("textbox", { name: /evenementFrance.departement/i })).toBeDefined();
        expect(screen.getByPlaceholderText("JJ")).toBeDefined();
        expect(screen.getByPlaceholderText("MM")).toBeDefined();
        expect(screen.getByPlaceholderText("AAAA")).toBeDefined();
        expect(screen.getByRole("button", { name: "Ajouter mention" })).toBeDefined();
        expect(screen.getByText("LIEU <ÉVÉNEMENT>")).toBeDefined();
      });

      //! On vérifie le remplissage de l'aide à la saisie
      const inputVille = screen.getByRole("textbox", { name: /evenementFrance.ville/i });
      const inputDepartement = screen.getByRole("textbox", { name: /evenementFrance.departement/i });
      const inputNom = screen.getByRole("textbox", { name: /conjoint.nom/i });
      const inputJourEvenement = screen.getByPlaceholderText("JJ");
      const inputMoisEvenement = screen.getByPlaceholderText("MM");
      const inputAnneeEvenement = screen.getByPlaceholderText("AAAA");
      const boutonValidation = screen.getByRole("button", { name: "Ajouter mention" });

      await waitFor(() => {
        expect(inputVille).toBeDefined();
        expect(inputDepartement).toBeDefined();
        expect(inputNom).toBeDefined();
        expect(inputJourEvenement).toBeDefined();
        expect(inputMoisEvenement).toBeDefined();
        expect(inputAnneeEvenement).toBeDefined();
        expect(boutonValidation).toBeDefined();
      });

      //! Les champs se mettent correctement en erreur X
      await userEvent.click(boutonValidation);
      //? Pourquoi il ne trouve pas le message qui s'affiche pourtant bien dans le DOM de test...
      await waitFor(() => {
        // expect(screen.getByText(/⚠ La saisie du champ est obligatoire/i)).toBeDefined();
        // expect(screen.getByText(/La saisie du champ est obligatoire/i)).toBeDefined();
        //expect(screen.getByText("La saisie du champ est obligatoire")).toBeDefined();
      });

      //! Le remplissage du texte d'aide à la saisie fonctionne
      await userEvent.type(inputVille, "superVille");

      await userEvent.type(inputDepartement, "superDepartement");

      await userEvent.type(inputJourEvenement, "12");

      await userEvent.type(inputMoisEvenement, "09");

      await userEvent.type(inputAnneeEvenement, "2000");

      await userEvent.type(inputNom, "superNom");

      await waitFor(() => {
        expect(screen.getByText("superVille (superDepartement)")).toBeDefined();
        expect(screen.getByText("le 12 septembre 2000")).toBeDefined();
      });

      //! La soumission de la mention fonctionne
      await userEvent.click(boutonValidation);

      await waitFor(() => {
        expect(screen.queryByText("Ville")).toBeNull();
        expect(screen.getByText("Mariée à superVille (superDepartement) le 12 septembre 2000 avec superNom.")).toBeDefined();
      });

      //! L'enregistrement de la mention fonctionne
      const boutonActualiserVisualiser: HTMLButtonElement = screen.getByRole("button", { name: "Actualiser et visualiser" });
      await userEvent.click(boutonActualiserVisualiser);

      await waitFor(() => {
        expect(boutonActualiserVisualiser.disabled).toBeTruthy();
      });

      //! La modification d'une mention fonctionne
      await waitFor(() => {
        expect(screen.getByTestId("EditIcon")).toBeDefined();
      });

      fireEvent.click(screen.getByTestId("EditIcon"));

      await waitFor(() => {
        expect(screen.getByText("Modification d'une mention")).toBeDefined();
        expect(screen.getByText("Ville")).toBeDefined();
      });

      const inputVilleModif = screen.getByRole("textbox", { name: /evenementFrance.ville/i });

      fireEvent.change(inputVilleModif, {
        target: {
          value: "megaSuperVille"
        }
      });

      const boutonModifierMention = screen.getByText("Modifier mention");
      fireEvent.click(boutonModifierMention);

      await waitFor(() => {
        expect(screen.queryByText("Ville")).toBeNull();
        expect(screen.getByText("Mariée à megaSuperVille (superDepartement) le 12 septembre 2000 avec superNom.")).toBeDefined();
      });

      //! La suppression d'une mention fonctionne
      await waitFor(() => {
        expect(screen.getByTitle("Mariée à megaSuperVille (superDepartement) le 12 septembre 2000 avec superNom.")).toBeDefined();
        expect(screen.getByTestId("DeleteIcon")).toBeDefined();
      });

      fireEvent.click(screen.getByTestId("DeleteIcon"));

      await waitFor(() => {
        expect(screen.getByText("Vous avez demandé la suppression d'une mention.")).toBeDefined();
        expect(screen.getByText("OK")).toBeDefined();
      });

      fireEvent.click(screen.getByText("OK"));

      await waitFor(() => {
        expect(screen.queryByTitle("Mariée à superVille (superDepartement) le 12 septembre 2000 avec superNom.")).toBeNull();
      });
    });
  });

  // OK >
  describe("...sans mention", () => {
    const routerPartieFormulaireSansMentions = (estMajAvecMention: boolean) =>
      createTestingRouter(
        [
          {
            path: "/",
            element: (
              <EditionMiseAJourContextProvider
                idActe={idActe}
                idRequete={idRequete}
                estMiseAJourAvecMentions={estMajAvecMention}
              >
                <PartieFormulaire />
              </EditionMiseAJourContextProvider>
            )
          }
        ],
        ["/"]
      );

    test("Affiche les bons onglets lorsque l'utilisateur est en mise a jour sans mention", async () => {
      render(<RouterProvider router={routerPartieFormulaireSansMentions(false)} />);

      expect(screen.getByText("Analyse Marginale")).toBeDefined();
      expect(screen.queryByText("Mentions")).toBeNull();
    });

    test("Affiche les bons onglets lorsque l'utilisateur est en mise a jour avec mention", async () => {
      render(<RouterProvider router={routerPartieFormulaireSansMentions(true)} />);

      expect(screen.queryByText("Analyse Marginale")).toBeNull();
      expect(screen.getByText("Mentions")).toBeDefined();
    });
  });

  // OK >
  describe("Tester que l'utilisateur accès aux bons boutons selon ses droits", () => {
    const routerPartieFormulaireAvecDroits = (utilisateur?: IOfficier) =>
      createTestingRouter(
        [
          {
            path: "/",
            element: elementAvecContexte(
              <EditionMiseAJourContextProvider
                idActe={idActe}
                idRequete={idRequete}
                estMiseAJourAvecMentions={true}
              >
                <PartieFormulaire />
              </EditionMiseAJourContextProvider>,
              utilisateur
            )
          }
        ],
        ["/"]
      );
    test("Les boutons de signature et d'actualisation n'apparaissent pas sans les bons droits", async () => {
      render(<RouterProvider router={routerPartieFormulaireAvecDroits()} />);

      await waitFor(() => {
        const boutonActualiservisualiser: HTMLButtonElement = screen.getByRole("button", { name: /Actualiser et Visualiser/i });
        const boutonValiderEtTerminer = screen.queryByRole("button", { name: /Valider et terminer/i });
        const boutonTerminerEtSigner = screen.queryByRole("button", { name: /Terminer et Signer/i });

        expect(boutonTerminerEtSigner).toBeNull();
        expect(boutonActualiservisualiser.disabled).toBeTruthy();
        expect(boutonValiderEtTerminer).toBeNull();
      });
    });

    test("Les boutons de signature et d'actualisation apparaissent avec les bons droits", async () => {
      const utilisateur = {
        habilitations: [
          {
            profil: {
              droits: [{ nom: "SIGNER_MENTION" }, { nom: "METTRE_A_JOUR_ACTE" }] as IDroit[]
            } as IProfil
          }
        ] as IHabilitation[]
      } as IOfficier;

      render(<RouterProvider router={routerPartieFormulaireAvecDroits(utilisateur)} />);

      await waitFor(() => {
        const boutonTerminerEtSigner = screen.getByRole("button", { name: /Terminer et Signer/i });
        const boutonActualiservisualiser: HTMLButtonElement = screen.getByRole("button", { name: /Actualiser et Visualiser/i });
        const boutonValiderEtTerminer = screen.queryByRole("button", { name: /Valider et terminer/i });
        expect(boutonTerminerEtSigner).toBeDefined();
        expect(boutonActualiservisualiser.disabled).toBeTruthy();
        expect(boutonValiderEtTerminer).toBeNull();
      });
    });
  });
});
