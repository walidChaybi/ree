import { useCreationRequeteCreation } from "@hook/requete/CreationRequeteCreationApiHook";
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { creationRequeteTranscriptionParams } from "../../../../mock/data/requeteCreationTranscription";
import { configRequetesCreation } from "../../../../mock/superagent-config/superagent-mock-requetes-creation";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesCreation
);

afterAll(() => {
  superagentMock.unset();
});

const HookConsumer: React.FC = () => {
  const idRequeteCree = useCreationRequeteCreation(
    creationRequeteTranscriptionParams
  );
  return <>{idRequeteCree}</>;
};

test("DOIT retourner la requête de création mappée QUAND on appel la fonction avec les données saisies.", async () => {
  await act(async () => {
    render(<HookConsumer />);
  });

  await waitFor(() => {
    expect(
      screen.getByText("3ed9aa4e-921b-489f-b8fe-531dd703c60c")
    ).toBeInTheDocument();
  });
});
