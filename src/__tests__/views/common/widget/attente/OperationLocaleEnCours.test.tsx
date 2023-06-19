import { render, waitFor } from "@testing-library/react";
import { OperationLocaleEnCours } from "@widget/attente/OperationLocaleEnCours";

test("render OperationEnCours", async () => {
  const fn = jest.fn();
  render(
    <OperationLocaleEnCours
      visible={true}
      timeoutInMiliSec={10}
      onTimeoutEnd={fn}
    />
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
