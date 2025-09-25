import { MockFicheActeBuilder } from "@mock/model/etatcivil/acte/MockFicheActe";
import { ExtraitCopieActeTexteMariageComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteMariageComposition";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { expect, test } from "vitest";

test("Attendu: getCorpsTexte fonctionne correctement", () => {
  const acte = new MockFicheActeBuilder({
    evenement: {
      jour: 25,
      mois: 6,
      annee: 1990,
      ville: "Barcelone",
      region: "Catalogne",
      pays: "Espagne"
    },
    titulaires: [
      {
        nom: "MARTIN",
        prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
        ordre: 1,
        sexe: "MASCULIN",
        naissance: {
          jour: 29,
          mois: 11,
          annee: 1989,
          ville: "Paris",
          region: "",
          pays: "France"
        },
        filiations: [
          {
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            lienParente: "PARENT",
            prenoms: ["Parent 1"]
          },
          {
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            lienParente: "PARENT",
            prenoms: ["Parent 2"]
          },
          {
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            lienParente: "PARENT_ADOPTANT",
            prenoms: ["Parent Adoptant 1"]
          },
          {
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            lienParente: "PARENT_ADOPTANT",
            prenoms: ["Parent Adoptant 2"]
          }
        ]
      },
      {
        nom: "PRODESK",
        prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
        ordre: 2,
        sexe: "FEMININ",
        naissance: {
          jour: 25,
          mois: 6,
          annee: 1990,
          ville: "Barcelone",
          region: "Catalogne",
          pays: "Espagne"
        },
        filiations: [
          {
            lienParente: "PARENT_ADOPTANT",
            ordre: 1,
            nom: "Sacken",
            sexe: "MASCULIN",
            prenoms: ["Carmela", "Linzy"]
          }
        ]
      }
    ],
    detailMariage: { existenceContrat: "NON" }
  })
    .deNature("MARIAGE")
    .generer()!;

  const choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
  const sousTypeRequete = SousTypeDelivrance.RDD;
  const validation = EValidation.N;
  const ctv = "111111-222222";

  const compositionCorps = ExtraitCopieActeTexteMariageComposition.creerExtraitCopieActeTexteMariage({
    acte,
    requete: {
      choixDelivrance,
      sousType: sousTypeRequete
    } as IRequeteDelivrance,
    validation,
    mentionsRetirees: [],
    ctv,
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
  });

  const corpsTexteAttendu = `Le 25 juin 1990 à Barcelone, Catalogne (Espagne)
a été célébré le mariage
de Jean-Louis, Alphonse, Raoül MARTIN 
né le 29 novembre 1989 à Paris
  fils de Parent 1 Sacken
  et de Parent 2 Sacken
  adopté par Parent Adoptant 1 Sacken et par Parent Adoptant 2 Sacken
et de Elodie, Marie-Charlotte, Pauline PRODESK 
née le 25 juin 1990 à Barcelone, Catalogne (Espagne)
  adoptée par Carmela, Linzy Sacken

Contrat de mariage : Sans contrat préalable`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
