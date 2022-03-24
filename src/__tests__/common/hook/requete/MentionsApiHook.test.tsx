import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import {
  IMentionsParams,
  useMentionsApiHook
} from "../../../../views/common/hook/acte/MentionsApiHook";
const superagentMock = require("superagent-mock")(request, configEtatcivil);

const params: IMentionsParams = {
  idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235a"
};

const HookConsumer: React.FC = () => {
  const mentions = useMentionsApiHook(params);

  return (
    <div>
      {mentions?.mentions?.map(el => (
        <p key={el.id}>{el.id}</p>
      ))}
    </div>
  );
};

test("Attendu: useMentionsApiHook fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("1a0aa3be-8311-465d-b750-d4c19834430e")
    ).not.toBeNull();
    expect(
      screen.getByText("1a0aa3be-8311-465d-b750-d4c19834430d")
    ).not.toBeNull();
  });
});

afterAll(() => {
  superagentMock.unset();
});
