import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { customHeaderRenderer } from "@widget/formulaire/datePicker/CustomHeader";
import React from "react";
import { expect, test, vi } from "vitest";

test("Attendu: customHeaderRenderer fonctionne correctement", () => {
  const evt = {
    preventDefault: vi.fn(),
    value: ""
  };
  const headerParams = {
    date: new Date(),
    changeYear: vi.fn(),
    changeMonth: vi.fn(),
    decreaseMonth: vi.fn(),
    increaseMonth: vi.fn(),
    prevMonthButtonDisabled: false,
    nextMonthButtonDisabled: false
  };
  const CustomHeaderDatePicker: React.FC = () => {
    return customHeaderRenderer(headerParams);
  };

    render(<CustomHeaderDatePicker />);

  const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0], evt);

  waitFor(() => {
    expect(headerParams.decreaseMonth).toHaveBeenCalledTimes(1);
  });

    fireEvent.click(buttons[1], evt);

  waitFor(() => {
    expect(headerParams.increaseMonth).toHaveBeenCalledTimes(1);
  });

  evt.value = "6";

    fireEvent.change(screen.getByLabelText("select month"), evt);

  waitFor(() => {
    expect(headerParams.changeMonth).toHaveBeenCalledTimes(1);
  });

  evt.value = "2000";

    fireEvent.change(screen.getByLabelText("select year"), evt);

  waitFor(() => {
    expect(headerParams.changeYear).toHaveBeenCalledTimes(1);
  });
});
