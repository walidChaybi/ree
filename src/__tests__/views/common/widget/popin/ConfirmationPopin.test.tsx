import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useState } from "react";
import { afterEach, expect, test, vi } from "vitest";

afterEach(cleanup);

interface HookConsummerConfirmationPopinProps {
  ok?: any;
  cancel?: any;
}
const HookConsummerConfirmationPopin: React.FC<
  HookConsummerConfirmationPopinProps
> = (props: any) => {
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
      estOuvert={display}
      messages={["Message de test"]}
      boutons={boutonsPopin}
    />
  );
};

test("Attendu la popin ConfirmationPopin, le bouton 'Oui' fonctionne correctement", () => {
  const ok = vi.fn();

  render(<HookConsummerConfirmationPopin ok={ok} />);

  let okButton: HTMLElement;
  waitFor(() => {
    okButton = screen.getByText(/Oui/);
    expect(okButton).toBeDefined();
  });

  fireEvent.click(okButton!);

  waitFor(() => {
    expect(ok).toHaveBeenCalledTimes(1);
  });

  waitFor(() => {
    expect(okButton).not.toBeDefined();
  });
});

test("Attendu la popin ConfirmationPopin, le bouton 'Non' fonctionne correctement", () => {
  const cancel = vi.fn();

  render(<HookConsummerConfirmationPopin cancel={cancel} />);

  let cancelButton: HTMLElement;
  waitFor(() => {
    cancelButton = screen.getByText(/Non/);
    expect(cancelButton).toBeDefined();
  });

  fireEvent.click(cancelButton!);

  waitFor(() => {
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  waitFor(() => {
    expect(cancelButton).not.toBeDefined();
  });
});
