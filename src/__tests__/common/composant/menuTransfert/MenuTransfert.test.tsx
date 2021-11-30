import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import request from "superagent";
import { requeteInformation } from "../../../../mock/data/requeteInformation";
import { idRequeteRDCSC, requeteRDCSC } from "../../../../mock/data/RequeteV2";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { TypeEntite } from "../../../../model/agent/enum/TypeEntite";
import { IEntite } from "../../../../model/agent/IEntiteRattachement";
import { IUtilisateur } from "../../../../model/agent/IUtilisateur";
import { Droit } from "../../../../model/Droit";
import { IDroit, IHabilitation, IProfil } from "../../../../model/Habilitation";
import { MenuTransfert } from "../../../../views/common/composant/menuTransfert/MenuTransfert";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../views/common/util/storeRece";
import {
  URL_MES_REQUETES_APERCU_REQUETE,
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_INFORMATION,
  URL_MES_REQUETES_INFORMATION_APERCU_ID
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);
const superagentMock3 = require("superagent-mock")(request, configEtatcivil);

const history = createMemoryHistory();

const listeUtilisateurs = [
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
  } as IUtilisateur,
  {
    entite: { estDansSCEC: true, idEntite: "1234" } as IEntite,
    prenom: "",
    nom: "str3",
    habilitations: [
      {
        profil: {
          droits: [{ nom: Droit.INFORMER_USAGER } as IDroit]
        } as IProfil
      } as IHabilitation
    ],
    idUtilisateur: "12345"
  } as IUtilisateur
];

const HookConsummerMenuOuvert: React.FC = () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequeteRDCSC
    )
  );

  storeRece.listeUtilisateurs = listeUtilisateurs;

  return (
    <Router history={history}>
      <MenuTransfert requete={requeteRDCSC} />
    </Router>
  );
};

test("renders du bloc Menu Transfert ouvert ", async () => {
  render(<HookConsummerMenuOuvert />);
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
    choixOEC = screen.getByText(/À un officier d'état civil+/);
    choixAbandon = screen.getByText(/Abandon traitement+/);
    expect(choixService).toBeDefined();
    expect(choixOEC).toBeDefined();
    expect(choixAbandon).toBeDefined();
  });
});

test("check popin service", async () => {
  render(<HookConsummerMenuOuvert />);

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
  render(<HookConsummerMenuOuvert />);

  let choixService: HTMLElement;
  await waitFor(() => {
    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);
  });

  await waitFor(() => {
    choixService = screen.getByText(/À un officier d'état civil+/);
    fireEvent.click(choixService);
  });

  const valider = screen.getByText(/Valider+/) as HTMLButtonElement;
  const title = screen.getByText("Transfert à un officier d'état civil");
  expect(valider).toBeDefined();
  expect(valider.disabled).toBeTruthy();
  expect(title).toBeDefined();
  const autocomplete = screen.getByLabelText(
    /TransfertPopin+/
  ) as HTMLInputElement;
  expect(autocomplete).toBeDefined();
});

test("check autocomplete service", async () => {
  render(<HookConsummerMenuOuvert />);

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
  render(<HookConsummerMenuOuvert />);

  act(() => {
    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);
  });

  act(() => {
    const choixService = screen.getByText(/À un officier d'état civil+/);
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

const HookConsummerMenuFermer: React.FC = () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_INFORMATION_APERCU_ID,
      requeteInformation.id
    )
  );

  storeRece.listeUtilisateurs = listeUtilisateurs;

  return (
    <Router history={history}>
      <MenuTransfert requete={requeteInformation} menuFermer={false} />
    </Router>
  );
};

test("renders du bloc Menu Transfert fermer ", async () => {
  render(<HookConsummerMenuFermer />);

  let menuTransfert = screen.getByText("Transférer");

  await waitFor(() => {
    expect(menuTransfert).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(menuTransfert);
  });

  let choixService = screen.getByText(/À un service+/);
  let choixOEC = screen.getByText(/À un officier d'état civil+/);

  await waitFor(() => {
    expect(choixService).toBeDefined();
    expect(choixOEC).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(choixOEC);
  });

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
    autocomplete.focus();
  });
  await act(async () => {
    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });
  });

  const OEC = screen.getByText("str3");
  await waitFor(() => {
    expect(OEC).toBeDefined();
  });
  await act(async () => {
    fireEvent.click(OEC);
  });

  const valider = screen.getByText("Valider") as HTMLButtonElement;
  await waitFor(() => {
    expect(valider).toBeDefined();
  });
  await act(async () => {
    fireEvent.click(valider);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
  });
});

afterAll(() => {
  superagentMock.unset();
  superagentMock3.unset();
});
