import React from "react";

import { render, waitFor } from "@testing-library/react";
import { FenetreExterne } from "../../../views/common/util/FenetreExterne";
import { Button } from "@material-ui/core";

test("open new external window", async () => {
  global.open = () => {
    return { ...window };
  };
  global.close = jest.fn();
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
  global.open = () => {
    return { ...window };
  };
  global.close = jest.fn();

  const onCloseHandler = jest.fn();
  const {} = render(
    <FenetreExterne titre={"Nouvelle Fenêtre"} onCloseHandler={onCloseHandler}>
      <span>Fenetre externe</span>
    </FenetreExterne>
  );

  const event = new CustomEvent("beforeunload");
  window.top.dispatchEvent(event);

  await waitFor(() => {
    expect(onCloseHandler).toBeCalled();
  });
});

test("external window recveive refreshStyles event", async () => {
  global.open = () => {
    return {
      ...window
    };
  };

  global.close = jest.fn();

  const { container } = render(
    <FenetreExterne titre={"Nouvelle Fenêtre"}>
      <Button />
    </FenetreExterne>
  );

  const event = new CustomEvent("refreshStyles");
  window.top.dispatchEvent(event);
  expect(container).toBeDefined();
});
