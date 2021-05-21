import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import {
  a11yProps,
  LinkTabMesRequetes
} from "../../../../views/pages/espaceDelivrance/v2/contenu/LinkTabMesRequetesV2";

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
