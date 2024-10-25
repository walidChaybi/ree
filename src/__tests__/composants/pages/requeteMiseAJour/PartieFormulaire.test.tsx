import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import PartieFormulaire from "../../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import EditionMiseAJourContextProvider from "../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

const idActe = "b41079a5-9e8d-478c-b04c-c4c4ey86537g";
const idRequete = "931c715b-ede1-4895-ad70-931f2ac4e43d";

describe("PartieFormulaire", () => {
  test("render correctement avec un id", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <EditionMiseAJourContextProvider
              idActe={idActe}
              idRequete={idRequete}
            >
              <PartieFormulaire />
            </EditionMiseAJourContextProvider>
          )
        }
      ],
      ["/"]
    );

    const { container } = render(<RouterProvider router={router} />);

    expect(container.firstElementChild?.classList).toContain(
      "partie-formulaire"
    );

    expect(screen.getByText("Analyse Marginale")).toBeDefined();
    await waitFor(() => expect(screen.getByText("Nom")).toBeDefined());
  });
});
