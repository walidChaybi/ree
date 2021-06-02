import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { SaisirRDAPCPage } from "../../../views/pages/saisirRequete/SaisirRDAPCPage";

test("renders formulaire de saisie d'une Requête de Délivrance Attestation PACS", async () => {
  act(() => {
    render(<SaisirRDAPCPage />);
  });
  const titre = SousTypeDelivrance.getEnumFor("RDAPC").libelle;

  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});
