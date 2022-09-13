import { render, waitFor } from "@testing-library/react";
import { AccordionTitle } from "@widget/accordion/AccordionTitle";
import React from "react";

test("render composant AccordionTitle", async () => {
  const { getByText } = render(<AccordionTitle title={"titleTest"} />);

  await waitFor(() => {
    expect(getByText(/titleTest/i)).toBeDefined();
  });
});
