import { userDroitCreerActeEtabliPerimetreMEAE } from "@mock/data/connectedUserAvecDroit";
import { requeteCreationATraiter } from "@mock/data/requeteCreation";
import { BoutonPrendreEnChargeCreation } from "@pages/requeteCreation/apercuRequete/etablissement/composants/BoutonPrendreEnChargeCreation";
import { URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

test("Est Requete Creation au statut à traiter et appartient à mon service / services mères / service filles", async () => {
  storeRece.utilisateurCourant = userDroitCreerActeEtabliPerimetreMEAE;
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID);

  const { getByText } = render(
    <Router history={history}>
      <BoutonPrendreEnChargeCreation
        requete={requeteCreationATraiter}
      ></BoutonPrendreEnChargeCreation>
    </Router>
  );

  const bouttonPrendreEnCharge = getByText(
    /Prendre en charge/i
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(bouttonPrendreEnCharge);
  });
});
