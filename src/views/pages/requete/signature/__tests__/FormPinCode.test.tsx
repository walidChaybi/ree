import React from "react";
import { FormPinCode } from "../FormPinCode";
import { mount } from "enzyme";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

test("renders form popin", () => {
  const component = mount(
    <FormPinCode
      onClose={() => {
        return;
      }}
      setPinCode={() => {
        return;
      }}
    />
  );
  expect(component).toMatchSnapshot();
});

test("renders form popin, setPinCode function called on validation", async () => {
  const handleClickButton = jest.fn();

  render(
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

  const validateButton = screen.getByText("Valider");
  fireEvent.click(validateButton);
  await waitFor(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
  });
});

test("renders form popin, close function called on cancel", () => {
  const handleClickButton = jest.fn();

  render(
    <FormPinCode
      onClose={handleClickButton}
      setPinCode={() => {
        return;
      }}
    />
  );
  const closeButton = screen.getByText("Annuler");
  fireEvent.click(closeButton);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});
