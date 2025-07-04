import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import { URL_MES_REQUETES_DELIVRANCE, URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test.skip("renders delivrancePage", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: <EspaceDelivrancePage selectedTab={0} />
        },
        {
          path: URL_REQUETES_DELIVRANCE_SERVICE,
          element: <EspaceDelivrancePage />
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE]
    );

    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().generer()}>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );
  });

  const title = "Délivrance";
  const mesRequetes = screen.getByText(/Mes requêtes de délivrance/i);
  const compteur = screen.getByText(/Total de requêtes à signer/i);
  const requetesService = screen.getByText(/Les requêtes de délivrance de mon service/i);

  waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(compteur).toBeDefined();
  });

  fireEvent.click(requetesService);

  waitFor(() => {
    expect(screen.getByText(/Attribuée à/i)).toBeDefined();
  });

  waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(screen.getByText(/Attribuée à/i)).toBeDefined();
  });
});
