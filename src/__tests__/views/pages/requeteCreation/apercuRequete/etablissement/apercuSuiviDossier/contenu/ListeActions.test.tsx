import { userDroitnonCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import { getPrenomEtNom } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/contenu/ListeActions";
import { waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

test("Doit retourner le nom et pronom de l'OEC", () => {
  waitFor(() => {
    expect(userDroitnonCOMEDEC?.prenom).toBe("prenomConnectedUser");
    expect(userDroitnonCOMEDEC?.nom).toBe("nomConnectedUser");
    expect(getPrenomEtNom(userDroitnonCOMEDEC)).toBe(
      "prenomConnectedUser nomConnectedUser"
    );
  });
});
