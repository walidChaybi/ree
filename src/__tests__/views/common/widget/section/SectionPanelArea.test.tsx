import { render, waitFor } from "@testing-library/react";
import { SectionPanelArea } from "@widget/section/SectionPanelArea";
import { expect, test } from "vitest";

test("render composant SectionPanelArea", () => {
  const { getByText } = render(
    <SectionPanelArea
      parts={[
        {
          partContent: {
            contents: [{ libelle: "testLibelle1", value: "testValue1" }],
            title: "titleTest1"
          }
        },
        {
          partContent: {
            contents: [{ libelle: "testLibelle2", value: "testValue2" }],
            title: "titleTest2"
          }
        }
      ]}
    />
  );

  waitFor(() => {
    expect(getByText(/titleTest1/i)).toBeDefined();
    expect(getByText(/testLibelle1/i)).toBeDefined();
    expect(getByText(/testValue1/i)).toBeDefined();
    expect(getByText(/titleTest2/i)).toBeDefined();
    expect(getByText(/testLibelle2/i)).toBeDefined();
    expect(getByText(/testValue2/i)).toBeDefined();
  });
});
