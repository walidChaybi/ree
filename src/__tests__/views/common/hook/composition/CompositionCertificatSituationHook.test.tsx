import { useCertificatSituationApiHook } from "@hook/composition/CompositionCertificatSituationHook";
import { certificatSituation } from "@mock/data/Composition";
import { imagePngVideBase64 } from "@mock/data/ImagePng";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
const HookConsumer: React.FC = () => {
  const doc = useCertificatSituationApiHook(certificatSituation);

  return <div>{doc?.contenu}</div>;
};

test("Attendu: useCertificatSituationApiHook fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});
