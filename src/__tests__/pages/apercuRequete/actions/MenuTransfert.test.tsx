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
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configMultiAPi } from "../../../../mock/superagent-config/superagent-mock-multi-apis";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { TypeEntite } from "../../../../model/agent/enum/TypeEntite";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../views/common/util/storeRece";
import { MenuTransfert } from "../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/MenuTransfert";
import {
  URL_MES_REQUETES_APERCU_REQUETE,
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configMultiAPi);
const superagentMock2 = require("superagent-mock")(request, configRequetesV2);
const superagentMock3 = require("superagent-mock")(request, configEtatcivil);

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    idRequete1
  )
);

beforeEach(() => {
  render(
    <Router history={history}>
      <MenuTransfert requete={requete1} />
    </Router>
  );
});
test("renders du bloc Menu Reponse Negative", async () => {
  let menuTransfert: HTMLElement;
  let choixService: HTMLElement;
  let choixOEC: HTMLElement;
  let choixAbandon: HTMLElement;

  await waitFor(() => {
    menuTransfert = screen.getByText("Transférer");
    expect(menuTransfert).toBeDefined();
  });

  await waitFor(() => {
    choixService = screen.getByText(/À un service+/);
    choixOEC = screen.getByText(/À un Officier d'État Civil+/);
    choixAbandon = screen.getByText(/Abandon traitement+/);
    expect(choixService).toBeDefined();
    expect(choixOEC).toBeDefined();
    expect(choixAbandon).toBeDefined();
  });
});

test("check popin", async () => {
  let choixService: HTMLElement;
  await waitFor(() => {
    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);
  });

  await waitFor(() => {
    choixService = screen.getByText(/À un service+/);
    fireEvent.click(choixService);
  });

  const valider = screen.getByText(/Valider+/) as HTMLButtonElement;
  const annuler = screen.getByText(/Annuler+/) as HTMLButtonElement;
  const title = screen.getByText(/Transfert à un service+/);
  expect(valider).toBeDefined();
  expect(valider.disabled).toBeTruthy();
  expect(title).toBeDefined();
  const autocomplete = screen.getByLabelText(
    /Recherche service+/
  ) as HTMLInputElement;
  expect(autocomplete).toBeDefined();

  await waitFor(() => {
    fireEvent.click(annuler);
  });
});

test("check autocomplete", async () => {
  storeRece.listeEntite = [
    {
      idEntite: "1234",
      type: TypeEntite.BUREAU,
      code: "1234",
      libelleEntite: "str1"
    },
    {
      idEntite: "12345",
      type: TypeEntite.DEPARTEMENT,
      code: "12345",
      libelleEntite: "str2"
    }
  ];
  await waitFor(() => {
    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);
  });

  await waitFor(() => {
    const choixService = screen.getByText(/À un service+/);
    fireEvent.click(choixService);
  });

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "Recherche service"
  ) as HTMLInputElement;
  autocomplete.focus();
  act(() => {
    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });
  });
  const str1 = screen.getByText("str1");
  expect(str1).toBeInTheDocument();
  expect(screen.getByText("str2")).toBeInTheDocument();

  await waitFor(() => {
    fireEvent.click(str1);
  });

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  expect(inputChampRecherche.value).toStrictEqual("str1");
  expect(valider.disabled).toBeFalsy();

  await waitFor(() => {
    fireEvent.click(valider);
  });

  expect(history.location.pathname).toBe(
    getUrlWithParam(URL_MES_REQUETES_APERCU_REQUETE, idRequete1)
  );
});

afterAll(() => {
  superagentMock.unset();
  superagentMock2.unset();
  superagentMock3.unset();
});
