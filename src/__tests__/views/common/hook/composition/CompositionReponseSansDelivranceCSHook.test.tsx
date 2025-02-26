import { useCompositionReponseSansDelivranceCSApi } from "@hook/composition/CompositionReponseSansDelivranceCSHook";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { NOM_DOCUMENT_REFUS_FRANCAIS } from "@model/composition/IReponseSansDelivranceCSFrancaisComposition";
import { NOM_DOCUMENT_REFUS_MARIAGE } from "@model/composition/IReponseSansDelivranceCSMariageComposition";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import {
  reponseSansDelivranceCSDemandeIncomplete,
  reponseSansDelivranceCSFrancais,
  reponseSansDelivranceCSMariage
} from "../../../../mock/data/Composition";
import { imagePngVideBase64 } from "../../../../mock/data/ImagePng";
const HookConsumerMariage: React.FC = () => {
  const doc = useCompositionReponseSansDelivranceCSApi(NOM_DOCUMENT_REFUS_MARIAGE, reponseSansDelivranceCSMariage);

  return <div>{doc?.contenu}</div>;
};

test("Attendu: useCompositionReponseSansDelivranceCSApi avec mariage fonctionne correctement", () => {
  render(<HookConsumerMariage />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeDefined();
  });
});

const HookConsumerDemandeIncomplete: React.FC = () => {
  const doc = useCompositionReponseSansDelivranceCSApi(NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE, reponseSansDelivranceCSDemandeIncomplete);

  return <div>{doc?.contenu}</div>;
};

test("Attendu: useCompositionReponseSansDelivranceCSApi avec demande incomplete fonctionne correctement", () => {
  render(<HookConsumerDemandeIncomplete />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeDefined();
  });
});

const HookConsumerFrancais: React.FC = () => {
  const doc = useCompositionReponseSansDelivranceCSApi(NOM_DOCUMENT_REFUS_FRANCAIS, reponseSansDelivranceCSFrancais);

  return <div>{doc?.contenu}</div>;
};

test("Attendu: useCompositionReponseSansDelivranceCSApi avec francais fonctionne correctement", () => {
  render(<HookConsumerFrancais />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeDefined();
  });
});
