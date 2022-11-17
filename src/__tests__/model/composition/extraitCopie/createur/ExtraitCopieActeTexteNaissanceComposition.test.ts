import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { ExtraitCopieActeTexteNaissanceComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteNaissanceComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ficheActeNaissance } from "../../../../../mock/data/ficheActe";

test("Attendu: getCorpsTexte fonctionne correctement", () => {
  const acte = mapActe(ficheActeNaissance.data);
  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = Validation.N;
  const avecFiliation = true;
  const copie = false;
  const archive = false;
  const ctv = "111111-222222";

  const compositionCorps =
    ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance(
      {
        acte: acte as any as IFicheActe,
        requete,
        validation,
        mentionsRetirees: [],
        avecFiliation,
        copie,
        archive,
        ctv
      }
    );

  const corpsTexteAttendu = `Le 10 octobre 1901 à 13 heures 15 minutes
est née à Paris, Paris (France)
  Alphonse
  Patamob suivant déclaration conjointe de changement de nom en date du 26 novembre 2000
(1re partie : nom1  2nde partie : nom2)
du sexe féminin
fille de Jean, Louis Sacken né à Barcelone, Catalogne (Espagne)
et de Louise, Jocelyne DUPOND née le 26 juin 1981 à Nantes (Catalogne)`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
