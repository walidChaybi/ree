import { Body } from "@core/body/Body";
import officier from "@mock/data/connectedUser.json";
import { IOfficier } from "@model/agent/IOfficier";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import {
  createTestingRouter,
  elementAvecContexte
} from "../../../__tests__utils__/testsUtil";

test("renders BoutonDeconnexion", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <AccueilPage />
      }
    ],
    [URL_CONTEXT_APP]
  );

  const off = { idSSO: officier.id_sso, ...officier };
  off.profils = [...off.profils];
  off.profils.push("RECE_ADMIN");

  render(
    elementAvecContexte(
      <RouterProvider router={router} />,
      off as unknown as IOfficier
    )
  );

  waitFor(() => {
    const boutonElement = screen.getByText(
      /prenomConnectedUser nomConnectedUser/i
    );
    expect(boutonElement).toBeDefined();
  });
});

test("renders Body", () => {
  officier.profils.push("RECE_ADMIN");

  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <AccueilPage />
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, {
      idSSO: officier.id_sso,
      ...officier
    } as unknown as IOfficier)
  );

  waitFor(() => {
    expect(document.title).toBe("Accueil");
    expect(screen.getByText("Délivrance")).toBeDefined();
  });
});

// TODO: fix test
test("renders Body Connexion en cours", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <Body />
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(elementAvecContexte(<RouterProvider router={router} />));

  waitFor(() => {
    const titre = screen.getByText(/Connexion en cours/i);
    expect(titre).toBeDefined();
  });
});

test("renders Body avec erreur de login", () => {
  storeRece.logErrorDesactive = true;
  officier.profils.push("RECE_ADMIN");

  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <Body />
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(
    elementAvecContexte(
      <RouterProvider router={router} />,
      officier as unknown as IOfficier,
      undefined,
      undefined,
      undefined,
      {
        status: "Autre (console.error LogManager)"
      }
    )
  );

  waitFor(() => {
    const titre = screen.getByText(/Erreur Système/i);
    expect(titre).toBeDefined();
  });
  storeRece.logErrorDesactive = false;
});

test("renders Body 403", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <Body />
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(
    elementAvecContexte(
      <RouterProvider router={router} />,
      officier as unknown as IOfficier,
      undefined,
      undefined,
      undefined,
      {
        status: 403
      }
    )
  );

  const titre = screen.getByText(
    /Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO/i
  );
  waitFor(() => {
    expect(titre).toBeDefined();
  });
});
