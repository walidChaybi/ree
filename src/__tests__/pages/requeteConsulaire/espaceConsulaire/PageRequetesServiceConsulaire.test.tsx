import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { URL_REQUETES_CONSULAIRE_SERVICE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { expect, test } from "vitest";
import PageRequetesServiceConsulaire from "../../../../pages/requetesConsulaire/PageRequetesServiceConsulaire";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../mock/context/MockRECEContextProvider";

test("DOIT afficher correctement la page PageRequetesServiceConsulaire", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_CONSULAIRE_SERVICE,
        element: (
          <MockRECEContextProvider
            utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
              .avecDroits([Droit.CREER_ACTE_TRANSCRIT, Droit.ATTRIBUER_REQUETE])
              .generer()}
          >
            <PageRequetesServiceConsulaire query={undefined} />
          </MockRECEContextProvider>
        )
      }
    ],
    [URL_REQUETES_CONSULAIRE_SERVICE]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByText("RequetesServiceConsulaire")).toBeDefined();
  });
});
