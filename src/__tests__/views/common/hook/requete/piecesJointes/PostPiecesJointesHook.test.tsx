import { usePostPiecesJointesApi } from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { piecesJointesMock } from "@mock/data/piecesJointes";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
const HookConsumerUsePostPiecesJointesApi: React.FC = () => {
  const resultatPostPiecesJointesApi = usePostPiecesJointesApi(
    TypePieceJointe.PIECE_COMPLEMENT_INFORMATION,
    "12345",
    piecesJointesMock
  );

  return (
    <div>{`${resultatPostPiecesJointesApi?.uuidDocuments[0]}, ${resultatPostPiecesJointesApi?.uuidDocuments[1]}`}</div>
  );
};

test("Attendu: usePostPiecesJointesApi fonctionne correctement", () => {
  render(<HookConsumerUsePostPiecesJointesApi />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText("123456, 123456")).toBeDefined();
  });
});
