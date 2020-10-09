import React from "react";
import { render, screen } from "@testing-library/react";
import { ActionsButtonsRequestPage } from "../../../../views/pages/requeteVisualisation/actions/ActionsButtonsRequestPage";
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
        requetes={[]}
        idRequete={"idRequeteTest"}
        reloadData={() => {}}
      />
    </Router>
  );
  expect(screen.getAllByRole("button").length).toBe(5);
  expect(screen.getByText("Retour à mes requêtes")).not.toBeNull();
  expect(screen.getByText("Signer et terminer")).not.toBeNull();
});
