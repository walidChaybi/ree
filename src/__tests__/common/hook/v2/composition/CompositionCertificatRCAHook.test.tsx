import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { certificatRCA } from "../../../../../mock/data/Composition";
import { imagePngVideBase64 } from "../../../../../mock/data/ImagePng";
import { configComposition } from "../../../../../mock/superagent-config/superagent-mock-composition";
import { useCertificatRCAApiHook } from "../../../../../views/common/hook/v2/composition/CompositionCertificatRCAHook";
const superagentMock = require("superagent-mock")(request, configComposition);

const HookConsumer: React.FC = () => {
  const doc = useCertificatRCAApiHook(certificatRCA);

  return <div>{doc}</div>;
};

test("Attendu: useCertificatRCAHook fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
