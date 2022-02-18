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
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { EditionExtraitCopiePage } from "../../../../views/pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_EDITION_ID } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0]
]);

const history = createMemoryHistory();
const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();

beforeAll(async () => {
  DocumentDelivrance.init();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_EDITION_ID,
      "5f14ef25-d720-4c12-867f-d7fa6e3cb780"
    ),
    "5f43dcf3-3388-487c-af06-f59b2f856bb2"
  );
  await act(async () => {
    render(
      <Router history={history}>
        <Route
          exact={true}
          path={
            URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_EDITION_ID
          }
        >
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });
});

test("Test affichage Edition Extrait copie", async () => {
  await waitFor(() => {
    expect(screen.getByText("Visualisation")).toBeDefined();
    expect(screen.getByText("Édition")).toBeDefined();
    screen.debug();
  });

  act(() => {
    fireEvent.click(screen.getByText("Extrait sans filiation"));
    fireEvent.click(screen.getByText("Requête"));
  });

  await waitFor(() => {
    expect(screen.getByText("Délivrance Extrait/Copie courrier")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
