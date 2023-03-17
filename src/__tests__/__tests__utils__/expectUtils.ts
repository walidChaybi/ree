import { fireEvent, screen } from "@testing-library/react";

export function expectEstTexteAbsent(texte: string) {
  const widget = screen.queryByText(texte);
  expect(widget).not.toBeInTheDocument();
}

export function expectEstTextePresent(texte: string) {
  const widget = screen.queryByText(texte);
  expect(widget).toBeInTheDocument();
}

export function expectEstAbsent(ariaLabel: string) {
  const widget = screen.queryByLabelText(ariaLabel) as HTMLInputElement;
  expect(widget).not.toBeInTheDocument();
}

export function expectSelectEstAbsent(testId: string) {
  const widget = screen.queryByTestId(testId) as HTMLSelectElement;
  expect(widget).toBeNull();
}

export function expectEstBoutonDisabled(ariaLabel: string) {
  const widget = screen.getByLabelText(ariaLabel) as HTMLButtonElement;
  expect(widget.disabled).toBeTruthy();

  return widget;
}

export function expectEstBoutonEnabled(ariaLabel: string) {
  const widget = screen.getByLabelText(ariaLabel) as HTMLButtonElement;
  expect(widget.disabled).toBeFalsy();

  return widget;
}


export function expectEstPresentAvecValeurEtDisabled(
  ariaLabel: string,
  valeur: string
) {
  expectEstPresentAvecValeur(ariaLabel, valeur);
  const widget = screen.getByLabelText(ariaLabel) as HTMLInputElement;
  expect(widget.disabled).toBeTruthy();

  return widget;
}

export function expectEstPresentAvecValeur(ariaLabel: string, value: string) {
  const widget = screen.getByLabelText(ariaLabel) as HTMLInputElement;
  expect(widget).toBeInTheDocument();
  expect(widget.value).toBe(value);

  return widget;
}

export function expectEstPresentAvecValeurVide(ariaLabel: string) {
  return expectEstPresentAvecValeur(ariaLabel, "");
}

export function expectEstPresentEtChecked(ariaLabel: string) {
  const widget = screen.getByLabelText(ariaLabel) as HTMLInputElement;
  expect(widget).toBeInTheDocument();
  expect(widget.checked).toBeTruthy();

  return widget;
}

export function expectEstPresentEtNonChecked(ariaLabel: string) {
  const widget = screen.getByLabelText(ariaLabel) as HTMLInputElement;
  expect(widget).toBeInTheDocument();
  expect(widget.checked).toBeFalsy();

  return widget;
}

export function expectEstSelectPresentAvecValeur(
  testId: string,
  value: string
) {
  const widget = screen.getByTestId(testId) as HTMLSelectElement;
  expect(widget).toBeInTheDocument();
  expect(widget.value).toBe(value);

  return widget;
}

export function changeInput(ariaLabel: string, value: string) {
  const widget = screen.getByLabelText(ariaLabel) as HTMLInputElement;

  fireEvent.input(widget, {
    target: {
      value: value
    }
  });

  return widget;
}
