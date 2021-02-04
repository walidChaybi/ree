import React from "react";
import { useState } from "react";
import { ConfirmationPopin } from "../../../../views/common/widget/popin/ConfirmationPopin";
import { render, act, waitFor, screen, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

afterEach(cleanup);

interface HookConsummerConfirmationPopinProps {
  ok?: any;
  cancel?: any;
}
const HookConsummerConfirmationPopin: React.FC<HookConsummerConfirmationPopinProps> = (
  props: any
) => {
  const [display, setDisplay] = useState(true);

  return (
    <ConfirmationPopin
      isOpen={display}
      message="Message de test"
      onNo={() => {
        props.cancel();
        setDisplay(false);
      }}
      onYes={() => {
        props.ok();
        setDisplay(false);
      }}
    />
  );
};

test("Attendu la popin ConfirmationPopin, le bouton 'Oui' fonctionne correctement", async () => {
  const ok = jest.fn();

  render(<HookConsummerConfirmationPopin ok={ok} />);

  let okButton: HTMLElement;
  await waitFor(() => {
    okButton = screen.getByText(/Oui/);
    expect(okButton).toBeInTheDocument();
  });
  fireEvent.click(okButton!);

  await waitFor(() => {
    expect(ok).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    expect(okButton).not.toBeInTheDocument();
  });
});

test("Attendu la popin ConfirmationPopin, le bouton 'Non' fonctionne correctement", async () => {
  const cancel = jest.fn();

  render(<HookConsummerConfirmationPopin cancel={cancel} />);

  let cancelButton: HTMLElement;
  await waitFor(() => {
    cancelButton = screen.getByText(/Non/);
    expect(cancelButton).toBeInTheDocument();
  });
  fireEvent.click(cancelButton!);

  await waitFor(() => {
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    expect(cancelButton).not.toBeInTheDocument();
  });
});
