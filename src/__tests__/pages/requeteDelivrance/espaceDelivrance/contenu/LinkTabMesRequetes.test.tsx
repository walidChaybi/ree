import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { a11yProps } from "../../../../../views/common/widget/onglets/BoiteAOnglets";
import { LinkTabMesRequetes } from "../../../../../views/pages/requeteDelivrance/espaceDelivrance/v1/contenu/LinkTabMesRequetes";

test("renders LinkTabMesRequetes renders correctly", () => {
  act(() => {
    render(<LinkTabMesRequetes />);
  });
  expect(screen.getByRole("tab")).toBeDefined();
});

test("renders LinkTabMesRequetes is disabled", () => {
  act(() => {
    render(<LinkTabMesRequetes disabled={true} />);
  });
  expect(screen.getByRole("tab").className).toContain("tab-disabled");
});

test("renders LinkTabMesRequetes a11yProps works correctly", () => {
  const result = a11yProps(0);
  expect(result.id).toBe("nav-tab-0");
});

test("renders LinkTabMesRequetes is disabled", () => {
  act(() => {
    render(<LinkTabMesRequetes />);
  });

  waitFor(() => {
    screen.getByRole("tab").click();
  });
  expect(screen.getByRole("tab").tabIndex).toBe(-1);
});
