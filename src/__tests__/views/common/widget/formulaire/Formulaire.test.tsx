import { act, render, waitFor } from "@testing-library/react";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React from "react";
import * as Yup from "yup";

const HookConsummerFormulaire: React.FC = () => {
  const FORMULAIRE = "formulaire";
  const DefaultValues = {
    [FORMULAIRE]: ""
  };
  const ValidationSchema = Yup.object({
    [FORMULAIRE]: Yup.string()
  });

  const handleClickButton = jest.fn();

  return (
    <Formulaire
      titre="titreFormulaire"
      formDefaultValues={DefaultValues}
      formValidationSchema={ValidationSchema}
      onSubmit={handleClickButton}
    />
  );
};

test("render composant Formulaire", async () => {
  await act(async () => {
    const { getByText } = render(<HookConsummerFormulaire />);

    await waitFor(() => {
      expect(getByText(/titreFormulaire/i)).toBeDefined();
    });
  });
});
