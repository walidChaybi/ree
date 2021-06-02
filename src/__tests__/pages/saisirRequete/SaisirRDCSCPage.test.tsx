import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { SaisirRDCSCPage } from "../../../views/pages/saisirRequete/SaisirRDCSCPage";

test("renders formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", async () => {
  act(() => {
    render(
      <MemoryRouter>
        <SaisirRDCSCPage />)
      </MemoryRouter>
    );
  });
  const titre = SousTypeDelivrance.getEnumFor("RDCSC").libelle;

  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});
