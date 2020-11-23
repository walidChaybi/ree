import React from "react";
import DONNEES_REQUETE from "../../../api/mock/data/requete";
import { Router } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { ApercuRequetePage } from "../../../views/pages/apercuRequete/ApercuRequetePage";

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
          <ApercuRequetePage
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
    history.push("/rece-ui/mesrequetes/req2", {
      data: []
    });

    const component = mount(
      <>
        <Router history={history}>
          <ApercuRequetePage
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
    history.push("/rece-ui/mesrequetes/req2", {
      data: [
        { ...DONNEES_REQUETE, idRequete: "req1" },
        { ...DONNEES_REQUETE, idRequete: "req2" },
        { ...DONNEES_REQUETE, idRequete: "req3" }
      ]
    });

    render(
      <>
        <Router history={history}>
          <ApercuRequetePage
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

    const buttons = screen.getAllByRole("button");

    const leftButton = buttons.find(
      button => button.id === "button-navigation-left"
    );

    const rightButton = buttons.find(
      button => button.id === "button-navigation-right"
    );

    setTimeout(() => {
      expect(history.location.pathname).toBe("/rece-ui/mesrequetes/req2");
      fireEvent.click(leftButton!);
      setTimeout(() => {
        expect(history.location.pathname).toBe("/rece-ui/mesrequetes/req1");
        fireEvent.click(rightButton!);
        setTimeout(() => {
          expect(history.location.pathname).toBe("/rece-ui/mesrequetes/req2");
        }, 75);
      }, 75);
    }, 75);
  });
});
