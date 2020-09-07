import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BoutonSignature } from "../BoutonSignature";

test("renders titre bouton signature", () => {
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      requetes={[]}
    />
  );
  const linkElement = screen.getByText(/Signer le lot/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders message indisponibilité", () => {
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      requetes={[]}
    />
  );
  setTimeout(() => {
    const linkElement = screen.getByText(
      /Le service de signature électronique est indisponible/i
    );
    expect(linkElement).toBeInTheDocument();
  }, 175);
});

test("renders message indisponibilité après click", () => {
  function handleClick() {}
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      onClick={handleClick}
      requetes={[]}
      onClose={() => {
        return;
      }}
    />
  );
  const linkElement = screen.getAllByText(
    /Le service de signature électronique est indisponible/i
  );
  expect(linkElement[0].hidden).toBeTruthy();
  const buttonElement = screen.getByText(/Signer le lot/i);
  fireEvent.click(buttonElement);
  expect(linkElement[0].hidden).toBeFalsy();
});
