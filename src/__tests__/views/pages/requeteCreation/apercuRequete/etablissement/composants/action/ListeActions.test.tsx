import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { getPrenomEtNom } from "@pages/requeteCreation/apercuRequete/etablissement/composants/action/ListeActions";
import { waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";

test("Doit retourner le nom et pronom de l'OEC", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  await waitFor(() => {
    expect(storeRece.utilisateurCourant?.prenom).toBe("prenomConnectedUser");
    expect(storeRece.utilisateurCourant?.nom).toBe("nomConnectedUser");
    expect(getPrenomEtNom()).toBe("prenomConnectedUser nomConnectedUser");
  });
});
