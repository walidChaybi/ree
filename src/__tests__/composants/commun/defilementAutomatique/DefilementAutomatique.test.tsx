import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import DefilementAutomatique from "../../../../composants/commun/defilementAutomatique/DefilementAutomatique";

describe("Test du composant DefilementAutomatique", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("DefilementAutomatique - lorsque faireDefiler est vrai, le composant devrait faire défiler l'écran", () => {
    const mockDefilement = vi.fn();

    HTMLElement.prototype.scrollIntoView = mockDefilement;

    render(<DefilementAutomatique faireDefiler />);

    vi.runAllTimers();

    expect(mockDefilement).toHaveBeenCalled();
  });

  test("DefilementAutomatique - lorsque faireDefiler est faux, le composant ne devrait pas faire défiler l'écran", () => {
    const mockDefilement = vi.fn();

    HTMLElement.prototype.scrollIntoView = mockDefilement;

    render(<DefilementAutomatique faireDefiler={false} />);

    vi.runAllTimers();

    expect(mockDefilement).not.toHaveBeenCalled();
  });
});
