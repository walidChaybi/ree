import { userDroitCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { EditionExtraitCopiePage } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import {
  PATH_EDITION,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_EDITION_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { MemoryHistory, createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";
import { mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";

let history: MemoryHistory;

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

beforeEach(async () => {
  storeRece.utilisateurCourant = userDroitCOMEDEC;

  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
});

describe("Test onglets documents édites", () => {
  test("Doit rendre le bouton + pour ajouter un document complémentaire quand un seul documentResponse est présent dans la requête", async () => {
    history.push(
      `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f77/19c0d767-64e5-4376-aa1f-6d781a2a235a`
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
            <EditionExtraitCopiePage />
          </Route>
        </Router>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByTitle("Ajout d'un document complémentaire")
      ).toBeDefined();
    });
  });

  test("Doit rendre le bouton x pour retirer un document complémentaire quand plusieurs documentResponse sont présent dans la requête", async () => {
    history.push(
      `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f`
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
            <EditionExtraitCopiePage />
          </Route>
        </Router>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByTitle("Suppression du document complémentaire")
      ).toBeDefined();
    });
  });

  test("Ne doit pas permettre l'ajout d'un même document complémentaire dans une requête", async () => {
    history.push(
      `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f77/19c0d767-64e5-4376-aa1f-6d781a2a235a`
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
            <EditionExtraitCopiePage />
          </Route>
        </Router>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByTitle("Ajout d'un document complémentaire")
      ).toBeDefined();
      fireEvent.click(screen.getByTitle("Ajout d'un document complémentaire"));
      expect(screen.getByText("Extrait plurilingue"));
      expect(screen.getByText("Extrait avec filiation"));
      expect(screen.getByText("Extrait sans filiation"));
    });
  });

  test("Doit ajouter le document selectionné au click sur le menu", async () => {
    history.push(
      `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b272-b9de4g683aaf/19c0d767-64e5-4376-aa1f-6d781a2a235a`
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
            <EditionExtraitCopiePage />
          </Route>
        </Router>
      );
    });

    await waitFor(() => {
      let boutonAjouterDocument: HTMLElement;
      expect(
        screen.getByTitle("Ajout d'un document complémentaire")
      ).toBeDefined();
      fireEvent.click(screen.getByTitle("Ajout d'un document complémentaire"));
      boutonAjouterDocument = screen.getAllByText("Extrait avec filiation")[0];
      expect(boutonAjouterDocument).toBeDefined();
      fireEvent.click(boutonAjouterDocument);
    });

    await waitFor(() => {
      expect(screen.getByText("Extrait avec filiation")).toBeDefined();
    });
  });

  test("Doit afficher un message d'erreur quand le nombre de titulaire est > 1 dans un acte de naissance/décès pour une demande plurilingue", async () => {
    history.push(
      `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4038-b271-b9de48283a8f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
            <EditionExtraitCopiePage />
          </Route>
        </Router>
      );
    });

    await waitFor(() => {
      let boutonAjouterDocument: HTMLElement;
      expect(
        screen.getByTitle("Ajout d'un document complémentaire")
      ).toBeDefined();
      fireEvent.click(screen.getByTitle("Ajout d'un document complémentaire"));
      boutonAjouterDocument = screen.getByText("Extrait plurilingue");
      expect(boutonAjouterDocument).toBeDefined();
      fireEvent.click(boutonAjouterDocument);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Pas de délivrance d'extrait sur la base d'un acte à titulaires multiples."
        )
      ).toBeDefined();
    });
  });

  test("Doit afficher une erreur si le titulaire est de genre indetermine quand le choix est extrait pluri", async () => {
    history.push(
      `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4038-b272-b9de48683a8f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
            <EditionExtraitCopiePage />
          </Route>
        </Router>
      );
    });

    await waitFor(() => {
      let boutonAjouterDocument: HTMLElement;
      expect(
        screen.getByTitle("Ajout d'un document complémentaire")
      ).toBeDefined();
      fireEvent.click(screen.getByTitle("Ajout d'un document complémentaire"));
      boutonAjouterDocument = screen.getByText("Extrait plurilingue");
      expect(boutonAjouterDocument).toBeDefined();
      fireEvent.click(boutonAjouterDocument);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Pas de délivrance d'extrait plurilingue de naissance avec une personne de genre indéterminé ou des parents de même sexe."
        )
      ).toBeDefined();
    });
  });
});
