import { goToLinkRMC } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauCommun";
import {
  determinerCriteresRMCAuto,
  getMessageZeroRequete
} from "@pages/rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequetesUtils";
import { render, screen } from "@testing-library/react";
import requeteDelivrance from "../../../../mock/data/requeteDelivrance";

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

test("getMessageZeroRequete", () => {
  render(getMessageZeroRequete());
  const titreNumero = screen.getByText("Aucune requête n'a été trouvée");
  expect(titreNumero).toBeDefined();
});

test("goToLinkRMC", () => {
  const res = goToLinkRMC("rmcauto?range=0-100");
  expect(res).toStrictEqual("0-100");
});
