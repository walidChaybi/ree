import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router";
import { beforeEach, describe, expect, test } from "vitest";
import PartieFormulaire from "../../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import EditionMiseAJourContextProvider from "../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter, elementAvecContexte } from "../../../__tests__utils__/testsUtil";
import { NATURE_MENTION } from "../../../mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "../../../mock/data/NomenclatureTypeMention";

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";

const remplirTypeEtSousType = async () => {
  await userEvent.click(await screen.findByPlaceholderText("Recherche..."));
  fireEvent.click(await screen.findByRole("option", { name: "1 Mariage" }));
  fireEvent.click(await screen.findByRole("option", { name: "1-1 en France (mairie)" }));
};

const remplirFormulaireMention = async () => {
  await userEvent.type(await screen.getByRole("textbox", { name: /evenementFrance.ville/i }), "superVille");
  await userEvent.type(await screen.getByRole("textbox", { name: /evenementFrance.departement/i }), "superDepartement");
  await userEvent.type(await screen.getByPlaceholderText("JJ"), "12");
  await userEvent.type(await screen.getByPlaceholderText("MM"), "09");
  await userEvent.type(await screen.getByPlaceholderText("AAAA"), "2000");
  await userEvent.type(await screen.getByRole("textbox", { name: /conjoint.nom/i }), "superNom");
};

const creerMention = async () => {
  await remplirTypeEtSousType();
  await screen.findByRole("button", { name: "Ajouter mention" });
  await remplirFormulaireMention();

  const boutonActualiserVisualiser: HTMLButtonElement = await screen.findByRole("button", { name: "Actualiser et visualiser" });
  fireEvent.click(boutonActualiserVisualiser);

  fireEvent.click(await screen.findByRole("button", { name: "Ajouter mention" }));
};

describe("Tests du formulaire de mise à jour d'un acte", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  describe("Tester la mise à jour d'un acte utilisant l'aide à la saisie des mentions", () => {
    beforeEach(() => {
      const router = createTestingRouter(
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
      render(<RouterProvider router={router} />);
    });
    test("Sélection d'une mention et d'un sous-type", async () => {
      await await remplirTypeEtSousType();

      await waitFor(() => expect(screen.getByText("LIEU <ÉVÉNEMENT>")).toBeDefined());
    });

    test("Affichage des champs d'aide à la saisie", async () => {
      await remplirTypeEtSousType();

      const boutonValidation = await screen.findByRole("button", { name: "Ajouter mention" });

      await waitFor(() => {
        expect(screen.getByRole("textbox", { name: /evenementFrance.ville/i })).toBeDefined();
        expect(screen.getByRole("textbox", { name: /evenementFrance.departement/i })).toBeDefined();
        expect(screen.getByRole("textbox", { name: /conjoint.nom/i })).toBeDefined();
        expect(screen.getByPlaceholderText("JJ")).toBeDefined();
        expect(screen.getByPlaceholderText("MM")).toBeDefined();
        expect(screen.getByPlaceholderText("AAAA")).toBeDefined();
        expect(boutonValidation).toBeDefined();
      });
    });

    test("Champs vides affichent des erreurs", async () => {
      await remplirTypeEtSousType();

      const boutonValidation = await screen.findByRole("button", { name: "Ajouter mention" });

      fireEvent.click(boutonValidation);

      await waitFor(() => {
        expect(screen.getAllByText(/⚠ La saisie du champ est obligatoire/i).length).toBeGreaterThan(0);
      });
    });

    test("Remplissage et prévisualisation du texte d'aide à la saisie", async () => {
      await remplirTypeEtSousType();
      await screen.findByRole("button", { name: "Ajouter mention" });
      await remplirFormulaireMention();

      await waitFor(() => {
        expect(screen.getByText("superVille (superDepartement)")).toBeDefined();
        expect(screen.getByText("le 12 septembre 2000")).toBeDefined();
      });
    });

    test("Ajout et affichage de la mention saisie", async () => {
      await remplirTypeEtSousType();
      await screen.findByRole("button", { name: "Ajouter mention" });
      await remplirFormulaireMention();

      fireEvent.click(await screen.findByRole("button", { name: "Ajouter mention" }));

      await waitFor(() => {
        expect(screen.queryByText("Ville")).toBeNull();
        expect(screen.getByText("Mariée à superVille (superDepartement) le 12 septembre 2000 avec superNom.")).toBeDefined();
      });
    });

    test("Enregistrement de la mention", async () => {
      await remplirTypeEtSousType();
      await screen.findByRole("button", { name: "Ajouter mention" });
      await remplirFormulaireMention();

      const boutonActualiserVisualiser: HTMLButtonElement = await screen.findByRole("button", { name: "Actualiser et visualiser" });
      fireEvent.click(boutonActualiserVisualiser);

      await waitFor(() => {
        expect(boutonActualiserVisualiser.disabled).toBeTruthy();
      });
    });

    test("Modification d'une mention existante", async () => {
      await creerMention();

      await screen.findByTestId("EditIcon");

      fireEvent.click(await screen.findByTestId("EditIcon"));

      const boutonValiderModification = await screen.findByRole("button", { name: /Modifier mention/i });

      await waitFor(() => {
        expect(screen.getByText("Modification d'une mention")).toBeDefined();
        expect(boutonValiderModification).toBeDefined();
      });

      const inputVilleModif = await screen.findByRole("textbox", { name: /evenementFrance.ville/i });
      await userEvent.type(inputVilleModif, "{backspace}".repeat(5) + "Capitale");
      await userEvent.click(boutonValiderModification);

      await waitFor(() => {
        expect(screen.queryByText("Ville")).toBeNull();
        expect(screen.getByText("Mariée à superCapitale (superDepartement) le 12 septembre 2000 avec superNom.")).toBeDefined();
      });
    });

    test("Suppression d'une mention", async () => {
      await creerMention();

      fireEvent.click(await screen.findByTestId("DeleteIcon"));

      await waitFor(() => {
        expect(screen.getByText("Vous avez demandé la suppression d'une mention.")).toBeDefined();
        expect(screen.getByText("OK")).toBeDefined();
      });

      await userEvent.click(screen.getByRole("button", { name: /OK/i }));

      await waitFor(() => {
        expect(screen.queryByTitle("Mariée à superCapitale (superDepartement) le 12 septembre 2000 avec superNom.")).toBeNull();
      });
    });
  });

  describe("Tester la gestion des onglets", () => {
    const routerPartieFormulaire = (estMajAvecMention: boolean) =>
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

    test("QUAND l'utilisateur est en mise à jour sans mention ALORS seul l'onglet Analyse Marginale apparait", async () => {
      render(<RouterProvider router={routerPartieFormulaire(false)} />);

      await waitFor(() => {
        expect(screen.getByText("Analyse Marginale")).toBeDefined();
        expect(screen.queryByText("Mentions")).toBeNull();
      });
    });

    test("QUAND l'utilisateur est en mise à jour avec mention ALORS seul l'onglet Mention apparait", async () => {
      render(<RouterProvider router={routerPartieFormulaire(true)} />);

      await waitFor(() => {
        expect(screen.queryByText("Analyse Marginale")).toBeNull();
        expect(screen.getByText("Mentions")).toBeDefined();
      });
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
