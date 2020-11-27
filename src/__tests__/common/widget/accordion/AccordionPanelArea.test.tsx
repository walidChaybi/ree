import React from "react";

import { render, waitFor } from "@testing-library/react";
import request from "superagent";
import config from "../../../../api/mock/superagent-config/superagent-mock-requetes";
import { AccordionPanelArea } from "../../../../views/common/widget/accordion/AccordionPanelArea";

const superagentMock = require("superagent-mock")(request, config);

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

afterAll(() => {
  superagentMock.unset();
});
