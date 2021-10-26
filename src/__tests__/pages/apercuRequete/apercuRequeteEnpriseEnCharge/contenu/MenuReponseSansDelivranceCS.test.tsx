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
  reponseSansDelivranceCSDemandeIncomplete,
  reponseSansDelivranceCSFrancais,
  reponseSansDelivranceCSMariage
} from "../../../../../mock/data/Composition";
import requeteDelivrance, {
  requeteDelivranceInstitutionnel
} from "../../../../../mock/data/requeteDelivrance";
import {
  idRequeteRDCSC,
  requeteRDCSC
} from "../../../../../mock/data/RequeteV2";
import { configComposition } from "../../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configParamsBaseRequete } from "../../../../../mock/superagent-config/superagent-mock-params";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { ParametreBaseRequete } from "../../../../../model/parametres/enum/ParametresBaseRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { getUrlWithParam } from "../../../../../views/common/util/route/routeUtil";
import { MenuReponseSansDelivranceCS } from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuReponseSansDelivranceCS";
import {
  createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete,
  createReponseSansDelivranceCSPourCompositionApiFrancais,
  createReponseSansDelivranceCSPourCompositionApiMariage
} from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/ReponseSansDelivranceCSFonctions";
import { URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configRequetesV2[0],
  configComposition[0],
  configEtatcivil[0],
  configParamsBaseRequete[0]
]);

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    idRequeteRDCSC
  )
);

beforeEach(() => {
  ParametreBaseRequete.init();
  render(
    <Router history={history}>
      <MenuReponseSansDelivranceCS requete={requeteRDCSC} />
    </Router>
  );
});
test("renders du bloc Menu Reponse sans délivrance", async () => {
  const menuReponseSansDelivranceCS = screen.getByText(
    "Réponse sans délivrance"
  );
  const choixRequeteIncomplete = screen.getByText(
    /Requête incomplète ou illisible.+/
  );
  const choixTraceMariage = screen.getByText(/Trace d'un mariage actif.+/);

  await waitFor(() => {
    expect(menuReponseSansDelivranceCS).toBeDefined();
    expect(choixRequeteIncomplete).toBeDefined();
    expect(choixTraceMariage).toBeDefined();
  });
});

test("Réponse sans délivrance demande incomplète", async () => {
  const choixRequeteIncomplete = screen.getByText(
    /Requête incomplète ou illisible.+/
  );

  await act(async () => {
    fireEvent.click(choixRequeteIncomplete);
  });
});

test("Réponse sans délivrance français", async () => {
  const choixFrancais = screen.getByText(
    /Ressortissant français ou né en France, courrier de non délivrance+/
  );

  await act(async () => {
    fireEvent.click(choixFrancais);
  });
});

test("Reponse sans délivrance mariage", async () => {
  const choixTraceMariage = screen.getByText(/Trace d'un mariage actif.+/);

  await act(async () => {
    fireEvent.click(choixTraceMariage);
  });

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeDefined();
  });
});

test("test de création réponse sans délivrance mariage", async () => {
  const requete = requeteDelivrance;
  const acte = { idActe: "b41079a5-9e8d-478c-b04c-c4c2ac671348" };
  const reponseSansDelivranceCS = await createReponseSansDelivranceCSPourCompositionApiMariage(
    requete,
    (acte as any) as IResultatRMCActe
  );
  expect(reponseSansDelivranceCS).toStrictEqual(reponseSansDelivranceCSMariage);
});

test("test de création réponse sans délivrance français", async () => {
  const requete = requeteDelivrance;
  const reponseSansDelivranceCS = await createReponseSansDelivranceCSPourCompositionApiFrancais(
    requete
  );
  expect(reponseSansDelivranceCS).toStrictEqual(
    reponseSansDelivranceCSFrancais
  );
});

test("test de création réponse sans délivrance demande incomplete", async () => {
  const requete = requeteDelivranceInstitutionnel;
  const reponseSansDelivranceCS = await createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
    requete
  );
  expect(reponseSansDelivranceCS).toStrictEqual(
    reponseSansDelivranceCSDemandeIncomplete
  );
});

test("Réponse ignorer", async () => {
  await act(async () => {
    fireEvent.click(screen.getByText(/Ignorer+/));
  });

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  expect(valider.disabled).toBeTruthy();
});

test("Réponse ignorer", async () => {
  await act(async () => {
    fireEvent.click(screen.getByText(/Ignorer+/));

    await waitFor(() => {
      const annuler = screen.getByText("Annuler") as HTMLButtonElement;

      expect(annuler).toBeDefined();
    });
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Annuler+/));

    await waitFor(() => {
      const annuler = screen.getByText("Annuler") as HTMLButtonElement;

      expect(annuler).toBeDefined();
    });
  });
});

test("message erreur", async () => {
  const reponseSansDelivranceCS1 = await createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
    {} as IRequeteDelivrance
  );
  expect(reponseSansDelivranceCS1).toStrictEqual({});
  const reponseSansDelivranceCS2 = await createReponseSansDelivranceCSPourCompositionApiMariage(
    {} as IRequeteDelivrance,
    {} as IResultatRMCActe
  );
  expect(reponseSansDelivranceCS2).toStrictEqual({});
  const reponseSansDelivranceCS3 = await createReponseSansDelivranceCSPourCompositionApiFrancais(
    {} as IRequeteDelivrance
  );
  expect(reponseSansDelivranceCS3).toStrictEqual({});
});

afterAll(() => {
  superagentMock.unset();
});
