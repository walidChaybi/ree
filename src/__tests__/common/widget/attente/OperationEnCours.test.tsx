import { render, waitFor } from "@testing-library/react";
import React from "react";
import { OperationEnCours } from "../../../../views/common/widget/attente/OperationEnCours";

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
