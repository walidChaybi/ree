import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { piecesJointesMock } from "../../../../mock/data/piecesJointes";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import {
  TypePieceJointe,
  usePostPiecesJointesApi
} from "../../../../views/common/hook/PiecesJointesHook";
const superagentMock = require("superagent-mock")(request, configRequetes);

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

test("Attendu: usePostPiecesJointesApi fonctionne correctement", async () => {
  render(<HookConsumerUsePostPiecesJointesApi />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText("123456, 123456")).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
