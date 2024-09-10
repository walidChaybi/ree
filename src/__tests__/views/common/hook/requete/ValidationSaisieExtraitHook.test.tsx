import {
  ISauvegardeValidationSaisieExtraitParams,
  useSauvegardeValidationSaisieExtrait
} from "@hook/requete/ValidationSaisieExtraitHook";
import {
  acteExtraitSaisie,
  extraitSaisiAEnvoyer,
  requeteExtraitSaisie
} from "@mock/data/DonneesSaisieExtrait";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

const callBack = vi.fn();

const params: ISauvegardeValidationSaisieExtraitParams = {
  callBack,
  extraitSaisiAEnvoyer,
  acte: acteExtraitSaisie,
  requete: requeteExtraitSaisie,
  problemePlurilingue: false,
  valeursCourrierParDefaut: {} as SaisieCourrier
};

const HookConsumer: React.FC = () => {
  useSauvegardeValidationSaisieExtrait(params);
  return <></>;
};

test("Attendu: useSauvegardeValidationSaisieExtrait fonctionne correctement", () => {
  render(<HookConsumer />);

  waitFor(() => {
    expect(callBack).toHaveBeenCalled();
  });
});
