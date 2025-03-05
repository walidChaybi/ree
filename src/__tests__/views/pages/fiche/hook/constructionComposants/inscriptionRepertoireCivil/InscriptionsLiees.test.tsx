import { InscriptionsLiees } from "@pages/fiche/hook/constructionComposants/inscriptionRepertoireCivil/InscriptionsLiees";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Inscription liees: all rc link are displayed and separated by coma", () => {
  const { getAllByText, getByText } = render(
    <InscriptionsLiees
      inscriptionsLiees={[
        {
          typeInscription: "INSCRIPTION",
          numero: "01",
          id: "011",
          annee: "",
          nature: ""
        },
        {
          typeInscription: "INSCRIPTION",
          numero: "02",
          id: "022",
          annee: "",
          nature: ""
        },
        {
          typeInscription: "INSCRIPTION",
          numero: "03",
          id: "033",
          annee: "",
          nature: ""
        }
      ]}
    />
  );
  expect(getAllByText(new RegExp("RC", "i"))).toHaveLength(3);
  expect(getAllByText(new RegExp(",", "i"))).toHaveLength(2);
  expect(getByText(new RegExp("01", "i"))).toBeDefined();
  expect(getByText(new RegExp("02", "i"))).toBeDefined();
  expect(getByText(new RegExp("03", "i"))).toBeDefined();
});
