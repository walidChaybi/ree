import React from "react";

import { render, waitFor } from "@testing-library/react";
import { AccordionTitle } from "../../../../views/common/widget/accordion/AccordionTitle";

test("render composant AccordionTitle", async () => {
  const { getByText } = render(<AccordionTitle title={"titleTest"} />);

  await waitFor(() => {
    expect(getByText(/titleTest/i)).toBeDefined();
  });
});
