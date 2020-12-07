import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LienFiche } from "../../../views/pages/fiche/LienFiche";

test("renders mariage field render correcty", () => {
  const { getByText } = render(
    <LienFiche
      identifiant={"identifiant"}
      categorie={"categorie"}
      numero={"numero"}
      title={"titre"}
    />
  );

  const link = getByText("numero");
  fireEvent.click(link);

  expect(getByText("numero")).toBeDefined();
  expect(getByText("numero")).toBeDefined();
});
