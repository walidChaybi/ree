import React from "react";

import { render, waitFor } from "@testing-library/react";
import request from "superagent";
import config from "../../../../api/mock/superagent-config/superagent-mock-requetes";
import { AccordionPart } from "../../../../views/common/widget/accordion/AccordionPart";

const superagentMock = require("superagent-mock")(request, config);

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

afterAll(() => {
  superagentMock.unset();
});
