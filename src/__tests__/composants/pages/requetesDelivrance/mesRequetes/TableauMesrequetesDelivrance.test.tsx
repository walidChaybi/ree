import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TableauMesRequetesDelivrance from "../../../../../composants/pages/requetesDelivrance/mesRequetes/TableauMesRequetesDelivrance";
import { elementAvecContexte } from "../../../../__tests__utils__/testsUtil";

describe("Test du composant Tableau de mes requêtes de délivrance", () => {
  test("Le tableau s'affiche correctement", async () => {
    render(elementAvecContexte(<TableauMesRequetesDelivrance />));

    await waitFor(() => expect(screen.getByRole("table")).toBeDefined());
    expect(screen.getByRole("table").lastChild?.childNodes.length).toBe(17);
  });
});
