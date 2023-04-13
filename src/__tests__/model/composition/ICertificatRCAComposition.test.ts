import { IElementsJasperCertificatRCA } from "@hook/generation/generationInscriptionsHook/specificationInscriptions/specificationRCA";
import { certificatRCA } from "@mock/data/Composition";
import { CertificatRCAComposition } from "@model/composition/ICertificatRCAComposition";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { IRequerant } from "@model/requete/IRequerant";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { waitFor } from "@testing-library/react";

test("Attendu: CertificatRCAComposition.creerCertificatRCA fonctionne correctement", async () => {
  await ParametreBaseRequete.init();
  const attendu = certificatRCA;

  const elementsJasper = {
    anneeInscription: "2020",
    numeroInscription: "1234",
    decisionRecue: "phrase decision recue",
    interesseDecision: "phrase interesse_decision",
    paragrapheFin: "phrase paragraphe_fin",
    decisionExequatur: "phrase decision_exequatur"
  } as IElementsJasperCertificatRCA;

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

  const resultat = await CertificatRCAComposition.creerCertificatRCA(
    elementsJasper,
    TypeCanal.COURRIER,
    requerant,
    "012345",
    titulaire
  );
  await waitFor(() => {
    expect(resultat).toEqual(attendu);
  });
});
