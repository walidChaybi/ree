import React from "react";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import MenuSaisirRequete from "../../../../views/pages/espaceDelivrance/contenu/MenuSaisirRequete";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { URL_MES_REQUETES_SAISIR_REQUETE } from "../../../../views/router/ReceUrls";

test("renders menu 'Saisir une requête'", async () => {
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <MenuSaisirRequete indexTabPanel={0} />
          );
        </Router>
      </>
    );
  });

  const boutonMenu = screen.getByText(/Saisir une requête/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDC = screen.getByText("Requête de Délivrance Extrait/Copie Courrier");
  const RDAPC = screen.getByText(
    "Requête de Délivrance Attestation de PACS Courrier"
  );
  const RDCSC = screen.getByText(
    "Requête de Délivrance de Certificat de Situation Courrier"
  );
  const RDLFC = screen.getByText(
    "Requête de Délivrance Livret de Famille Courrier"
  );

  await waitFor(() => {
    expect(RDAPC).toBeDefined();
    expect(RDC).toBeDefined();
    expect(RDCSC).toBeDefined();
    expect(RDLFC).toBeDefined();
  });

  // Click Items menu
  await act(async () => {
    fireEvent.click(RDAPC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(URL_MES_REQUETES_SAISIR_REQUETE);
  });
});
