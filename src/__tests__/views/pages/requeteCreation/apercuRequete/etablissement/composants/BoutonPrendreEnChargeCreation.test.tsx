import { userDroitCreerActeEtabliPerimetreMEAE } from "@mock/data/connectedUserAvecDroit";
import { requeteCreationATraiter } from "@mock/data/requeteCreation";
import { BoutonPrendreEnChargeCreation } from "@pages/requeteCreation/apercuRequete/etablissement/composants/BoutonPrendreEnChargeCreation";
import {
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
} from "@router/ReceUrls";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

test("DOIT rediriger sur l'appercu prise en charge QUAND on clique sur le bouton prendre en charge", async () => {
  storeRece.utilisateurCourant = userDroitCreerActeEtabliPerimetreMEAE;
  const ID = "54ddf213-d9b7-4747-8e92-68c220f66de3";
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
      ID
    )
  );

  const { getByText } = render(
    <Router history={history}>
      <BoutonPrendreEnChargeCreation
        requete={requeteCreationATraiter}
      ></BoutonPrendreEnChargeCreation>
    </Router>
  );

  const bouttonPrendreEnCharge = getByText(
    "Prendre en charge"
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
  });

  fireEvent.click(bouttonPrendreEnCharge);

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_PRISE_EN_CHARGE_ID,
        ID
      )
    );
  });
});