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

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";
describe("Tests du formulaire de mise à jour d'un acte", () => {
  localStorageFeatureFlagMock.setItem("FF_AIDE_A_LA_SAISIE_MENTION", "true");

  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  describe("Tester la mise à jour d'un acte utilisant l'aide à la saisie des mentions", () => {
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

    test("L'ajout d'une mention l'ajoute à la liste mention", async () => {
      render(<RouterProvider router={routerPartieFormulaireAvecMentions} />);

      // On vérifie que la selection d'une sous-mention dans l'Autocomplete fonctionne
      const selecteurTypemention = await screen.findByPlaceholderText("Recherche...");

      userEvent.click(selecteurTypemention);
      const mention = await screen.findByRole("option", { name: "1 Mariage" });

      fireEvent.click(mention);

      await waitFor(() => expect(screen.getByRole("option", { name: "1-1 en France (mairie)" })).toBeDefined());

      const mentionSousType = screen.getByRole("option", { name: "1-1 en France (mairie)" });

      fireEvent.click(mentionSousType);

      await waitFor(() => expect(screen.getByText("LIEU <ÉVÉNEMENT>")).toBeDefined());

      // On vérifie le remplissage de l'aide à la saisie
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

      // Les champs se mettent correctement en erreur
      fireEvent.click(boutonValidation);

      await waitFor(() => expect(screen.getAllByText(/⚠ La saisie du champ est obligatoire/i)).toBeDefined());

      // Le remplissage du texte d'aide à la saisie fonctionne
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

      // La soumission de la mention fonctionne
      fireEvent.click(boutonValidation);

      await waitFor(() => {
        expect(screen.queryByText("Ville")).toBeNull();
        expect(screen.getByText("Mariée à superVille (superDepartement) le 12 septembre 2000 avec superNom.")).toBeDefined();
      });

      // L'enregistrement de la mention fonctionne
      const boutonActualiserVisualiser: HTMLButtonElement = await screen.findByRole("button", { name: "Actualiser et visualiser" });
      fireEvent.click(boutonActualiserVisualiser);

      await waitFor(() => {
        expect(boutonActualiserVisualiser.disabled).toBeTruthy();
      });

      // La modification d'une mention fonctionne
      fireEvent.click(await screen.findByTestId("EditIcon"));

      const boutonValiderModification = await screen.findByRole("button", { name: /Modifier mention/i });

      await waitFor(() => {
        expect(screen.getByText("Modification d'une mention")).toBeDefined();
        expect(boutonValiderModification).toBeDefined();
      });

      const inputVilleModif = await screen.findByRole("textbox", { name: /evenementFrance.ville/i });

      await userEvent.type(inputVilleModif, "{backspace}".repeat(5) + "Capitale");

      userEvent.click(boutonValiderModification);

      await waitFor(() => {
        expect(screen.queryByText("Ville")).toBeNull();
        expect(screen.getByText("Mariée à superCapitale (superDepartement) le 12 septembre 2000 avec superNom.")).toBeDefined();
      });

      // La suppression d'une mention fonctionne
      fireEvent.click(await screen.findByTestId("DeleteIcon"));

      await waitFor(() => {
        expect(screen.getByText("Vous avez demandé la suppression d'une mention.")).toBeDefined();
        expect(screen.getByText("OK")).toBeDefined();
      });

      userEvent.click(screen.getByRole("button", { name: /OK/i }));

      await waitFor(() => {
        expect(screen.queryByTitle("Mariée à superCapitale (superDepartement) le 12 septembre 2000 avec superNom.")).toBeNull();
      });
    });
  });

  describe("Tester la gestion des onglets", () => {
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

    test("LORSQUE l'utilisateur est en mise a jour sans mention ALORS seul l'onglet Analyse Marginale apparait", async () => {
      render(<RouterProvider router={routerPartieFormulaireSansMentions(false)} />);

      expect(screen.getByText("Analyse Marginale")).toBeDefined();
      expect(screen.queryByText("Mentions")).toBeNull();
    });

    test("LORSQUE l'utilisateur est en mise a jour avec mention ALORS seul l'onglet Mention apparait", async () => {
      render(<RouterProvider router={routerPartieFormulaireSansMentions(true)} />);

      expect(screen.queryByText("Analyse Marginale")).toBeNull();
      expect(screen.getByText("Mentions")).toBeDefined();
    });
  });

  describe("Tester l'accès aux bons boutons par l'utilisateur selon ses droits", () => {
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
    test("LORSQUE l'utilisateur ne possède pas les bons droits ALORS les boutons de signature et d'actualisation n'apparaissent pas", async () => {
      render(<RouterProvider router={routerPartieFormulaireAvecDroits()} />);

      const boutonActualiservisualiser: HTMLButtonElement = await screen.findByRole("button", { name: /Actualiser et Visualiser/i });

      expect(boutonActualiservisualiser.disabled).toBeTruthy();
      expect(screen.queryByRole("button", { name: /Terminer et Signer/i })).toBeNull();
      expect(screen.queryByRole("button", { name: /Valider et terminer/i })).toBeNull();
    });

    test("LORSQUE l'utilisateur possède les bons droits ALORS les boutons de signature et d'actualisation apparaissent", async () => {
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

      const boutonActualiservisualiser: HTMLButtonElement = await screen.findByRole("button", { name: /Actualiser et Visualiser/i });

      expect(boutonActualiservisualiser.disabled).toBeTruthy();
      expect(screen.getByRole("button", { name: /Terminer et Signer/i })).toBeDefined();
      expect(screen.queryByRole("button", { name: /Valider et terminer/i })).toBeNull();
    });
  });
});
