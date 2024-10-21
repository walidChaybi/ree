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

test("Attendu la popin ConfirmationPopin, le bouton 'Oui' fonctionne correctement", async () => {
  const ok = vi.fn();

  render(<HookConsummerConfirmationPopin ok={ok} />);

  const okButton = screen.getByText(/Oui/);
  expect(okButton).toBeDefined();
  fireEvent.click(okButton);

  await waitFor(() => {
    expect(ok).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Oui/)).toBeNull();
  });
});

test("Attendu la popin ConfirmationPopin, le bouton 'Non' fonctionne correctement", async () => {
  const cancel = vi.fn();

  render(<HookConsummerConfirmationPopin cancel={cancel} />);

  const cancelButton = screen.getByText(/Non/);
  expect(cancelButton).toBeDefined();

  fireEvent.click(cancelButton);

  await waitFor(() => {
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Non/)).toBeNull();
  });
});
