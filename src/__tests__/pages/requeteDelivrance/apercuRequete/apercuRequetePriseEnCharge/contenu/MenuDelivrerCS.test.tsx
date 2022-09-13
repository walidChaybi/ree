import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MenuDelivrerCS } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuDelivrerCS";
import {
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/routeUtil";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import {
  idRequeteRDC,
  idRequeteRDCSC,
  requeteRDCSC
} from "../../../../../../mock/data/requeteDelivrance";
import { DataRMCInscriptionAvecUnRCA } from "../../../../../../mock/data/RMCInscription";
import { configComposition } from "../../../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configComposition[0],
  configEtatcivil[0]
]);

beforeAll(() => {
  DocumentDelivrance.init();
});
const history = createMemoryHistory();

beforeEach(() => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequeteRDCSC
    )
  );

  requeteRDCSC.documentDemande = DocumentDelivrance.getDocumentDelivrance(
    "ec161aa5-5c0c-429d-abdf-f9017e8e26b4"
  );

  render(
    <Router history={history}>
      <MenuDelivrerCS
        requete={requeteRDCSC}
        inscriptions={DataRMCInscriptionAvecUnRCA}
      />
    </Router>
  );
});

test("renders du bloc Menu Delivrer Certificat de Situation", async () => {
  let menuDelivrer = screen.getByText("Délivrer");
  let certificatSituation = screen.getByText(/Certificat de situation/i);

  expect(menuDelivrer).toBeDefined();
  expect(certificatSituation).toBeDefined();

  await act(async () => {
    fireEvent.click(certificatSituation);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
        idRequeteRDC
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
