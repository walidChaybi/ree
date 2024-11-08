import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ConteneurVoletEdition from "../../../../../composants/pages/requetesDelivrance/editionRequete/ConteneurVoletEdition";

test("Le child est affiché correctement lorsque la propriété 'est actif' est true", () => {
  render(
    <ConteneurVoletEdition estActif={true}>
      <div>Child Content</div>
    </ConteneurVoletEdition>,
  );

  const childContent = screen.getByText("Child Content");
  expect(childContent).toBeDefined();
});

test("Le child est hidden lorsque la propriété 'est actif' est false", () => {
  render(
    <ConteneurVoletEdition estActif={false}>
      <div>Child Content</div>
    </ConteneurVoletEdition>,
  );

  const containerDiv = screen.getByText("Child Content").parentElement;
  expect(containerDiv?.classList.contains("hidden")).toBeTruthy();
});
