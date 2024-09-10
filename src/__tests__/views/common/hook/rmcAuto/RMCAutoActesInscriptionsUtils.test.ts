import {
  determinerCriteresRMCAuto,
  redirectionRMCAuto,
  redirectionRMCAutoApercuTraitement
} from "@hook/rmcAuto/RMCAutoActesInscriptionsUtils";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import {
  PATH_APERCU_REQ_TRAITEMENT,
  URL_MES_REQUETES_DELIVRANCE,
  URL_REQUETES_DELIVRANCE_SERVICE
} from "@router/ReceUrls";
import { expect, test } from "vitest";

const requete = {
  idRequete: "0",
  statut: "Prise en charge",
  titulaires: [
    {
      nom: "Dylan",
      prenoms: ["Bob"],
      jourNaissance: 31,
      moisNaissance: 1,
      anneeNaissance: 1992,
      villeNaissance: "Nantes",
      paysNaissance: "France",
      sexe: Sexe.MASCULIN,
      position: 1
    }
  ]
} as IRequeteTableauDelivrance;

test("criteresRMCAutoMapper", () => {
  const res = determinerCriteresRMCAuto(requete);

  expect(res).toStrictEqual({
    criteres: [
      {
        nomTitulaire: "Dylan",
        prenomTitulaire: "Bob",
        jourNaissance: 31,
        moisNaissance: 1,
        anneeNaissance: 1992,
        numeroOrdre: 1
      }
    ]
  });
});

test("redirectionRMCAuto", () => {
  const res = redirectionRMCAuto(requete, URL_REQUETES_DELIVRANCE_SERVICE);
  expect(res).toStrictEqual(
    "/rece/rece-ui/requetesservice/apercurequetepriseencharge/0"
  );
});
test("redirectionRMCAutoApercuTraitement", () => {
  const res = redirectionRMCAutoApercuTraitement(
    "0",
    URL_MES_REQUETES_DELIVRANCE
  );
  expect(res).toStrictEqual(
    "/rece/rece-ui/mesrequetes/apercurequetetraitement/0"
  );
});
test("redirectionRMCAutoModifierTraitement", () => {
  const res = redirectionRMCAuto(
    requete,
    `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_APERCU_REQ_TRAITEMENT}/0`
  );
  expect(res).toStrictEqual(
    "/rece/rece-ui/requetesservice/apercurequetepriseencharge/0"
  );
});
