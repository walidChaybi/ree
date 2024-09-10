import { render, screen } from "@testing-library/react";
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { expect, test } from "vitest";

test("getMessageZeroRequete", () => {
  render(getMessageZeroRequete());
  const titreNumero = screen.getByText("Aucune requête n'a été trouvée.");
  expect(titreNumero).toBeDefined();
});
