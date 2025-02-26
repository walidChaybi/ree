import { useGetDocumentReponseApi, usePostDocumentsReponseApi } from "@hook/DocumentReponseHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { documentReponseCARN_CSPAC_01, idDocumentsReponse } from "../../../mock/data/DocumentReponse";
import { imagePngVideBase64 } from "../../../mock/data/ImagePng";
import { requeteRDCSC } from "../../../mock/data/requeteDelivrance";

const HookConsumerUseGetDocumentReponseApi: React.FC = () => {
  const doc = useGetDocumentReponseApi(idDocumentsReponse[0]);

  return <div>{doc?.contenu}</div>;
};

const documentsReponses = [documentReponseCARN_CSPAC_01];
const HookConsumerUsePostDocumentsReponseApi: React.FC = () => {
  const uuids = usePostDocumentsReponseApi(requeteRDCSC.id, documentsReponses);

  return <div>{uuids ? uuids[0] : ""}</div>;
};

test("Attendu: useGetDocumentReponseApi fonctionne correctement", async () => {
  render(<HookConsumerUseGetDocumentReponseApi />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeDefined();
  });
});

test("Attendu: usePostDocumentsReponseApi fonctionne correctement", async () => {
  render(<HookConsumerUsePostDocumentsReponseApi />);

  await waitFor(() => {
    expect(screen.getByText(idDocumentsReponse[0])).toBeDefined();
  });
});
