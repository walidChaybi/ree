import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import {
  IMiseAJourDocumentMentionParams,
  useMiseAJourDocumentMentionApiHook
} from "../../../../../views/common/hook/acte/mentions/MiseAJourDocumentMentionApiHook";
const superagentMock = require("superagent-mock")(request, configEtatcivil);

const params: IMiseAJourDocumentMentionParams = {
  idDocument: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
  mentionsRetirees: []
};

const HookConsumer: React.FC = () => {
  const res = useMiseAJourDocumentMentionApiHook(params);
  return <div>{res?.resultat?.toString()}</div>;
};

test("Attendu: useMentionsApiHook fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    expect(screen.getByText("false")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
