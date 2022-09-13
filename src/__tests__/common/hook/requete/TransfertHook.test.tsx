import { TransfertParams, useTransfertApi } from "@hook/requete/TransfertHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
const superagentMock = require("superagent-mock")(request, configRequetes);

const params: TransfertParams = {
  libelleAction: "libelleAction",
  statutRequete: StatutRequete.TRANSFEREE,
  idRequete: "12345",
  idEntite: "12345",
  idUtilisateur: "12345",
  estTransfert: true
};

const HookConsumer: React.FC = () => {
  const idAction = useTransfertApi(params);

  return <div>{idAction}</div>;
};

test("Attendu: usePostCreationActionEtMiseAjourStatutApi fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText("123456789")).not.toBeNull();
  });
});

afterAll(() => {
  superagentMock.unset();
});
