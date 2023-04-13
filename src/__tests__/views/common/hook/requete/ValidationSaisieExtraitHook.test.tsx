import {
  ISauvegardeValidationSaisieExtraitParams,
  useSauvegardeValidationSaisieExtrait
} from "@hook/requete/ValidationSaisieExtraitHook";
import {
  acteExtraitSaisie,
  extraitSaisiAEnvoyer,
  requeteExtraitSaisie
} from "@mock/data/DonneesSaisieExtrait";
import { render, waitFor } from "@testing-library/react";
import React from "react";

const callBack = jest.fn();

const params: ISauvegardeValidationSaisieExtraitParams = {
  callBack,
  extraitSaisiAEnvoyer,
  acte: acteExtraitSaisie,
  requete: requeteExtraitSaisie,
  problemePlurilingue: false
};

const HookConsumer: React.FC = () => {
  useSauvegardeValidationSaisieExtrait(params);
  return <></>;
};

test("Attendu: useSauvegardeValidationSaisieExtrait fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    expect(callBack).toHaveBeenCalled();
  });
});
