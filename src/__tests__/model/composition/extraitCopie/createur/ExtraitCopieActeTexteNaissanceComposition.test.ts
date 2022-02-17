import { ficheActeNaissance } from "../../../../../mock/data/ficheActe";
import { ExtraitCopieActeTexteNaissanceComposition } from "../../../../../model/composition/extraitCopie/createur/ExtraitCopieActeTexteNaissanceComposition";
import { IFicheActe } from "../../../../../model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../model/requete/enum/Validation";

test("Attendu: getCorpsTexte fonctionne correctement", () => {
  const acte = ficheActeNaissance.data;
  const choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
  const sousTypeRequete = SousTypeDelivrance.RDD;
  const validation = Validation.N;
  const avecFiliation = false;
  const copie = false;
  const archive = false;

  const compositionCorps =
    ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance(
      acte as any as IFicheActe,
      choixDelivrance,
      sousTypeRequete,
      validation,
      avecFiliation,
      copie,
      archive
    );

  const corpsTexteAttendu = `Le 10 octobre 1901 à 13h15
est née le 17 avril 1970 à Paris, Paris (France)
  lolita
  Micheldelavandièredugrand-large
(1re partie : nom1  2nde partie : nom2)
du sexe Féminin`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
