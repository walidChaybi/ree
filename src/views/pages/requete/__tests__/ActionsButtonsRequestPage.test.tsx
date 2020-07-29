import React from "react";
import { render, screen } from "@testing-library/react";
import { ActionsButtonsRequestPage } from "../visualisation/ActionsButtonsRequestPage";
import { BrowserRouter as Router } from "react-router-dom";

test("renders boutons d'actions d'une requête", () => {
  render(
    <Router>
      <ActionsButtonsRequestPage
        indexRequete={2}
        maxRequetes={1}
        setIndexRequete={() => {
          return;
        }}
        documentsDelivres={[]}
      />
    </Router>
  );
  expect(screen.getAllByRole("button").length).toBe(4);
  expect(screen.getByText("Retour à mes requêtes")).not.toBeNull();
  expect(screen.getByText("Signer électroniquement")).not.toBeNull();
});
