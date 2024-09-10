import { render, waitFor } from "@testing-library/react";
import { SectionPart } from "@widget/section/SectionPart";
import { expect, test } from "vitest";

test("render composant SectionPart", () => {
  const { getByText } = render(
    <SectionPart
      partContent={{
        contents: [{ libelle: "testLibelle", value: "testValue" }],
        title: "titleTest",
        classNameContent: ""
      }}
    />
  );

  waitFor(() => {
    expect(getByText(/titleTest/i)).toBeDefined();
  });
});
