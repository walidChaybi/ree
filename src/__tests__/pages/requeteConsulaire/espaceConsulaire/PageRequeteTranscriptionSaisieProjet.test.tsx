import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { IOfficier } from "@model/agent/IOfficier";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import request from "superagent";
import { describe, expect, test } from "vitest";
import { PageRequeteTranscriptionSaisieProjet } from "../../../../pages/requetesConsulaire/PageRequeteTranscriptionSaisieProjet";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

describe("PageRequeteTranscriptionSaisieProjet - affichage des parties", () => {
  const mockUtilisateurConnecte = {
    idUtilisateur: "test-utilisateur-id"
  } as any as IOfficier;

  const superagentMock = require("superagent-mock")(request, [
    {
      pattern: "http://localhost/rece/rece-requete-api/v2/requetes(.*)",
      fixtures: (match: any) => {
        return { data: requeteCreationTranscription };
      },
      get: (_: any, data: any) => {
        return {
          body: data
        };
      }
    },
    {
      pattern: "http://localhost/rece/rece-requete-api/v2/requetes(.*)/rmcauto(.*)",
      fixtures: (match: any) => {
        return {
          data: {
            resultatsRecherche: []
          }
        };
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
    const { container } = render(
      <MockRECEContextProvider utilisateurConnecte={mockUtilisateurConnecte}>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      const texteRequete = screen.getByText(/Requete/i);
      expect(texteRequete).toBeDefined();
    });
    expect(container.firstChild).toMatchSnapshot();

    superagentMock.unset();
  });
});
