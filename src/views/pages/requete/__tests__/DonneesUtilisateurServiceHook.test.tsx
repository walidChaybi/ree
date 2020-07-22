import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import request from "superagent";
import config from "./superagent-mock-config";

import { useUtilisateurApi } from "../DonneesUtilisateursServiceHook";

const superagentMock = require("superagent-mock")(request, config);

let container: Element | null;

const HookConsummer: React.FC = () => {
  const { dataState = [] } = useUtilisateurApi({
    idArobas: "5ef4b1da1e3ee4adf9615ec7",
  });

  return (
    <>
      {dataState.map((element) => {
        return <div data-testid={element.idUtilisateur}>{element.nom}</div>;
      })}
    </>
  );
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(<HookConsummer />, container);
  });
});

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }

  container = null;
});

test("l'appel au WS de récupération d'une requete fonctionne correctement", async () => {
  await act(() => {
    expect(container).toBeInstanceOf(Element);
    if (container instanceof Element) {
      expect(container.querySelector).toBeTruthy();
    }
  });
  expect(container).not.toBeNull();
  if (container instanceof Element) {
    expect(container.childNodes.length).toBe(8);
  }
});

afterAll(() => {
  superagentMock.unset();
});
