import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_ATTESTATION_PACS } from "@model/requete/enum/DocumentDelivranceConstante";
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
import { DataRMCActeAvecResultat } from "../../../../../../mock/data/RMCActe";
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
});

test("renders du bloc Menu Delivrer Certificat de Situation", async () => {
  act(() => {
    render(
      <Router history={history}>
        <MenuDelivrerCS
          requete={requeteRDCSC}
          inscriptions={DataRMCInscriptionAvecUnRCA}
        />
      </Router>
    );
  });

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

test("renders du bloc Menu Delivrer Attestation PACS", async () => {
  const requete = { ...requeteRDCSC };
  requete.documentDemande = DocumentDelivrance.getEnumForCode(
    CODE_ATTESTATION_PACS
  );
  act(() => {
    render(
      <Router history={history}>
        <MenuDelivrerCS
          requete={requete}
          inscriptions={DataRMCInscriptionAvecUnRCA}
        />
      </Router>
    );
  });

  let menuDelivrer = screen.getByText("Délivrer");
  let attestation = screen.getByText(/Attestation PACS/i);

  expect(menuDelivrer).toBeDefined();
  expect(attestation).toBeDefined();

  await act(async () => {
    fireEvent.click(attestation);
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

test("attestationPACS sans inscription", async () => {
  const requete = { ...requeteRDCSC };
  requete.documentDemande = DocumentDelivrance.getEnumForCode(
    CODE_ATTESTATION_PACS
  );
  render(
    <Router history={history}>
      <MenuDelivrerCS requete={requete} inscriptions={[]} actes={[]} />
    </Router>
  );
  let menuDelivrer = screen.getByText("Délivrer");
  let attestation = screen.getByText(/Attestation PACS/i);

  expect(menuDelivrer).toBeDefined();
  expect(attestation).toBeDefined();

  await act(async () => {
    fireEvent.click(attestation);
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        "Il faut sélectionner au moins un PACS au statut fiche actif"
      )
    ).toBeDefined();
  });
});

test("attestation pacs acte séléctionné", async () => {
  const requete = { ...requeteRDCSC };
  requete.documentDemande = DocumentDelivrance.getEnumForCode(
    CODE_ATTESTATION_PACS
  );
  render(
    <Router history={history}>
      <MenuDelivrerCS
        requete={requete}
        inscriptions={DataRMCInscriptionAvecUnRCA}
        actes={DataRMCActeAvecResultat}
      />
    </Router>
  );
  let menuDelivrer = screen.getByText("Délivrer");
  let attestation = screen.getByText(/Attestation PACS/i);

  expect(menuDelivrer).toBeDefined();
  expect(attestation).toBeDefined();

  await act(async () => {
    fireEvent.click(attestation);
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        "Votre sélection n'est pas cohérente avec le choix de l'action de réponse"
      )
    ).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
