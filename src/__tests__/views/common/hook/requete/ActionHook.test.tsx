import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@hook/requete/ActionHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
const params: ICreationActionEtMiseAjourStatutParams = {
  libelleAction: "libelleAction",
  statutRequete: "A_VALIDER",
  requeteId: "12345"
};

const HookConsumer: React.FC = () => {
  const idAction = usePostCreationActionEtMiseAjourStatutApi(params);

  return <div>{idAction}</div>;
};

test("Attendu: usePostCreationActionEtMiseAjourStatutApi fonctionne correctement", () => {
  render(<HookConsumer />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText("123456789")).not.toBeNull();
  });
});
