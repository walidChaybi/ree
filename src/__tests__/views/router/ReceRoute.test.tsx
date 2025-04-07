import { userDroitConsulterArchive, userDroitConsulterPerimetreTousRegistres } from "@mock/data/mockConnectedUserAvecDroit";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import ReceRoute from "@router/ReceRoute";
import { URL_BASE } from "@router/ReceUrls";
import { render } from "@testing-library/react";
import { cleanUrl } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../__tests__utils__/testsUtil";

describe("Test du composant route RECE", () => {
  test("Test de l'affichage d'un element d'une route avec un droit", () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <ReceRoute
              route={{
                url: "/",
                libelle: "Page",
                droits: [Droit.CONSULTER_ARCHIVES]
              }}
            >
              <div>Page</div>
            </ReceRoute>
          )
        },
        {
          path: URL_BASE,
          element: <div>Redirigé</div>
        }
      ],
      ["/"]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitConsulterArchive));
    expect(router.state.location.pathname).toBe("/");
  });

  test("Test de la redirection sans le droit demandé", () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <ReceRoute
              route={{
                url: "/",
                libelle: "Page",
                droits: [Droit.CONSULTER]
              }}
            >
              <div>Page</div>
            </ReceRoute>
          )
        },
        {
          path: URL_BASE,
          element: <div>Redirigé</div>
        }
      ],
      ["/"]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitConsulterArchive));
    expect(cleanUrl(router.state.location.pathname)).toBe(URL_BASE);
  });

  test("Test de l'affichage d'un element d'une route avec un droit sur un périmètre", () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <ReceRoute
              route={{
                url: "/",
                libelle: "Page",
                droitPerimetres: {
                  droit: Droit.CONSULTER,
                  perimetres: [Perimetre.TOUS_REGISTRES]
                }
              }}
            >
              <div>Page</div>
            </ReceRoute>
          )
        },
        {
          path: URL_BASE,
          element: <div>Redirigé</div>
        }
      ],
      ["/"]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitConsulterPerimetreTousRegistres));
    expect(router.state.location.pathname).toBe("/");
  });

  test("Test de la redirection sans le condition de route canAccess respectée", () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <ReceRoute
              route={{
                url: "/",
                libelle: "Page",
                canAccess: () => false
              }}
            >
              <div>Page</div>
            </ReceRoute>
          )
        },
        {
          path: URL_BASE,
          element: <div>Redirigé</div>
        }
      ],
      ["/"]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitConsulterArchive));
    expect(cleanUrl(router.state.location.pathname)).toBe(URL_BASE);
  });
});
