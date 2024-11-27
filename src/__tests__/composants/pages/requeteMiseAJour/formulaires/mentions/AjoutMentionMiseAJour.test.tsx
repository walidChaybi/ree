import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import AjoutMentionsMiseAJour from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/AjoutMentionsMiseAJour";
import EditionMiseAJourContextProvider from "../../../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";
const mockSubmit = vi.fn();

const renderWithFormik = (composant: any) => {
  return render(
    <Formik
      initialValues={{}}
      onSubmit={() => mockSubmit()}
    >
      {composant}
    </Formik>
  );
};
test("La page s'affiche et les champs sous-type mentions et texte sont masqués", async () => {
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
            <AjoutMentionsMiseAJour libelleTitreFormulaire={"mock test titre"} />
          </EditionMiseAJourContextProvider>
        )
      }
    ],
    ["/"]
  );

  renderWithFormik(<RouterProvider router={router} />);
  expect(screen.getByText("mock test titre")).toBeDefined();
  expect(screen.getByTestId("listesTypesMention.mentionNiveauUn")).toBeDefined();
  expect(screen.queryByTestId("listesTypesMention.mentionNiveauDeux")).toBeNull();
  expect(screen.queryByText("Ajouter mention")).toBeNull();
  expect(screen.queryByText("Annuler")).toBeNull();
});

test("Les éléments du formulaire s'affichent lorsque le Type est selectionné", async () => {
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
            <AjoutMentionsMiseAJour libelleTitreFormulaire={"mock test titre"} />
          </EditionMiseAJourContextProvider>
        )
      }
    ],
    ["/"]
  );

  renderWithFormik(<RouterProvider router={router} />);
  expect(screen.getByText("mock test titre")).toBeDefined();
  const menyType = screen.getByTestId("listesTypesMention.mentionNiveauUn");

  fireEvent.change(menyType, {
    target: {
      value: "126ad458-fd77-4c8c-bd88-db0b818f7d91"
    }
  });

  await waitFor(() => {
    expect(screen.getByPlaceholderText("Texte mention à ajouter")).toBeDefined();
    expect(screen.getByText("Ajouter mention")).toBeDefined();
    expect(screen.getByText("Annuler")).toBeDefined();
    expect(screen.getByText("Ajouter mention")).toBeDefined();
  });
});

test("Le formulaire fonctionne", async () => {
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
            <AjoutMentionsMiseAJour libelleTitreFormulaire={"mock test titre"} />
          </EditionMiseAJourContextProvider>
        )
      }
    ],
    ["/"]
  );

  renderWithFormik(<RouterProvider router={router} />);
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
});
