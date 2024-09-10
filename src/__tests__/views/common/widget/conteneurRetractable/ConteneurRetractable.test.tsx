import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { expect, test } from "vitest";

test("Attendu: Un clic sur un conteneur retractable fait apparaitre/disparaitre son contenu", () => {
  render(
    <ConteneurRetractable titre="testConteneur" initConteneurFerme={false} />
  );

  const conteneurRetractable = screen.getByText("testConteneur");

  waitFor(() => {
    expect(conteneurRetractable.classList.contains("vertical")).toBeFalsy();
  });

  fireEvent.click(conteneurRetractable);

  waitFor(() => {
    expect(conteneurRetractable.classList.contains("vertical")).toBeTruthy();
  });
});
