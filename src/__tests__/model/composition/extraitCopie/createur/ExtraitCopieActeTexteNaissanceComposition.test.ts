import { ficheActeNaissance } from "../../../../../mock/data/ficheActe";
import { ExtraitCopieActeTexteNaissanceComposition } from "../../../../../model/composition/extraitCopie/createur/ExtraitCopieActeTexteNaissanceComposition";
import { IFicheActe } from "../../../../../model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../model/requete/enum/Validation";
import { mapActe } from "../../../../../views/common/hook/repertoires/MappingRepertoires";

test("Attendu: getCorpsTexte fonctionne correctement", () => {
  const acte = mapActe(ficheActeNaissance.data);
  const choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
  const sousTypeRequete = SousTypeDelivrance.RDD;
  const validation = Validation.N;
  const avecFiliation = true;
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
est née à Paris, Paris (France)
  lolita
  Micheldelavandièredugrand-large suivant déclaration conjointe de changement de nom en date du 26 novembre 2000
(1re partie : nom1  2nde partie : nom2)
du sexe féminin
fille de Jean, Louis Sacken né à Barcelone, Catalogne (Espagne)
et de Louise, Jocelyne DUPOND née le 26 juin 1981 à Nantes, Catalogne (France)`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
