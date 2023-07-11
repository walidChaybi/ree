import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { act, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";
import { mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
    "a4cefb71-8457-4f6b-937e-34b49335d404"
  )
);

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

test("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", async () => {
  const { container } = render(
    <Router history={history}>
      <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID}>
        <ApercuRequetePage />
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

test("renders ApercuRequetePage", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID}
          >
            <ApercuRequetePage />
          </Route>
        </Router>
      </>
    );
  });

  const bandeau = screen.getByText(
    /Requête à traiter, attribuée à Ashley YOUNG - Le : 14\/07\/2020/i
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
    expect(document.title).toBe("Aperçu de la requête");
    expect(bandeau).toBeDefined();
    expect(actions).toBeDefined();
    expect(listeAction1).toBeDefined();
    expect(listeAction2).toBeDefined();
    expect(listeObservation1).toBeDefined();
    expect(listeObservation2).toBeDefined();
  });
});
