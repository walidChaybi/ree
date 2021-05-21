import { act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import request from "superagent";
import officier from "../../../mock/data/connectedUser.json";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import EspaceDelivrancePage from "../../../views/pages/espaceDelivrance/v1/EspaceDelivrancePage";
import { URL_ACCUEIL } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);

let container: Element | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test("renders delivrancePage", async () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);
  await act(async () => {
    ReactDOM.render(
      <>
        <Router history={history}>
          <OfficierContext.Provider
            value={{
              officierDataState: { idSSO: officier.id_sso, ...officier }
            }}
          >
            <EspaceDelivrancePage
              match={{
                isExact: true,
                path: "",
                url: "",
                params: { idRequete: "req2" }
              }}
              history={history}
              location={history.location}
              selectedTab={0}
            />
          </OfficierContext.Provider>
        </Router>
      </>,
      container
    );
  });

  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
  expect(container?.getElementsByClassName("compteur-requetes")).toHaveLength(
    1
  );

  await act(async () => {
    container?.getElementsByTagName("a")[1].click();
  });
  expect(container?.getElementsByClassName("compteur-requetes")).toHaveLength(
    0
  );
});

afterAll(() => {
  superagentMock.unset();
});
