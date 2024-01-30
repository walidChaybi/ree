import { userDroitCreerActeEtabliPerimetreMEAE } from "@mock/data/connectedUserAvecDroit";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import BoutonPrendreEnChargeRequeteSuivanteCreation from "@pages/requeteCreation/espaceCreation/BoutonPrendreEnChargeRequeteSuivanteCreation";
import {
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID
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
import { Router } from "react-router-dom";

test("Attendu: BoutonPrendreEnChargeAleatoirement fonctionne correctement dans l'espace création", async () => {
  const history = createMemoryHistory();
  storeRece.utilisateurCourant = userDroitCreerActeEtabliPerimetreMEAE;
  history.push(URL_MES_REQUETES_CREATION);
  render(
    <Router history={history}>
      <BoutonPrendreEnChargeRequeteSuivanteCreation
        typeRequete={TypeRequete.CREATION}
      />
    </Router>
  );

  const bouttonPrendreEnCharge = screen.getByText(
    "Prendre en charge requête suivante"
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(bouttonPrendreEnCharge);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
        "54ddf213-d9b7-4747-8e92-68c220f66de3"
      )
    );
  });
});
