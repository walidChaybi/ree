import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CodePinForm } from "@widget/signature/CodePinForm";
import { expect, test, vi } from "vitest";

test("renders form popin, setPinCode function called on validation", () => {
  const handleClickButton = vi.fn();

  render(
    <CodePinForm
      onClose={() => {
        return;
      }}
      onSubmit={handleClickButton}
    />
  );

  const pinCodeInput = document.getElementById("codePin");
  if (pinCodeInput !== null) {
    fireEvent.change(pinCodeInput, { target: { value: "1234" } });
  }

  const validateButton = screen.getByText("Valider");
  fireEvent.click(validateButton);

  waitFor(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
  });
});

test("renders form popin, close function called on cancel", () => {
  const handleClickButton = vi.fn();

  render(
    <CodePinForm
      onClose={handleClickButton}
      onSubmit={() => {
        return;
      }}
    />
  );
  const closeButton = screen.getByText("Annuler");
  fireEvent.click(closeButton);

  expect(handleClickButton).toHaveBeenCalledTimes(1);
});

test("DOIT afficher un message d'erreur QUAND le code pin est effacé", () => {
  const handleClickButton = vi.fn();

  render(
    <CodePinForm
      onClose={() => {
        return;
      }}
      onSubmit={handleClickButton}
    />
  );

  const pinCodeInput = document.getElementById("codePin");
  if (pinCodeInput !== null) {
    fireEvent.change(pinCodeInput, { target: { value: "1234" } });
    fireEvent.change(pinCodeInput, { target: { value: "" } });
  }

  waitFor(() => {
    expect(
      screen.getByText("Le code pin de la carte doit être fourni")
    ).toBeDefined();
  });
});

test("DOIT afficher un message d'erreur QUAND le code pin ne contient pas que des nombres", () => {
  const handleClickButton = vi.fn();

  render(
    <CodePinForm
      onClose={() => {
        return;
      }}
      onSubmit={handleClickButton}
    />
  );

  const pinCodeInput = document.getElementById("codePin");
  if (pinCodeInput !== null) {
    fireEvent.change(pinCodeInput, { target: { value: "1a2b" } });
  }

  waitFor(() => {
    expect(screen.getByText("Le code pin doit être un nombre")).toBeDefined();
  });
});
test("DOIT afficher un message d'erreur QUAND le code pin est supérieur à 8 caractères", () => {
  const handleClickButton = vi.fn();

  render(
    <CodePinForm
      onClose={() => {
        return;
      }}
      onSubmit={handleClickButton}
    />
  );

  const pinCodeInput = document.getElementById("codePin");
  if (pinCodeInput !== null) {
    fireEvent.change(pinCodeInput, { target: { value: "123456789" } });
  }

  waitFor(() => {
    expect(
      screen.getByText("Le code pin ne doit pas dépasser 8 caractères")
    ).toBeDefined();
  });
});
