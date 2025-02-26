import { IOfficier } from "@model/agent/IOfficier";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { URL_REQUETES_CONSULAIRE_SERVICE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import PageRequetesServiceConsulaire from "../../../../pages/requetesConsulaire/PageRequetesServiceConsulaire";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../mock/context/MockRECEContextProvider";
import mockConnectedUser from "../../../mock/data/connectedUser.json";

let u: any = mockConnectedUser;

test("DOIT afficher correctement la page PageRequetesServiceConsulaire", async () => {
  const utilisateurConnecte = u as IOfficier;

  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_CONSULAIRE_SERVICE,
        element: (
          <MockRECEContextProvider
            utilisateurConnecte={{ ...utilisateurConnecte } as IOfficier}
            utilisateurs={[{} as IUtilisateur]}
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
