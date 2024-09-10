import { useCreationRequeteCreation } from "@hook/requete/CreationRequeteCreationApiHook";
import { creationRequeteTranscriptionParams } from "@mock/data/requeteCreationTranscription";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

const HookConsumer: React.FC = () => {
  const idRequeteCree = useCreationRequeteCreation(
    creationRequeteTranscriptionParams
  );
  return <>{idRequeteCree}</>;
};

test("DOIT retourner la requête de création mappée QUAND on appel la fonction avec les données saisies.", () => {
  render(<HookConsumer />);

  waitFor(() => {
    expect(
      screen.getByText("3ed9aa4e-921b-489f-b8fe-531dd703c60c")
    ).toBeDefined();
  });
});
