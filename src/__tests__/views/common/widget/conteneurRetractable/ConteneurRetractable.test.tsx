import { fireEvent, render } from "@testing-library/react";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { describe, expect, test } from "vitest";

describe("Test composant conteneur rétractable", () => {
  test("Attendu: Un clic sur un conteneur retractable fait apparaitre/disparaitre son contenu", () => {
    const { getByText, queryByText } = render(
      <ConteneurRetractable titre="testConteneur" initConteneurFerme={false}>
        <div>{"Test"}</div>
      </ConteneurRetractable>
    );

    const conteneurRetractable = getByText("testConteneur");

    expect(conteneurRetractable.classList.contains("vertical")).toBeFalsy();
    expect(queryByText("Test")).toBeDefined();

    fireEvent.click(conteneurRetractable);

    expect(conteneurRetractable.classList.contains("vertical")).toBeTruthy();
    expect(queryByText("Test")).toBeNull();
  });
});
