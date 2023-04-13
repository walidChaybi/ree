import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { ficheActeNaissance } from "@mock/data/ficheActe";
import { ExtraitCopieActeTexteNaissanceComposition } from "@model/composition/extraitCopie/createur/ExtraitCopieActeTexteNaissanceComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";

test("Attendu: getCorpsTexte fonctionne correctement", () => {
  const acte = mapActe(ficheActeNaissance.data);
  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = Validation.N;
  const ctv = "111111-222222";

  const compositionCorps =
    ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance(
      {
        acte: acte as any as IFicheActe,
        requete,
        validation,
        mentionsRetirees: [],
        ctv,
        choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
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

test("Ne doit pas afficher (Inconnu) dans le document généré sur la naissance des filiations", () => {
  const acte = {
    ...ficheActeNaissance.data,
    ...(ficheActeNaissance.data.titulaires[0].filiations = [
      {
        lienParente: "PARENT",
        ordre: 1,
        nom: "Sacken",
        sexe: "MASCULIN",
        naissance: {
          minute: null,
          heure: null,
          jour: null,
          mois: null,
          annee: null,
          voie: null,
          ville: "Barcelone",
          arrondissement: null,
          region: "",
          pays: "Inconnu",
          lieuReprise: null
        },
        profession: "Informaticien",
        age: null,
        domicile: {
          voie: "16 avenue des Palmiers",
          ville: "Djibouti",
          arrondissement: null,
          region: null,
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
          minute: null,
          heure: null,
          jour: 26,
          mois: 6,
          annee: 1981,
          voie: null,
          ville: "Nantes",
          arrondissement: null,
          region: "",
          pays: "",
          lieuReprise: null
        },
        profession: "Dentiste",
        age: null,
        domicile: {
          voie: "16 avenue des Palmiers",
          ville: "Djibouti",
          arrondissement: null,
          region: null,
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
  const validation = Validation.N;
  const ctv = "111111-222222";

  const compositionCorps =
    ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance(
      {
        acte: mapActe(acte) as any as IFicheActe,
        requete,
        validation,
        mentionsRetirees: [],
        ctv,
        choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
      }
    );

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
  const acte = {
    id: "923a10fb-0b15-452d-83c0-d24c76d1de8e",
    dateInitialisation: null,
    dateCreation: 1141815600000,
    modeCreation: "ETABLI",
    statut: "ANNULE",
    dateStatut: 1282816800000,
    nature: "NAISSANCE",
    numero: "254",
    numeroBisTer: "35",
    nomOec: "DUCLOS",
    prenomOec: "HENRI",
    dateDerniereDelivrance: 1207130400000,
    dateDerniereMaj: 1041505200000,
    visibiliteArchiviste: "NON",
    evenement: {
      minute: 15,
      heure: 13,
      jour: 10,
      mois: 10,
      annee: 1901,
      voie: null,
      ville: "Nantes",
      arrondissement: "16",
      region: "Loire-Atlantique",
      pays: "Inconnu",
      lieuReprise: null
    },
    mentions: [],
    titulaires: [
      {
        nom: "Micheldelavandièredugrand-large",
        ordre: 2,
        prenoms: ["lolita"],
        sexe: "FEMININ",
        naissance: {
          autresNoms: null,
          autresPrenoms: null,
          minute: null,
          heure: null,
          jour: 17,
          mois: 4,
          annee: 1970,
          voie: null,
          ville: "Sitka",
          arrondissement: null,
          region: "Alaska",
          pays: "États-Unis",
          lieuReprise: null
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 1,
            nom: "Sacken",
            sexe: "MASCULIN",
            naissance: {
              minute: null,
              heure: null,
              jour: null,
              mois: null,
              annee: null,
              voie: null,
              ville: "Barcelone",
              arrondissement: null,
              region: "Catalogne",
              pays: "Espagne",
              lieuReprise: null
            },
            profession: "Informaticien",
            age: null,
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
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
              minute: null,
              heure: null,
              jour: 26,
              mois: 6,
              annee: 1981,
              voie: null,
              ville: "Alger",
              arrondissement: null,
              region: "Paris",
              pays: "Algérie",
              lieuReprise: null
            },
            profession: "Dentiste",
            age: null,
            domicile: {
              voie: "16 avenue des Palmiers",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Louise", "Jocelyne"]
          }
        ],
        profession: "DEVELOPPEUR",
        age: null,
        domicile: {
          voie: "IlotduHéron",
          ville: "Djibouti",
          arrondissement: null,
          region: null,
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
    piecesAnnexes: [],
    alerteActes: [],
    personnes: [
      {
        id: "e7114c57-d00d-48ad-bbee-af2b01e2da61",
        nom: "Durant",
        sexe: "FEMININ",
        nationalite: "FRANCAISE",
        naissance: {
          minute: null,
          heure: null,
          jour: 1,
          mois: 10,
          annee: 1960,
          voie: null,
          ville: "nantes",
          arrondissement: null,
          region: "Pays de Loire",
          pays: "France",
          lieuReprise: null
        },
        deces: {
          minute: null,
          heure: null,
          jour: 2,
          mois: 12,
          annee: 2020,
          voie: null,
          ville: "bordeau",
          arrondissement: null,
          region: "Nouvelle-Aquitaine",
          pays: "France",
          lieuReprise: null
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
            id: null,
            typeLienParente: "DIRECT",
            nom: "Glenn",
            prenoms: ["Pearl", "Ginger"]
          },
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Nora",
            prenoms: ["Reed"]
          }
        ],
        enfants: [
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Janine",
            prenoms: ["Alyce"]
          },
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Kirsten",
            prenoms: ["Louella"]
          },
          {
            id: null,
            typeLienParente: "ADOPTION",
            nom: "Reynolds",
            prenoms: ["Mcleod", "Bates"]
          },
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Barton",
            prenoms: ["Buck"]
          }
        ],
        rcs: [
          {
            id: "76b62678-8b06-4442-ad5b-b9207627a6e3",
            numero: "1",
            statut: "ACTIF"
          },
          {
            id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
            numero: "4",
            statut: "INACTIF"
          }
        ],
        rcas: [
          {
            id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
            numero: "4094",
            statut: "ACTIF"
          }
        ],
        pacss: [],
        actes: [
          {
            id: "923a10fb-0b15-452d-83c0-d24c76d1de8e",
            numero: "254",
            statut: null,
            nature: "NAISSANCE"
          }
        ]
      }
    ],
    estReecrit: false,
    detailMariage: null,
    registre: {
      id: "e5f36d96-f1f8-437e-8371-76dba9837337",
      famille: "DEP",
      pocopa: "IRAN",
      annee: 1987,
      support1: null,
      support2: null,
      numeroDernierActe: "454",
      pvOuverture: "pv_ouverture",
      dateOuverture: [1993, 6, 6],
      pvFermeture: "pv_fermeture",
      dateFermeture: [1969, 2, 16],
      decret2017: true,
      type: {
        id: "d5f36d96-f1f8-437e-8371-86dba9837341",
        famille: "DEP",
        pocopa: "TUNIS",
        paysPocopa: "TUNISIE",
        dateRattachement: [1993, 6, 6],
        dateTransfertScec: [1969, 2, 16],
        gereScec: true,
        estOuvert: true,
        description: ""
      }
    },
    motifAnnulation: "",
    dateInitialisationprojet: null,
    numeroProjet: "a3",
    corpsExtraitRectifications: [],
    corpsImage: {
      id: "ea2b891e-70f6-4f6e-a27f-dcb9d7d418a2",
      idActe: "923a10fb-0b15-452d-83c0-d24c76d1de8e",
      dateCreationActe: 1141815600000,
      numeroActe: "254",
      images: [
        {
          idActeImage: "960078ff-1671-4908-867e-d95f2ae42f80",
          pathFichier: "actes\\L1_I00003_1.tif",
          conteneur: "actes_image",
          fichier: "L1_I00003_1.tif",
          noPage: 1,
          statutRepriseImageActe: "A_REPRENDRE",
          dateDerniereTentative: null,
          messageErreurDerniereTentative: null
        },
        {
          idActeImage: "a666d2bc-0343-4c53-8f24-1c1c28a51eac",
          pathFichier: "actes\\P1_I00001_1.tif",
          conteneur: "actes_image",
          fichier: "P1_I00001_1.tif",
          noPage: 1,
          statutRepriseImageActe: "A_REPRENDRE",
          dateDerniereTentative: null,
          messageErreurDerniereTentative: null
        }
      ],
      natureActe: "NAISSANCE"
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
            nom: "Patamob",
            prenoms: ["Alphonse"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 2,
            sexe: "FEMININ",
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: null,
            typeDeclarationConjointe: "CHANGEMENT_NOM",
            dateDeclarationConjointe: "2000-11-26",
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          }
        ]
      },
      {
        dateDebut: 1577358000000,
        dateFin: null,
        nomOec: "Lens",
        prenomOec: "Alexis",
        motifModification: "CHANGEMENT_PRENOM",
        titulaires: [
          {
            nom: "Ozaur",
            prenoms: ["Amandine"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 2,
            sexe: null,
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: null,
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
    type: "IMAGE"
  };

  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = Validation.N;
  const ctv = "111111-222222";

  const compositionCorps =
    ExtraitCopieActeTexteNaissanceComposition.creerExtraitCopieActeTexteNaissance(
      {
        acte: mapActe(acte) as any as IFicheActe,
        requete,
        validation,
        mentionsRetirees: [],
        ctv,
        choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
      }
    );

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
