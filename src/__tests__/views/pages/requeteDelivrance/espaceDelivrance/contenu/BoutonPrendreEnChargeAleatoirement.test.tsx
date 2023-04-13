import { mappingOfficier } from "@core/login/LoginHook";
import { ReponseAppelMesRequetes } from "@mock/data/EspaceDelivrance";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau
} from "@mock/data/connectedUserAvecDroit";
import { BoutonPrendreEnChargeAleatoirement } from "@pages/requeteDelivrance/espaceDelivrance/contenu/BoutonPrendreEnChargeAleatoirement";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

test("Attendu: BoutonPrendreEnChargeAleatoirement fonctionne correctement dans l'espace Délivrance", async () => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLaurenceBourdeau,
    resultatRequeteUtilistateurLaurenceBourdeau.data
  );

  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
  render(
    <Router history={history}>
      <BoutonPrendreEnChargeAleatoirement />
    </Router>
  );

  const bouttonPrendreEnCharge = screen.getByText(
    /Prendre en charge/i
  ) as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(bouttonPrendreEnCharge);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        ReponseAppelMesRequetes[1].id
      )
    );
  });
});
