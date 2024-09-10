import { certificatSituation } from "@mock/data/Composition";
import { CertificatSituationComposition } from "@model/composition/ICertificatSituationComposition";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

test("Attendu: CertificatSituationComposition.creerCertificatSituation fonctionne correctement", () => {
  ParametreBaseRequete.init();
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

  const resultat = CertificatSituationComposition.creerCertificatSituation(
    titre,
    decrets,
    phrase,
    requete,
    phrasesPiecesJointes,
    titulaire
  );
  waitFor(() => {
    expect(resultat).toEqual(attendu);
  });
});
