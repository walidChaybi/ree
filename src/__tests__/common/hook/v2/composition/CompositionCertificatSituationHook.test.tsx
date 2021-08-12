import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { certificatSituation } from "../../../../../mock/data/Composition";
import { imagePngVideBase64 } from "../../../../../mock/data/ImagePng";
import { configComposition } from "../../../../../mock/superagent-config/superagent-mock-composition";
import { useCertificatSituationApiHook } from "../../../../../views/common/hook/v2/composition/CompositionCertificatSituationHook";
const superagentMock = require("superagent-mock")(request, configComposition);

const HookConsumer: React.FC = () => {
  const doc = useCertificatSituationApiHook(certificatSituation);

  return <div>{doc}</div>;
};

test("Attendu: useCertificatSituationApiHook fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
