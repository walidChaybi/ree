import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

test("renders learn react link", () => {
  render(<Header />);
  const linkElement = screen.getByText(/Registre d'État Civil Électronique/i);
  expect(linkElement).toBeInTheDocument();
});
