import {
  IMiseAJourDocumentMentionParams,
  useMiseAJourDocumentMentionApiHook
} from "@hook/acte/mentions/MiseAJourDocumentMentionApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
const superagentMock = require("superagent-mock")(request, configRequetes);

const params: IMiseAJourDocumentMentionParams = {
  idDocument: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
  mentionsRetirees: []
};

const HookConsumer: React.FC = () => {
  const res = useMiseAJourDocumentMentionApiHook(params);
  return <div>{res?.resultat?.toString()}</div>;
};

test("Attendu: useMiseAJourDocumentMentionApiHook fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    expect(screen.getByText("true")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
