import { Body } from "@core/body/Body";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { URL_BASE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router";
import { afterEach, expect, test } from "vitest";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

const UTILISATEUR_CONNECTE = MockUtilisateurBuilder.utilisateurConnecte().generer();

afterEach(() => {
  // Réactivation de la log après chaque test (certains tests la désactive car les erreurs logguées sont normales)
  storeRece.logErrorDesactive = false;
});

test("renders BoutonDeconnexion", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_BASE,
        element: <AccueilPage />
      }
    ],
    [URL_BASE]
  );

  render(
    <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

  await waitFor(() => {
    const boutonElement = screen.getByText(/Prénom NOM/i);
    expect(boutonElement).toBeDefined();
  });
});

test("renders Body", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_BASE,
        element: <AccueilPage />
      }
    ],
    [URL_BASE]
  );

  render(
    <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

  await waitFor(() => {
    expect(document.title).toBe("Accueil");
    expect(screen.getByText("Délivrance")).toBeDefined();
  });
});

// TODO: fix test
test("renders Body Connexion en cours", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_BASE,
        element: <Body />
      }
    ],
    [URL_BASE]
  );

  render(
    <MockRECEContextProvider>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

  await waitFor(() => {
    const titre = screen.getByText(/Connexion en cours/i);
    expect(titre).toBeDefined();
  });
});

test("renders Body avec erreur de login", async () => {
  storeRece.logErrorDesactive = true;

  const router = createTestingRouter(
    [
      {
        path: URL_BASE,
        element: <Body />
      }
    ],
    [URL_BASE]
  );

  render(
    <MockRECEContextProvider
      utilisateurConnecte={UTILISATEUR_CONNECTE}
      erreurConnexion={{ statut: 0, avecErreur: true }}
    >
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

  await waitFor(() => {
    const titre = screen.getByText(/Erreur Système/i);
    expect(titre).toBeDefined();
  });
  storeRece.logErrorDesactive = false;
});

test("renders Body 403", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_BASE,
        element: <Body />
      }
    ],
    [URL_BASE]
  );

  render(
    <MockRECEContextProvider
      utilisateurConnecte={UTILISATEUR_CONNECTE}
      erreurConnexion={{ statut: 403, avecErreur: true }}
    >
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

  const titre = screen.getByText(/Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO/i);
  await waitFor(() => {
    expect(titre).toBeDefined();
  });
});
