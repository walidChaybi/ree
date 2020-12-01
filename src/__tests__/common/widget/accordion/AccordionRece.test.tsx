import React from "react";

import { render, waitFor } from "@testing-library/react";
import { AccordionRece } from "../../../../views/common/widget/accordion/AccordionRece";

test("render composant AccordionRece", async () => {
  const { getByText } = render(
    <AccordionRece
      panels={[
        {
          panelAreas: [
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
                  contents: [
                    { libelle: "testLibelle1.1", value: "testValue1.1" }
                  ],
                  title: "titleTest1.1"
                },
                {
                  contents: [
                    { libelle: "testLibelle2.1", value: "testValue2.1" }
                  ],
                  title: "titleTest2.1"
                }
              ]
            }
          ],
          title: "titlePanel"
        }
      ]}
    />
  );

  await waitFor(() => {
    expect(getByText(/titlePanel/i)).toBeDefined();
  });
});
