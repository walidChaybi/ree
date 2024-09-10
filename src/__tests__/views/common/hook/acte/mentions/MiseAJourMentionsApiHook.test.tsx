import {
  IMiseAJourMentionsParams,
  useMiseAJourMentionsApiHook
} from "@hook/acte/mentions/MiseAJourMentionsApiHook";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
const params: IMiseAJourMentionsParams = {
  idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235b",
  mentions: [{} as IMention]
};

const HookConsumer: React.FC = () => {
  const res = useMiseAJourMentionsApiHook(params);
  return <div>{res?.resultat?.toString()}</div>;
};

test("Attendu: useMiseAJourMentionsApiHook fonctionne correctement", () => {
  render(<HookConsumer />);

  waitFor(() => {
    expect(screen.getByText("true")).toBeDefined();
  });
});


