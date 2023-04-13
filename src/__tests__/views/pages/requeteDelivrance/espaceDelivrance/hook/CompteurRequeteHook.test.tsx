import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useCompteurRequeteHook } from "@pages/requeteDelivrance/espaceDelivrance/hook/CompteurRequeteHook";
import { act, render, waitFor } from "@testing-library/react";
import React from "react";

const HookConsummer: React.FC = () => {
  const { nombreRequetesState } = useCompteurRequeteHook(false, [
    StatutRequete.A_SIGNER.nom
  ]);

  return <div data-testid={"test-compteur-requete"}>{nombreRequetesState}</div>;
};

test("l'appel au WS du compteur de requêtes à signer fonctionne correctement", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummer />);

    await waitFor(() =>
      expect(getByTestId("test-compteur-requete").textContent).toBe("20")
    );
  });
});


