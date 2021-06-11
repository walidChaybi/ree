import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React, { useState } from "react";
import { ConfirmationPopin } from "../../../../views/common/widget/popin/ConfirmationPopin";

afterEach(cleanup);

interface HookConsummerConfirmationPopinProps {
  ok?: any;
  cancel?: any;
}
const HookConsummerConfirmationPopin: React.FC<HookConsummerConfirmationPopinProps> = (
  props: any
) => {
  const [display, setDisplay] = useState(true);

  const boutonsPopin = [
    {
      label: "Non",
      action: () => {
        props.cancel();
        setDisplay(false);
      }
    },
    {
      label: "Oui",
      action: () => {
        props.ok();
        setDisplay(false);
      }
    }
  ];

  return (
    <ConfirmationPopin
      isOpen={display}
      messages={["Message de test"]}
      boutons={boutonsPopin}
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
