import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BoutonSignature } from "../BoutonSignature";

test("renders titre bouton signature", () => {
  const { getByText } = render(
    <BoutonSignature libelle={"pages.requetes.action.signature"} />
  );
  const linkElement = getByText(/Signer tous les documents/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders message indisponibilité", () => {
  const { getByText } = render(
    <BoutonSignature libelle={"pages.requetes.action.signature"} />
  );
  const linkElement = getByText(
    /Le service de signature électronique est indisponible/i
  );
  expect(linkElement).toBeInTheDocument();
});

test("renders message indisponibilité après click", () => {
  function handleClick() {
    console.log("test");
  }
  const { getByText } = render(
    <BoutonSignature
      libelle={"pages.requetes.action.signature"}
      onClick={handleClick}
    />
  );
  const linkElement = getByText(
    /Le service de signature électronique est indisponible/i
  );
  expect(linkElement.hidden).toBeTruthy();
  const buttonElement = getByText(/Signer tous les documents/i);
  fireEvent.click(buttonElement);
  expect(linkElement.hidden).toBeFalsy();
});

afterEach(cleanup);
