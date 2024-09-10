import {
  IMentionsParams,
  useMentionsApiHook
} from "@hook/acte/mentions/MentionsApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { expect, test } from "vitest";
const HookConsumer: React.FC = () => {
  const [parametres, setParametres] = useState<IMentionsParams>();
  const mentions = useMentionsApiHook(parametres);

  useEffect(() => {
    setParametres({
      idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235a"
    });
  }, []);

  return (
    <div>
      {mentions?.mentions?.map(el => (
        <p key={el.id}>{el.id}</p>
      ))}
    </div>
  );
};

test("Attendu: useMentionsApiHook fonctionne correctement", () => {
  render(<HookConsumer />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("1a0aa3be-8311-465d-b750-d4c19834430e")
    ).not.toBeNull();
    expect(
      screen.getByText("1a0aa3be-8311-465d-b750-d4c19834430d")
    ).not.toBeNull();
  });
});
