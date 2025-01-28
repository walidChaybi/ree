import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { IOfficier } from "@model/agent/IOfficier";
import { ApercuRequeteEtablissementSuiviDossierPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/ApercuRequeteEtablissementSuiviDossierPage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter, mockFenetreFicheTestFunctions } from "../../../../../../__tests__utils__/testsUtil";

describe("Test de la page Aperçu requête etablissement suivi dossier", () => {
  mockFenetreFicheTestFunctions();

  const afficherPageRequeteCreationEtablissment = () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          element: <ApercuRequeteEtablissementSuiviDossierPage />
        }
      ],
      [
        getUrlWithParam(
          `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER}/:idRequete`,
          "3ed9aa4e-921b-489f-b8fe-531dd703c60z"
        )
      ]
    );

    render(
      <MockRECEContextProvider utilisateurConnecte={{ idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55" } as IOfficier}>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );
  };

  test("DOIT afficher les onglets avec pièce justificative active QUAND on arrive sur la page", async () => {
    afficherPageRequeteCreationEtablissment();

    await waitFor(() => {
      expect(screen.getByText("Pièces justificatives / Annexes")).toBeDefined();
      expect(screen.getByText("RMC")).toBeDefined();
      expect(screen.getByText("Suivi dossier").getAttribute("aria-selected")).toBe("true");
      expect(screen.getByText("Echanges")).toBeDefined();
    });
  });

  test.skip("DOIT afficher le projet d'acte dans une fenetre externe QUAND le projet d'acte est à l'avancement SIGNE", async () => {
    afficherPageRequeteCreationEtablissment();

    await waitFor(() => {
      expect(screen.getByText("Suivi dossier").getAttribute("aria-selected")).toBe("true");

      expect(screen.getByText("Nom")).toBeDefined();
      expect(screen.getByText("Prénoms")).toBeDefined();
      expect(screen.getByText("Décret")).toBeDefined();
      expect(screen.getByText("Evénement")).toBeDefined();
      expect(screen.getByText("Date évenement")).toBeDefined();
      expect(screen.getByText("Avancement")).toBeDefined();
    });

    await waitFor(() => {
      expect(screen.getAllByText("Dupont")).toBeDefined();
      expect(screen.getAllByText("Omar, Ayoub")).toBeDefined();
      expect(screen.getAllByText("Naissance")).toBeDefined();
      expect(screen.getAllByText("Signé")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Signé"));

    await waitFor(() => expect(screen.getByText("Visualisation de l'acte")));
  });
});
