import { waitFor } from "@testing-library/react";
import request from "superagent";
import { certificatSituation } from "../../../mock/data/Composition";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { CertificatSituationComposition } from "../../../model/composition/ICertificatSituationComposition";
import { Sexe } from "../../../model/etatcivil/enum/Sexe";
import { ParametreBaseRequete } from "../../../model/parametres/enum/ParametresBaseRequete";
import { IRequerant } from "../../../model/requete/v2/IRequerant";
import { ITitulaireRequeteTableau } from "../../../model/requete/v2/IRequeteTableau";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("Attendu: CertificatSituationComposition.creerCertificatSituation fonctionne correctement", async () => {
  await ParametreBaseRequete.init();
  const attendu = certificatSituation;

  const titre = "titre";
  const decrets = ["decret1", "decret2"];
  const phrase = "phrase";
  const phrasesPiecesJointes = "phrasesPiecesJointes";
  const requerant = {
    id: "123",
    nomFamille: "nomFamille",
    prenom: "prenom",
    adresse: {
      ligne2: "l2",
      ligne3: "l3",
      ligne4: "l4",
      ligne5: "l5",
      ville: "ville",
      codePostal: "123456",
      pays: "pays"
    }
  } as IRequerant;
  const titulaire = {
    nom: "nom",
    prenoms: ["p1", "p2"],
    jourNaissance: 1,
    moisNaissance: 2,
    anneeNaissance: 2000,
    villeNaissance: "villeNaissance",
    paysNaissance: "paysNaissance",
    sexe: Sexe.MASCULIN
  } as ITitulaireRequeteTableau;

  const resultat = await CertificatSituationComposition.creerCertificatSituation(
    titre,
    decrets,
    phrase,
    phrasesPiecesJointes,
    requerant,
    titulaire
  );
  await waitFor(() => {
    expect(resultat).toEqual(attendu);
  });
});

afterAll(() => {
  superagentMock.unset();
});
