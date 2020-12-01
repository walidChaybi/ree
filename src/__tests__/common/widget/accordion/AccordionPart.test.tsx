import React from "react";

import { render, waitFor } from "@testing-library/react";
import { AccordionPart } from "../../../../views/common/widget/accordion/AccordionPart";

test("render composant AccordionPart", async () => {
  const { getByText } = render(
    <AccordionPart
      contents={[{ libelle: "testLibelle", value: "testValue" }]}
      title={"titleTest"}
    />
  );

  await waitFor(() => {
    expect(getByText(/titleTest/i)).toBeDefined();
  });
});
