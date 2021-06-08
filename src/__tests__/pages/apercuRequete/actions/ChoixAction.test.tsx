import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { configMultiAPi } from "../../../../../src/mock/superagent-config/superagent-mock-multi-apis";
import { idRequete1, requete1 } from "../../../../mock/data/RequeteV2";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { ChoixAction } from "../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/ChoixAction";
import { URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID } from "../../../../views/router/ReceUrls";
const superagentMock = require("superagent-mock")(request, configMultiAPi);

test("renders du bloc choix des actions", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ChoixAction requete={requete1} />
    </Router>
  );

  let menuReponseNegative: HTMLElement;
  let choixRequeteIncomplete: HTMLElement;
  await waitFor(() => {
    expect(screen.getByText("Délivrer")).toBeInTheDocument();
    menuReponseNegative = screen.getByText("Réponse négative");
    expect(menuReponseNegative).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(menuReponseNegative);
  });

  await waitFor(() => {
    choixRequeteIncomplete = screen.getByText(
      /Requête incomplète ou illisible.+/
    );
    expect(choixRequeteIncomplete).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(choixRequeteIncomplete);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID,
        idRequete1
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
