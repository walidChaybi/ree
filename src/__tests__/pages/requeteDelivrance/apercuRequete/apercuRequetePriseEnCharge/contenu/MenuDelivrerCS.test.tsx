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
import {
  idRequeteRDC,
  idRequeteRDCSC,
  requeteRDCSC
} from "../../../../../../mock/data/RequeteV2";
import { DataRMCInscriptionAvecUnRCA } from "../../../../../../mock/data/RMCInscription";
import { configComposition } from "../../../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesV2 } from "../../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { getUrlWithParam } from "../../../../../../views/common/util/route/routeUtil";
import { MenuDelivrerCS } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuDelivrerCS";
import {
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID
} from "../../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configRequetesV2[0],
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
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
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
        URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID,
        idRequeteRDC
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
