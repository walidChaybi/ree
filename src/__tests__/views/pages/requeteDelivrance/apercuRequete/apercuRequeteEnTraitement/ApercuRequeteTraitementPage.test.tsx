import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { ApercuRequeteTraitementPage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";
import { mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

const sauvFonctionEstActive = gestionnaireFeatureFlag.estActif;

let history: any;

beforeEach(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS as IUtilisateur[];
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  gestionnaireFeatureFlag.estActif = function () {
    return true;
  };
  history = createMemoryHistory();
});

afterAll(() => {
  gestionnaireFeatureFlag.estActif = sauvFonctionEstActive;
});

test("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d494"
    )
  );
  const { container } = render(
    <Router history={history}>
      <Route
        exact={true}
        path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
      >
        <ApercuRequeteTraitementPage />
      </Route>
    </Router>
  );

  await waitFor(() => {
    expect(
      container.getElementsByClassName("OperationLocaleEnCoursSimple").length
    ).toBe(1);
  });

  setTimeout(() => {
    act(() => {
      expect(
        container.getElementsByClassName("OperationLocaleEnCoursSimple").length
      ).toBe(0);
    });
  }, 3000);
});

test("renders ApercuRequeteTraitementPage", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d494"
    )
  );
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });

  const bandeau = screen.getByText(
    "Requête à signer le 14/07/2020 par Ashley YOUNG"
  );
  const actions = screen.getByText(/Suivi requête/i);

  const listeAction1 = screen.getByText(
    /Saisie de la requête - 10\/03\/2020 - APP/i
  );
  const listeAction2 = screen.getByText(/À traiter - 10\/03\/2020 - BOB/i);

  const listeObservation1 = screen.getByText(
    /C'est vraiment dur de pouvo... - 02\/01\/1970/i
  );
  const listeObservation2 = screen.getByText(
    /Je fais pas 30 charactères - 02\/01\/1970 - BOB/i
  );

  await waitFor(() => {
    expect(document.title).toBe("Aperçu de la requête en traitement");
    expect(bandeau).toBeDefined();
    expect(actions).toBeDefined();
    expect(listeAction1).toBeDefined();
    expect(listeAction2).toBeDefined();
    expect(listeObservation1).toBeDefined();
    expect(listeObservation2).toBeDefined();
  });
});

test("renders document réponses", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d494"
    )
  );
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });
  const title = screen.getByText(/Documents à délivrer/i);
  const doc1 = screen.getByText(/^Courrier$/);
  const doc2 = screen.getByText(/Certificat d'inscription au RCA/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(doc1).toBeDefined();
    expect(doc2).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(doc1);
  });
});

test("transmettre à valideur", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d494"
    )
  );
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Transmettre à valideur")).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Transmettre à valideur"));
  });

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;
  autocomplete.focus();
  act(() => {
    fireEvent.change(inputChampRecherche, {
      target: {
        value: "d"
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Dylan Bob")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByText("Dylan Bob"));
    fireEvent.change(screen.getByPlaceholderText("Pour vérification"), {
      target: {
        value: "salut"
      }
    });
  });

  await waitFor(() => {
    expect(
      (screen.getByText("Valider") as HTMLButtonElement).disabled
    ).toBeFalsy();
  });

  act(() => {
    fireEvent.click(screen.getByText("Valider"));
  });

  await waitFor(() => {
    expect(history.location.pathname).toStrictEqual(
      URL_MES_REQUETES_DELIVRANCE
    );
  });
});

test("retour approuvé", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d495"
    )
  );
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Relecture commentée")).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Relecture commentée"));
  });

  act(() => {
    fireEvent.change(screen.getByPlaceholderText("En retour"), {
      target: {
        value: "c'est nul"
      }
    });
  });

  await waitFor(() => {
    expect(
      (screen.getByText("Valider") as HTMLButtonElement).disabled
    ).toBeFalsy();
  });

  act(() => {
    fireEvent.click(screen.getByText("Valider"));
  });

  await waitFor(() => {
    expect(history.location.pathname).toStrictEqual(
      URL_MES_REQUETES_DELIVRANCE
    );
  });
});

test("reprendre traitement", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d495"
    )
  );
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Reprendre le traitement")).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Reprendre le traitement"));
  });
});
