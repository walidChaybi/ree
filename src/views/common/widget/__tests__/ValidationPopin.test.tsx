import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ValidationPopin } from "../ValidationPopin";

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

test("renders composant ValidationPopin, can validate", () => {
  render(
    <>
      <ValidationPopin
        buttonMessageId={"pages.delivrance.action.signature"}
        messageId={"signature.confirmation"}
        errorMessageId={"errors.pages.requetes.B01"}
        onValid={() => {}}
        canValidate={true}
      />
    </>
  );
  const question = screen.getByText(
    "Êtes-vous sûr de vouloir signer électroniquement le document ?"
  );

  expect(question).toBeInTheDocument();

  const cancelButton = screen.getByText("Annuler");
  fireEvent.click(cancelButton);
  /* const question2 = screen.getByText(
    "Êtes-vous sûr de vouloir signer électroniquement le document ?"
  );*/
  setTimeout(() => {
    expect(question).not.toBeInTheDocument();
  }, 75);
});
