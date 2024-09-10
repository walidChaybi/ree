import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { ApercuRequeteEtablissementSaisieDeProjetPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/ApercuRequeteEtablissementSaisieDeProjetPage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import "../../../../../../../mock/element/IntersectionObserver";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

describe("Test de la page Aperçu requête etablissement sasie projet", () => {
  test.skip("DOIT afficher l'onglet pièces justificatives et postulant QUAND on arrive sur la page", () => {
    afficherPageRequeteCreationEtablissment();

    waitFor(() => {
      expect(screen.getByText("RMC")).toBeDefined();
      expect(
        screen
          .getByText("Pièces justificatives / Annexes")
          .getAttribute("aria-selected")
      ).toBe("true");
      expect(screen.getByText("Apercu du projet")).toBeDefined();
      expect(
        screen.getAllByText("Postulant")[0].getAttribute("aria-selected")
      ).toBe("true");
      expect(screen.getByText("Echanges")).toBeDefined();
      expect(screen.getByText("Apercu du projet")).toBeDefined();
    });
  });

  test.skip("DOIT changer d'onglet selectionner QUAND on clique sur le bouton actualiser & visualiser", () => {
    afficherPageRequeteCreationEtablissment();

    waitFor(() => {
      expect(screen.getByText("Apercu du projet")).toBeDefined();
      expect(
        screen.getByText("Apercu du projet").getAttribute("aria-selected")
      ).toBe("false");
      expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    waitFor(() => {
      expect(
        screen.getByText("Apercu du projet").getAttribute("aria-selected")
      ).toBe("true");
    });
  });
});

function afficherPageRequeteCreationEtablissment() {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
        element: <ApercuRequeteEtablissementSaisieDeProjetPage />
      }
    ],
    [
      `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/er5ez456-354v-461z-c5fd-162md289m74h/a272ec8a-1351-4edd-99b8-03004292a9d2`
    ]
  );

  render(
    <MockRECEContextProvider>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
}
