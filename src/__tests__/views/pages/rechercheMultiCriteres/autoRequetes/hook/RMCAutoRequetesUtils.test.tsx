import requeteDelivrance from "@mock/data/requeteDelivrance";
import { goToLinkRMC } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauCommun";
import { determinerCriteresRMCAuto } from "@pages/rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequetesUtils";
import { expect, test } from "vitest";

test("determinerCriteresRMCAuto", () => {
  const res = determinerCriteresRMCAuto(requeteDelivrance);

  expect(res).toStrictEqual({
    criteres: [
      {
        nomTitulaire: "Prodesk",
        prenomTitulaire: "Elodie",
        jourNaissance: 25,
        moisNaissance: 6,
        anneeNaissance: 1990
      },
      {
        nomTitulaire: "Daniel",
        prenomTitulaire: "Jack",
        jourNaissance: 25,
        moisNaissance: 6,
        anneeNaissance: 1990
      }
    ]
  });
});

test("goToLinkRMC", () => {
  const res = goToLinkRMC("rmcauto?range=0-100");
  expect(res).toStrictEqual("0-100");
});
