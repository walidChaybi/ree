import { ApercuRequeteEtablissementSimplePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
} from "@router/ReceUrls";
import { act, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

describe("Test de la page Aperçu requête etablissement simple", () => {
  test("DOIT rendre le composant ApercuReqCreationEtablissementSimplePage correctement", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
            element: <ApercuRequeteEtablissementSimplePage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}/:idRequete`,
            "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
          )
        ]
      );

      const { container } = render(<RouterProvider router={router} />);

      await waitFor(async () => {
        expect(
          container.getElementsByClassName(
            "ApercuReqCreationEtablissementSimplePage"
          ).length
        ).toBe(1);
      });
    });
  });

  test("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
            element: <ApercuRequeteEtablissementSimplePage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}/:idRequete`,
            "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
          )
        ]
      );

      const { container } = render(<RouterProvider router={router} />);

      await waitFor(async () => {
        expect(
          container.getElementsByClassName("OperationLocaleEnCoursSimple")
            .length
        ).toBe(1);
      });

      setTimeout(() => {
        act(() => {
          expect(
            container.getElementsByClassName("OperationLocaleEnCoursSimple")
              .length
          ).toBe(0);
        });
      }, 0);
    });
  });

  test("DOIT afficher les onglets avec pièce justificative active QUAND on arrive sur la page", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
            element: <ApercuRequeteEtablissementSimplePage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}/:idRequete`,
            "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
          )
        ]
      );

      render(<RouterProvider router={router} />);
      await waitFor(async () => {
        expect(
          screen
            .getByText("Pièces justificatives / Annexes")
            .getAttribute("aria-selected")
        ).toBe("true");
      });
    });
  });
});
