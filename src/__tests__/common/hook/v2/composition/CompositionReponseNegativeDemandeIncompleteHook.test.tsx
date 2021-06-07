import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { reponseNegativeDemandeIncomplete } from "../../../../../mock/data/Composition";
import { imagePngVideBase64 } from "../../../../../mock/data/ImagePng";
import { configComposition } from "../../../../../mock/superagent-config/superagent-mock-composition";
import { useCompositionReponseNegativeDemandeIncompleteApi } from "../../../../../views/common/hook/v2/composition/CompositionReponseNegativeDemandeIncompleteHook";
const superagentMock = require("superagent-mock")(request, configComposition);

const HookConsumer: React.FC = () => {
  const doc = useCompositionReponseNegativeDemandeIncompleteApi(
    reponseNegativeDemandeIncomplete
  );

  return <div>{doc}</div>;
};

test("Attendu: useCompositionReponseNegativeDemandeIncompleteApi fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).not.toBeNull();
  });
});

afterAll(() => {
  superagentMock.unset();
});
