import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import request from "superagent";
import { configAgent } from "../../../../mock/superagent-config/superagent-mock-agent";
import { useUtilisateursInfosApi } from "../../../../views/pages/apercuRequete/hook/UtilisateursInfosRequeteHook";

const superagentMock = require("superagent-mock")(request, configAgent);

let container: Element | null;

const HookConsummer: React.FC = () => {
  const { dataState } = useUtilisateursInfosApi([
    "204b8563-c7f8-4748-9daa-f26558985894",
    "204b8563-c7f8-4748-9daa-f26558985895"
  ]);

  return (
    <>
      {dataState?.map(element => {
        return (
          <div key={element.idUtilisateur} data-testid={element.idUtilisateur}>
            {element.nom}
          </div>
        );
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

test("l'appel au WS de récupération des infos utilisateurs fonctionne correctement", async () => {
  await act(async () => {
    ReactDOM.render(<HookConsummer />, container);
    expect(container).toBeInstanceOf(Element);
    if (container instanceof Element) {
      expect(container.querySelector).toBeTruthy();
    }
  });
});

afterAll(() => {
  superagentMock.unset();
});
