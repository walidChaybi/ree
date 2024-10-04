import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import Bouton from "../../../../composants/commun/bouton/Bouton";

it("renders le Bouton correctement", () => {
  render(<Bouton>Click Me</Bouton>);

  const buttonElement = screen.getByRole("button", { name: /click me/i });
  expect(buttonElement).toBeDefined();

  expect(buttonElement.textContent).toContain("Click Me");
});

it("les props sont correctement transmis", async () => {
  const handleClick = vi.fn();
  render(
    <Bouton className="classe-test" onClick={handleClick}>
      Click Me
    </Bouton>
  );

  const buttonElement = screen.getByRole("button", { name: /click me/i });

  await userEvent.click(buttonElement);

  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(buttonElement.classList).toContain("classe-test");
});
