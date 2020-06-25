import React from "react";
import { render, screen } from "@testing-library/react";
import { Text } from "../Text";

test("renders titre de l'application", () => {
  render(<Text messageId={"header"} />);
  const linkElement = screen.getByText(/Registre d'État Civil Électronique/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders titre de l'application", () => {
  render(<Text messageId={"pages.requetes.enCours.titre"} />);
  const linkElement = screen.getByText(/Requêtes en cours/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders identitiant inconnu", () => {
  render(<Text messageId={"un.idSagaDila.inconnu.label"} />);
  const linkElement = screen.getByText(/⚠ un.idSagaDila.inconnu.label/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders text avec parametres", () => {
  render(<Text messageId="pagination.rowsPerPage" values={["15"]} />);
  const linkElement = screen.getByText(/15 par page/i);
  expect(linkElement).toBeInTheDocument();
});
