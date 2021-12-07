import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import {
    IgnorerParams,
    useIgnorerApi
} from "../../../../views/common/hook/requete/IgnorerHook";
const superagentMock = require("superagent-mock")(request, configRequetes);

const params: IgnorerParams = {
  texteObservation: "libelleAction",
  idRequete: "12345"
};

const HookConsumer: React.FC = () => {
  const idAction = useIgnorerApi(params);

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
