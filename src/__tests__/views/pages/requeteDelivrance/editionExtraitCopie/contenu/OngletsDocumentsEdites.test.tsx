import { PATH_EDITION, URL_MES_REQUETES_DELIVRANCE, URL_MES_REQUETES_DELIVRANCE_EDITION_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { beforeAll, describe, expect, test } from "vitest";
import PageEditionRequeteDelivrance from "../../../../../../pages/requetesDelivrance/PageEditionRequeteDelivrance";
import { createTestingRouter, elementAvecContexte, mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";
import { userDroitCOMEDEC } from "../../../../../mock/data/mockConnectedUserAvecDroit";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

describe("Test onglets documents édites", () => {
  test.skip("Doit rendre le bouton + pour ajouter un document complémentaire quand un seul documentResponse est présent dans la requête", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <PageEditionRequeteDelivrance />
        }
      ],
      [
        URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
        `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f77/19c0d767-64e5-4376-aa1f-6d781a2a235a`
      ]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitCOMEDEC));

    waitFor(() => {
      expect(screen.getByTitle("Ajout d'un document complémentaire")).toBeDefined();
    });
  });

  test.skip("Doit rendre le bouton x pour retirer un document complémentaire quand plusieurs documentResponse sont présent dans la requête", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <PageEditionRequeteDelivrance />
        }
      ],
      [`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f`]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitCOMEDEC));

    waitFor(() => {
      expect(screen.getByTitle("Suppression du document complémentaire")).toBeDefined();
    });
  });

  test.skip("Ne doit pas permettre l'ajout d'un même document complémentaire dans une requête", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <PageEditionRequeteDelivrance />
        }
      ],
      [`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f77/19c0d767-64e5-4376-aa1f-6d781a2a235a`]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitCOMEDEC));

    waitFor(() => {
      expect(screen.getByTitle("Ajout d'un document complémentaire")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Ajout d'un document complémentaire"));

    waitFor(() => {
      expect(screen.getByText("Extrait plurilingue"));
      expect(screen.getByText("Extrait avec filiation"));
      expect(screen.getByText("Extrait sans filiation"));
    });
  });

  test.skip("Doit ajouter le document selectionné au click sur le menu", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <PageEditionRequeteDelivrance />
        }
      ],
      [`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b272-b9de4g683aaf/19c0d767-64e5-4376-aa1f-6d781a2a235a`]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitCOMEDEC));

    waitFor(() => {
      expect(screen.getByTitle("Ajout d'un document complémentaire")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Ajout d'un document complémentaire"));

    let boutonAjouterDocument = screen.getAllByText("Extrait avec filiation")[0] as HTMLElement;

    waitFor(() => {
      expect(boutonAjouterDocument).toBeDefined();
    });

    fireEvent.click(boutonAjouterDocument);

    waitFor(() => {
      expect(screen.getByText("Extrait avec filiation")).toBeDefined();
    });
  });

  test.skip("Doit afficher un message d'erreur quand le nombre de titulaire est > 1 dans un acte de naissance/décès pour une demande plurilingue", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <PageEditionRequeteDelivrance />
        }
      ],
      [`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4038-b271-b9de48283a8f/19c0d767-64e5-4376-aa1f-6d781a2a235a`]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitCOMEDEC));

    waitFor(() => {
      expect(screen.getByTitle("Ajout d'un document complémentaire")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Ajout d'un document complémentaire"));

    let boutonAjouterDocument = screen.getByText("Extrait plurilingue") as HTMLElement;

    waitFor(() => {
      expect(boutonAjouterDocument).toBeDefined();
    });

    fireEvent.click(boutonAjouterDocument);

    waitFor(() => {
      expect(screen.getByText("Pas de délivrance d'extrait sur la base d'un acte à titulaires multiples.")).toBeDefined();
    });
  });

  test.skip("Doit afficher une erreur si le titulaire est de genre indetermine quand le choix est extrait pluri", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <PageEditionRequeteDelivrance />
        }
      ],
      [`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4038-b272-b9de48683a8f/19c0d767-64e5-4376-aa1f-6d781a2a235a`]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitCOMEDEC));

    waitFor(() => {
      expect(screen.getByTitle("Ajout d'un document complémentaire")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Ajout d'un document complémentaire"));

    let boutonAjouterDocument = screen.getByText("Extrait plurilingue") as HTMLElement;

    waitFor(() => {
      expect(boutonAjouterDocument).toBeDefined();
    });

    fireEvent.click(boutonAjouterDocument);

    waitFor(() => {
      expect(
        screen.getByText(
          "Pas de délivrance d'extrait plurilingue de naissance avec une personne de genre indéterminé ou des parents de même sexe."
        )
      ).toBeDefined();
    });
  });
});
