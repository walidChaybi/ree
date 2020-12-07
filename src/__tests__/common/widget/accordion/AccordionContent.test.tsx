import React from "react";

import { render, waitFor } from "@testing-library/react";
import { AccordionContent } from "../../../../views/common/widget/accordion/AccordionContent";

test("render composant AccordionContent", async () => {
  const { getByText } = render(
    <AccordionContent libelle="testLibelle" value="testValue" row={0} />
  );

  await waitFor(() => {
    expect(getByText(/testLibelle/i)).toBeDefined();
    expect(getByText(/testValue/i)).toBeDefined();
  });
});
