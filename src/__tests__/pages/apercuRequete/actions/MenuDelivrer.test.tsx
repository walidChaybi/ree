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
import { idRequete1, requete1 } from "../../../../mock/data/RequeteV2";
import { DataRMCInscriptionAvecResultat } from "../../../../mock/data/RMCInscription";
import { configMultiAPi } from "../../../../mock/superagent-config/superagent-mock-multi-apis";
import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { MenuDelivrer } from "../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/MenuDelivrer";
import {
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configMultiAPi);

test("renders du bloc Menu Delivrer", async () => {
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequete1
    )
  );

  await act(async () => {
    requete1.documentDemande = await DocumentDelivrance.getDocumentDelivrance(
      "ec161aa5-5c0c-429d-abdf-f9017e8e26b4"
    );

    render(
      <Router history={history}>
        <MenuDelivrer
          requete={requete1}
          inscriptionSelected={DataRMCInscriptionAvecResultat}
        />
      </Router>
    );
  });
  let menuDelivrer = screen.getByText("Délivrer");
  let certificatSituation: HTMLElement;

  await waitFor(() => {
    expect(menuDelivrer).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(menuDelivrer);
  });

  await waitFor(() => {
    certificatSituation = screen.getByText(/Certificat de situation/i);
    expect(certificatSituation).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(certificatSituation);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID, idRequete1)
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
