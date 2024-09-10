import { render, waitFor } from "@testing-library/react";
import { OperationLocaleEnCours } from "@widget/attente/OperationLocaleEnCours";
import { expect, test, vi } from "vitest";

test("render OperationEnCours", () => {
  const fn = vi.fn();
  render(
    <OperationLocaleEnCours
      visible={true}
      timeoutInMiliSec={10}
      onTimeoutEnd={fn}
    />
  );

  waitFor(() => {
    const circle = document.getElementsByClassName(
      "MuiCircularProgress-circle"
    );
    expect(circle[0]).toBeDefined();
  });

  waitFor(() => {
    expect(fn).toBeCalled();
  });
});
