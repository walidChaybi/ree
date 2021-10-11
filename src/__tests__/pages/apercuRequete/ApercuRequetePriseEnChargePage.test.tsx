import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { LISTE_UTILISATEURS } from "../../../mock/data/ListeUtilisateurs";
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../mock/data/RMCActe";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "../../../mock/data/RMCInscription";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../views/common/util/storeRece";
import { ApercuRequetePriseEnChargePage } from "../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { MOTIF_IGNORE } from "../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/IgnoreRequetePopin";
import { URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

global.URL.createObjectURL = jest.fn();
const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    "a4cefb71-8457-4f6b-937e-34b49335d884"
  ),
  {
    dataRequetes: [],
    dataRMCAutoActe: DataRMCActeAvecResultat,
    dataTableauRMCAutoActe: { DataTableauActe },
    dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
    dataTableauRMCAutoInscription: { DataTableauInscription }
  }
);

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

test("renders ApercuRequetePriseEnChargePage", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
          >
            <ApercuRequetePriseEnChargePage />
          </Route>
        </Router>
      </>
    );
  });

  screen.debug();

  const title = screen.getByText(/Aperçu de la requête en prise en charge/i);
  const bandeau = screen.getByText(
    "Requête prise en charge par : Ashley YOUNG - Le : 14/07/2020"
  );
  const actions = screen.getByText(/Suivi des actions/i);

  const listeAction1 = screen.getByText(
    /Saisie de la requête - 10\/03\/2020 - APP/i
  );
  const listeAction2 = screen.getByText(/A traiter - 10\/03\/2020 - BOB/i);

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
  });

  // Tableau Acte
  await act(async () => {
    fireEvent.click(checkboxColumns[0], { target: { checked: true } });
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(checkboxColumns[0], { target: { checked: false } });
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  // Tableau inscription
  await act(async () => {
    fireEvent.click(checkboxColumns[10], { target: { checked: true } });
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(checkboxColumns[10], { target: { checked: false } });
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
            path={URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
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
    fireEvent.click(checkboxColumns[0], { target: { checked: true } });
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
    "/rece/rece-ui/mesrequetesv2/apercurequetetraitement/a4cefb71-8457-4f6b-937e-34b49335d884"
  );
});
test("redirection requete RDC", async () => {
  const history2 = createMemoryHistory();
  history2.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d666"
    ),
    {
      dataRequetes: [],
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
            path={URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
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
    fireEvent.click(checkboxColumns[0], { target: { checked: true } });
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
    "/rece/rece-ui/mesrequetesv2/apercurequetepriseencharge/apercucourrier/a4cefb71-8457-4f6b-937e-34b49335d666"
  );
});

test("ignorer requete", async () => {
  const history2 = createMemoryHistory();
  history2.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d666"
    ),
    {
      dataRequetes: [],
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
            path={URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
          >
            <ApercuRequetePriseEnChargePage />
          </Route>
        </Router>
      </>
    );
  });
  const title = screen.getByText(/Documents à délivrer/i);
  const doc1 = screen.getByText(/CARN_CSPAC_01/i);
  const doc2 = screen.getByText(/CERTIFICAT_INSCRIPTION_RCA/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(doc1).toBeDefined();
    expect(doc2).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(doc2);
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Réponse sans délivrance"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Ignorer+/));
  });

  const select = screen.getByLabelText(MOTIF_IGNORE) as HTMLSelectElement;

  await act(async () => {
    fireEvent.change(select, {
      target: {
        value: "Adresse incomplète"
      }
    });
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Valider"));
  });
});

afterAll(() => {
  superagentMock.unset();
});
