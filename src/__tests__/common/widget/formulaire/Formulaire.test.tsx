import React from "react";
import { render, waitFor, act } from "@testing-library/react";

import * as Yup from "yup";
import { Formulaire } from "../../../../views/common/widget/formulaire/Formulaire";

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
