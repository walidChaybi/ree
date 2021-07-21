import { render, screen } from "@testing-library/react";
import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import {
  determinerCriteresRMCAuto,
  getMessageZeroRequete,
  goToLinkRMCAuto
} from "../../../../views/pages/rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequetesUtils";

test("determinerCriteresRMCAuto", () => {
  const data = {
    idRequete: "0",
    titulaires: [
      {
        nom: "Dylan",
        prenoms: ["Bob"],
        jourNaissance: 31,
        moisNaissance: 1,
        anneeNaissance: 1992,
        villeNaissance: "Nantes",
        paysNaissance: "France",
        sexe: Sexe.MASCULIN
      }
    ]
  };

  const res = determinerCriteresRMCAuto("0", [data]);

  expect(res).toStrictEqual({
    criteres: [
      {
        nomTitulaire: "Dylan",
        prenomTitulaire: "Bob",
        jourNaissance: 31,
        moisNaissance: 1,
        anneeNaissance: 1992
      }
    ]
  });
});

test("getMessageZeroRequete", () => {
  render(getMessageZeroRequete());
  const titreNumero = screen.getByText("Aucune requête n'a été trouvée");
  expect(titreNumero).toBeDefined();
});
test("goToLinkRMCAuto", () => {
  const res = goToLinkRMCAuto("rmcauto?range=0-100&hauteur=10");
  expect(res).toStrictEqual("0-100");
});
