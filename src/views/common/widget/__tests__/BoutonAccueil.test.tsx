import React from "react";
import { render } from "@testing-library/react";
import { BoutonAccueil } from "../BoutonAccueil";
import { BrowserRouter as Router } from "react-router-dom";

test("renders titre de l'application", () => {
  const { getByText } = render(
    <Router>
      <BoutonAccueil />
    </Router>
  );
  const linkElement = getByText(/Retour à l'accueil/i);
  expect(linkElement).toBeInTheDocument();
});
