import React from "react";
import { render, waitFor, act } from "@testing-library/react";

import * as Yup from "yup";
import { Formulaire } from "../../../../views/common/widget/formulaire/Formulaire";
import TitulaireFiltre from "../../../../views/pages/rechercheMultiCriteres/filtres/titulaire/TitulaireFiltre";

const HookConsummerFormulaire: React.FC = () => {
  const FORMULAIRE = "formulaire";
  const DefaultValues = {
    [FORMULAIRE]: ""
  };
  const ValidationSchema = Yup.object({
    [FORMULAIRE]: Yup.string()
  });
  const blocsForm: JSX.Element[] = [
    <TitulaireFiltre nomFiltre={"titulaire"} key={"titulaire"} />
  ];
  const handleClickButton = jest.fn();

  return (
    <Formulaire
      titre="titreFormulaire"
      formDefaultValues={DefaultValues}
      formValidationSchema={ValidationSchema}
      libelleBouton="libelleBouton"
      blocs={blocsForm}
      onSubmit={handleClickButton}
    />
  );
};

test("render composant Formulaire", async () => {
  await act(async () => {
    const { getByText } = render(<HookConsummerFormulaire />);

    await waitFor(() => {
      expect(getByText(/titreFormulaire/i)).toBeDefined();
      expect(getByText(/Titulaire/i)).toBeDefined();
      expect(getByText(/libelleBouton/i)).toBeDefined();
    });
  });
});
