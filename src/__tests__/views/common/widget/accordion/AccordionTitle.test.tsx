import { render, waitFor } from "@testing-library/react";
import { AccordionTitle } from "@widget/accordion/AccordionTitle";
import { expect, test } from "vitest";

test("render composant AccordionTitle", () => {
  const { getByText } = render(<AccordionTitle titre={"titleTest"} />);

  waitFor(() => {
    expect(getByText(/titleTest/i)).toBeDefined();
  });
});
