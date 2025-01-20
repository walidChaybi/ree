import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import PartieFormulaire from "../../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import EditionMiseAJourContextProvider from "../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter, elementAvecContexte } from "../../../__tests__utils__/testsUtil";

describe("Test PartieFormulaire", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
  const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";

  test("affiche les bons onglets si l'utilisateur est en mise a jour mention", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
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

    await waitFor(() => {
      expect(screen.getByText("Mentions")).toBeDefined();
      expect(screen.queryByText("Analyse Marginale")).toBeNull();
    });
  });

  test("affiche les bons onglets si l'utilisateur est en mise a jour analyse marginale uniquement", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <EditionMiseAJourContextProvider
              idActe={idActe}
              idRequete={idRequete}
              estMiseAJourAvecMentions={false}
            >
              <PartieFormulaire />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryByText("Mentions")).toBeNull();
      expect(screen.getByText("Analyse Marginale")).toBeDefined();
    });
  });

  test("Les boutons de validation et d'actualisation apparaissent avec les bons droits", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <EditionMiseAJourContextProvider
              idActe={idActe}
              idRequete={idRequete}
              estMiseAJourAvecMentions={false}
            >
              <PartieFormulaire />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);
    await waitFor(() => {
      const button = screen.getAllByRole("button", { name: /Actualiser et Visualiser/i })[0];
      expect((button as HTMLButtonElement).disabled).toBeTruthy();

      const boutonValiderEtTerminer = screen.getByText("Valider et terminer");
      expect(boutonValiderEtTerminer).toBeDefined();
    });

    const terminerEtSignerButton = screen.queryByText("Terminer et Signer");
    expect(terminerEtSignerButton).toBeNull();
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
            </EditionMiseAJourContextProvider>,
            utilisateur
          )
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const boutonTerminerEtSigner = screen.getByText("Terminer et Signer");
      expect(boutonTerminerEtSigner).toBeDefined();

      const boutonActualiservisualiser = screen.getAllByRole("button", { name: /Actualiser et Visualiser/i })[0];
      expect((boutonActualiservisualiser as HTMLButtonElement).disabled).toBeTruthy();

      const boutonValiderEtTerminer = screen.queryByText("Valider et terminer");
      expect(boutonValiderEtTerminer).toBeNull();
    });
  });

  test("La partier formulaire apparait correctement", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <EditionMiseAJourContextProvider
              idActe={idActe}
              idRequete={idRequete}
              estMiseAJourAvecMentions={false}
            >
              <PartieFormulaire />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Analyse Marginale")).toBeDefined();
      expect(screen.getByText("Nom")).toBeDefined();
    });
  });

  test("La page chargeur ne s'affiche que lors d'un appel API", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
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

    expect(screen.queryByTestId("page-chargeur")).toBeNull();
  });

  test.skip("L'ajout d'une mention l'ajoute à la liste mention, et ouvre l'analyse marginale si besoin", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
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
    const menyType = screen.getByTestId("listesTypesMention.mentionNiveauUn");
    fireEvent.change(menyType, {
      target: {
        value: "b0aa20ad-9bf3-4cbd-99f1-a54c8f6598a4"
      }
    });

    const menyTypeDeux = screen.getByTestId("listesTypesMention.mentionNiveauDeux");
    fireEvent.change(menyTypeDeux, {
      target: {
        value: "b0485f4e-5d29-4f03-956b-0a53d02ae617"
      }
    });

    const texteMention = screen.getByPlaceholderText("Texte mention à ajouter");
    fireEvent.change(texteMention, {
      target: {
        value: "TEST"
      }
    });

    await waitFor(() => {
      expect(screen.getByText("14 & 15 Changement de nom")).toBeDefined();
      expect(screen.getByText("18-1 décision OEC")).toBeDefined();
      expect(screen.getByText("TEST")).toBeDefined();

      expect((screen.getByText("Ajouter mention") as HTMLButtonElement).disabled).toBeFalsy();
      expect((screen.getByText("Annuler") as HTMLButtonElement).disabled).toBeFalsy();
    });
    fireEvent.click(screen.getByText("Ajouter mention") as HTMLButtonElement);

    await waitFor(() => {
      expect(screen.getByTitle("TEST.")).toBeDefined();
      expect(screen.getByText("Analyse Marginale")).toBeDefined();
    });
  });

  test.skip("La suppression d'une mention fonctionne", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
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
    const menyType = screen.getByTestId("listesTypesMention.mentionNiveauUn");
    fireEvent.change(menyType, {
      target: {
        value: "b0aa20ad-9bf3-4cbd-99f1-a54c8f6598a4"
      }
    });

    const menyTypeDeux = screen.getByTestId("listesTypesMention.mentionNiveauDeux");
    fireEvent.change(menyTypeDeux, {
      target: {
        value: "b048e05c-ff6f-44fd-89dc-d07aa9b5fc80"
      }
    });

    const texteMention = screen.getByPlaceholderText("Texte mention à ajouter");
    fireEvent.change(texteMention, {
      target: {
        value: "TEST"
      }
    });

    fireEvent.click(screen.getByText("Ajouter mention") as HTMLButtonElement);

    await waitFor(() => {
      expect(screen.getByTitle("TEST.")).toBeDefined();
      expect(screen.getByTestId("DeleteOutlinedIcon")).toBeDefined();
    });

    fireEvent.click(screen.getByTestId("DeleteOutlinedIcon"));

    await waitFor(() => {
      expect(screen.getByText("Vous avez demandé la suppression d'une mention. Voulez-vous continuer ?")).toBeDefined();
      expect(screen.getByText("OK")).toBeDefined();
    });
    fireEvent.click(screen.getByText("OK"));

    await waitFor(() => {
      expect(screen.queryByTitle("TEST.")).toBeNull();
    });
  });
});
