import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { URL_REQUETES_CREATION_SERVICE } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("renders creationPage", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_CREATION_SERVICE,
        element: <EspaceCreationPage selectedTab={0} />
      }
    ],
    [URL_REQUETES_CREATION_SERVICE]
  );

  render(
    <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().generer()}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
  const title = "Espace création";
  const mesRequetes = screen.getByText(/Mes requêtes de création/i);
  const requetesService = screen.getByText(/Les requêtes de création de mon service/i);

  waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
  });

  fireEvent.click(requetesService);

  const attribueA = screen.getByText(/Attribuée à/i);

  waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(attribueA).toBeDefined();
  });
});
