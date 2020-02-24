import React from "react";
import { render } from "@testing-library/react";
import { Text } from "../Text";

test("renders titre de l'application", () => {
  const { getByText } = render(<Text messageId={"header"} />);
  const linkElement = getByText(
    /Télé-Service de Vérification de l'état civil/i
  );
  expect(linkElement).toBeInTheDocument();
});

test("renders titre de l'application", () => {
  const { getByText } = render(
    <Text messageId={"pages.verification.form.champs.acte.titre"} />
  );
  const linkElement = getByText(/Nature de l'acte à vérifier/i);
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
    <Text
      messageId="pages.valide.info"
      values={["05/02/2020", "Gerard Bouldon"]}
    />
  );
  const linkElement = getByText(
    /Un acte valide a bien été délivré le 05\/02\/2020 pour ce titulaire par l'Officier d'Etat-Civil Gerard Bouldon/i
  );
  expect(linkElement).toBeInTheDocument();
});
