import React from "react";
import { LoginPage } from "../LoginPage";
import { screen, render } from "@testing-library/react";

test("renders message page Login", () => {
  render(<LoginPage messageLogin="pages.login.connexion" />);
  const textElement = screen.getByText(/Connexion en cours .../i);
  expect(textElement).toBeInTheDocument();
});
