import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { ResumeRequete } from "@pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/resume/ResumeRequete";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router";
import { beforeAll, describe, expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte, mockFenetreFicheTestFunctions } from "../../../../../../../__tests__utils__/testsUtil";
import {
  ReponseAppelDetailRequeteDelivrance,
  detailRequeteDelivranceAvecRequerantQualiteAutreProfessionnel,
  detailRequeteDelivranceAvecRequerantQualiteInstitutionnel,
  detailRequeteDelivranceAvecRequerantQualiteUtilisateurRece
} from "../../../../../../../mock/data/DetailRequeteDelivrance";
import { TYPE_PIECE_JUSTIFICATIVE } from "../../../../../../../mock/data/NomenclatureTypePieceJustificative";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

beforeAll(() => {
  TypePieceJustificative.init(TYPE_PIECE_JUSTIFICATIVE);
});

describe("ResumeRequetePartieHaute", () => {
  test("Doit afficher le nomFamille du requerant quand la QUALITE est PARTICULIER", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: <ResumeRequete requete={mappingRequeteDelivrance(ReponseAppelDetailRequeteDelivrance.data, [])} />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID, "a4cefb71-8457-4f6b-937e-34b49335d404")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />));

    waitFor(() => {
      expect(screen.getByText("Description requête")).toBeDefined();
      expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
      expect(screen.getByText("CHOULARD Thierry")).toBeDefined();
    });
  });

  test("Doit afficher le nomInstitution de l'institutionnel quand la QUALITE est INSTITUTIONNEL", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: <ResumeRequete requete={mappingRequeteDelivrance(detailRequeteDelivranceAvecRequerantQualiteInstitutionnel.data, [])} />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID, "a4cefb71-8457-4f6b-937e-34b49335d423")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />));

    waitFor(() => {
      expect(screen.getByText("Description requête")).toBeDefined();
      expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
      expect(screen.getByText("TRIBUNAL")).toBeDefined();
    });
  });

  test("Doit afficher la raisonSociale de l'institutionnel quand la QUALITE est AUTRE PROFESSIONNEL", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: (
            <ResumeRequete requete={mappingRequeteDelivrance(detailRequeteDelivranceAvecRequerantQualiteAutreProfessionnel.data, [])} />
          )
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID, "a4cefb71-8457-4f6b-937e-34b49335d412")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />));

    waitFor(() => {
      expect(screen.getByText("Description requête")).toBeDefined();
      expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
      expect(screen.getByText("RaisonSocialAutrePro")).toBeDefined();
    });
  });

  test("Doit afficher le nomFamille de l'institutionnel quand la QUALITE est UTILISATEUR RECE", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: <ResumeRequete requete={mappingRequeteDelivrance(detailRequeteDelivranceAvecRequerantQualiteUtilisateurRece.data, [])} />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID, "a4cefb71-8457-4f6b-937e-34b49335d412")]
    );

    render(elementAvecContexte(<RouterProvider router={router} />));

    waitFor(() => {
      expect(screen.getByText("Description requête")).toBeDefined();

      expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();

      expect(screen.getByText("UtilRece Thierry")).toBeDefined();
    });
  });
});
