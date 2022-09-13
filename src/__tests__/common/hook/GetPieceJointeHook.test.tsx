import { TypePieceJointe } from "@hook/requete/piecesJointes/communPieceJointe";
import { useGetPieceJointeApi } from "@hook/requete/piecesJointes/GetPieceJointeHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { idDocumentsReponse } from "../../../mock/data/DocumentReponse";
import { imagePngVideBase64 } from "../../../mock/data/ImagePng";
import { idPieceComplementInformation } from "../../../mock/data/PieceComplementInformation";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
const superagentMock = require("superagent-mock")(request, configRequetes);

const HookConsumerUseGetPieceJustificativeApi: React.FC = () => {
  const doc = useGetPieceJointeApi(
    TypePieceJointe.PIECE_JUSTIFICATIVE,
    idDocumentsReponse[0]
  );

  return <div>{doc?.contenu}</div>;
};

const HookConsumerUseGetPieceComplementInformationApi: React.FC = () => {
  const doc = useGetPieceJointeApi(
    TypePieceJointe.PIECE_COMPLEMENT_INFORMATION,
    idPieceComplementInformation[0]
  );

  return <div>{doc?.contenu}</div>;
};

test("Attendu: useGetDocumentReponseApi fonctionne correctement pour une pièce justificative", async () => {
  render(<HookConsumerUseGetPieceJustificativeApi />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});

test("Attendu: useGetDocumentReponseApi fonctionne correctement pour une pièce complémentaire", async () => {
  render(<HookConsumerUseGetPieceComplementInformationApi />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
