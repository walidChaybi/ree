import { render, waitFor } from "@testing-library/react";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React from "react";
import { expect, test, vi } from "vitest";
import * as Yup from "yup";

const HookConsummerFormulaire: React.FC = () => {
  const FORMULAIRE = "formulaire";
  const DefaultValues = {
    [FORMULAIRE]: ""
  };
  const ValidationSchema = Yup.object({
    [FORMULAIRE]: Yup.string()
  });

  const handleClickButton = vi.fn();

  return (
    <Formulaire
      titre="titreFormulaire"
      formDefaultValues={DefaultValues}
      formValidationSchema={ValidationSchema}
      onSubmit={handleClickButton}
    />
  );
};

test("render composant Formulaire", () => {
  const { getByText } = render(<HookConsummerFormulaire />);

  waitFor(() => {
    expect(getByText(/titreFormulaire/i)).toBeDefined();
  });
});
