import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { ExtraitCopieActeTexteMariageComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteMariageComposition";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ficheActeMariage } from "../../../../../mock/data/ficheActe";

test("Attendu: getCorpsTexte fonctionne correctement", () => {
  const acte = mapActe(ficheActeMariage.data);
  const choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
  const sousTypeRequete = SousTypeDelivrance.RDD;
  const validation = Validation.N;
  const ctv = "111111-222222";

  const compositionCorps =
    ExtraitCopieActeTexteMariageComposition.creerExtraitCopieActeTexteMariage({
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

  const corpsTexteAttendu = `Le 25 juin 1990
a été célébré à Barcelone, Catalogne (Espagne)
le mariage
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
  const acte = {
    id: "b41079a5-9e8d-478c-b04c-c4c2ac67134b",
    dateInitialisation: null,
    dateCreation: 1256986800000,
    modeCreation: "DRESSE",
    statut: "VALIDE",
    dateStatut: 1045652400000,
    nature: "MARIAGE",
    numero: "8012",
    numeroBisTer: "681ABC",
    nomOec: "MARTIN",
    prenomOec: "JULIE",
    dateDerniereDelivrance: 1413972000000,
    dateDerniereMaj: 1536400800000,
    visibiliteArchiviste: "NON",
    evenement: {
      minute: null,
      heure: null,
      jour: 25,
      mois: 6,
      annee: 1990,
      voie: null,
      ville: "Barcelone",
      arrondissement: null,
      region: "Catalogne",
      pays: "Espagne",
      lieuReprise: null
    },
    mentions: [],
    titulaires: [
      {
        nom: "MARTIN",
        prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 1,
        sexe: "MASCULIN",
        naissance: {
          minute: null,
          heure: null,
          jour: 29,
          mois: 11,
          annee: 1989,
          voie: null,
          ville: "Paris",
          arrondissement: null,
          region: "",
          pays: "Inconnu",
          lieuReprise: null
        },
        profession: "Enseignante",
        age: null,
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          arrondissement: null,
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            type: null,
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            naissance: null,
            profession: "Coiffeuse",
            age: null,
            lienParente: "PARENT",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmela", "Linzy"]
          },
          {
            type: null,
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            naissance: null,
            profession: "Coiffeuse",
            age: null,
            lienParente: "PARENT",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmelaa", "Linzy"]
          },
          {
            type: null,
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            naissance: null,
            profession: "Coiffeuse",
            age: null,
            lienParente: "PARENT_ADOPTANT",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmelaaa", "Linzy"]
          },
          {
            type: null,
            ordre: 1,
            nom: "Sacken",
            sexe: "FEMININ",
            naissance: null,
            profession: "Coiffeuse",
            age: null,
            lienParente: "PARENT_ADOPTANT",
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmelaaaa", "Linzy"]
          }
        ],
        typeDeclarationConjointe: null,
        dateDeclarationConjointe: null,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: "nomAvantMariage",
        nomApresMariage: "nomApresMariage",
        nomDernierConjoint: null,
        prenomsDernierConjoint: null
      },
      {
        nom: "PRODESK",
        prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 2,
        sexe: "FEMININ",
        naissance: {
          minute: null,
          heure: null,
          jour: 25,
          mois: 6,
          annee: 1990,
          voie: null,
          ville: "Barcelone",
          arrondissement: null,
          region: "Catalogne",
          pays: "Inconnu",
          lieuReprise: null
        },
        profession: "Enseignante",
        age: null,
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          arrondissement: null,
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            lienParente: "PARENT_ADOPTANT",
            type: null,
            ordre: 752,
            nom: "Sacken",
            sexe: "MASCULIN",
            naissance: null,
            profession: "Informaticien",
            age: null,
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Carmela", "Linzy"]
          }
        ],
        typeDeclarationConjointe: null,
        dateDeclarationConjointe: null,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: "nomAvantMariage",
        nomApresMariage: "nomApresMariage",
        nomDernierConjoint: null,
        prenomsDernierConjoint: null
      }
    ],
    piecesAnnexes: [],
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
          voie: null,
          ville: "Barcelone",
          arrondissement: null,
          region: "Catalogne",
          pays: "Espagne",
          lieuReprise: null
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
            statut: null,
            nature: "MARIAGE"
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
          region: null,
          pays: "France",
          lieuReprise: null
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
            statut: null,
            nature: "MARIAGE"
          }
        ]
      }
    ],
    estReecrit: true,
    registre: {
      id: "e60432a7-7fb1-41d9-b6ad-a01fffbd223b",
      famille: "ACQ",
      pocopa: "X",
      annee: 1951,
      support1: "1",
      support2: null,
      numeroDernierActe: "4564",
      pvOuverture: "pv_ouverture",
      dateOuverture: [1995, 12, 25],
      pvFermeture: "pv_fermeture",
      dateFermeture: [1990, 1, 20],
      decret2017: null,
      type: {
        id: "d5f36d96-f1f8-437e-8371-86dba9837339",
        famille: "ACQ",
        pocopa: "TUNIS",
        paysPocopa: "TUNISIE",
        dateRattachement: [1993, 6, 6],
        dateTransfertScec: [1969, 2, 16],
        gereScec: true,
        estOuvert: true,
        description: ""
      }
    },
    motifAnnulation: "motif annulation",
    dateInitialisationprojet: null,
    numeroProjet: "a11",
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
        dateFin: null,
        nomOec: null,
        prenomOec: null,
        motifModification: "FRANCISATION_PRENOM",
        titulaires: [
          {
            nom: "MARTIN",
            prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: "MASCULIN",
            profession: "Enseignante",
            age: null,
            domicile: {
              voie: "7 Rue du Noyer",
              ville: "Bruxelles",
              arrondissement: null,
              region: "Flandre",
              pays: "BELGIQUE"
            },
            filiations: [
              {
                type: null,
                ordre: 1,
                nom: "Sacken",
                sexe: "FEMININ",
                naissance: null,
                profession: "Coiffeuse",
                age: null,
                lienParente: "PARENT",
                domicile: {
                  voie: "16 avenue des Palmiers",
                  ville: "Djibouti",
                  arrondissement: null,
                  region: null,
                  pays: "DJIBOUTI"
                },
                prenoms: ["Carmela", "Linzy"]
              },
              {
                type: null,
                ordre: 1,
                nom: "Sacken",
                sexe: "FEMININ",
                naissance: null,
                profession: "Coiffeuse",
                age: null,
                lienParente: "PARENT",
                domicile: {
                  voie: "16 avenue des Palmiers",
                  ville: "Djibouti",
                  arrondissement: null,
                  region: null,
                  pays: "DJIBOUTI"
                },
                prenoms: ["Carmelaa", "Linzy"]
              },
              {
                type: null,
                ordre: 1,
                nom: "Sacken",
                sexe: "FEMININ",
                naissance: null,
                profession: "Coiffeuse",
                age: null,
                lienParente: "PARENT_ADOPTANT",
                domicile: {
                  voie: "16 avenue des Palmiers",
                  ville: "Djibouti",
                  arrondissement: null,
                  region: null,
                  pays: "DJIBOUTI"
                },
                prenoms: ["Carmelaaa", "Linzy"]
              },
              {
                type: null,
                ordre: 1,
                nom: "Sacken",
                sexe: "FEMININ",
                naissance: null,
                profession: "Coiffeuse",
                age: null,
                lienParente: "PARENT_ADOPTANT",
                domicile: {
                  voie: "16 avenue des Palmiers",
                  ville: "Djibouti",
                  arrondissement: null,
                  region: null,
                  pays: "DJIBOUTI"
                },
                prenoms: ["Carmelaaaa", "Linzy"]
              }
            ],
            typeDeclarationConjointe: null,
            dateDeclarationConjointe: null,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          },
          {
            nom: "PRODESK",
            prenoms: ["Sophie", "Marie-Charlotte", "Pauline"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 2,
            sexe: "FEMININ",
            naissance: {
              minute: null,
              heure: null,
              jour: 25,
              mois: 6,
              annee: 1990,
              voie: null,
              ville: "Barcelone",
              arrondissement: null,
              region: "Catalogne",
              pays: "Espagne",
              lieuReprise: null
            },
            profession: "Enseignante",
            age: null,
            domicile: {
              voie: "7 Rue du Noyer",
              ville: "Bruxelles",
              arrondissement: null,
              region: "Flandre",
              pays: "BELGIQUE"
            },
            filiations: [
              {
                lienParente: "PARENT_ADOPTANT",
                type: null,
                ordre: 752,
                nom: "Sacken",
                sexe: "MASCULIN",
                naissance: null,
                profession: "Informaticien",
                age: null,
                domicile: {
                  voie: "16 avenue des Palmiers",
                  ville: "Djibouti",
                  arrondissement: null,
                  region: null,
                  pays: "DJIBOUTI"
                },
                prenoms: ["Carmela", "Linzy"]
              }
            ],
            typeDeclarationConjointe: null,
            dateDeclarationConjointe: null,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
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
  const validation = Validation.N;
  const ctv = "111111-222222";

  const compositionCorps =
    ExtraitCopieActeTexteMariageComposition.creerExtraitCopieActeTexteMariage({
      acte: mapActe(acte),
      requete: {
        choixDelivrance,
        sousType: sousTypeRequete
      } as IRequeteDelivrance,
      validation,
      mentionsRetirees: [],
      ctv,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    });

  const corpsTexteAttendu = `Le 25 juin 1990
a été célébré à Barcelone, Catalogne (Espagne)
le mariage
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
