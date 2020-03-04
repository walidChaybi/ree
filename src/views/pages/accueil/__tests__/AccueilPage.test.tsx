import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AccueilPage } from "../AccueilPage";

test("renders page d'accueil", () => {
  const { getByText } = render(
    <>
      <Router>
        <AccueilPage></AccueilPage>
      </Router>
    </>
  );
  const accueilElement = getByText(/Accueil/i);
  const bienvenueElement = getByText(/Bienvenue/i);
  expect(accueilElement).toBeInTheDocument();
  expect(bienvenueElement).toBeInTheDocument();
});
