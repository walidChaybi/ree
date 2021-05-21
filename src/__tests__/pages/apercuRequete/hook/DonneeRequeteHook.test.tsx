import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import request from "superagent";
import DONNEES_REQUETE from "../../../../mock/data/requete";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { IDataTable } from "../../../../model/requete/IDataTable";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { useRequeteDataApi } from "../../../../views/pages/apercuRequete/hook/DonneeRequeteHook";

const superagentMock = require("superagent-mock")(request, configRequetes);

let container: Element | null;
let containerWithData: Element | null;
let containerWithErrorWS: Element | null;

const HookConsummer: React.FC = () => {
  const { dataState = [] } = useRequeteDataApi({
    statut: StatutRequete.ASigner,
    idRequete: "req1"
  });

  return (
    <>
      {dataState.map((element, index) => {
        return (
          <div
            key={`HookConsummer-${element.idRequete}-${index}`}
            data-testid={element.idRequete}
          >
            {element.idRequete}
          </div>
        );
      })}
    </>
  );
};

const HookConsummerWithData: React.FC = () => {
  const { dataState = [] } = useRequeteDataApi(
    {
      statut: StatutRequete.ASigner,
      idRequete: "req1"
    },
    { data: [DONNEES_REQUETE as IDataTable, DONNEES_REQUETE as IDataTable] }
  );

  return (
    <>
      {dataState.map((element, index) => {
        return (
          <div
            key={`HookConsummerWithData-${element.idRequete}-${index}-${index}`}
            data-testid={element.idRequete}
          >
            {element.idRequete}
          </div>
        );
      })}
    </>
  );
};

const HookConsummerWithErrorWS: React.FC = () => {
  const { dataState = [] } = useRequeteDataApi({
    statut: StatutRequete.ASigner,
    idRequete: "req2"
  });

  return (
    <>
      {dataState.map((element, index) => {
        return (
          <div
            key={`HookConsummerWithErrorWS-${element.idRequete}-${index}`}
            data-testid={element.idRequete}
          >
            {element.idRequete}
          </div>
        );
      })}
    </>
  );
};

beforeEach(async () => {
  container = document.createElement("div");
  document.body.appendChild(container);

  containerWithData = document.createElement("div");
  document.body.appendChild(containerWithData);

  containerWithErrorWS = document.createElement("div");
  document.body.appendChild(containerWithErrorWS);
  await act(async () => {
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

test("l'appel au WS de récupération d'une requete fonctionne correctement", () => {
  expect(container).toBeInstanceOf(Element);
  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
  expect(container).not.toBeNull();
  if (container instanceof Element) {
    expect(container.childNodes.length).toBe(1);
  }
});

test("pas d'appel WS si tableau de données passé en paramètre", () => {
  expect(containerWithData).toBeInstanceOf(Element);
  if (containerWithData instanceof Element) {
    expect(containerWithData.querySelector).toBeTruthy();
  }
  expect(containerWithData).not.toBeNull();
  if (containerWithData instanceof Element) {
    expect(containerWithData.childNodes.length).toBe(2);
  }
});

test("pas d'erreur si retour WS en erreur", () => {
  expect(containerWithErrorWS).toBeInstanceOf(Element);
  if (containerWithErrorWS instanceof Element) {
    expect(containerWithErrorWS.querySelector).toBeTruthy();
  }
  expect(containerWithErrorWS).not.toBeNull();
  if (containerWithErrorWS instanceof Element) {
    expect(containerWithErrorWS.childNodes.length).toBe(0);
  }
});

afterAll(() => {
  superagentMock.unset();
});
