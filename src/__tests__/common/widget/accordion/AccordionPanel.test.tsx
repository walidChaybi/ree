import React from "react";

import { render, waitFor } from "@testing-library/react";
import request from "superagent";
import config from "../../../../api/mock/superagent-config/superagent-mock-requetes";
import { AccordionPanel } from "../../../../views/common/widget/accordion/AccordionPanel";

const superagentMock = require("superagent-mock")(request, config);

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

afterAll(() => {
  superagentMock.unset();
});
