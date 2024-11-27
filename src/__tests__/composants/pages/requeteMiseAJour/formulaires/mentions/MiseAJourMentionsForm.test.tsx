import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { MiseAJourMentionsForm } from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/MiseAJourMentionsForm";
import EditionMiseAJourContextProvider from "../../../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";

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
