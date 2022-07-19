import { render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configComposition } from "../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import {
  ISauvegardeValidationSaisieExtraitParams,
  useSauvegardeValidationSaisieExtrait
} from "../../../../views/common/hook/requete/ValidationSaisieExtraitHook";
import {
  acteExtraitSaisie,
  extraitSaisiAEnvoyer,
  requeteExtraitSaisie
} from "../../.././../mock/data/DonneesSaisieExtrait";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configEtatcivil[0],
  configComposition[0]
]);

beforeAll(() => {
  DocumentDelivrance.init();
});

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

afterAll(() => {
  superagentMock.unset();
});
