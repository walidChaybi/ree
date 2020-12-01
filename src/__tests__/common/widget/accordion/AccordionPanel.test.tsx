import React from "react";

import { render, waitFor } from "@testing-library/react";
import { AccordionPanel } from "../../../../views/common/widget/accordion/AccordionPanel";

test("render composant AccordionPanel", async () => {
  const { getByTestId, getAllByTestId } = render(
    <AccordionPanel
      panelAreas={[
        {
          parts: [
            {
              contents: [{ libelle: "testLibelle1", value: "testValue1" }],
              title: "titleTest1"
            },
            {
              contents: [{ libelle: "testLibelle2", value: "testValue2" }],
              title: "titleTest2"
            }
          ]
        },
        {
          parts: [
            {
              contents: [{ libelle: "testLibelle1.1", value: "testValue1.1" }],
              title: "titleTest1.1"
            },
            {
              contents: [{ libelle: "testLibelle2.1", value: "testValue2.1" }],
              title: "titleTest2.1"
            }
          ]
        }
      ]}
      title={"titleArea"}
    />
  );

  await waitFor(() => {
    expect(getByTestId(/accordion-panel-hr-titleArea-0/i)).toBeDefined();
    expect(getAllByTestId(/accordion-panel-hr-titleArea/i)).toHaveLength(1);
  });
});
