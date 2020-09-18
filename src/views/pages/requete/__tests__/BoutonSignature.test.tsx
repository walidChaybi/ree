import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BoutonSignature } from "../BoutonSignature";

test("renders titre bouton signature", () => {
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      requetes={[]}
      reloadData={() => {
        return null;
      }}
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
      reloadData={() => {
        return null;
      }}
    />
  );
  setTimeout(() => {
    const linkElement = screen.getByText(
      /Le service de signature électronique est indisponible/i
    );
    expect(linkElement).toBeInTheDocument();
  }, 175);
});
