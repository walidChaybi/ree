import React from "react";
import { RequetePage } from "../visualisation/RequetePage";
import DONNEES_REQUETE from "./data/requete";
import { Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

test("renders Page requete with all elements", () => {
  act(() => {
    const history = createMemoryHistory();
    history.push("requetes/req2", {
      data: [
        { ...DONNEES_REQUETE, idRequete: "req1" },
        { ...DONNEES_REQUETE, idRequete: "req2" },
        { ...DONNEES_REQUETE, idRequete: "req3" }
      ]
    });

    const component = mount(
      <>
        <Router history={history}>
          <RequetePage
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

    expect(component.find("EtatRequete")).toHaveLength(1);
    expect(component.find("ContenuRequete")).toHaveLength(1);
    expect(component.find("EtatRequete")).toHaveLength(1);
  });
});

test("renders Page requete with no elements", () => {
  act(() => {
    const history = createMemoryHistory();
    history.push("requetes/req2", {
      data: []
    });

    const component = mount(
      <>
        <Router history={history}>
          <RequetePage
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

    expect(component.find("EtatRequete")).toHaveLength(0);
    expect(component.find("ContenuRequete")).toHaveLength(0);
    expect(component.find("EtatRequete")).toHaveLength(0);
  });
});

test("renders Page requete change url", () => {
  act(() => {
    const history = createMemoryHistory();
    history.push("requetes/req2", {
      data: [
        { ...DONNEES_REQUETE, idRequete: "req1" },
        { ...DONNEES_REQUETE, idRequete: "req2" },
        { ...DONNEES_REQUETE, idRequete: "req3" }
      ]
    });

    const { getAllByRole } = render(
      <>
        <Router history={history}>
          <RequetePage
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

    const buttons = getAllByRole("button");

    const leftButton = buttons.find(
      button => button.id === "button-navigation-left"
    );

    const rightButton = buttons.find(
      button => button.id === "button-navigation-right"
    );

    expect(history.location.pathname).toBe("/requetes/req2");
    fireEvent.click(leftButton!);
    expect(history.location.pathname).toBe("/requetes/req1");
    fireEvent.click(rightButton!);
    expect(history.location.pathname).toBe("/requetes/req2");
  });
});
