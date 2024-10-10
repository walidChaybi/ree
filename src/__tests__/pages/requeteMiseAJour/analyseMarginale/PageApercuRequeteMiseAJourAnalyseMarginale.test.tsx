import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { PageApercuRequeteMiseAJourAnalyseMarginale } from "../../../../pages/requetesMiseAJour/analyseMarginale/PageApercuRequeteMiseAJourAnalyseMarginale";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

describe("Test de la page aperçu requête mise à jour analyse marginale", () => {
  test("La page s'affiche correctement", () => {
    const router = createTestingRouter(
      [
        {
          path: "/:idActeParam/:idRequeteParam",
          element: <PageApercuRequeteMiseAJourAnalyseMarginale />
        }
      ],
      ["/b41079a5-9e8d-478c-b04c-c4c4ey86537g/idRequeteMock"]
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Acte registre")).toBeDefined();
    expect(screen.getByText("Analyse Marginale")).toBeDefined();
  });

  test("La page est redirigé si pas d'id acte", () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: <PageApercuRequeteMiseAJourAnalyseMarginale />
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
