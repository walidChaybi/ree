import React from "react";
import { render } from "@testing-library/react";
import { Header } from "../Header";

test("renders learn react link", () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(
    /Télé-Service de Vérification de l'état civil/i
  );
  expect(linkElement).toBeInTheDocument();
});
