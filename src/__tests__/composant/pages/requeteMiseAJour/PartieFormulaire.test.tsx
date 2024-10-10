import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import PartieFormulaire from "../../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
describe("PartieFormulaire", () => {
  it("render correctement avec un id", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/:idActeParam",
          element: (
            <PartieFormulaire
              idActe={"b41079a5-9e8d-478c-b04c-c4c4ey86537g"}
              idRequete="idMock"
            />
          )
        }
      ],
      ["/b41079a5-9e8d-478c-b04c-c4c4ey86537g"]
    );
    const { container } = render(<RouterProvider router={router} />);

    expect(container.firstElementChild?.classList).toContain(
      "partie-formulaire"
    );

    expect(screen.getByText("Analyse Marginale")).toBeDefined();

    expect(screen.getByText("Nom")).toBeDefined();
  });
});
