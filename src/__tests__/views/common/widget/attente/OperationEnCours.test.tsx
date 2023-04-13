import { fireEvent, render, waitFor } from "@testing-library/react";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import React from "react";

test("render OperationEnCours", async () => {
  const fn = jest.fn();

  render(
    <OperationEnCours visible={true} timeoutInMiliSec={10} onTimeoutEnd={fn} />
  );
  await waitFor(() => {
    const circle = document.getElementsByClassName(
      "MuiCircularProgress-circle"
    );
    expect(circle[0]).toBeDefined();
  });
  await waitFor(() => {
    expect(fn).toBeCalled();
  });
});

test("Clique sur le spinner", async () => {
  const fn = jest.fn();
  const fn2 = jest.fn();
  render(
    <OperationEnCours
      visible={true}
      timeoutInMiliSec={10}
      onTimeoutEnd={fn}
      onClick={fn2}
    />
  );
  await waitFor(() => {
    const circle = document.getElementsByClassName(
      "MuiCircularProgress-circle"
    );
    expect(circle[0]).toBeDefined();
    fireEvent.click(circle[0]);
    expect(fn2).toHaveBeenCalled();
  });
});
