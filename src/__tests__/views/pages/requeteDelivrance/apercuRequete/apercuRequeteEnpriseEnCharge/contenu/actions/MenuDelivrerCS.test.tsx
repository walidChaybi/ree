import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { DOCUMENT_DELIVRANCE } from "@mock/data/NomenclatureDocumentDelivrance";
import { DataRMCActeAvecResultat } from "@mock/data/RMCActe";
import { DataRMCInscriptionAvecUnRCA } from "@mock/data/RMCInscription";
import { idRequeteRDC, idRequeteRDCSC, requeteRDCSC } from "@mock/data/requeteDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { ApercuRequeteTraitementPage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { MenuDelivrerCS } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuDelivrerCS";
import {
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { act } from "react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../../__tests__utils__/testsUtil";

describe("Test MenuDelivrerCS", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);

  const routerAvecContexte = (router: any): any => {
    return (
      <MockRECEContextProvider>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );
  };
  test.skip("renders du bloc Menu Delivrer Certificat de Situation", async () => {
    requeteRDCSC.documentDemande = DocumentDelivrance.depuisId("ec161aa5-5c0c-429d-abdf-f9017e8e26b4");

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: (
            <MenuDelivrerCS
              requete={requeteRDCSC}
              inscriptions={DataRMCInscriptionAvecUnRCA}
            />
          )
        },
        {
          path: getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, idRequeteRDC),
          element: <ApercuRequeteTraitementPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDCSC)]
    );

    render(routerAvecContexte(router));

    let menuDelivrer = screen.getByText("Délivrer");
    let certificatSituation = screen.getByText(/Certificat de situation/i);

    await waitFor(() => {
      expect(menuDelivrer).toBeDefined();
      expect(certificatSituation).toBeDefined();
    });

    fireEvent.click(certificatSituation);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, idRequeteRDC));
    });
  });

  test.skip("renders du bloc Menu Delivrer Attestation PACS", async () => {
    const requete = { ...requeteRDCSC };
    requete.documentDemande = DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_ATTESTATION_PACS);

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: (
            <MenuDelivrerCS
              requete={requete}
              inscriptions={DataRMCInscriptionAvecUnRCA}
            />
          )
        },
        {
          path: getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, idRequeteRDC),
          element: <ApercuRequeteTraitementPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDCSC)]
    );

    render(routerAvecContexte(router));

    await waitFor(() => {
      const menuDelivrer = screen.getByText("Délivrer");
      const attestation = screen.getByText(/Attestation PACS/i);

      expect(menuDelivrer).toBeDefined();
      expect(attestation).toBeDefined();
    });

    act(() => {
      const attestation = screen.getByText(/Attestation PACS/i);
      fireEvent.click(attestation);
    });

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, idRequeteRDC));
    });
  });

  test("attestationPACS sans inscription", () => {
    const requete = { ...requeteRDCSC };
    requete.documentDemande = DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_ATTESTATION_PACS);

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: (
            <MenuDelivrerCS
              requete={requete}
              inscriptions={[]}
              actes={[]}
            />
          )
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDCSC)]
    );

    render(routerAvecContexte(router));

    let menuDelivrer = screen.getByText("Délivrer");
    let attestation = screen.getByText(/Attestation PACS/i);

    waitFor(() => {
      expect(menuDelivrer).toBeDefined();
      expect(attestation).toBeDefined();
    });

    fireEvent.click(attestation);

    waitFor(() => {
      expect(screen.getByText("Il faut sélectionner au moins un PACS au statut fiche actif")).toBeDefined();
    });
  });

  test("attestation pacs acte séléctionné", () => {
    const requete = { ...requeteRDCSC };
    requete.documentDemande = DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_ATTESTATION_PACS);

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: (
            <MenuDelivrerCS
              requete={requete}
              inscriptions={DataRMCInscriptionAvecUnRCA}
              actes={DataRMCActeAvecResultat}
            />
          )
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDCSC)]
    );

    render(routerAvecContexte(router));

    let menuDelivrer = screen.getByText("Délivrer");
    let attestation = screen.getByText(/Attestation PACS/i);

    waitFor(() => {
      expect(menuDelivrer).toBeDefined();
      expect(attestation).toBeDefined();
    });

    fireEvent.click(attestation);

    waitFor(() => {
      expect(screen.getByText("Votre sélection n'est pas cohérente avec le choix de l'action de réponse")).toBeDefined();
    });
  });
});
