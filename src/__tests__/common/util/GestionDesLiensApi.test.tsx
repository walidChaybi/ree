import {
  getMaxRange,
  getMinRange,
  getRowsNumber,
  parseLink
} from "@util/GestionDesLiensApi";

test("gestion de lien api parseLink", async () => {
  const { nextLink, prevLink } = parseLink(
    '<http://localhost:8081/rece-requete-api/v2/requetes?nomOec=SLAOUI&prenomOec=Nabil&statuts=A_SIGNER,A_TRAITER_DEMAT,A_IMPRIMER&tri=dateStatut&sens=ASC&idArobas=03901913&range=2-5>;rel="next",<http://localhost:8081/rece-requete-api/v2/requetes?nomOec=SLAOUI&prenomOec=Nabil&statuts=A_SIGNER,A_TRAITER_DEMAT,A_IMPRIMER&tri=dateStatut&sens=ASC&idArobas=03901913&range=0-5>;rel="prev"'
  );

  expect(nextLink).toBe(
    "http://localhost:8081/rece-requete-api/v2/requetes?nomOec=SLAOUI&prenomOec=Nabil&statuts=A_SIGNER,A_TRAITER_DEMAT,A_IMPRIMER&tri=dateStatut&sens=ASC&idArobas=03901913&range=2-5"
  );
  expect(prevLink).toBe(
    "http://localhost:8081/rece-requete-api/v2/requetes?nomOec=SLAOUI&prenomOec=Nabil&statuts=A_SIGNER,A_TRAITER_DEMAT,A_IMPRIMER&tri=dateStatut&sens=ASC&idArobas=03901913&range=0-5"
  );
});

test("gestion de lien api getRowsNumber", async () => {
  const result = getRowsNumber({
    headers: {
      "content-range": "0-5/14"
    }
  });

  expect(result).toBe(14);
});

test("gestion de lien api getMinRange", async () => {
  const result = getMinRange({
    headers: {
      "content-range": "0-5/14"
    }
  });

  expect(result).toBe(0);
});

test("gestion de lien api getMaxRange", async () => {
  const result = getMaxRange({
    headers: {
      "content-range": "0-5/14"
    }
  });

  expect(result).toBe(5);
});
