import { act, render, screen } from "@testing-library/react";
import { a11yProps } from "@widget/onglets/BoiteAOnglets";
import { TabPanel } from "@widget/onglets/TabPanel";

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

test("renders LinkTab a11yProps works correctly", () => {
  const result = a11yProps(0);
  expect(result.id).toBe("nav-tab-0");
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
