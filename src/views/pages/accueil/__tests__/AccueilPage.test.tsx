import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { AccueilPage } from "../AccueilPage";
import {
  OfficierContext,
  officierContextMock,
} from "../../../core/contexts/OfficierContext";

let container: Element | null;

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

test("renders page d'accueil", () => {
  render(
    <>
      <Router>
        <OfficierContext.Provider value={officierContextMock}>
          <AccueilPage />
        </OfficierContext.Provider>
      </Router>
    </>
  );

  const titleElements = screen.getByText("Accueil");
  expect(titleElements).toBeInTheDocument();
  const textElements = screen.getByText(/Bienvenue*/i);
  expect(textElements).toBeInTheDocument();
});
