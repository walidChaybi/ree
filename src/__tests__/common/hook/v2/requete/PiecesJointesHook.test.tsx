import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { piecesJointesMock } from "../../../../../mock/data/piecesJointes";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import {
  TypePieceJointe,
  usePostPiecesJointesApi
} from "../../../../../views/common/hook/v2/PiecesJointesHook";
const superagentMock = require("superagent-mock")(request, configRequetesV2);

const HookConsumerUsePostPiecesJointesApi: React.FC = () => {
  const [fini, uuids] = usePostPiecesJointesApi(
    TypePieceJointe.PIECE_COMPLEMENT_INFORMATION,
    "12345",
    piecesJointesMock
  );

  return <div>{uuids}</div>;
};

test("Attendu: usePostPiecesJointesApi fonctionne correctement", async () => {
  render(<HookConsumerUsePostPiecesJointesApi />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText("123456")).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
