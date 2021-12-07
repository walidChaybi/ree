import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import {
    TransfertParams,
    useTransfertApi
} from "../../../../views/common/hook/requete/TransfertHook";
const superagentMock = require("superagent-mock")(request, configRequetes);

const params: TransfertParams = {
  libelleAction: "libelleAction",
  statutRequete: StatutRequete.TRANSFEREE,
  idRequete: "12345",
  idEntite: "12345",
  idUtilisateur: "12345"
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
