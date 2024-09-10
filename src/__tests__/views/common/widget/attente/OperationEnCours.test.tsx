import { fireEvent, render, waitFor } from "@testing-library/react";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { expect, test, vi } from "vitest";

test("render OperationEnCours", () => {
  const fn = vi.fn();

  render(
    <OperationEnCours visible={true} timeoutInMiliSec={10} onTimeoutEnd={fn} />
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

test("Clique sur le spinner", () => {
  const fn = vi.fn();
  const fn2 = vi.fn();
  render(
    <OperationEnCours
      visible={true}
      timeoutInMiliSec={10}
      onTimeoutEnd={fn}
      onClick={fn2}
    />
  );
  waitFor(() => {
    const circle = document.getElementsByClassName(
      "MuiCircularProgress-circle"
    );
    expect(circle[0]).toBeDefined();
    fireEvent.click(circle[0]);
    expect(fn2).toHaveBeenCalled();
  });
});
