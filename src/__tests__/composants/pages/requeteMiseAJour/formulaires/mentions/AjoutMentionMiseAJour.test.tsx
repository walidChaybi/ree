import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { ITypeMention, TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import AjoutMentionsMiseAJour from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/AjoutMentionsMiseAJour";
import EditionMiseAJourContextProvider from "../../../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

describe("Test AjoutMentionMiseAJour", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
  const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";
  const mockSubmit = vi.fn();

  const mockTyeMention = {
    id: "b03c1503-d452-4751-8bb3-94d082db1e5e",
    libelle: "ocypemention",
    natureMention: {},
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    estSousType: false,
    estSaisieAssistee: true
  } as ITypeMention | null;

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
              <AjoutMentionsMiseAJour typeMentionSelectionne={null} />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    renderWithFormik(<RouterProvider router={router} />);
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
              <AjoutMentionsMiseAJour typeMentionSelectionne={mockTyeMention} />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    renderWithFormik(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Ajouter mention")).toBeDefined();
      expect(screen.getByText("Annuler")).toBeDefined();
    });
  });
});
