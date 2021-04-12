import React from "react";

import { render, waitFor } from "@testing-library/react";
import { SectionPart } from "../../../../views/common/widget/section/SectionPart";

test("render composant SectionPart", async () => {
  const { getByText } = render(
    <SectionPart
      contentsPart={{
        contents: [{ libelle: "testLibelle", value: "testValue" }],
        title: "titleTest",
        classNameContent: ""
      }}
    />
  );

  await waitFor(() => {
    expect(getByText(/titleTest/i)).toBeDefined();
  });
});
