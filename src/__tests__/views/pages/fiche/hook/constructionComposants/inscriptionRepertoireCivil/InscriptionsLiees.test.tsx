import { InscriptionsLiees } from "@pages/fiche/hook/constructionComposants/inscriptionRepertoireCivil/InscriptionsLiees";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Inscription liees: all rc link are displayed and separated bay coma", () => {
  const { getAllByText, getByText } = render(
    <InscriptionsLiees
      inscriptionsLiees={[
        {
          typeInscription: "rc",
          numero: "01",
          idInscription: "011"
        },
        {
          typeInscription: "rc",
          numero: "02",
          idInscription: "022"
        },
        {
          typeInscription: "rc",
          numero: "03",
          idInscription: "033"
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
