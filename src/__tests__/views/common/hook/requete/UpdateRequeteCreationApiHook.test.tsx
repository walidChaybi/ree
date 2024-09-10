import { ISaisieRequeteAEnvoyer } from "@hook/requete/CreationRequeteCreationApiHook";
import {
  IUpdateRequeteCreationParams,
  useUpdateRequeteCreation
} from "@hook/requete/UpdateRequeteCreationApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

const HookConsumerUseGetRequeteDelivranceAleatoire: React.FC = () => {
  const params = {
    requete: {} as ISaisieRequeteAEnvoyer
  } as IUpdateRequeteCreationParams;
  const res = useUpdateRequeteCreation(
    "3ed9efe4-c196-4888-8ffe-938f37a5f73f",
    params
  );

  return <div>{res}</div>;
};

test("DOIT retourner l'id de la requete à l'update d'une requête", () => {
  render(<HookConsumerUseGetRequeteDelivranceAleatoire />);

  waitFor(() => {
    expect(
      screen.getByText("3ed9efe4-c196-4888-8ffe-938f37a5f73f")
    ).toBeDefined();
  });
});
