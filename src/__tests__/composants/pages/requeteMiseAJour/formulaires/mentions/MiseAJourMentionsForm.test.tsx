import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import MiseAJourMentions from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/MiseAJourMentions";
import EditionMiseAJourContextProvider from "../../../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

describe("Test MiseAJourMentionForm", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
  const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";

  vi.mock("@util/featureFlag/gestionnaireFeatureFlag", () => {
    const module = vi.importActual("@util/featureFlag/gestionnaireFeatureFlag");

    return {
      ...module,
      gestionnaireFeatureFlag: { estActif: vi.fn(() => true) }
    };
  });

  test.skip("Le formulaire fonctionne et le bouton Annuler reset le formulaire", async () => {
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
              <MiseAJourMentions />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);
    const menuType = screen.getByTestId("listesTypesMention.mentionNiveauUn");
    fireEvent.change(menuType, {
      target: {
        value: "b0aa20ad-9bf3-4cbd-99f1-a54c8f6598a4"
      }
    });

    const menuTypeDeux = screen.getByTestId("listesTypesMention.mentionNiveauDeux");
    fireEvent.change(menuTypeDeux, {
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

    await waitFor(() => {
      expect(screen.getByText("14 & 15 Changement de nom")).toBeDefined();
      expect(screen.getByText("18-1 décision OEC")).toBeDefined();
      expect(screen.getByText("TEST")).toBeDefined();

      expect((screen.getByText("Ajouter mention") as HTMLButtonElement).disabled).toBeFalsy();
      expect((screen.getByText("Annuler") as HTMLButtonElement).disabled).toBeFalsy();
    });

    fireEvent.click(screen.getByText("Annuler"));

    await waitFor(() => {
      expect(screen.queryByText("TEST")).toBeNull();
    });
  });

  test.skip("Le formulaire fonctionne et le bouton Valider reset le formulaire", async () => {
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
              <MiseAJourMentions />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);

    const menuType = screen.getByTestId("listesTypesMention.mentionNiveauUn");
    act(() =>
      fireEvent.change(menuType, {
        target: {
          value: "b0aa20ad-9bf3-4cbd-99f1-a54c8f6598a4"
        }
      })
    );

    const menuTypeDeux = screen.getByTestId("listesTypesMention.mentionNiveauDeux");
    act(() =>
      fireEvent.change(menuTypeDeux, {
        target: {
          value: "b048e05c-ff6f-44fd-89dc-d07aa9b5fc80"
        }
      })
    );

    const texteMention = screen.getByPlaceholderText("Texte mention à ajouter");
    act(() =>
      fireEvent.change(texteMention, {
        target: {
          value: "TEST"
        }
      })
    );

    await waitFor(() => {
      expect(screen.getByText("14 & 15 Changement de nom")).toBeDefined();
      expect(screen.getByText("18-1 décision OEC")).toBeDefined();
      expect(screen.getByText("TEST")).toBeDefined();

      expect((screen.getByText("Ajouter mention") as HTMLButtonElement).disabled).toBeFalsy();
      expect((screen.getByText("Annuler") as HTMLButtonElement).disabled).toBeFalsy();
    });

    act(() => fireEvent.click(screen.getByText("Ajouter mention")));

    await waitFor(() => {
      expect(screen.queryByText("TEST")).toBeNull();
    });
  });

  test("Le formulaire mentions n'est pas affichés en arrivant sur la page", async () => {
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
              <MiseAJourMentions />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("1 Mariage")).toBeDefined();
      expect(screen.queryByText("18-1 décision OEC")).toBeNull();
      expect(screen.queryByText("TEST")).toBeNull();

      expect(screen.queryByText("Ajouter mention")).toBeNull();
      expect(screen.queryByText("Annuler")).toBeNull();
    });
  });

  test("La récupération du metamodele de type mention informatise fonctionne correctement et l'aide à la saisie s'affiche", async () => {
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
              <MiseAJourMentions />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );
    render(<RouterProvider router={router} />);

    const menuType = screen.getByTestId("listesTypesMention.mentionNiveauUn");
    fireEvent.change(menuType, {
      target: {
        value: "126ad458-fd77-4c8c-bd88-db0b818f7d91"
      }
    });

    const menuTypeDeux = screen.getByTestId("listesTypesMention.mentionNiveauDeux");
    fireEvent.change(menuTypeDeux, {
      target: {
        value: "b03c1503-d452-4751-8bb3-94d082db1e5e"
      }
    });

    await waitFor(() => {
      expect(screen.getByText("EVENEMENT (A L'ETRANGER)")).toBeDefined();
      expect(screen.getByText("CONJOINT")).toBeDefined();
      expect(screen.getByText("N° acte")).toBeDefined();
      expect(screen.queryByText("Poste")).toBeNull();

      expect(screen.getByText("Texte mention")).toBeDefined();
    });
  });
});
// Créer les tests pour l'aide à la saisie ici
