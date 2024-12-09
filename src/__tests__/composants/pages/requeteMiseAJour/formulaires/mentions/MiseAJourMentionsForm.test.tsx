import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { MiseAJourMentionsForm } from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/MiseAJourMentionsForm";
import EditionMiseAJourContextProvider from "../../../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";

vi.mock("@util/featureFlag/gestionnaireFeatureFlag", () => {
  const module = vi.importActual("@util/featureFlag/gestionnaireFeatureFlag");

  return {
    ...module,
    gestionnaireFeatureFlag: { estActif: vi.fn(() => true) }
  };
});

test("Le formulaire fonctionne et le bouton Annuler reset le formulaire", async () => {
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
            <MiseAJourMentionsForm libelleTitreFormulaire={"mock titre"} />
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
  fireEvent.click(screen.getByText("Annuler") as HTMLButtonElement);

  await waitFor(() => {
    expect(screen.queryByText("TEST")).toBeNull();
  });
});

test("Le formulaire fonctionne et le bouton Valider reset le formulaire", async () => {
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
            <MiseAJourMentionsForm libelleTitreFormulaire={"mock titre"} />
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
  fireEvent.click(screen.getByText("Ajouter mention") as HTMLButtonElement);

  await waitFor(() => {
    expect(screen.queryByText("TEST")).toBeNull();
  });
});

test("L'aide à la saisie s'affiche correctement lorsqu'un type mention est informatisé", async () => {
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
            <MiseAJourMentionsForm libelleTitreFormulaire={"mock titre"} />
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
      value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f"
    }
  });

  const menuTypeDeux = screen.getByTestId("listesTypesMention.mentionNiveauDeux");
  fireEvent.change(menuTypeDeux, {
    target: {
      value: "7adaa7f8-6228-4e25-87a1-d99f3b98371a"
    }
  });

  const menuTypeTrois = screen.getByTestId("listesTypesMention.mentionNiveauTrois");
  fireEvent.change(menuTypeTrois, {
    target: {
      value: "b03c54ae-5130-4062-b7e4-34bed2de7989"
    }
  });

  await waitFor(() => {
    expect(screen.getByText("2 Divorce/Séparation/Annulation mariage")).toBeDefined();
    expect(screen.getByText("2-1 & 2-2 divorce/séparation de corps en France")).toBeDefined();
    expect(screen.getByText("2-1 notarié")).toBeDefined();
    expect(screen.queryByText("Aide à la saisie en cours de développement")).toBeDefined();
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
            <MiseAJourMentionsForm libelleTitreFormulaire={"mock titre"} />
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

test("La récupération du metamodele de type mention informatise fonctionne correctement", async () => {
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
            <MiseAJourMentionsForm libelleTitreFormulaire={"mock titre"} />
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
    expect(screen.getByText("Aide à la saisie en cours de développement")).toBeDefined();
  });
});
