import { render, screen } from "@testing-library/react";
import { SuccessSignature } from "@widget/signature/messages/SuccessSignature";
import { expect, test } from "vitest";

test("renders Success signature", () => {
  render(
    <SuccessSignature
      successes={[
        {
          date: "01/01/2020",
          numeroRequete: "numeroreq"
        },
        {
          date: "02/01/2020",
          numeroRequete: "numeroreq2"
        }
      ]}
    />
  );

  expect(
    screen.getByText(
      "Le(s) document(s) de la requête n°numeroreq a (ont) été signé(s) le 01/01/2020"
    )
  ).toBeDefined();

  expect(
    screen.getByText(
      "Le(s) document(s) de la requête n°numeroreq2 a (ont) été signé(s) le 02/01/2020"
    )
  ).toBeDefined();
  expect(screen.getAllByRole("separator")).toHaveLength(2);
});
