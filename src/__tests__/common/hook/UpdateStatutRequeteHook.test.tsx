import React from "react";
import ReactDOM from "react-dom";
import { act } from "@testing-library/react";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import request from "superagent";
import { useUpdateStatutRequeteApi } from "../../../views/common/hook/UpdateStatutRequeteHook";

const superagentMock = require("superagent-mock")(request, configRequetes);

let container: Element | null;
const func = jest.fn();

const HookConsummer: React.FC = () => {
  const { errorState } = useUpdateStatutRequeteApi(
    {
      statut: StatutRequete.AImprimer,
      idRequete: "1d189cd9-0df0-45dc-a4cf-0174eb62cbbc"
    },
    func
  );
  return <div>{errorState ? "erroreState" : ""}</div>;
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

test("update statut requete hook", async () => {
  await act(async () => {
    ReactDOM.render(<HookConsummer />, container);
  });
  expect(container).toBeInstanceOf(Element);
  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
  expect(func).toBeCalled();
});

afterAll(() => {
  superagentMock.unset();
});
