import { render, screen } from "@testing-library/react";
import React from "react";
import { PageMessage } from "../../../views/core/login/PageMessage";

test("renders message page Login", () => {
  render(<PageMessage message="pages.login.connexion" />);
  const textElement = screen.getByText(/Connexion en cours .../i);
  expect(textElement).toBeInTheDocument();
});
