import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import mockConnectedUser from "@mock/data/connectedUser.json";
import { IOfficier } from "@model/agent/IOfficier";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { URL_MES_REQUETES_CONSULAIRE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import PageMesRequetesConsulaires from "../../../../pages/requetesConsulaire/PageMesRequetesConsulaires";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

let u: any = mockConnectedUser;

test("DOIT afficher correctement la page PageMesRequetesConsulaires", async () => {
  const utilisateurConnecte = u as IOfficier;

  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CONSULAIRE,
        element: (
          <MockRECEContextProvider
            utilisateurConnecte={{ ...utilisateurConnecte } as IOfficier}
            utilisateurs={[{} as IUtilisateur]}
          >
            <PageMesRequetesConsulaires query={undefined} />
          </MockRECEContextProvider>
        )
      }
    ],
    [URL_MES_REQUETES_CONSULAIRE]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByText("MesRequetesConsulaires")).toBeDefined();
  });
});
