import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../../../views/common/hook/v2/requete/ActionHook";
const superagentMock = require("superagent-mock")(request, configRequetesV2);

const params: CreationActionEtMiseAjourStatutParams = {
  libelleAction: "libelleAction",
  statutRequete: StatutRequete.A_VALIDER,
  requeteId: "12345"
};

const HookConsumer: React.FC = () => {
  const idAction = usePostCreationActionEtMiseAjourStatutApi(params);

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
