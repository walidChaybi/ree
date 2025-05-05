import { Body } from "@core/body/Body";
import { IOfficier } from "@model/agent/IOfficier";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { URL_BASE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router";
import { afterEach, expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../__tests__utils__/testsUtil";
import officier from "../../../mock/data/connectedUser.json";

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

  const off = { idSSO: officier.id_sso, ...officier };
  off.profils = [...off.profils];
  off.profils.push("RECE_ADMIN");

  render(elementAvecContexte(<RouterProvider router={router} />, off as unknown as IOfficier));

  await waitFor(() => {
    const boutonElement = screen.getByText(/prenomConnectedUser nomConnectedUser/i);
    expect(boutonElement).toBeDefined();
  });
});

test("renders Body", async () => {
  officier.profils.push("RECE_ADMIN");

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
    elementAvecContexte(<RouterProvider router={router} />, {
      idSSO: officier.id_sso,
      ...officier
    } as unknown as IOfficier)
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

  render(elementAvecContexte(<RouterProvider router={router} />));

  await waitFor(() => {
    const titre = screen.getByText(/Connexion en cours/i);
    expect(titre).toBeDefined();
  });
});

test("renders Body avec erreur de login", async () => {
  storeRece.logErrorDesactive = true;
  officier.profils.push("RECE_ADMIN");

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
    elementAvecContexte(<RouterProvider router={router} />, officier as unknown as IOfficier, undefined, undefined, undefined, {
      statut: 0,
      avecErreur: true
    })
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
    elementAvecContexte(<RouterProvider router={router} />, officier as unknown as IOfficier, undefined, undefined, undefined, {
      statut: 403,
      avecErreur: true
    })
  );

  const titre = screen.getByText(/Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO/i);
  await waitFor(() => {
    expect(titre).toBeDefined();
  });
});
