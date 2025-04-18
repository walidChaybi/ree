import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { IOfficier } from "@model/agent/IOfficier";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import request from "superagent";
import { describe, expect, test, vi } from "vitest";
import PageRequeteCreationTranscriptionPriseEnCharge from "../../../pages/requetesConsulaire/PageRequeteCreationTranscriptionPriseEnCharge";
import { createTestingRouter } from "../../__tests__utils__/testsUtil";

vi.mock("@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats", () => ({
  RMCRequetesAssocieesResultats: () => <div data-testid="rmc-mock">Requetes associees</div>
}));

describe("PageRequeteTranscriptionSaisieProjet - affichage des parties", () => {
  test("affiche PartieGauche et PartieDroite après récupération de la requête", async () => {
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
      }
    ]);

    const router = createTestingRouter(
      [{ path: "/:idRequeteParam", element: <PageRequeteCreationTranscriptionPriseEnCharge /> }],
      ["/test-id"]
    );

    const { container } = render(
      <MockRECEContextProvider utilisateurConnecte={mockUtilisateurConnecte}>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      const descriptionText = screen.getByText(/Description de la requête/i);
      expect(descriptionText).toBeDefined();

      const rmcMock = screen.getByTestId("rmc-mock");
      expect(rmcMock).toBeDefined();
    });

    expect(container.firstChild).toMatchSnapshot();
    superagentMock.unset();
  });
});
