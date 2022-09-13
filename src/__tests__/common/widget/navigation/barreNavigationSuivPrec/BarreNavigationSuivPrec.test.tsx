import { fireEvent, render, screen } from "@testing-library/react";
import { BarreNavigationSuivPrec } from "@widget/navigation/barreNavigationSuivPrec/BarreNavigationSuivPrec";
import React from "react";

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

  render(<BarreNavigationSuivPrecConsumer />);

  const precedent = screen.getByTitle("Précédent");
  const suivant = screen.getByTitle("Suivant");
  expect(precedent).toBeInTheDocument();
  expect(suivant).toBeInTheDocument();

  expect(precedent).toBeDisabled();
  expect(suivant).not.toBeDisabled();

  fireEvent.click(suivant);

  expect(precedent).not.toBeDisabled();
  expect(suivant).not.toBeDisabled();

  fireEvent.click(suivant);

  expect(precedent).not.toBeDisabled();
  expect(suivant).toBeDisabled();

  fireEvent.click(precedent);

  expect(precedent).not.toBeDisabled();
  expect(suivant).not.toBeDisabled();

  fireEvent.click(precedent);

  expect(precedent).toBeDisabled();
  expect(suivant).not.toBeDisabled();
});
