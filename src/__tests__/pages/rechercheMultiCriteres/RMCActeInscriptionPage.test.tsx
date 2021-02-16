import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import {
  titreFrom,
  RMCActeInscriptionPage
} from "../../../views/pages/rechercheMultiCriteres/RMCActeInscriptionPage";

test("renders formulaire Recherche Multi Critères Actes et Inscriptions", async () => {
  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });
  await waitFor(() => {
    expect(screen.getAllByText(titreFrom)).toHaveLength(2);
  });
});
