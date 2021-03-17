import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, waitFor, act, screen } from "@testing-library/react";
import { SaisirRequetePage } from "../../../views/pages/saisirRequete/SaisirRequetePage";
import { URL_MES_REQUETES_SAISIR_REQUETE } from "../../../views/router/ReceUrls";
import { SousTypeDelivrance } from "../../../model/requete/v2/SousTypeDelivrance";

test("renders formulaire de saisie d'une requête", async () => {
  const nomRequete = "RDC";
  const history = createMemoryHistory();

  history.push(URL_MES_REQUETES_SAISIR_REQUETE, { nomRequete });
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <SaisirRequetePage />
        </Router>
      </>
    );
  });
  const titre = SousTypeDelivrance.getEnumFor(nomRequete).libelle;

  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});
