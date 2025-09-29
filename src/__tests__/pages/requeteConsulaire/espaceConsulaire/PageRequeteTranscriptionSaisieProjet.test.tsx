import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import request from "superagent";
import { describe, expect, test, vi } from "vitest";
import PageRequeteTranscriptionSaisieProjet from "../../../../pages/requetesConsulaire/PageRequeteTranscriptionSaisieProjet";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

vi.mock("@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats", () => ({
  RMCRequetesAssocieesResultats: () => <div data-testid="rmc-mock">Requetes associees</div>
}));

describe("PageRequeteTranscriptionSaisieProjet - affichage des parties", () => {
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

  test("affiche PartieGauche et PartieDroite après récupération de la requête", async () => {
    const router = createTestingRouter([{ path: "/:idRequeteParam", element: <PageRequeteTranscriptionSaisieProjet /> }], ["/test-id"]);

    const { container } = render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecAttributs({ id: "test-utilisateur-id" })
          .avecDroit(Droit.CONSULTER)
          .generer()}
      >
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      const texteRequete = screen.getByText(/Description de la requête/i);
      expect(texteRequete).toBeDefined();

      const rmcMock = screen.getByTestId("rmc-mock");
      expect(rmcMock).toBeDefined();
    });

    expect(container.firstChild).toMatchSnapshot();

    superagentMock.unset();
  });
});
