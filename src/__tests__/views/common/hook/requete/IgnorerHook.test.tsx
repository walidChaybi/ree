import { IgnorerParams, useIgnorerApi } from "@hook/requete/IgnorerHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
const params: IgnorerParams = {
  texteObservation: "libelleAction",
  idRequete: "12345"
};

const HookConsumer: React.FC = () => {
  const idAction = useIgnorerApi(params);

  return <div>{idAction}</div>;
};

test("Attendu: useIgnorerApi fonctionne correctement", () => {
  render(<HookConsumer />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText("123456789")).not.toBeNull();
  });
});


