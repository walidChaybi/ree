import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import {
  detailRequeteDelivranceAvecRequerantQualiteAutreProfessionnel,
  detailRequeteDelivranceAvecRequerantQualiteInstitutionnel,
  detailRequeteDelivranceAvecRequerantQualiteUtilisateurRece, ReponseAppelDetailRequeteDelivrance
} from "@mock/data/DetailRequeteDelivrance";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { ResumeRequete } from "@pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/resume/ResumeRequete";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { act, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import {
  createTestingRouter,
  mockFenetreFicheTestFunctions
} from "../../../../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

beforeAll(() => {
  TypePieceJustificative.init();
});

describe("ResumeRequetePartieHaute", () => {
  test("Doit afficher le nomFamille du requerant quand la QUALITE est PARTICULIER", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: (
            <ResumeRequete
              requete={await mappingRequeteDelivrance(
                ReponseAppelDetailRequeteDelivrance.data
              )}
            />
          )
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          "a4cefb71-8457-4f6b-937e-34b49335d404"
        )
      ]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Description requête")).toBeDefined();
      expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
      expect(screen.getByText("CHOULARD Thierry")).toBeDefined();
    });
  });

  test("Doit afficher le nomInstitution de l'institutionnel quand la QUALITE est INSTITUTIONNEL", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
            element: (
              <ResumeRequete
                requete={await mappingRequeteDelivrance(
                  detailRequeteDelivranceAvecRequerantQualiteInstitutionnel.data
                )}
              />
            )
          }
        ],
        [
          getUrlWithParam(
            URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
            "a4cefb71-8457-4f6b-937e-34b49335d423"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Description requête")).toBeDefined();
      expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
      expect(screen.getByText("TRIBUNAL")).toBeDefined();
    });
  });

  test("Doit afficher la raisonSociale de l'institutionnel quand la QUALITE est AUTRE PROFESSIONNEL", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
            element: (
              <ResumeRequete
                requete={await mappingRequeteDelivrance(
                  detailRequeteDelivranceAvecRequerantQualiteAutreProfessionnel.data
                )}
              />
            )
          }
        ],
        [
          getUrlWithParam(
            URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
            "a4cefb71-8457-4f6b-937e-34b49335d412"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Description requête")).toBeDefined();
      expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
      expect(screen.getByText("RaisonSocialAutrePro")).toBeDefined();
    });
  });

  test("Doit afficher le nomFamille de l'institutionnel quand la QUALITE est UTILISATEUR RECE", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
            element: (
              <ResumeRequete
                requete={await mappingRequeteDelivrance(
                  detailRequeteDelivranceAvecRequerantQualiteUtilisateurRece.data
                )}
              />
            )
          }
        ],
        [
          getUrlWithParam(
            URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
            "a4cefb71-8457-4f6b-937e-34b49335d412"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Description requête")).toBeDefined();

      expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();

      expect(screen.getByText("UtilRece Thierry")).toBeDefined();
    });
  });
});
