import { act, render, screen } from "@testing-library/react";
import React from "react";
import { TabPanel } from "../../../../views/pages/espaceDelivrance/v1/EspaceDelivrancePage";

test("renders TabPanel renders correctly", () => {
  act(() => {
    render(
      <TabPanel index={1} value={1}>
        <div>render</div>
      </TabPanel>
    );
  });
  expect(screen.queryAllByText(/render/i)).toHaveLength(1);
});

test("renders TabPanel text don't renders ", () => {
  act(() => {
    render(
      <TabPanel index={1} value={0}>
        <div>render</div>
      </TabPanel>
    );
  });
  expect(screen.queryAllByText(/render/i)).toHaveLength(0);
});
