import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { getPrenomEtNom } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/contenu/ListeActions";
import { waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { expect, test } from "vitest";

test("Doit retourner le nom et pronom de l'OEC", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  waitFor(() => {
    expect(storeRece.utilisateurCourant?.prenom).toBe("prenomConnectedUser");
    expect(storeRece.utilisateurCourant?.nom).toBe("nomConnectedUser");
    expect(getPrenomEtNom()).toBe("prenomConnectedUser nomConnectedUser");
  });
});
