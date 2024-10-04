// OngletContenu.test.tsx
import { render } from "@testing-library/react"; // You can also use React Testing Library if needed
import { describe, expect, it } from "vitest";
import OngletsContenu from "../../../../composants/commun/onglets/OngletsContenu";

describe("OngletContenu", () => {
  it("render le composant child correctement", () => {
    const { container } = render(
      <OngletsContenu estActif={false}>Hello World</OngletsContenu>
    );

    expect(container.textContent).toContain("Hello World");
  });

  it('doit avoir "volet-actif" quand estActif est true', () => {
    const { container } = render(
      <OngletsContenu estActif={true}>Active Tab</OngletsContenu>
    );

    expect(container.firstElementChild?.classList).toContain("volet-actif");
  });

  it('ne doit pas avoir "volet-actif" quand estActif est false', () => {
    const { container } = render(
      <OngletsContenu estActif={false}>Inactive Tab</OngletsContenu>
    );

    expect(container.firstElementChild?.classList).not.toContain("volet-actif");
  });
});
