import { act, render, screen } from "@testing-library/react";
import { a11yProps } from "@widget/onglets/BoiteAOnglets";
import { LinkTab } from "@widget/onglets/LinkTab";
import React from "react";

test("renders LinkTab renders correctly", () => {
  act(() => {
    render(<LinkTab />);
  });
  expect(screen.getByRole("tab")).toBeDefined();
});

test("renders LinkTab a11yProps works correctly", () => {
  const result = a11yProps(0);
  expect(result.id).toBe("nav-tab-0");
});

test("renders LinkTab is disabled", () => {
  act(() => {
    render(<LinkTab disabled={true} />);
  });
  expect(screen.getByRole("tab").className).toContain("tab-disabled");
});
