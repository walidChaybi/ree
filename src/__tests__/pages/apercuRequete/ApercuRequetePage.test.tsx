import React from "react";
import DONNEES_REQUETE from "../../../mock/data/requete";
import { Router, Route } from "react-router-dom";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import { ApercuRequetePage } from "../../../views/pages/apercuRequete/ApercuRequetePage";
import {
  URL_MES_REQUETES_ID,
  URL_REQUETES_SERVICE_ID
} from "../../../views/router/ReceUrls";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";

test("renders Page requete with all elements", () => {
  act(() => {
    const history = createMemoryHistory();
    history.push(getUrlWithParam(URL_MES_REQUETES_ID, "req2"), {
      data: [
        { ...DONNEES_REQUETE, idRequete: "req1" },
        { ...DONNEES_REQUETE, idRequete: "req2" },
        { ...DONNEES_REQUETE, idRequete: "req3" }
      ]
    });

    const component = mount(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_ID}>
            <ApercuRequetePage />
          </Route>
        </Router>
      </>
    );
    expect(component.find("EtatRequete")).toHaveLength(1);
    expect(component.find("ContenuRequete")).toHaveLength(1);
  });
});

test("renders Page requete with no elements", () => {
  act(() => {
    const history = createMemoryHistory();
    history.push(getUrlWithParam(URL_MES_REQUETES_ID, "req2"), {
      data: []
    });

    const component = mount(
      <>
        <Router history={history}>
          <Router history={history}>
            <Route exact={true} path={URL_MES_REQUETES_ID}>
              <ApercuRequetePage />
            </Route>
          </Router>
        </Router>
      </>
    );

    expect(component.find("EtatRequete")).toHaveLength(0);
    expect(component.find("ContenuRequete")).toHaveLength(0);
    expect(component.find("EtatRequete")).toHaveLength(0);
  });
});

test("renders Page requete change url", () => {
  const history = createMemoryHistory();
  history.push(getUrlWithParam(URL_MES_REQUETES_ID, "req2"), {
    data: [
      { ...DONNEES_REQUETE, idRequete: "req1" },
      { ...DONNEES_REQUETE, idRequete: "req2" },
      { ...DONNEES_REQUETE, idRequete: "req3" }
    ]
  });

  render(
    <>
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_ID}>
          <ApercuRequetePage />
        </Route>
      </Router>
    </>
  );

  const buttons = screen.getAllByRole("button");

  const leftButton = buttons.find(
    button => button.id === "button-navigation-left"
  );

  const rightButton = buttons.find(
    button => button.id === "button-navigation-right"
  );

  expect(history.location.pathname).toBe(
    getUrlWithParam(URL_MES_REQUETES_ID, "req2")
  );
  fireEvent.click(leftButton!);
  expect(history.location.pathname).toBe(
    getUrlWithParam(URL_MES_REQUETES_ID, "req1")
  );
  fireEvent.click(rightButton!);
  expect(history.location.pathname).toBe(
    getUrlWithParam(URL_MES_REQUETES_ID, "req2")
  );
});

test("renders Page requeteService change url", () => {
  const history = createMemoryHistory();
  history.push(getUrlWithParam(URL_REQUETES_SERVICE_ID, "req2"), {
    data: [
      { ...DONNEES_REQUETE, idRequete: "req1" },
      { ...DONNEES_REQUETE, idRequete: "req2" },
      { ...DONNEES_REQUETE, idRequete: "req3" }
    ]
  });

  render(
    <>
      <Router history={history}>
        <Route exact={true} path={URL_REQUETES_SERVICE_ID}>
          <ApercuRequetePage />
        </Route>
      </Router>
    </>
  );

  const buttons = screen.getAllByRole("button");

  const leftButton = buttons.find(
    button => button.id === "button-navigation-left"
  );

  const rightButton = buttons.find(
    button => button.id === "button-navigation-right"
  );

  expect(history.location.pathname).toBe(
    getUrlWithParam(URL_REQUETES_SERVICE_ID, "req2")
  );
  fireEvent.click(leftButton!);
  expect(history.location.pathname).toBe(
    getUrlWithParam(URL_REQUETES_SERVICE_ID, "req1")
  );
  fireEvent.click(rightButton!);
  expect(history.location.pathname).toBe(
    getUrlWithParam(URL_REQUETES_SERVICE_ID, "req2")
  );
});
