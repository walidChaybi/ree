import { fireEvent, render } from "@testing-library/react";
import { BarreNavigationSuivPrec } from "@widget/navigation/barreNavigationSuivPrec/BarreNavigationSuivPrec";
import React from "react";
import { describe, expect, test } from "vitest";

describe("Test du composant barre navigation suivant précédent", () => {
  test("Attendu le composant BarreNavigationSuivPrec fonctionne correctement", () => {
    const BarreNavigationSuivPrecConsumer: React.FC = () => {
      const [indexCourant, setIndexCourant] = React.useState<number>(0);
      const setIndex = function (idx: number) {
        setIndexCourant(idx);
      };
      return (
        <BarreNavigationSuivPrec
          index={indexCourant}
          max={3}
          setIndex={setIndex}
        />
      );
    };

    const { getByTitle } = render(<BarreNavigationSuivPrecConsumer />);

    const precedent = getByTitle("Précédent") as HTMLButtonElement;
    const suivant = getByTitle("Suivant") as HTMLButtonElement;
    expect(precedent).toBeDefined();
    expect(suivant).toBeDefined();

    expect(precedent.disabled).toBeTruthy();
    expect(suivant.disabled).not.toBeTruthy();

    fireEvent.click(suivant);

    expect(precedent.disabled).not.toBeTruthy();
    expect(suivant.disabled).not.toBeTruthy();

    fireEvent.click(suivant);

    expect(precedent.disabled).not.toBeTruthy();
    expect(suivant.disabled).toBeTruthy();

    fireEvent.click(precedent);

    expect(precedent.disabled).not.toBeTruthy();
    expect(suivant.disabled).not.toBeTruthy();

    fireEvent.click(precedent);

    expect(precedent.disabled).toBeTruthy();
    expect(suivant.disabled).not.toBeTruthy();
  });
});
