import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PartieFormulaire from "../../../../composants/pages/requetesMiseAJour/PartieFormulaire";

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
describe("PartieFormulaire", () => {
  it("render correctement avec un id", async () => {
    const { container } = render(<PartieFormulaire idActe={idActe} />);

    expect(container.firstElementChild?.classList).toContain(
      "partie-formulaire"
    );

    expect(screen.getByText("Analyse Marginale")).toBeDefined();

    // Le formulaire est bien présent en recherchant son premier champ
    expect(screen.getByText("Nom")).toBeDefined();
  });
});
