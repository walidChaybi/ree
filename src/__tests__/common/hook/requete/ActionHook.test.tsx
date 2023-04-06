import {
    ICreationActionEtMiseAjourStatutParams,
    usePostCreationActionEtMiseAjourStatutApi
} from "@hook/requete/ActionHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
const params: ICreationActionEtMiseAjourStatutParams = {
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


