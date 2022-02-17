import { ficheActeMariage } from "../../../../../mock/data/ficheActe";
import { ExtraitCopieActeTexteMariageComposition } from "../../../../../model/composition/extraitCopie/createur/ExtraitCopieActeTexteMariageComposition";
import { IFicheActe } from "../../../../../model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../model/requete/enum/Validation";

test("Attendu: getCorpsTexte fonctionne correctement", () => {
  const acte = ficheActeMariage.data;
  const choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
  const sousTypeRequete = SousTypeDelivrance.RDD;
  const validation = Validation.N;
  const avecFiliation = true;
  const copie = false;
  const archive = false;

  const compositionCorps =
    ExtraitCopieActeTexteMariageComposition.creerExtraitCopieActeTexteMariage(
      acte as any as IFicheActe,
      choixDelivrance,
      sousTypeRequete,
      validation,
      avecFiliation,
      copie,
      archive
    );

  const corpsTexteAttendu = `Le 25 juin 1990
a été célébré à Barcelone, Catalogne (Espagne)
le mariage
de Jean-Louis, Alphonse, Raoül MARTIN 
né le 29 novembre 1989 à Paris (Fance)
  fils de Carmela, Linzy Sacken
  et de Carmelaa, Linzy Sacken
  adopté par Carmelaaa, Linzy Sacken et par Carmelaaaa, Linzy Sacken
et de Elodie, Marie-Charlotte, Pauline PRODESK 
née le 25 juin 1990 à Barcelone, Catalogne (Espagne)
  adoptée par Carmela, Linzy Sacken

Contrat de mariage : --`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
