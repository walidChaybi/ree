import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import {
  documentReponseCARN_CSPAC_01,
  idDocumentsReponse
} from "../../../../mock/data/DocumentReponse";
import { imagePngVideBase64 } from "../../../../mock/data/ImagePng";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { useGetPieceJustificativeApi } from "../../../../views/common/hook/v2/PieceJustificativeHook";
const superagentMock = require("superagent-mock")(request, configRequetesV2);

const HookConsumerUseGetPieceJustificativeApi: React.FC = () => {
  const doc = useGetPieceJustificativeApi(idDocumentsReponse[0]);

  return <div>{doc?.contenu}</div>;
};
const piecesJustificatives = [documentReponseCARN_CSPAC_01];
test("Attendu: useGetDocumentReponseApi fonctionne correctement", async () => {
  render(<HookConsumerUseGetPieceJustificativeApi />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
