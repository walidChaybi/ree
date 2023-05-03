import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { DataRMCActeAvecResultat, DataTableauActe } from "@mock/data/RMCActe";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "@mock/data/RMCInscription";
import { ApercuRequetePriseEnChargePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { MOTIF_IGNORE } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/IgnoreRequetePopin";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import { mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

let history: any;

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;

  history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d884"
    ),
    {
      dataRMCAutoActe: DataRMCActeAvecResultat,
      dataTableauRMCAutoActe: { DataTableauActe },
      dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
      dataTableauRMCAutoInscription: { DataTableauInscription }
    }
  );
});

test("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", async () => {
  const { container } = render(
    <Router history={history}>
      <Route
        exact={true}
        path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
      >
        <ApercuRequetePriseEnChargePage />
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

test("renders ApercuRequetePriseEnChargePage", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
          >
            <ApercuRequetePriseEnChargePage />
          </Route>
        </Router>
      </>
    );
  });

  const title = screen.getByText(/Aperçu de la requête en prise en charge/i);
  const bandeau = screen.getByText(
    "Requête prise en charge par : Ashley YOUNG - Le : 14/07/2020"
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
  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(bandeau).toBeDefined();
    expect(actions).toBeDefined();
    expect(listeAction1).toBeDefined();
    expect(listeAction2).toBeDefined();
    expect(listeObservation1).toBeDefined();
    expect(listeObservation2).toBeDefined();
    expect(checkboxColumns).toBeDefined();
  });

  // Tableau Acte
  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  // Tableau inscription
  await act(async () => {
    fireEvent.click(checkboxColumns[9]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(checkboxColumns[9]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });
});

test("redirection requete RDD", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
          >
            <ApercuRequetePriseEnChargePage />
          </Route>
        </Router>
      </>
    );
  });

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  // Tableau Acte
  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Délivrer"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Copie intégrale/i));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Oui/i));
  });

  expect(history.location.pathname).toBe(
    "/rece/rece-ui/mesrequetes/edition/a4cefb71-8457-4f6b-937e-34b49335d666/b41079a5-9e8d-478c-b04c-c4c2ac67134f"
  );
});

test("redirection requete RDC", async () => {
  const history2 = createMemoryHistory();
  history2.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d666"
    ),
    {
      dataRMCAutoActe: DataRMCActeAvecResultat,
      dataTableauRMCAutoActe: { DataTableauActe },
      dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
      dataTableauRMCAutoInscription: { DataTableauInscription }
    }
  );
  await act(async () => {
    render(
      <>
        <Router history={history2}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
          >
            <ApercuRequetePriseEnChargePage />
          </Route>
        </Router>
      </>
    );
  });

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  // Tableau Acte
  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Délivrer"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Copie intégrale/i));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Oui/i));
  });

  expect(history2.location.pathname).toBe(
    "/rece/rece-ui/mesrequetes/edition/a4cefb71-8457-4f6b-937e-34b49335d666/b41079a5-9e8d-478c-b04c-c4c2ac67134f"
  );
});

test("ignorer requete", async () => {
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d666"
    ),
    {
      dataRMCAutoActe: DataRMCActeAvecResultat,
      dataTableauRMCAutoActe: { DataTableauActe },
      dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
      dataTableauRMCAutoInscription: { DataTableauInscription }
    }
  );
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
          >
            <ApercuRequetePriseEnChargePage />
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
    fireEvent.click(doc2);
  });

  const bontonIgnore = screen.getByText(/Ignorer+/);

  await act(async () => {
    fireEvent.click(bontonIgnore);
  });

  const select = screen.getByTestId(MOTIF_IGNORE) as HTMLSelectElement;

  await act(async () => {
    expect(select).toBeDefined();

    fireEvent.change(select, {
      target: {
        value: "Adresse incomplète"
      }
    });
  });

  const valider = screen.getByText("Valider");
  await waitFor(() => {
    expect(valider).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(valider);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_MES_REQUETES_DELIVRANCE);
  });
});
