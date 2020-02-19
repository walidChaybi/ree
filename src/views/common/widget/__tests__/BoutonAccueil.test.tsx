import React from "react";
import { render } from "@testing-library/react";
import { BoutonRetour } from "../BoutonRetour";
import { BrowserRouter as Router } from "react-router-dom";

test("renders titre de l'application", () => {
  const { getByText } = render(
    <Router>
      <BoutonRetour />
    </Router>
  );
  const linkElement = getByText(/Retour à l'accueil/i);
  expect(linkElement).toBeInTheDocument();
});
