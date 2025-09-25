import { MockFicheActeBuilder } from "@mock/model/etatcivil/acte/MockFicheActe";
import { ExtraitCopieActeTexteNaissanceComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteNaissanceComposition";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { expect, test } from "vitest";

test("Ne doit pas afficher (Inconnu) dans le document généré sur la naissance des filiations", () => {
  const acte = new MockFicheActeBuilder({
    evenement: {
      minute: 15,
      heure: 13,
      jour: 10,
      mois: 10,
      annee: 1901,
      ville: "Paris",
      arrondissement: "16",
      region: "Paris",
      pays: "France"
    },
    titulaires: [
      {
        nom: "Pata Mob",
        prenoms: ["Alphonse"],
        ordre: 1,
        typeDeclarationConjointe: "CHANGEMENT_NOM",
        dateDeclarationConjointe: [2000, 11, 26],
        sexe: "FEMININ",
        nomPartie1: "Pata",
        nomPartie2: "Mob",
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 1,
            nom: "Sacken",
            sexe: "MASCULIN",
            naissance: {
              ville: "Barcelone",
              pays: "Inconnu"
            },
            prenoms: ["Jean", "Louis"]
          },
          {
            lienParente: "PARENT",
            ordre: 2,
            nom: "DUPOND",
            sexe: "FEMININ",
            naissance: {
              jour: 26,
              mois: 6,
              annee: 1981,
              ville: "Nantes",
              pays: ""
            },
            prenoms: ["Louise", "Jocelyne"]
          }
        ]
      }
    ]
  })
    .deNature("NAISSANCE")
    .generer()!;

  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = EValidation.N;
  const ctv = "111111-222222";

  const compositionCorps = ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance({
    acte,
    requete,
    validation,
    mentionsRetirees: [],
    ctv,
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
  });

  const corpsTexteAttendu = `Le 10 octobre 1901 à 13 heures 15 minutes
est née à Paris, Paris (France)
  Alphonse
  Pata Mob suivant déclaration conjointe de changement de nom en date du 26 novembre 2000
(1re partie : Pata  2nde partie : Mob)
du sexe féminin
fille de Jean, Louis Sacken né à Barcelone
et de Louise, Jocelyne DUPOND née le 26 juin 1981 à Nantes`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});

test("Doit afficher les bonne données de naissance de filiations dans le document généré", () => {
  const acte = new MockFicheActeBuilder({
    evenement: {
      minute: 15,
      heure: 13,
      jour: 10,
      mois: 10,
      annee: 1901,
      ville: "Nantes",
      arrondissement: "16",
      region: "Loire-Atlantique",
      pays: "Inconnu"
    },
    titulaires: [
      {
        nom: "Pata Mob",
        prenoms: ["Alphonse"],
        ordre: 1,
        typeDeclarationConjointe: "CHANGEMENT_NOM",
        dateDeclarationConjointe: [2000, 11, 26],
        sexe: "FEMININ",
        nomPartie1: "Pata",
        nomPartie2: "Mob",
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 1,
            nom: "Sacken",
            sexe: "MASCULIN",
            naissance: {
              ville: "Barcelone",
              pays: "Espagne",
              region: "Catalogne"
            },
            prenoms: ["Jean", "Louis"]
          },
          {
            lienParente: "PARENT",
            ordre: 2,
            nom: "DUPOND",
            sexe: "FEMININ",
            naissance: {
              jour: 26,
              mois: 6,
              annee: 1981,
              ville: "Alger",
              pays: "Algérie"
            },
            prenoms: ["Louise", "Jocelyne"]
          }
        ]
      }
    ]
  })
    .deNature("NAISSANCE")
    .generer()!;

  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = EValidation.N;
  const ctv = "111111-222222";

  const compositionCorps = ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance({
    acte: acte,
    requete,
    validation,
    mentionsRetirees: [],
    ctv,
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
  });

  const corpsTexteAttendu = `Le 10 octobre 1901 à 13 heures 15 minutes
est née à Nantes, Loire-Atlantique (Inconnu)
  Alphonse
  Pata Mob suivant déclaration conjointe de changement de nom en date du 26 novembre 2000
(1re partie : Pata  2nde partie : Mob)
du sexe féminin
fille de Jean, Louis Sacken né à Barcelone, Catalogne (Espagne)
et de Louise, Jocelyne DUPOND née le 26 juin 1981 à Alger (Algérie)`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
