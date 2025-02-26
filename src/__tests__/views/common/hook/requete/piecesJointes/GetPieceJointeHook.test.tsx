import { useGetPieceJointeApi } from "@hook/requete/piecesJointes/GetPieceJointeHook";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { idDocumentsReponse } from "../../../../../mock/data/DocumentReponse";
import { imagePngVideBase64 } from "../../../../../mock/data/ImagePng";
import { idPieceComplementInformation } from "../../../../../mock/data/PieceComplementInformation";
const HookConsumerUseGetPieceJustificativeApi: React.FC = () => {
  const doc = useGetPieceJointeApi(TypePieceJointe.PIECE_JUSTIFICATIVE, idDocumentsReponse[0]);

  return <div>{doc?.contenu}</div>;
};

const HookConsumerUseGetPieceComplementInformationApi: React.FC = () => {
  const doc = useGetPieceJointeApi(TypePieceJointe.PIECE_COMPLEMENT_INFORMATION, idPieceComplementInformation[0]);

  return <div>{doc?.contenu}</div>;
};

test("Attendu: useGetDocumentReponseApi fonctionne correctement pour une pièce justificative", () => {
  render(<HookConsumerUseGetPieceJustificativeApi />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeDefined();
  });
});

test("Attendu: useGetDocumentReponseApi fonctionne correctement pour une pièce complémentaire", () => {
  render(<HookConsumerUseGetPieceComplementInformationApi />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(imagePngVideBase64)).toBeDefined();
  });
});
