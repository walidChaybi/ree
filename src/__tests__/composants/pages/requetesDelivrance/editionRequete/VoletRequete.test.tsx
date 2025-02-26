import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import VoletRequete from "../../../../../composants/pages/requetesDelivrance/editionRequete/partieActeRequete/VoletRequete";
import requeteDelivrance from "../../../../mock/data/requeteDelivrance";

const requeteMock = {
  ...requeteDelivrance
} as unknown as IRequeteDelivrance;
test("renders the component and displays the request description", () => {
  render(<VoletRequete requete={requeteMock} />);
  expect(screen.getByText("Description requête L5UG3Q")).toBeDefined();
});

test("renders the 'Type requête' accordion", () => {
  render(<VoletRequete requete={requeteMock} />);
  expect(screen.getByText("Type requête")).toBeDefined();
});

test("renders the 'Observations requête' accordion", () => {
  render(<VoletRequete requete={requeteMock} />);
  expect(screen.getByText("Observations requête")).toBeDefined();
});
