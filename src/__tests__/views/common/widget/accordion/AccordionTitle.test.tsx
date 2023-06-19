import { render, waitFor } from "@testing-library/react";
import { AccordionTitle } from "@widget/accordion/AccordionTitle";

test("render composant AccordionTitle", async () => {
  const { getByText } = render(<AccordionTitle titre={"titleTest"} />);

  await waitFor(() => {
    expect(getByText(/titleTest/i)).toBeDefined();
  });
});
