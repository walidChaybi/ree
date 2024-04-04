import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CodePinForm } from "@widget/signature/CodePinForm";

test("renders form popin, setPinCode function called on validation", async () => {
  const handleClickButton = jest.fn();

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
  await waitFor(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
  });
});

test("renders form popin, close function called on cancel", () => {
  const handleClickButton = jest.fn();

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

test("DOIT afficher un message d'erreur QUAND le code pin est effacé", async () => {
  const handleClickButton = jest.fn();

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

  await waitFor(() => {
    expect(
      screen.getByText("Le code pin de la carte doit être fourni")
    ).toBeInTheDocument();
  });
});

test("DOIT afficher un message d'erreur QUAND le code pin ne contient pas que des nombres", async () => {
  const handleClickButton = jest.fn();

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

  await waitFor(() => {
    expect(
      screen.getByText("Le code pin doit être un nombre")
    ).toBeInTheDocument();
  });
});
test("DOIT afficher un message d'erreur QUAND le code pin est supérieur à 8 caractères", async () => {
  const handleClickButton = jest.fn();

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

  await waitFor(() => {
    expect(
      screen.getByText("Le code pin ne doit pas dépasser 8 caractères")
    ).toBeInTheDocument();
  });
});
