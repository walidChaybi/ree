import React from "react";
import { render } from "@testing-library/react";
import { ActionsButtonsRequestPage } from "../visualisation/ActionsButtonsRequestPage";
import { BrowserRouter as Router } from "react-router-dom";

test("renders boutons d'actions d'une requête", () => {
  const { getAllByRole, getByText } = render(
    <Router>
      <ActionsButtonsRequestPage
        indexRequete={2}
        maxRequetes={1}
        setIndexRequete={() => {
          return;
        }}
      />
    </Router>
  );
  expect(getAllByRole("button").length).toBe(4);
  expect(getByText("Requête précédente")).not.toBeNull();
  expect(getByText("Requête suivante")).not.toBeNull();
});
