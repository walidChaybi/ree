import { ExtraitCopieActeTexteMariageComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteMariageComposition";
import { FicheActe, IFicheActeDto } from "@model/etatcivil/acte/FicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { expect, test } from "vitest";
import { ficheActeMariage } from "../../../../mock/data/ficheActe";

test("Attendu: getCorpsTexte fonctionne correctement", () => {
  const acte = FicheActe.depuisDto(ficheActeMariage)!;
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
  fils de Carmela, Linzy Sacken
  et de Carmelaa, Linzy Sacken
  adopté par Carmelaaa, Linzy Sacken et par Carmelaaaa, Linzy Sacken
et de Elodie, Marie-Charlotte, Pauline PRODESK 
née le 25 juin 1990 à Barcelone, Catalogne (Espagne)
  adoptée par Carmela, Linzy Sacken

Contrat de mariage : Sans contrat préalable`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});

test("Doit retourner les bonnes données pour la naissance des titulaires dans le corps généré", () => {
  const acte: IFicheActeDto = {
    origine: "SCEC_DOCS",
    referenceActe: "",
    id: "b41079a5-9e8d-478c-b04c-c4c2ac67134b",
    statut: "VALIDE",
    nature: "MARIAGE",
    numero: "8012",
    numeroBisTer: "681ABC",
    dateDerniereDelivrance: 1413972000000,
    visibiliteArchiviste: "NON",
    evenement: {
      jour: 25,
      mois: 6,
      annee: 1990,
      ville: "Barcelone",
      region: "Catalogne",
      pays: "Espagne"
    },
    mentions: [],
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
          pays: "Inconnu"
        },
        profession: "Enseignante",
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            profession: "Coiffeuse",
            lienParente: "PARENT",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmela", "Linzy"]
          },
          {
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            profession: "Coiffeuse",
            lienParente: "PARENT",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmelaa", "Linzy"]
          },
          {
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            profession: "Coiffeuse",
            lienParente: "PARENT_ADOPTANT",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmelaaa", "Linzy"]
          },
          {
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            profession: "Coiffeuse",
            lienParente: "PARENT_ADOPTANT",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmelaaaa", "Linzy"]
          }
        ],
        nomAvantMariage: "nomAvantMariage",
        nomApresMariage: "nomApresMariage"
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
          pays: "Inconnu"
        },
        profession: "Enseignante",
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            lienParente: "PARENT_ADOPTANT",
            ordre: 752,
            nom: "Sacken",
            sexe: "MASCULIN",
            profession: "Informaticien",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmela", "Linzy"]
          }
        ],
        nomAvantMariage: "nomAvantMariage",
        nomApresMariage: "nomApresMariage"
      }
    ],
    alerteActes: [],
    personnes: [
      {
        id: "e7114c50-d00d-48ad-bbee-af2b01e2da8b",
        nom: "Prodesk",
        sexe: "FEMININ",
        nationalite: "ETRANGERE",
        naissance: {
          minute: 25,
          heure: 16,
          jour: 25,
          mois: 6,
          annee: 1990,
          ville: "Barcelone",
          region: "Catalogne",
          pays: "Espagne"
        },
        autresNoms: [],
        prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
        autresPrenoms: [],
        parents: [],
        enfants: [],
        rcs: [],
        rcas: [],
        pacss: [],
        actes: [
          {
            id: "b41079a5-9e8d-478c-b04c-c4c2ac67134b",
            numero: "8012",
            referenceComplete: ""
          }
        ]
      },
      {
        id: "e7114c50-d00d-48ad-bbee-af2b01e2da8e",
        nom: "MARTIN",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        naissance: {
          minute: 16,
          heure: 8,
          jour: 29,
          mois: 11,
          annee: 1989,
          voie: "rue des mirabelles",
          ville: "Paris",
          arrondissement: "8",
          pays: "France"
        },
        autresNoms: [],
        prenoms: ["Jean-Louis", "Alphonse", "Raoûl"],
        autresPrenoms: [],
        parents: [],
        enfants: [],
        rcs: [],
        rcas: [],
        pacss: [],
        actes: [
          {
            id: "b41079a5-9e8d-478c-b04c-c4c2ac67134b",
            numero: "8012",
            referenceComplete: ""
          }
        ]
      }
    ],
    estReecrit: true,
    registre: {
      famille: "ACQ",
      annee: 1951,
      support1: "1",
      dateOuverture: [1995, 12, 25],
      dateFermeture: [1990, 1, 20],
      type: {
        id: "d5f36d96-f1f8-437e-8371-86dba9837339",
        pocopa: "X"
      }
    },
    corpsExtraitRectifications: [],
    corpsImage: {
      images: [
        {
          contenu: "base64",
          noPage: 1
        }
      ]
    },
    analyseMarginales: [
      {
        dateDebut: 1612782000000,
        id: "",
        estValide: true,
        titulaires: [
          {
            nom: "MARTIN",
            prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
            ordre: 1
          },
          {
            nom: "PRODESK",
            prenoms: ["Sophie", "Marie-Charlotte", "Pauline"],
            ordre: 2
          }
        ]
      }
    ],
    type: "IMAGE",
    detailMariage: {
      existenceContrat: "NON"
    }
  };

  const choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
  const sousTypeRequete = SousTypeDelivrance.RDD;
  const validation = EValidation.N;
  const ctv = "111111-222222";

  const compositionCorps = ExtraitCopieActeTexteMariageComposition.creerExtraitCopieActeTexteMariage({
    acte: FicheActe.depuisDto(acte)!,
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
  fils de Carmela, Linzy Sacken
  et de Carmelaa, Linzy Sacken
  adopté par Carmelaaa, Linzy Sacken et par Carmelaaaa, Linzy Sacken
et de Sophie, Marie-Charlotte, Pauline PRODESK 
née le 25 juin 1990 à Barcelone, Catalogne
  adoptée par Carmela, Linzy Sacken

Contrat de mariage : Sans contrat préalable`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
