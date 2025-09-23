import { act, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { MOCK_MENTIONS_MISE_A_JOUR } from "@mock/data/etatcivil/acte/mention/mentionMiseAJour";
import { Formik } from "formik";
import { Form, RouterProvider } from "react-router";
import TableauMentions from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/ListeMentionsFormulaire/TableauMentions";
import { IMiseAJourMentionsForm } from "../../../../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

describe("Test TableauMentions", () => {
  const setDonneesMentions = vi.fn();
  const setAfficherAnalyseMarginale = vi.fn();
  const setMotif = vi.fn();

  const renderListeMentionsFormulaire = async () => {
    let rendered: ReturnType<typeof render>;
    await act(async () => {
      rendered = render(
        <RouterProvider
          router={createTestingRouter(
            [
              {
                path: "/",
                element: (
                  <Formik<IMiseAJourMentionsForm>
                    initialValues={{ mentions: [] }}
                    onSubmit={values => {
                      setDonneesMentions(values.mentions);
                    }}
                  >
                    <Form>
                      <TableauMentions
                        setAfficherOngletAnalyseMarginale={setAfficherAnalyseMarginale}
                        setMotif={setMotif}
                        formulaireMentionEnCoursDeSaisie={false}
                        donneesMentions={MOCK_MENTIONS_MISE_A_JOUR}
                      />
                    </Form>
                  </Formik>
                )
              }
            ],
            [""]
          )}
        />
      );
    });

    return rendered!;
  };

  const renderSnapshot = async (): Promise<ChildNode | null> => {
    const { container } = await renderListeMentionsFormulaire();
    return container.firstChild;
  };

  test("Doit afficher le formulaire avec les valeurs par défaut et correspondre au snapshot", async () => {
    const snapshot = await renderSnapshot();
    expect(snapshot).toMatchSnapshot();
  });
});
