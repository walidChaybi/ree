import { Button } from "@material-ui/core";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { FenetreExterne } from "../../../views/common/util/FenetreExterne";

const globalAny: any = global;
globalAny.open = () => {
  return { ...window };
};
globalAny.close = jest.fn();

test("open new external window", async () => {
  const { getByText } = render(
    <FenetreExterne titre={"Nouvelle Fenêtre"}>
      <span>Fenetre externe</span>
    </FenetreExterne>
  );
  await waitFor(() => {
    expect(getByText("Fenetre externe")).toBeDefined();
    expect(document.title).toBe("Nouvelle Fenêtre");
  });
});

test("open new external window", async () => {
  const onCloseHandler = jest.fn();
  const { container } = render(
    <FenetreExterne titre={"Nouvelle Fenêtre"} onCloseHandler={onCloseHandler}>
      <span>Fenetre externe</span>
    </FenetreExterne>
  );

  const event = new CustomEvent("beforeunload");
  window.top.dispatchEvent(event);
  expect(container).toBeDefined();

  await waitFor(() => {
    expect(onCloseHandler).toBeCalled();
  });
});

test("external window recveive refreshStyles event", async () => {
  const { container } = render(
    <FenetreExterne titre={"Nouvelle Fenêtre"}>
      <Button />
    </FenetreExterne>
  );

  const event = new CustomEvent("refreshStyles");
  window.top.dispatchEvent(event);
  expect(container).toBeDefined();
});
