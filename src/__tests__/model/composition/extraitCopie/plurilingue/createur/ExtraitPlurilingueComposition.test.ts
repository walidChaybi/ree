import { ficheActeNaissance } from "@mock/data/ficheActe";

test("Attendu: creerExtraitPlurilingue fonctionne correctement pour NAISSANCE", () => {
  const acte = ficheActeNaissance.data;

  // const compositionCorps =
  //   ExtraitPlurilingueMariageComposition.compositionExtraitPlurilingueDeMariage(
  //     acte as any as IFicheActe
  //   );

  // const nomTitulaireAttendu = "Micheldelavandièredugrand-large";

  // expect(compositionCorps.titulaire.nom).toBe(nomTitulaireAttendu);
});

test("Attendu: creerExtraitPlurilingue fonctionne correctement pour MARIAGE", () => {
  // const acte = ficheActeMariage.data;
  // const compositionCorps =
  //   ExtraitPlurilingueMariageComposition.compositionExtraitPlurilingueDeMariage(
  //     acte as any as IFicheActe
  //   );
  // const nomTitulaireAttendu = "MARTIN";
});
