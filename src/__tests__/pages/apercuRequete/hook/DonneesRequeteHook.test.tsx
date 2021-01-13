import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import {
  useRequeteApi,
  IQueryParametersPourRequetes
} from "../../../../views/pages/espaceDelivrance/hook/DonneesRequeteHook";
import { TypeAppelRequete } from "../../../../api/appels/requeteApi";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

const queryParam: IQueryParametersPourRequetes = {
  statuts: [StatutRequete.ASigner],
  tri: "idSagaDila",
  sens: "ASC"
};
let container: Element | null;

const HookConsummer: React.FC = () => {
  const { dataState = [] } = useRequeteApi(
    queryParam,
    TypeAppelRequete.MES_REQUETES
  );
  return (
    <>
      {dataState.map(element => {
        return (
          <div key={element.idRequete} data-testid={element.idRequete}>
            {element.idRequete}
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

test("monter un composant de test pour vérifier que tout va bien", async () => {
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
