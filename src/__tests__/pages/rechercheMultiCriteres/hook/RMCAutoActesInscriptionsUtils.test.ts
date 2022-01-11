import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import {
  determinerCriteresRMCAuto,
  redirectionRMCAuto,
  redirectionRMCAutoApercuTraitement
} from "../../../../views/pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActesInscriptionsUtils";
import {
  PATH_APERCU_REQ_TRAITEMENT,
  URL_MES_REQUETES_DELIVRANCE,
  URL_REQUETES_DELIVRANCE_SERVICE
} from "../../../../views/router/ReceUrls";

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
      sexe: Sexe.MASCULIN
    }
  ]
};

test("criteresRMCAutoMapper", () => {
  const res = determinerCriteresRMCAuto(requete);

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

test("redirectionRMCAuto", () => {
  const res = redirectionRMCAuto(
    requete,
    URL_REQUETES_DELIVRANCE_SERVICE,
    [null],
    [null]
  );
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
    `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_APERCU_REQ_TRAITEMENT}/0`,
    [null],
    [null]
  );
  expect(res).toStrictEqual(
    "/rece/rece-ui/requetesservice/apercurequetepriseencharge/0"
  );
});
