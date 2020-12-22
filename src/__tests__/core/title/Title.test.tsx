import React from "react";
import { Title } from "../../../views/core/title/Title";
import { render } from "@testing-library/react";

test("title renders", () => {
  const { getByText } = render(<Title titleId={"testTitleId"} />);

  expect(getByText(/testTitleId/)).toBeDefined();
});

test("title and subtitle renders", () => {
  const { getByText } = render(<Title titleId={"testTitleId"} />);

  expect(getByText(/testTitleId/)).toBeDefined();
});
