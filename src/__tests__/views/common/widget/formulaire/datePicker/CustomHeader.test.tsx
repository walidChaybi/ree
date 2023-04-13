import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { customHeaderRenderer } from "@widget/formulaire/datePicker/CustomHeader";
import React from "react";

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

  await act(async () => {
    render(<CustomHeaderDatePicker />);
  });

  const buttons = screen.getAllByRole("button");

  await act(async () => {
    fireEvent.click(buttons[0], evt);
  });

  await waitFor(() => {
    expect(headerParams.decreaseMonth).toHaveBeenCalledTimes(1);
  });

  await act(async () => {
    fireEvent.click(buttons[1], evt);
  });

  await waitFor(() => {
    expect(headerParams.increaseMonth).toHaveBeenCalledTimes(1);
  });

  evt.value = "6";

  await act(async () => {
    fireEvent.change(screen.getByLabelText("select month"), evt);
  });

  await waitFor(() => {
    expect(headerParams.changeMonth).toHaveBeenCalledTimes(1);
  });

  evt.value = "2000";

  await act(async () => {
    fireEvent.change(screen.getByLabelText("select year"), evt);
  });

  await waitFor(() => {
    expect(headerParams.changeYear).toHaveBeenCalledTimes(1);
  });
});
