import React from "react";
import { render, screen } from "@testing-library/react";
import { ValidationPopin } from "../../../views/common/widget/ValidationPopin";

test("renders composant ValidationPopin, can't validate", () => {
  render(
    <>
      <ValidationPopin
        buttonMessageId={"pages.delivrance.action.signature"}
        messageId={"signature.confirmation"}
        errorMessageId={"errors.pages.requetes.B01"}
        onValid={() => {}}
        canValidate={false}
      />
    </>
  );
  const errorMsg = screen.getByText(
    "Le service de signature électronique est indisponible"
  );

  expect(errorMsg).toBeInTheDocument();
});
