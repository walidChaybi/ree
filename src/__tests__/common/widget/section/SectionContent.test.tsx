import React from "react";

import { render, waitFor } from "@testing-library/react";
import { SectionContent } from "../../../../views/common/widget/section/SectionContent";

test("render composant SectionContent", async () => {
  const { getByText } = render(
    <SectionContent libelle="testLibelle" value="testValue" row={0} />
  );

  await waitFor(() => {
    expect(getByText(/testLibelle/i)).toBeDefined();
    expect(getByText(/testValue/i)).toBeDefined();
  });
});
