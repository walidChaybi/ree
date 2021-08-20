import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import {
  reponseNegativeDemandeIncomplete,
  reponseNegativeFrancais,
  reponseNegativeMariage
} from "../../../../../mock/data/Composition";
import { imagePngVideBase64 } from "../../../../../mock/data/ImagePng";
import { configComposition } from "../../../../../mock/superagent-config/superagent-mock-composition";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "../../../../../model/composition/IReponseNegativeDemandeIncompleteComposition";
import { NOM_DOCUMENT_REFUS_FRANCAIS } from "../../../../../model/composition/IReponseNegativeFrancaisComposition";
import { NOM_DOCUMENT_REFUS_MARIAGE } from "../../../../../model/composition/IReponseNegativeMariageComposition";
import { useCompositionReponseNegativeApi } from "../../../../../views/common/hook/v2/composition/CompositionReponseNegativeHook";
const superagentMock = require("superagent-mock")(request, configComposition);

const HookConsumerMariage: React.FC = () => {
  const doc = useCompositionReponseNegativeApi(
    NOM_DOCUMENT_REFUS_MARIAGE,
    reponseNegativeMariage
  );

  return <div>{doc}</div>;
};

test("Attendu: useCompositionReponseNegativeApi avec mariage fonctionne correctement", async () => {
  render(<HookConsumerMariage />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});

const HookConsumerDemandeIncomplete: React.FC = () => {
  const doc = useCompositionReponseNegativeApi(
    NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE,
    reponseNegativeDemandeIncomplete
  );

  return <div>{doc}</div>;
};

test("Attendu: useCompositionReponseNegativeApi avec demande incomplete fonctionne correctement", async () => {
  render(<HookConsumerDemandeIncomplete />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});

const HookConsumerFrancais: React.FC = () => {
  const doc = useCompositionReponseNegativeApi(
    NOM_DOCUMENT_REFUS_FRANCAIS,
    reponseNegativeFrancais
  );

  return <div>{doc}</div>;
};

test("Attendu: useCompositionReponseNegativeApi avec francais fonctionne correctement", async () => {
  render(<HookConsumerFrancais />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
