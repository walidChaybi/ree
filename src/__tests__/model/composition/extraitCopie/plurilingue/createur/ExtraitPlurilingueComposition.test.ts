import { ExtraitPlurilingueComposition } from "@model/composition/extraitCopie/plurilingue/createur/ExtraitPlurilingueComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import {
  ficheActeMariage,
  ficheActeNaissance
} from "../../../../../../mock/data/ficheActe";

test("Attendu: creerExtraitPlurilingue fonctionne correctement pour NAISSANCE", () => {
  const acte = ficheActeNaissance.data;

  const compositionCorps =
    ExtraitPlurilingueComposition.creerExtraitPlurilingue(
      acte as any as IFicheActe
    );

  const nomTitulaireAttendu = "Micheldelavandièredugrand-large";

  expect(compositionCorps.titulaire.nom).toBe(nomTitulaireAttendu);
});

test("Attendu: creerExtraitPlurilingue fonctionne correctement pour MARIAGE", () => {
  const acte = ficheActeMariage.data;

  const compositionCorps =
    ExtraitPlurilingueComposition.creerExtraitPlurilingue(
      acte as any as IFicheActe
    );

  const nomTitulaireAttendu = "MARTIN";

  expect(compositionCorps.titulaire.nom).toBe(nomTitulaireAttendu);
});
