import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import request from "superagent";
import config from "../../../../api/mock/superagent-mock-config";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { useRequeteApi, TypeAppelRequete } from "../DonneesRequeteHook";
import officier from "../../../../api/mock/officier.json";

const superagentMock = require("superagent-mock")(request, config);

let container: Element | null;

const HookConsummer: React.FC = () => {
  const { dataState = [] } = useRequeteApi(
    {
      statut: StatutRequete.ASigner,
      tri: "idSagaDila",
      sens: "ASC",
    },
    TypeAppelRequete.MES_REQUETES
  );
  return (
    <>
      {dataState.map((element) => {
        return <div data-testid={element.idSagaDila}>{element.requerant}</div>;
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
