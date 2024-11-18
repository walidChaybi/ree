import {
  ID,
  ID_ACTE,
  URL_CONTEXT_APP,
  URL_RECHERCHE_ACTE_INSCRIPTION,
  URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import PageEditionRequeteMiseAJour from "../../../pages/requetesMiseAJour/PageEditionRequeteMiseAJour";
import { createTestingRouter } from "../../__tests__utils__/testsUtil";

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";

describe("Test de la page aperçu requête mise à jour analyse marginale", () => {
  test("La page s'affiche correctement", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID,
          element: <PageEditionRequeteMiseAJour />
        }
      ],
      [URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID.replace(ID, idRequete).replace(ID_ACTE, idActe)]
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByText("Acte registre")).toBeDefined();
    expect(screen.getByText("Analyse Marginale")).toBeDefined();
  });

  test("La page est redirigé sans confirmation si aucun changement", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID,
          element: <PageEditionRequeteMiseAJour />
        },
        {
          path: URL_RECHERCHE_ACTE_INSCRIPTION,
          element: <div>Redirigé</div>
        }
      ],
      [URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID.replace(ID, idRequete).replace(ID_ACTE, idActe)]
    );

    render(<RouterProvider router={router} />);
    fireEvent.click(screen.getByText("Abandonner"));
    await waitFor(() => expect(router.state.location.pathname).toBe(URL_RECHERCHE_ACTE_INSCRIPTION));
  });

  test("La page est redirigé si pas d'id acte ou idParam", () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: <PageEditionRequeteMiseAJour />
        },
        {
          path: URL_CONTEXT_APP,
          element: <div>Redirigé</div>
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);
    expect(router.state.location.pathname).toBe(URL_CONTEXT_APP);
  });
});
