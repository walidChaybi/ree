import { URL_MES_REQUETES_DELIVRANCE, URL_RECHERCHE_REQUETE, URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { BoutonRetour, getLibelleEtUrl } from "@widget/navigation/BoutonRetour";
import { RouterProvider } from "react-router";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("Retour accueil", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <BoutonRetour />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE]
  );

  render(<RouterProvider router={router} />);

  const linkElement = screen.getByText(/<< RETOUR ACCUEIL/i);
  waitFor(() => {
    expect(linkElement).toBeDefined();
  });
});

test("retour name", () => {
  expect(getLibelleEtUrl(URL_MES_REQUETES_DELIVRANCE)).toStrictEqual(["mes requêtes de délivrance", URL_MES_REQUETES_DELIVRANCE]);
  expect(getLibelleEtUrl(URL_REQUETES_DELIVRANCE_SERVICE)).toStrictEqual(["requête de service", URL_REQUETES_DELIVRANCE_SERVICE]);
  expect(getLibelleEtUrl(URL_RECHERCHE_REQUETE)).toStrictEqual(["recherche requête", URL_RECHERCHE_REQUETE]);
});
