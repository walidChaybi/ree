import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import {
  documentReponseCARN_CSPAC_01,
  idDocumentsReponse
} from "../../../../mock/data/DocumentReponse";
import { imagePngVideBase64 } from "../../../../mock/data/ImagePng";
import { requete1 } from "../../../../mock/data/RequeteV2";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import {
  useGetDocumentReponseApi,
  usePostDocumentsReponseApi
} from "../../../../views/common/hook/v2/DocumentReponseHook";
const superagentMock = require("superagent-mock")(request, configRequetesV2);

const HookConsumerUseGetDocumentReponseApi: React.FC = () => {
  const doc = useGetDocumentReponseApi(idDocumentsReponse[0]);

  return <div>{doc?.contenu}</div>;
};

const documentsReponses = [documentReponseCARN_CSPAC_01];
const HookConsumerUsePostDocumentsReponseApi: React.FC = () => {
  const uuids = usePostDocumentsReponseApi(requete1.id, documentsReponses);

  return <div>{uuids ? uuids[0] : ""}</div>;
};

test("Attendu: useGetDocumentReponseApi fonctionne correctement", async () => {
  render(<HookConsumerUseGetDocumentReponseApi />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});

test("Attendu: usePostDocumentsReponseApi fonctionne correctement", async () => {
  render(<HookConsumerUsePostDocumentsReponseApi />);

  await waitFor(() => {
    expect(screen.getByText(idDocumentsReponse[0])).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
