import React from "react";

import { render, waitFor } from "@testing-library/react";
import { AccordionSubParts } from "../../../../views/common/widget/accordion/AccordionSubPart";

test("render composant AccordionPart", async () => {
  render(
    <AccordionSubParts
      subParts={[
        {
          contents: [{ libelle: "testLibelle", value: "testValue" }],
          title: "titleTest",
          classNameContent: ""
        }
      ]}
      columnIndex={"1"}
    />
  );

  await waitFor(() => {
    expect(document.getElementsByClassName("wrapper")).toHaveLength(2);
  });
});
