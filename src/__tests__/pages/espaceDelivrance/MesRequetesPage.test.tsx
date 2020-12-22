import React from "react";
import DONNEES_REQUETE from "../../../mock/data/requete";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { MesRequetesPage } from "../../../views/pages/espaceDelivrance/MesRequetesPage";
import ReactDOM from "react-dom";
import officier from "../../../mock/data/connectedUser.json";
import request from "superagent";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
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

test("renders Page requete with all elements", () => {
  act(() => {
    const history = createMemoryHistory();
    history.push("mesrequetes/req2", {
      data: [
        { ...DONNEES_REQUETE, idRequete: "req1" },
        { ...DONNEES_REQUETE, idRequete: "req2" },
        { ...DONNEES_REQUETE, idRequete: "req3" }
      ]
    });

    const component = mount(
      <>
        <Router history={history}>
          <MesRequetesPage
            match={{
              isExact: true,
              path: "",
              url: "",
              params: { idRequete: "req2" }
            }}
            history={history}
            location={history.location}
          />
        </Router>
      </>
    );

    expect(component).toMatchSnapshot();
  });
});

test("renders Page requete interactions works, no errors returned", async () => {
  const history = createMemoryHistory();
  history.push("mesrequetes/req2", {
    data: [
      { ...DONNEES_REQUETE, idRequete: "req1" },
      { ...DONNEES_REQUETE, idRequete: "req2" },
      { ...DONNEES_REQUETE, idRequete: "req3" }
    ]
  });

  await act(async () => {
    ReactDOM.render(
      <Router history={history}>
        <MesRequetesPage
          match={{
            isExact: true,
            path: "",
            url: "",
            params: { idRequete: "req2" }
          }}
          history={history}
          location={history.location}
          officier={{
            idSSO: officier.id_sso,
            ...officier
          }}
        />
      </Router>,
      container
    );
  });

  container?.getElementsByTagName("button")[1].click();
  container?.getElementsByTagName("button")[1].click();
  container?.getElementsByTagName("button")[1].click();
  container?.getElementsByTagName("button")[1].click();
  container?.getElementsByTagName("button")[1].click();
  container?.getElementsByTagName("button")[1].click();
  container?.getElementsByTagName("button")[1].click();
  await act(async () => {
    container
      ?.getElementsByClassName(
        "MuiButtonBase-root MuiTableSortLabel-root tableauFontHeader"
      )[0]
      .click();
  });
});

afterAll(() => {
  superagentMock.unset();
});
