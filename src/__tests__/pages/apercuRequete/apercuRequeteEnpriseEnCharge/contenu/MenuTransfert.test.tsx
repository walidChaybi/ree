import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import request from "superagent";
import {
  idRequeteRDCSC,
  requeteRDCSC
} from "../../../../../mock/data/RequeteV2";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { TypeEntite } from "../../../../../model/agent/enum/TypeEntite";
import { IEntite } from "../../../../../model/agent/IEntiteRattachement";
import { IUtilisateur } from "../../../../../model/agent/IUtilisateur";
import { Droit } from "../../../../../model/Droit";
import {
  IDroit,
  IHabilitation,
  IProfil
} from "../../../../../model/Habilitation";
import { getUrlWithParam } from "../../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../../views/common/util/storeRece";
import { MenuTransfert } from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuTransfert";
import {
  URL_MES_REQUETES_APERCU_REQUETE,
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);
const superagentMock3 = require("superagent-mock")(request, configEtatcivil);

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    idRequeteRDCSC
  )
);

beforeEach(() => {
  render(
    <Router history={history}>
      <MenuTransfert requete={requeteRDCSC} />
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

test("check popin service", async () => {
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
    /TransfertPopin+/
  ) as HTMLInputElement;
  expect(autocomplete).toBeDefined();

  await waitFor(() => {
    fireEvent.click(annuler);
  });
});

test("check popin agent", async () => {
  let choixService: HTMLElement;
  await waitFor(() => {
    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);
  });

  await waitFor(() => {
    choixService = screen.getByText(/À un Officier d'État Civil+/);
    fireEvent.click(choixService);
  });

  const valider = screen.getByText(/Valider+/) as HTMLButtonElement;
  const title = screen.getByText("Transfert à un Officier d'État Civil");
  expect(valider).toBeDefined();
  expect(valider.disabled).toBeTruthy();
  expect(title).toBeDefined();
  const autocomplete = screen.getByLabelText(
    /TransfertPopin+/
  ) as HTMLInputElement;
  expect(autocomplete).toBeDefined();
});

test("check autocomplete service", async () => {
  storeRece.listeEntite = [
    {
      idEntite: "1234",
      type: TypeEntite.BUREAU,
      code: "1234",
      libelleEntite: "str1",
      estDansSCEC: true
    },
    {
      idEntite: "12345",
      type: TypeEntite.DEPARTEMENT,
      code: "12345",
      libelleEntite: "str2",
      estDansSCEC: true
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
    "TransfertPopin"
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

  const reset = screen.getByTitle("Vider le champ");

  expect(reset).toBeDefined();

  act(() => {
    fireEvent.click(reset);
  });

  expect(valider.disabled).toBeTruthy();
});

test("check autocomplete agent", async () => {
  storeRece.listeUtilisateurs = [
    {
      entite: { estDansSCEC: true, idEntite: "123" } as IEntite,
      prenom: "",
      nom: "str1",
      habilitations: [
        {
          profil: {
            droits: [{ nom: Droit.DELIVRER } as IDroit]
          } as IProfil
        } as IHabilitation
      ],
      idUtilisateur: "1234"
    } as IUtilisateur,
    {
      entite: { estDansSCEC: true, idEntite: "1234" } as IEntite,
      prenom: "",
      nom: "str2",
      habilitations: [
        {
          profil: {
            droits: [{ nom: Droit.DELIVRER } as IDroit]
          } as IProfil
        } as IHabilitation
      ],
      idUtilisateur: "12345"
    } as IUtilisateur
  ];
  act(() => {
    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);
  });

  act(() => {
    const choixService = screen.getByText(/À un Officier d'État Civil+/);
    fireEvent.click(choixService);
  });

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
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

  act(() => {
    fireEvent.click(str1);
  });

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  expect(inputChampRecherche.value).toStrictEqual("str1 ");
  expect(valider.disabled).toBeFalsy();

  await act(async () => {
    fireEvent.click(valider);
  });

  expect(history.location.pathname).toBe(
    getUrlWithParam(URL_MES_REQUETES_APERCU_REQUETE, idRequeteRDCSC)
  );
});

afterAll(() => {
  superagentMock.unset();
  superagentMock3.unset();
});
