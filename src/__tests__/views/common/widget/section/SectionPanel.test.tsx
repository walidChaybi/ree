import { render, waitFor } from "@testing-library/react";
import { SectionPanel } from "@widget/section/SectionPanel";
import { expect, test } from "vitest";

test("render composant SectionPanel", () => {
  const { getByTestId, getAllByTestId } = render(
    <SectionPanel
      panelAreas={[
        {
          parts: [
            {
              contents: [{ libelle: "testLibelle1", value: "testValue1" }],
              title: "titleTest1"
            },
            {
              contents: [{ libelle: "testLibelle2", value: "testValue2" }],
              title: "titleTest2"
            }
          ]
        },
        {
          parts: [
            {
              contents: [{ libelle: "testLibelle1.1", value: "testValue1.1" }],
              title: "titleTest1.1"
            },
            {
              contents: [{ libelle: "testLibelle2.1", value: "testValue2.1" }],
              title: "titleTest2.1"
            }
          ]
        }
      ]}
      title={"titleArea"}
      id="panelAreaTest"
    />
  );

  waitFor(() => {
    expect(getByTestId(/section-panel-hr-titleArea-0/i)).toBeDefined();
    expect(getAllByTestId(/section-panel-hr-titleArea/i)).toHaveLength(1);
  });
});
