import { render, screen, waitFor } from "@testing-library/react";
import { a11yProps } from "@widget/onglets/BoiteAOnglets";
import { LinkTab } from "@widget/onglets/LinkTab";
import { expect, test } from "vitest";

test("renders LinkTab renders correctly", () => {
  render(<LinkTab />);

  waitFor(() => {
    expect(screen.getByRole("tab")).toBeDefined();
  });
});

test("renders LinkTab a11yProps works correctly", () => {
  const result = a11yProps(0);

  waitFor(() => {
    expect(result.id).toBe("nav-tab-0");
  });
});

test("renders LinkTab is disabled", () => {
  render(<LinkTab disabled={true} />);

  waitFor(() => {
    expect(screen.getAllByRole("tab")[3].className).toContain("tab-disabled");
  });
});
