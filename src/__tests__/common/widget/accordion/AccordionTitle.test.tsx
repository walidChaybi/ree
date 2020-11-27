import React from "react";

import { render, waitFor } from "@testing-library/react";
import request from "superagent";
import config from "../../../../api/mock/superagent-config/superagent-mock-requetes";
import { AccordionTitle } from "../../../../views/common/widget/accordion/AccordionTitle";

const superagentMock = require("superagent-mock")(request, config);

test("render composant AccordionTitle", async () => {
  const { getByText } = render(<AccordionTitle title={"titleTest"} />);

  await waitFor(() => {
    expect(getByText(/titleTest/i)).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
