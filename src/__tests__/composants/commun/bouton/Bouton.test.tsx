import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it as test, vi } from "vitest";
import Bouton from "../../../../composants/commun/bouton/Bouton";

test("renders le Bouton correctement", () => {
  render(<Bouton>Click Moi</Bouton>);

  const buttonElement = screen.getByRole("button", { name: "Click Moi" });
  expect(buttonElement).toBeDefined();

  expect(buttonElement.textContent).toContain("Click Moi");
});

test("les props sont correctement transmis", async () => {
  const handleClick = vi.fn();
  render(
    <Bouton className="classe-test" onClick={handleClick}>
      Click Moi
    </Bouton>,
  );

  const buttonElement = screen.getByRole("button", { name: "Click Moi" });

  await userEvent.click(buttonElement);

  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(buttonElement.classList).toContain("classe-test");
});
