import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import request from "superagent";
import { afterAll, describe, expect, test, vi } from "vitest";
import CompteurTemps from "../../../../../composants/pages/requetesMiseAJour/compteurTemps/CompteurTemps";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

describe("Test du composant CompteurTemps", () => {
  const ID_REQUETE_VALIDE = "id-requete-valide";
  const ID_REQUETE_DEPASSEE = "id-requete-depassee";
  const MESSAGE_REDIRECTION =
    "Le délai de traitement de la requête de mise à jour est dépassé. Vous allez être redirigé vers la page de recherche d'un acte.";
  const superagentMock = require("superagent-mock")(request, [
    {
      pattern: `http://localhost/rece/rece-requete-api/v2/requetes/mise-a-jour/(${ID_REQUETE_DEPASSEE}|${ID_REQUETE_VALIDE})/delai-de-traitement-restant-en-minutes`,
      fixtures: function (match: any) {
        if (match[1] === ID_REQUETE_VALIDE) {
          return { data: 10 };
        }

        if (match[1] === ID_REQUETE_DEPASSEE) {
          throw new Error("500");
        }
      },
      get: function (_: any, data: any) {
        return {
          body: data
        };
      }
    }
  ]);

  afterAll(() => superagentMock.unset());

  // MockApi.deployer(CONFIG_GET_DELAI_MISE_A_JOUR_RESTANT, { path: { idRequete: ID_REQUETE_VALIDE } }, { data: 50 });
  // MockApi.deployer(CONFIG_GET_DELAI_MISE_A_JOUR_RESTANT, { path: { idRequete: ID_REQUETE_DEPASSEE } }, { codeHttp: 500 });

  // afterAll(MockApi.stopMock);

  test("Aucun message si temps restant", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <CompteurTemps
              idRequete={ID_REQUETE_VALIDE}
              abandonnerRequete={() => {}}
            />
          )
        }
      ],
      ["/"]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    await waitFor(() => expect(screen.queryByText(MESSAGE_REDIRECTION)).toBeNull());
  });

  test("Message si temps dépassé et redirection", async () => {
    const REDIRIGE = "Redirigé";
    const abandon = vi.fn();
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <CompteurTemps
              idRequete={ID_REQUETE_DEPASSEE}
              abandonnerRequete={abandon}
            />
          )
        },
        {
          path: URL_RECHERCHE_ACTE_INSCRIPTION,
          element: <div>{REDIRIGE}</div>
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => expect(screen.getByText(MESSAGE_REDIRECTION)).toBeDefined());
    expect(abandon).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByTitle("OK"));
    await waitFor(() => expect(screen.getByText(REDIRIGE)).toBeDefined());
  });
});
