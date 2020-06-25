import React from "react";
import { render, screen } from "@testing-library/react";
import { BoutonRetour } from "../BoutonRetour";
import { BrowserRouter as Router } from "react-router-dom";

test("renders titre de l'application", () => {
  render(
    <Router>
      <BoutonRetour />
    </Router>
  );
  const linkElement = screen.getByText(/ACCUEIL/i);
  expect(linkElement).toBeInTheDocument();
});
