import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import request from "superagent";
import { describe, expect, test } from "vitest";
import { PageRequeteTranscriptionSaisieProjet } from "../../../../pages/requetesConsulaire/PageRequeteTranscriptionSaisieProjet";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

describe("PageRequeteTranscriptionSaisieProjet - affichage des parties", () => {
  const superagentMock = require("superagent-mock")(request, [
    {
      pattern: "http://localhost/rece/rece-requete-api/v2/requetes(.*)",
      fixtures: (match: any) => {
        if (match[1] === "/test-id") {
          return { data: requeteCreationTranscription };
        }
      },
      get: (_: any, data: any) => {
        return {
          body: data
        };
      }
    }
  ]);

  test("affiche PartieGauche et PartieDroite après récupération de la requête", async () => {
    const router = createTestingRouter([{ path: "/:idRequeteParam", element: <PageRequeteTranscriptionSaisieProjet /> }], ["/test-id"]);
    const { container } = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });

    superagentMock.unset();
  });
});
