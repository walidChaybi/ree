import React from "react";
import DONNEES_REQUETE from "../../../mock/data/requete";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import ReactDOM from "react-dom";
import request from "superagent";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { RequetesServicePage } from "../../../views/pages/espaceDelivrance/RequetesServicePage";
import {
  waitFor,
  render,
  screen,
  getByTitle,
  fireEvent
} from "@testing-library/react";
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

const history = createMemoryHistory();
history.push("mesrequetes/req2", {
  data: [
    { ...DONNEES_REQUETE, idRequete: "req1" },
    { ...DONNEES_REQUETE, idRequete: "req2" },
    { ...DONNEES_REQUETE, idRequete: "req3" }
  ]
});

test("renders Page requete with all elements", () => {
  waitFor(() => {
    const component = mount(
      <>
        <Router history={history}>
          <RequetesServicePage
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

test("renders Page requete interactions works, no errors returned", () => {
  act(() => {
    render(
      <Router history={history}>
        <RequetesServicePage
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
    );
  });

  const pageSuivante = screen.getByTitle("Page suivante");
  waitFor(() => {
    fireEvent.click(pageSuivante);
  });

  screen.getByText("N°").click();
});

afterAll(() => {
  superagentMock.unset();
});
