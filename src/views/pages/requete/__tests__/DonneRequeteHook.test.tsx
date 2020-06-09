import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import request from "superagent";
import config from "./superagent-mock-config";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { cleanup } from "@testing-library/react";
import { useRequeteDataApi } from "../visualisation/DonneeRequeteHook";
import DONNEES_REQUETE from "./data/requete";
import { IDataTable } from "../RequeteTableauHeaderCell";

const superagentMock = require("superagent-mock")(request, config);

let container: Element | null;
let containerWithData: Element | null;
let containerWithErrorWS: Element | null;

const HookConsummer: React.FC = () => {
  const { dataState = [] } = useRequeteDataApi({
    nomOec: "Garisson",
    prenomOec: "Juliette",
    statut: StatutRequete.ASigner,
    idRequete: "req1"
  });

  return (
    <>
      {dataState.map(element => {
        return <div data-testid={element.idRequete}>{element.idRequete}</div>;
      })}
    </>
  );
};

const HookConsummerWithData: React.FC = () => {
  const { dataState = [] } = useRequeteDataApi(
    {
      nomOec: "Garisson",
      prenomOec: "Juliette",
      statut: StatutRequete.ASigner,
      idRequete: "req1"
    },
    { data: [DONNEES_REQUETE as IDataTable, DONNEES_REQUETE as IDataTable] }
  );

  return (
    <>
      {dataState.map(element => {
        return <div data-testid={element.idRequete}>{element.idRequete}</div>;
      })}
    </>
  );
};

const HookConsummerWithErrorWS: React.FC = () => {
  const { dataState = [] } = useRequeteDataApi({
    nomOec: "Garisson",
    prenomOec: "Juliette",
    statut: StatutRequete.ASigner,
    idRequete: "req2"
  });

  return (
    <>
      {dataState.map(element => {
        return <div data-testid={element.idRequete}>{element.idRequete}</div>;
      })}
    </>
  );
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  containerWithData = document.createElement("div");
  document.body.appendChild(containerWithData);

  containerWithErrorWS = document.createElement("div");
  document.body.appendChild(containerWithErrorWS);
  act(() => {
    ReactDOM.render(<HookConsummer />, container);

    ReactDOM.render(<HookConsummerWithData />, containerWithData);

    ReactDOM.render(<HookConsummerWithErrorWS />, containerWithErrorWS);
  });
});

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }
  if (containerWithData instanceof Element) {
    document.body.removeChild<Element>(containerWithData);
  }
  if (containerWithErrorWS instanceof Element) {
    document.body.removeChild<Element>(containerWithErrorWS);
  }
  container = null;
  containerWithData = null;
  containerWithErrorWS = null;
});

test("l'appel au WS de récvupération d'une requete fonctionne correctement", async () => {
  await act(() => {
    expect(container).toBeInstanceOf(Element);
    if (container instanceof Element) {
      expect(container.querySelector).toBeTruthy();
    }
  });
  expect(container).not.toBeNull();
  if (container instanceof Element) {
    expect(container.childNodes.length).toBe(1);
  }
});

test("pas d'appel WS si tableau de données passé en paramètre", async () => {
  await act(() => {
    expect(containerWithData).toBeInstanceOf(Element);
    if (containerWithData instanceof Element) {
      expect(containerWithData.querySelector).toBeTruthy();
    }
  });
  expect(containerWithData).not.toBeNull();
  if (containerWithData instanceof Element) {
    expect(containerWithData.childNodes.length).toBe(2);
  }
});

test("pas d'erreur si retour WS en erreur", async () => {
  await act(() => {
    expect(containerWithErrorWS).toBeInstanceOf(Element);
    if (containerWithErrorWS instanceof Element) {
      expect(containerWithErrorWS.querySelector).toBeTruthy();
    }
  });
  expect(containerWithErrorWS).not.toBeNull();
  if (containerWithErrorWS instanceof Element) {
    expect(containerWithErrorWS.childNodes.length).toBe(0);
  }
});

afterEach(cleanup);

afterAll(() => {
  superagentMock.unset();
});
