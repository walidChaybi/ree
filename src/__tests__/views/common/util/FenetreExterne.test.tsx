import { render, waitFor } from "@testing-library/react";
import { FenetreExterne } from "@util/FenetreExterne";
import React from "react";

const globalAny: any = global;
globalAny.open = () => {
  return { ...window, addEventListener: jest.fn() };
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
