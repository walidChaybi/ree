import React from "react";
import { render } from "@testing-library/react";
import { Text } from "../Text";

test("renders titre de l'application", () => {
  const { getByText } = render(<Text messageId={"header"} />);
  const linkElement = getByText(/Registre d'État Civil Électronique/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders titre de l'application", () => {
  const { getByText } = render(
    <Text messageId={"pages.requetes.enCours.titre"} />
  );
  const linkElement = getByText(/Requêtes en cours/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders identitiant inconnu", () => {
  const { getByText } = render(
    <Text messageId={"un.idSagaDila.inconnu.label"} />
  );
  const linkElement = getByText(/⚠ un.idSagaDila.inconnu.label/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders text avec parametres", () => {
  const { getByText } = render(
    <Text messageId="pagination.rowsPerPage" values={["15"]} />
  );
  const linkElement = getByText(/15 par page/i);
  expect(linkElement).toBeInTheDocument();
});
