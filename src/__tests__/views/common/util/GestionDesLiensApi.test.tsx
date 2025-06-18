import { IParamsTableau, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { expect, test } from "vitest";

test("getParamsTableauDepuisHeaders doit extraire les données des headers", () => {
  const params = getParamsTableauDepuisHeaders({
    link: '<http://localhost:8081/rece-requete-api/v2/requetes?nomOec=SLAOUI&prenomOec=Nabil&statuts=A_SIGNER,A_TRAITER_DEMAT,A_IMPRIMER&tri=dateStatut&sens=ASC&idArobas=03901913&range=2-5>;rel="next",<http://localhost:8081/rece-requete-api/v2/requetes?nomOec=SLAOUI&prenomOec=Nabil&statuts=A_SIGNER,A_TRAITER_DEMAT,A_IMPRIMER&tri=dateStatut&sens=ASC&idArobas=03901913&range=0-5>;rel="prev"',
    "content-range": "0-5/14"
  });

  const paramsAttendus: IParamsTableau = {
    minRangeState: 0,
    maxRangeState: 5,
    nextDataLinkState:
      "http://localhost:8081/rece-requete-api/v2/requetes?nomOec=SLAOUI&prenomOec=Nabil&statuts=A_SIGNER,A_TRAITER_DEMAT,A_IMPRIMER&tri=dateStatut&sens=ASC&idArobas=03901913&range=2-5",
    previousDataLinkState:
      "http://localhost:8081/rece-requete-api/v2/requetes?nomOec=SLAOUI&prenomOec=Nabil&statuts=A_SIGNER,A_TRAITER_DEMAT,A_IMPRIMER&tri=dateStatut&sens=ASC&idArobas=03901913&range=0-5",
    rowsNumberState: 14
  };
  expect(params).toStrictEqual(paramsAttendus);
});
