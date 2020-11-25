import React from "react";
import ReactDOM from "react-dom";
import request from "superagent";
import config from "../../../mock/superagent-config/superagent-mock-securite";
import { useLoginApi } from "../../../views/core/login/LoginHook";
import { act } from "@testing-library/react";

const superagentMock = require("superagent-mock")(request, config);

let container: Element | null;

const HookConsummer: React.FC = () => {
  const { officierDataState } = useLoginApi();
  return (
    <div
      data-testid={officierDataState?.idSSO}
    >{`${officierDataState?.nom} ${officierDataState?.prenom}`}</div>
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

test("monter un composant de test pour vérifier que tout va bien", async () => {
  await act(async () => {
    ReactDOM.render(<HookConsummer />, container);
  });
  expect(container).toBeInstanceOf(Element);
  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
});

afterAll(() => {
  superagentMock.unset();
});
