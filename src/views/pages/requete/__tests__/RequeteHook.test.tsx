import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import request from "superagent";
import config from "../../../../api/mock/superagent-config/superagent-mock-requetes";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { useRequeteApi, TypeAppelRequete } from "../DonneesRequeteHook";
import officierMock from "../../../../api/mock/data/connectedUser.json";
const superagentMock = require("superagent-mock")(request, config);

let container: Element | null;

const HookConsummer: React.FC = () => {
  const { dataState = [] } = useRequeteApi(
    {
      statuts: [StatutRequete.ASigner],
      tri: "idSagaDila",
      sens: "ASC"
    },
    TypeAppelRequete.MES_REQUETES,
    { idSSO: officierMock.id_sso, ...officierMock }
  );
  return (
    <>
      {dataState.map((element) => {
        return <div data-testid={element.idRequete}>{element.idRequete}</div>;
      })}
    </>
  );
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }
  container = null;
});

test("monter un composant de test pour vérifier que tout va bien", () => {
  act(() => {
    ReactDOM.render(<HookConsummer />, container);
    expect(container).toBeInstanceOf(Element);
    if (container instanceof Element) {
      expect(container.querySelector).toBeTruthy();
    }
  });
});
