import { DataRMCInscriptionAvecUnRCA } from "@mock/data/RMCInscription";
import { idRequeteRDC, requeteRDC } from "@mock/data/requeteDelivrance";
import { MenuDelivrerEC } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuDelivrerEC";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

test("renders du bloc Menu Delivrer pour une requête de délivrance de sous-type RDD", async () => {
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequeteRDC
    )
  );

  await act(async () => {
    render(
      <Router history={history}>
        <MenuDelivrerEC
          requete={requeteRDC}
          inscriptions={DataRMCInscriptionAvecUnRCA}
        />
      </Router>
    );
  });

  let menuDelivrer = screen.getByText("Délivrer");
  let copieIntergale: HTMLElement;
  let extraitAvecFiliation: HTMLElement;
  let extraitSansFiliation: HTMLElement;
  let extraitPlurilingue: HTMLElement;
  let copieArchive: HTMLElement;

  await waitFor(() => {
    expect(menuDelivrer).toBeDefined();
    copieIntergale = screen.getByText(/Copie intégrale/i);
    extraitAvecFiliation = screen.getByText(/Extrait avec filiation/i);
    extraitSansFiliation = screen.getByText(/Extrait sans filiation/i);
    extraitPlurilingue = screen.getByText(/Extrait plurilingue/i);
    copieArchive = screen.getByText(/Copie archive \(118\)/i);

    expect(copieIntergale).toBeDefined();
    expect(extraitAvecFiliation).toBeDefined();
    expect(extraitSansFiliation).toBeDefined();
    expect(extraitPlurilingue).toBeDefined();
    expect(copieArchive).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(copieIntergale);
  });

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeDefined();
  });
});
