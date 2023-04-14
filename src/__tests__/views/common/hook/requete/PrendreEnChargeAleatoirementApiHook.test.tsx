import { HTTP_NOT_FOUND } from "@api/ApiManager";
import {
  gereErreur,
  useGetRequeteAleatoire
} from "@hook/requete/PrendreEnChargeAleatoirementApiHook";
import { ReponseAppelMesRequetes } from "@mock/data/EspaceDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
const HookConsumerUseGetRequeteDelivranceAleatoire: React.FC = () => {
  const res = useGetRequeteAleatoire(TypeRequete.DELIVRANCE, true);

  return <div>{res?.requete?.idRequete}</div>;
};

test("Attendu: PrendreEnChargeAleatoirementHook fonctionne correctement dans l'espace délivrance", async () => {
  render(<HookConsumerUseGetRequeteDelivranceAleatoire />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(screen.getByText(ReponseAppelMesRequetes[1].id)).toBeInTheDocument();
  });
});

test("Attendu: La gestion des erreur dans PrendreEnChargeAleatoirementHook fonctionne correctement", async () => {
  await waitFor(() => {
    const fct = jest.fn();
    const error = { response: { status: HTTP_NOT_FOUND } };
    gereErreur(error, fct);
    expect(fct).toBeCalled();
  });
});
