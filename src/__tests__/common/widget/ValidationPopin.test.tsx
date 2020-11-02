import React from "react";
import { render, screen } from "@testing-library/react";
import { BoutonAvecValidationPopin } from "../../../views/common/widget/BoutonAvecValidationPopin";

test("renders composant ValidationPopin, can't validate", () => {
  render(
    <>
      <BoutonAvecValidationPopin
        buttonMessageId={"pages.delivrance.action.signature"}
        messageId={"signature.confirmation"}
        errorMessageId={"errors.pages.requetes.B01"}
        onValid={() => {}}
        canValidate={false}
      />
    </>
  );
  const errorMsg = screen.getByText("Le service de signature électronique est indisponible");

  expect(errorMsg).toBeInTheDocument();
});
