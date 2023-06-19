import { render, waitFor } from "@testing-library/react";
import { SectionPart } from "@widget/section/SectionPart";

test("render composant SectionPart", async () => {
  const { getByText } = render(
    <SectionPart
      partContent={{
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
