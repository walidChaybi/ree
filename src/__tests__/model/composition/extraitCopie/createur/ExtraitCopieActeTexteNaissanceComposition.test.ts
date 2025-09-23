import { imagePngVideBase64 } from "@mock/data/ImagePng";
import { ExtraitCopieActeTexteNaissanceComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteNaissanceComposition";
import { FicheActe, IFicheActeDto } from "@model/etatcivil/acte/FicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { expect, test } from "vitest";
import { ficheActeNaissance } from "../../../../mock/data/ficheActe";

test("Attendu: getCorpsTexte fonctionne correctement", () => {
  const acte = FicheActe.depuisDto(ficheActeNaissance)!;
  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION,
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
est née à Paris, Paris (France)
  Alphonse
  Patamob suivant déclaration conjointe de changement de nom en date du 26 novembre 2000
(1re partie : nom1  2nde partie : nom2)
du sexe féminin
fille de Jean, Louis Sacken né à Barcelone, Catalogne (Espagne)
et de Louise, Jocelyne DUPOND née le 26 juin 1981 à Nantes (Catalogne)`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});

test("Ne doit pas afficher (Inconnu) dans le document généré sur la naissance des filiations", () => {
  const acte = {
    ...ficheActeNaissance,
    ...(ficheActeNaissance.titulaires[0].filiations = [
      {
        lienParente: "PARENT",
        ordre: 1,
        nom: "Sacken",
        sexe: "MASCULIN",
        naissance: {
          ville: "Barcelone",
          region: "",
          pays: "Inconnu"
        },
        profession: "Informaticien",
        domicile: {
          voie: "16 avenue des Palmiers",
          ville: "Djibouti",
          pays: "DJIBOUTI"
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
          region: "",
          pays: ""
        },
        profession: "Dentiste",
        domicile: {
          voie: "16 avenue des Palmiers",
          ville: "Djibouti",
          pays: "DJIBOUTI"
        },
        prenoms: ["Louise", "Jocelyne"]
      }
    ])
  };

  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = EValidation.N;
  const ctv = "111111-222222";

  const compositionCorps = ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance({
    acte: FicheActe.depuisDto(acte)!,
    requete,
    validation,
    mentionsRetirees: [],
    ctv,
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
  });

  const corpsTexteAttendu = `Le 10 octobre 1901 à 13 heures 15 minutes
est née à Paris, Paris (France)
  Alphonse
  Patamob suivant déclaration conjointe de changement de nom en date du 26 novembre 2000
(1re partie : nom1  2nde partie : nom2)
du sexe féminin
fille de Jean, Louis Sacken né à Barcelone
et de Louise, Jocelyne DUPOND née le 26 juin 1981 à Nantes`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});

test("Doit afficher les bonne données de naissance de filiations dans le document généré", () => {
  const acte: IFicheActeDto = {
    origine: "RECE",
    referenceActe: "",
    id: "923a10fb-0b15-452d-83c0-d24c76d1de8e",
    statut: "ANNULE",
    nature: "NAISSANCE",
    numero: "254",
    numeroBisTer: "35",
    dateDerniereDelivrance: 1207130400000,
    visibiliteArchiviste: "NON",
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
    mentions: [],
    titulaires: [
      {
        nom: "Micheldelavandièredugrand-large",
        ordre: 1,
        prenoms: ["lolita"],
        sexe: "FEMININ",
        naissance: {
          jour: 17,
          mois: 4,
          annee: 1970,
          ville: "Sitka",
          region: "Alaska",
          pays: "États-Unis"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 1,
            nom: "Sacken",
            sexe: "MASCULIN",
            naissance: {
              ville: "Barcelone",
              region: "Catalogne",
              pays: "Espagne"
            },
            profession: "Informaticien",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              pays: "DJIBOUTI"
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
              region: "Paris",
              pays: "Algérie"
            },
            profession: "Dentiste",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              pays: "DJIBOUTI"
            },
            prenoms: ["Louise", "Jocelyne"]
          }
        ],
        profession: "DEVELOPPEUR",
        domicile: {
          voie: "IlotduHéron",
          ville: "Djibouti",
          pays: "DJIBOUTI"
        },
        typeDeclarationConjointe: "CHOIX_NOM",
        dateDeclarationConjointe: [1999, 2, 3],
        nomPartie1: "nom1",
        nomPartie2: "nom2",
        nomAvantMariage: "Micheldelavandièredugrand",
        nomApresMariage: "Micheldelavandièredugrand-large",
        nomDernierConjoint: "Large",
        prenomsDernierConjoint: "Jean Maxime"
      }
    ],
    alerteActes: [],
    personnes: [
      {
        id: "e7114c57-d00d-48ad-bbee-af2b01e2da61",
        nom: "Durant",
        sexe: "FEMININ",
        nationalite: "FRANCAISE",
        naissance: {
          jour: 1,
          mois: 10,
          annee: 1960,
          ville: "nantes",
          region: "Pays de Loire",
          pays: "France"
        },
        deces: {
          jour: 2,
          mois: 12,
          annee: 2020,
          ville: "bordeau",
          region: "Nouvelle-Aquitaine",
          pays: "France"
        },
        autresNoms: [
          {
            nom: "O",
            type: "ANCIEN_NOM"
          }
        ],
        prenoms: ["Julie", "Sarah"],
        autresPrenoms: ["Mireille"],
        parents: [
          {
            nom: "Glenn",
            prenoms: ["Pearl", "Ginger"]
          },
          {
            nom: "Nora",
            prenoms: ["Reed"]
          }
        ],
        enfants: [
          {
            nom: "Janine",
            prenoms: ["Alyce"]
          },
          {
            nom: "Kirsten",
            prenoms: ["Louella"]
          },
          {
            nom: "Reynolds",
            prenoms: ["Mcleod", "Bates"]
          },
          {
            nom: "Barton",
            prenoms: ["Buck"]
          }
        ],
        rcs: [
          {
            id: "76b62678-8b06-4442-ad5b-b9207627a6e3",
            numero: "1",
            statut: "ACTIF",
            referenceComplete: ""
          },
          {
            id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
            numero: "4",
            statut: "INACTIF",
            referenceComplete: ""
          }
        ],
        rcas: [
          {
            id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
            numero: "4094",
            statut: "ACTIF",
            referenceComplete: ""
          }
        ],
        pacss: [],
        actes: [
          {
            id: "923a10fb-0b15-452d-83c0-d24c76d1de8e",
            numero: "254",
            referenceComplete: ""
          }
        ]
      }
    ],
    estReecrit: false,
    registre: {
      famille: "DEP",
      annee: 1987,
      dateOuverture: [1993, 6, 6],
      dateFermeture: [1969, 2, 16],
      type: {
        id: "d5f36d96-f1f8-437e-8371-86dba9837341",
        pocopa: "IRAN"
      }
    },
    corpsExtraitRectifications: [],
    corpsImage: {
      images: [
        {
          contenu: imagePngVideBase64,
          noPage: 1
        },
        {
          contenu: imagePngVideBase64,
          noPage: 1
        }
      ]
    },
    analyseMarginales: [
      {
        id: "",
        estValide: true,
        dateDebut: 1612782000000,
        titulaires: [
          {
            nom: "Patamob",
            prenoms: ["Alphonse"],
            ordre: 1,
            typeDeclarationConjointe: "CHANGEMENT_NOM",
            dateDeclarationConjointe: [2000, 11, 26]
          }
        ]
      },
      {
        id: "",
        estValide: false,
        dateDebut: 1577358000000,
        dateFin: 1612782000000,
        titulaires: [
          {
            nom: "Ozaur",
            prenoms: ["Amandine"],
            ordre: 1
          }
        ]
      }
    ],
    type: "IMAGE"
  };

  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = EValidation.N;
  const ctv = "111111-222222";

  const compositionCorps = ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance({
    acte: FicheActe.depuisDto(acte)!,
    requete,
    validation,
    mentionsRetirees: [],
    ctv,
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
  });

  const corpsTexteAttendu = `Le 10 octobre 1901 à 13 heures 15 minutes
est née à Nantes, Loire-Atlantique (Inconnu)
  Alphonse
  Patamob suivant déclaration conjointe de changement de nom en date du 26 novembre 2000
(1re partie : nom1  2nde partie : nom2)
du sexe féminin
fille de Jean, Louis Sacken né à Barcelone, Catalogne (Espagne)
et de Louise, Jocelyne DUPOND née le 26 juin 1981 à Alger, Paris (Algérie)`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
