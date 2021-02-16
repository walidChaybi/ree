import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { customHeaderRenderer } from "../../../../../views/common/widget/formulaire/datePicker/CustomHeader";

test("Attendu: customHeaderRenderer fonctionne correctement", async () => {
  const evt = {
    preventDefault: jest.fn(),
    value: ""
  };
  const headerParams = {
    date: new Date(),
    changeYear: jest.fn(),
    changeMonth: jest.fn(),
    decreaseMonth: jest.fn(),
    increaseMonth: jest.fn(),
    prevMonthButtonDisabled: false,
    nextMonthButtonDisabled: false
  };
  const CustomHeaderDatePicker: React.FC = () => {
    return customHeaderRenderer(headerParams);
  };

  render(<CustomHeaderDatePicker />);

  const buttons = screen.getAllByRole("button");
  fireEvent.click(buttons[0], evt);
  expect(headerParams.decreaseMonth).toHaveBeenCalledTimes(1);

  fireEvent.click(buttons[1], evt);
  expect(headerParams.increaseMonth).toHaveBeenCalledTimes(1);

  const selectMonth = screen.getByLabelText(
    "select month"
  ) as HTMLSelectElement;
  evt.value = "6";
  fireEvent.change(selectMonth, evt);
  expect(headerParams.changeMonth).toHaveBeenCalledTimes(1);

  const selectYear = screen.getByLabelText("select year");
  evt.value = "2000";
  fireEvent.change(selectYear, evt);
  expect(headerParams.changeYear).toHaveBeenCalledTimes(1);
});
