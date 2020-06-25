import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BoutonSignature } from "../BoutonSignature";

test("renders titre bouton signature", () => {
  render(<BoutonSignature libelle={"pages.requetes.action.signature"} />);
  const linkElement = screen.getByText(/Signer tous les documents/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders message indisponibilité", () => {
  render(<BoutonSignature libelle={"pages.requetes.action.signature"} />);
  const linkElement = screen.getByText(
    /Le service de signature électronique est indisponible/i
  );
  expect(linkElement).toBeInTheDocument();
});

test("renders message indisponibilité après click", () => {
  function handleClick() {}
  render(
    <BoutonSignature
      libelle={"pages.requetes.action.signature"}
      onClick={handleClick}
    />
  );
  const linkElement = screen.getByText(
    /Le service de signature électronique est indisponible/i
  );
  expect(linkElement.hidden).toBeTruthy();
  const buttonElement = screen.getByText(/Signer tous les documents/i);
  fireEvent.click(buttonElement);
  expect(linkElement.hidden).toBeFalsy();
});
