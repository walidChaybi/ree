import { render, waitFor } from "@testing-library/react";
import { SectionSubParts } from "@widget/section/SectionSubParts";
import React from "react";

test("render composant SectionPart", async () => {
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

  await waitFor(() => {
    expect(document.getElementsByClassName("wrapper")).toHaveLength(2);
  });
});
