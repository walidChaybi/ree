import React from "react";
import { render, act, screen } from "@testing-library/react";
import ReceDatePicker, {
  onDateValueChange
} from "../../../../../views/common/widget/formulaire/datePicker/ReceDatePicker";

test("render composant ReceDatePicker", async () => {
  await act(async () => {
    render(<ReceDatePicker />);
  });

  expect(screen.getByTitle("Calendrier")).toBeDefined();
});

test("render composant Formulaire: onDateValueChange", async () => {
  const props = {
    onChange: jest.fn()
  };
  const setDateValue = jest.fn();
  onDateValueChange(props, setDateValue, new Date(), undefined);

  expect(props.onChange).toBeCalledTimes(1);
  expect(setDateValue).toBeCalledTimes(1);
});
