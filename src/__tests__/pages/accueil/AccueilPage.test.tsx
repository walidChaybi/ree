import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import request from "superagent";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import {
  OfficierContext,
  officierContextMock
} from "../../../views/core/contexts/OfficierContext";
import { AccueilPage } from "../../../views/pages/accueil/AccueilPage";
let container: Element | null;

const superagentMock = require("superagent-mock")(request, configRequetes);

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

test("renders page d'accueil", async () => {
  act(() => {
    render(
      <>
        <Router>
          <OfficierContext.Provider value={officierContextMock}>
            <AccueilPage />
          </OfficierContext.Provider>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    const titleElements = screen.getByText("Accueil");
    expect(titleElements).toBeInTheDocument();
    const textElements = screen.getByText(/Bienvenue*/i);
    expect(textElements).toBeInTheDocument();
    const badge = screen.getByText("2");
    expect(badge).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
