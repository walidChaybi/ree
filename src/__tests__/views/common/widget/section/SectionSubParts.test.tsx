import { render, waitFor } from "@testing-library/react";
import { SectionSubParts } from "@widget/section/SectionSubParts";
import { expect, test } from "vitest";

test("render composant SectionSubParts", () => {
  render(
    <SectionSubParts
      subParts={[
        {
          contents: [{ libelle: "testLibelle", value: "testValue" }],
          title: "titleTest",
          classNameContent: ""
        }
      ]}
    />
  );

  waitFor(() => {
    expect(document.getElementsByClassName("wrapper")).toHaveLength(2);
  });
});
