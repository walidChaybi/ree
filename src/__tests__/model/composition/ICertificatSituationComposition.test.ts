import { waitFor } from "@testing-library/react";
import request from "superagent";
import { certificatSituation } from "../../../mock/data/Composition";
import { configParamsBaseRequete } from "../../../mock/superagent-config/superagent-mock-params";
import { CertificatSituationComposition } from "../../../model/composition/ICertificatSituationComposition";
import { IDecret } from "../../../model/etatcivil/commun/IDecret";
import { Sexe } from "../../../model/etatcivil/enum/Sexe";
import { ParametreBaseRequete } from "../../../model/parametres/enum/ParametresBaseRequete";
import { Qualite } from "../../../model/requete/v2/enum/Qualite";
import { TypeCanal } from "../../../model/requete/v2/enum/TypeCanal";
import { IRequerant } from "../../../model/requete/v2/IRequerant";
import { IRequeteTableauDelivrance } from "../../../model/requete/v2/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "../../../model/requete/v2/ITitulaireRequeteTableau";

const superagentMock = require("superagent-mock")(
  request,
  configParamsBaseRequete
);

test("Attendu: CertificatSituationComposition.creerCertificatSituation fonctionne correctement", async () => {
  await ParametreBaseRequete.init();
  const attendu = certificatSituation;

  const titre = "titre";
  const decrets: IDecret[] = [
    { libelle: "decret1" } as IDecret,
    { libelle: "decret2" } as IDecret
  ];
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
    },
    qualiteRequerant: {
      qualite: Qualite.PARTICULIER
    }
  } as IRequerant;
  const titulaire = {
    nom: "nom",
    prenoms: ["pre1", "pre2"],
    jourNaissance: 1,
    moisNaissance: 2,
    anneeNaissance: 2000,
    villeNaissance: "villeNaissance",
    paysNaissance: "paysNaissance",
    sexe: Sexe.MASCULIN
  } as ITitulaireRequeteTableau;

  const requete = {
    numero: "012345",
    canal: TypeCanal.COURRIER,
    requerant: requerant
  } as IRequeteTableauDelivrance;

  const resultat = await CertificatSituationComposition.creerCertificatSituation(
    titre,
    decrets,
    phrase,
    requete,
    phrasesPiecesJointes,
    titulaire
  );
  await waitFor(() => {
    expect(resultat).toEqual(attendu);
  });
});

afterAll(() => {
  superagentMock.unset();
});
