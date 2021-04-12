import React from "react";

import { render, waitFor } from "@testing-library/react";
import { SectionSubParts } from "../../../../views/common/widget/section/SectionSubParts";

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
