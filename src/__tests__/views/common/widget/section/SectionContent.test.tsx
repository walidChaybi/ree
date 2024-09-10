import { render, waitFor } from "@testing-library/react";
import { SectionContent } from "@widget/section/SectionContent";
import { expect, test } from "vitest";

test("render composant SectionContent", () => {
  const { getByText } = render(
    <SectionContent libelle="testLibelle" value="testValue" row={0} />
  );

  waitFor(() => {
    expect(getByText(/testLibelle/i)).toBeDefined();
    expect(getByText(/testValue/i)).toBeDefined();
  });
});
