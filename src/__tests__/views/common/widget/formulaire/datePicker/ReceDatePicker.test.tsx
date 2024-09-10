import { render, screen } from "@testing-library/react";
import ReceDatePicker, {
  onDateValueChange
} from "@widget/formulaire/datePicker/ReceDatePicker";
import { expect, test, vi } from "vitest";

test("render composant ReceDatePicker", () => {
  render(<ReceDatePicker />);

  expect(screen.getByTitle("Calendrier")).toBeDefined();
});

test("render composant Formulaire: onDateValueChange", () => {
  const props = {
    onChange: vi.fn()
  };
  const setDateValue = vi.fn();
  onDateValueChange(props, setDateValue, new Date(), undefined);

  expect(props.onChange).toBeCalledTimes(1);
  expect(setDateValue).toBeCalledTimes(1);
});
