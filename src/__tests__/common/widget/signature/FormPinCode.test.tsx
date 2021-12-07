import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { FormPinCode } from "../../../../views/common/widget/signature/FormPinCode";

test("renders form popin, setPinCode function called on validation", async () => {
  const handleClickButton = jest.fn();

  const { getByText } = render(
    <FormPinCode
      onClose={() => {
        return;
      }}
      setPinCode={handleClickButton}
    />
  );

  const pinCodeInput = document.getElementById("pinCode");
  if (pinCodeInput !== null) {
    fireEvent.change(pinCodeInput, { target: { value: "1234" } });
  }

  const validateButton = getByText("Valider");
  fireEvent.click(validateButton);
  await waitFor(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
  });
});

test("renders form popin, close function called on cancel", () => {
  const handleClickButton = jest.fn();

  const { getByText } = render(
    <FormPinCode
      onClose={handleClickButton}
      setPinCode={() => {
        return;
      }}
    />
  );
  const closeButton = getByText("Annuler");
  fireEvent.click(closeButton);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});
