import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import {
  determinerCriteresRMCAuto,
  redirectionRMCAuto,
  redirectionRMCAutoApercuTraitement
} from "../../../../views/pages/rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActesInscriptionsUtils";
import {
  URL_MES_REQUETES_V2,
  URL_REQUETES_SERVICE_V2
} from "../../../../views/router/ReceUrls";

test("criteresRMCAutoMapper", () => {
  const requete = {
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
  const data = [{ idRequete: "1" }];

  const res = determinerCriteresRMCAuto(requete, data);

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
  const res = redirectionRMCAuto("0", URL_REQUETES_SERVICE_V2, [null], [null]);
  expect(res).toStrictEqual(
    "/rece/rece-ui/requetesservicev2/apercurequetepriseencharge/0"
  );
});
test("redirectionRMCAutoApercuTraitement", () => {
  const res = redirectionRMCAutoApercuTraitement("0", URL_MES_REQUETES_V2);
  expect(res).toStrictEqual(
    "/rece/rece-ui/mesrequetesv2/apercurequetetraitement/0"
  );
});
