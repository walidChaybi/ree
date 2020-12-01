import React from "react";

import { render, waitFor } from "@testing-library/react";
import { AccordionPanelArea } from "../../../../views/common/widget/accordion/AccordionPanelArea";

test("render composant AccordionPanelArea", async () => {
  const { getByText } = render(
    <AccordionPanelArea
      parts={[
        {
          contents: [{ libelle: "testLibelle1", value: "testValue1" }],
          title: "titleTest1"
        },
        {
          contents: [{ libelle: "testLibelle2", value: "testValue2" }],
          title: "titleTest2"
        }
      ]}
    />
  );

  await waitFor(() => {
    expect(getByText(/titleTest1/i)).toBeDefined();
    expect(getByText(/testLibelle1/i)).toBeDefined();
    expect(getByText(/testValue1/i)).toBeDefined();
    expect(getByText(/titleTest2/i)).toBeDefined();
    expect(getByText(/testLibelle2/i)).toBeDefined();
    expect(getByText(/testValue2/i)).toBeDefined();
  });
});
