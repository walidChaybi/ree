import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, it as test, vi } from "vitest";
import Bouton from "../../../../composants/commun/bouton/Bouton";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

describe("Test du composant Bouton", () => {
  test("Le bouton fonctionne correctement", async () => {
    const handleClick = vi.fn();
    render(
      <Bouton
        className="classe-test"
        onClick={handleClick}
      >
        {"Bouton"}
      </Bouton>
    );

    const buttonElement = await screen.findByRole<HTMLButtonElement>("button", { name: "Bouton" });
    expect(buttonElement.classList).toContain("classe-test");
    fireEvent.click(buttonElement);
    await waitFor(() => expect(handleClick).toHaveBeenCalledOnce());
  });

  test("Le lien fonctionne correctement", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: (
            <Bouton
              className="classe-test"
              lienVers="/test"
            >
              {"Lien"}
            </Bouton>
          )
        },
        {
          path: "/test",
          element: <div>{"Cible lien"}</div>
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);

    fireEvent.click(await screen.findByRole<HTMLAnchorElement>("link", { name: "Lien" }));
    await waitFor(() => expect(screen.getByText("Cible lien")).toBeDefined());
  });
});
