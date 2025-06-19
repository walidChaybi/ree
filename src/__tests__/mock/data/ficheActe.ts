import { imagePngVideBase64 } from "./ImagePng";

export const idFicheActe1 = "923a10fb-0b15-452d-83c0-d24c76d1de8d";

export const ficheActe1 = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/923a10fb-0b15-452d-83c0-d24c76d1de8d",
  data: {
    id: idFicheActe1,
    referenceActe: "DEP.IRAN.1987.254.35",
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
      ville: "Paris",
      arrondissement: "16",
      region: "Ile de France",
      pays: "France",
      lieuReprise: "paris île de france"
    },
    mentions: [],
    titulaires: [
      {
        nom: "Michel de lavandière du grand-large",
        prenoms: ["lolita"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 2,
        sexe: "FEMININ",
        naissance: {
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
        profession: "DEVELOPPEUR",
        age: null,
        domicile: {
          voie: "Ilot du Héron",
          ville: "Djibouti",
          arrondissement: null,
          region: null,
          pays: "DJIBOUTI"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 752,
            nom: "Rodriguez",
            sexe: "FEMININ",
            naissance: null,
            profession: "Technicien",
            age: null,
            domicile: {
              voie: "40 place de la République",
              ville: "Nantes",
              arrondissement: null,
              region: null,
              pays: "France"
            },
            prenoms: ["Constance"]
          }
        ]
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
        autresNoms: [{ nom: "O", type: "ANCIEN_NOM" }],
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
            nom: "Janine",
            prenoms: ["Alyce"]
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
            id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
            numero: "4",
            referenceComplete: "RC N° 2020-4"
          },
          { id: "76b62678-8b06-4442-ad5b-b9207627a6e3", numero: "1" }
        ],
        rcas: [
          {
            id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
            numero: "4094",
            referenceComplete: "RCA N° 2019-492"
          }
        ],
        pacss: [],
        actes: [
          {
            id: "923a10fb-0b15-452d-83c0-d24c76d1de8d",
            numero: "254",
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
        id: "b66a9304-48b4-4aa3-920d-6cb27dd76c83",
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
      idActe: "923a10fb-0b15-452d-83c0-d24c76d1de8d",
      dateCreationActe: 1141815600000,
      numeroActe: "254",
      images: [
        {
          idActeImage: "960078ff-1671-4908-867e-d95f2ae42f80",
          pathFichier: "\\\\drive\\repertoire1\\repertoire2\\actes\\L1_I00003_1.tif",
          conteneur: "actes_image",
          fichier: "L1_I00003_1.tif",
          noPage: 1,
          statutRepriseImageActe: "A_REPRENDRE",
          dateDerniereTentative: null,
          messageErreurDerniereTentative: null
        },
        {
          idActeImage: "a666d2bc-0343-4c53-8f24-1c1c28a51eac",
          pathFichier: "\\\\drive\\repertoire1\\repertoire2\\actes\\P1_I00001_1.tif",
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
        motif: "FRANCISATION_PRENOM",
        titulaires: [
          {
            nom: "Patamod eler",
            prenoms: ["Alphonse"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
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
      },
      {
        dateDebut: 1577358000000,
        dateFin: 1612781000000,
        nomOec: "Lens",
        prenomOec: "Alexis",
        motif: null,
        titulaires: [
          {
            nom: "Ozaur",
            prenoms: ["Amandine"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: null,
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: null
          }
        ]
      }
    ]
  }
};

export const ficheActe1_avecTitulaireAyantDeuxParents = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/923a10fb-0b15-452d-83c0-d24c76d1de8d",
  data: {
    id: idFicheActe1,
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
      ville: "Paris",
      arrondissement: "16",
      region: "Ile de France",
      pays: "France",
      lieuReprise: "paris île de france"
    },
    mentions: [],
    titulaires: [
      {
        nom: "Michel de lavandière du grand-large",
        prenoms: ["lolita"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 2,
        sexe: "FEMININ",
        naissance: {
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
        profession: "DEVELOPPEUR",
        age: null,
        domicile: {
          voie: "Ilot du Héron",
          ville: "Djibouti",
          arrondissement: null,
          region: null,
          pays: "DJIBOUTI"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 1,
            nom: "Rodriguez",
            sexe: "FEMININ",
            naissance: null,
            profession: "Technicien",
            age: null,
            domicile: {
              voie: "40 place de la République",
              ville: "Nantes",
              arrondissement: null,
              region: null,
              pays: "France"
            },
            prenoms: ["Constance"]
          },
          {
            lienParente: "PARENT",
            ordre: 2,
            nom: "Dupont",
            sexe: "MASCULIN",
            naissance: null,
            profession: "Technicien",
            age: null,
            domicile: {
              voie: "40 place de la République",
              ville: "Nantes",
              arrondissement: null,
              region: null,
              pays: "France"
            },
            prenoms: ["Pierre"]
          }
        ]
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
        autresNoms: [{ nom: "O", type: "ANCIEN_NOM" }],
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
            nom: "Janine",
            prenoms: ["Alyce"]
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
            id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
            numero: "4",
            referenceComplete: "RC N° 2020-4"
          },
          { id: "76b62678-8b06-4442-ad5b-b9207627a6e3", numero: "1" }
        ],
        rcas: [
          {
            id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
            numero: "4094",
            rreferenceComplete: "RCA N° 2019-492"
          }
        ],
        pacss: [],
        actes: [
          {
            id: "923a10fb-0b15-452d-83c0-d24c76d1de8d",
            numero: "254",
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
        id: "b66a9304-48b4-4aa3-920d-6cb27dd76c83",
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
      idActe: "923a10fb-0b15-452d-83c0-d24c76d1de8d",
      dateCreationActe: 1141815600000,
      numeroActe: "254",
      images: [
        {
          idActeImage: "960078ff-1671-4908-867e-d95f2ae42f80",
          pathFichier: "\\\\drive\\repertoire1\\repertoire2\\actes\\L1_I00003_1.tif",
          conteneur: "actes_image",
          fichier: "L1_I00003_1.tif",
          noPage: 1,
          statutRepriseImageActe: "A_REPRENDRE",
          dateDerniereTentative: null,
          messageErreurDerniereTentative: null
        },
        {
          idActeImage: "a666d2bc-0343-4c53-8f24-1c1c28a51eac",
          pathFichier: "\\\\drive\\repertoire1\\repertoire2\\actes\\P1_I00001_1.tif",
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
        motif: "FRANCISATION_PRENOM",
        titulaires: [
          {
            nom: "Patamod eler",
            prenoms: ["Alphonse"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
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
      },
      {
        dateDebut: 1577358000000,
        dateFin: 1612781000000,
        nomOec: "Lens",
        prenomOec: "Alexis",
        motif: null,
        titulaires: [
          {
            nom: "Ozaur",
            prenoms: ["Amandine"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: null,
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: null
          }
        ]
      }
    ]
  }
};

export const ficheActe1_avecTitulaireAyantDeuxParentsDeMemeSexe = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/923a10fb-0b15-452d-83c0-d24c76d1de8d",
  data: {
    id: idFicheActe1,
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
      ville: "Paris",
      arrondissement: "16",
      region: "Ile de France",
      pays: "France",
      lieuReprise: "paris île de france"
    },
    mentions: [],
    titulaires: [
      {
        nom: "Michel de lavandière du grand-large",
        prenoms: ["lolita"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 2,
        sexe: "FEMININ",
        naissance: {
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
        profession: "DEVELOPPEUR",
        age: null,
        domicile: {
          voie: "Ilot du Héron",
          ville: "Djibouti",
          arrondissement: null,
          region: null,
          pays: "DJIBOUTI"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 1,
            nom: "Rodriguez",
            sexe: "FEMININ",
            naissance: null,
            profession: "Technicien",
            age: null,
            domicile: {
              voie: "40 place de la République",
              ville: "Nantes",
              arrondissement: null,
              region: null,
              pays: "France"
            },
            prenoms: ["Constance"]
          },
          {
            lienParente: "PARENT",
            ordre: 2,
            nom: "Dupont",
            sexe: "FEMININ",
            naissance: null,
            profession: "Technicien",
            age: null,
            domicile: {
              voie: "40 place de la République",
              ville: "Nantes",
              arrondissement: null,
              region: null,
              pays: "France"
            },
            prenoms: ["Aurélia"]
          }
        ]
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
        autresNoms: [{ nom: "O", type: "ANCIEN_NOM" }],
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
            nom: "Janine",
            prenoms: ["Alyce"]
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
            id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
            numero: "4",
            referenceComplete: "RC N° 2020-4"
          },
          {
            id: "76b62678-8b06-4442-ad5b-b9207627a6e3",
            numero: "1",
            referenceComplete: "RC N° 2020-9"
          }
        ],
        rcas: [
          {
            id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
            numero: "4094",
            referenceComplete: "RCA N° 2019-492"
          }
        ],
        pacss: [],
        actes: [
          {
            id: "923a10fb-0b15-452d-83c0-d24c76d1de8d",
            numero: "254",
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
        id: "b66a9304-48b4-4aa3-920d-6cb27dd76c83",
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
      idActe: "923a10fb-0b15-452d-83c0-d24c76d1de8d",
      dateCreationActe: 1141815600000,
      numeroActe: "254",
      images: [
        {
          idActeImage: "960078ff-1671-4908-867e-d95f2ae42f80",
          pathFichier: "\\\\drive\\repertoire1\\repertoire2\\actes\\L1_I00003_1.tif",
          conteneur: "actes_image",
          fichier: "L1_I00003_1.tif",
          noPage: 1,
          statutRepriseImageActe: "A_REPRENDRE",
          dateDerniereTentative: null,
          messageErreurDerniereTentative: null
        },
        {
          idActeImage: "a666d2bc-0343-4c53-8f24-1c1c28a51eac",
          pathFichier: "\\\\drive\\repertoire1\\repertoire2\\actes\\P1_I00001_1.tif",
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
        motif: "FRANCISATION_PRENOM",
        titulaires: [
          {
            nom: "Patamod eler",
            prenoms: ["Alphonse"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
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
      },
      {
        dateDebut: 1577358000000,
        dateFin: 1612781000000,
        nomOec: "Lens",
        prenomOec: "Alexis",
        motif: null,
        titulaires: [
          {
            nom: "Ozaur",
            prenoms: ["Amandine"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: null,
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: null
          }
        ]
      }
    ]
  }
};

export const idFicheActe2 = "b41079a3-9e8d-478c-b04c-c4c2ac47134f";

export const ficheActe2 = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b41079a3-9e8d-478c-b04c-c4c2ac47134f",
  data: {
    id: idFicheActe2,
    referenceActe: "ACQ.X.1951.1.483",
    dateInitialisation: null,
    dateCreation: 1233399600000,
    modeCreation: "DRESSE",
    statut: "VALIDE",
    dateStatut: 1045652400000,
    nature: "NAISSANCE",
    numero: "483",
    numeroBisTer: null,
    nomOec: "MARTIN",
    prenomOec: "JULIE",
    dateDerniereDelivrance: 1413972000000,
    dateDerniereMaj: 1536400800000,
    visibiliteArchiviste: "NON",
    evenement: {
      minute: 20,
      heure: 3,
      jour: 15,
      mois: 9,
      annee: 2015,
      voie: null,
      ville: "Seoul",
      arrondissement: null,
      region: "Sudogwon",
      pays: "Corée du sud",
      lieuReprise: null
    },
    mentions: [],
    titulaires: [
      {
        nom: "GREENWALD",
        prenoms: ["marie-paulita", "zaria", "léna"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 729,
        sexe: "FEMININ",
        naissance: {
          minute: null,
          heure: null,
          jour: null,
          mois: 3,
          annee: 1948,
          voie: null,
          ville: "Milan",
          arrondissement: null,
          region: "Lombardie",
          pays: "Italie",
          lieuReprise: null
        },
        profession: "POMPIER",
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
        ]
      }
    ],
    piecesAnnexes: [],
    alerteActes: [],
    personnes: [
      {
        id: "e7114c54-d00d-48ad-bbee-af2b01e2da74",
        nom: "HU",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        naissance: {
          minute: null,
          heure: null,
          jour: 6,
          mois: 8,
          annee: 1975,
          voie: null,
          ville: "Béthune",
          arrondissement: null,
          region: "Pas-de-Calais",
          pays: "France",
          lieuReprise: null
        },
        autresNoms: [],
        prenoms: ["Jean-Louis"],
        autresPrenoms: ["jules", "mœry"],
        parents: [],
        enfants: [],
        rcs: [],
        rcas: [],
        pacss: [],
        actes: [
          {
            id: "b41079a3-9e8d-478c-b04c-c4c2ac47134f",
            numero: "483",
            nature: "NAISSANCE"
          }
        ]
      }
    ],
    estReecrit: null,
    detailMariage: null,
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
    numeroProjet: "a0",
    corpsExtraitRectifications: [],
    corpsImage: null,
    analyseMarginales: []
  }
};

export const idFicheActeMariage = "b41079a5-9e8d-478c-b04c-c4c2ac67134b";
export const ficheActeMariage = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134b",
  data: {
    id: idFicheActeMariage,
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
          pays: "France",
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
  }
};

export const ficheActeMariage2 = {
  errors: [],
  data: {
    id: "0bce8edd-0183-495b-939d-0b3cf6918792",
    dateInitialisation: null,
    dateCreation: 1554890400000,
    modeCreation: "TRANSCRIT",
    statut: "ANNULE",
    dateStatut: 1068807600000,
    nature: "MARIAGE",
    numero: "736",
    numeroBisTer: "773",
    nomOec: "DUBOIS",
    prenomOec: "BERNARD",
    dateDerniereDelivrance: 1558173600000,
    dateDerniereMaj: 1099220400000,
    visibiliteArchiviste: "NON",
    evenement: {
      minute: null,
      heure: null,
      jour: null,
      mois: null,
      annee: 1947,
      voie: null,
      ville: "Lyon",
      arrondissement: "",
      region: "Rhône",
      pays: "",
      lieuReprise: ""
    },
    mentions: [],
    titulaires: [
      {
        nom: "BERTIER",
        prenoms: ["feliza"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 940,
        sexe: "FEMININ",
        naissance: {
          minute: null,
          heure: null,
          jour: 10,
          mois: 10,
          annee: 1901,
          voie: null,
          ville: "Marseille",
          arrondissement: null,
          region: "Provence-Alpes-Côte d’Azur",
          pays: "France",
          lieuReprise: null
        },
        profession: "CHARCUTIER",
        age: null,
        domicile: {
          voie: "route d'amboli",
          ville: "Djibouti",
          arrondissement: null,
          region: null,
          pays: "DJIBOUTI"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 2,
            nom: "Martin",
            sexe: "FEMININ",
            naissance: null,
            profession: "Livreuse",
            age: null,
            domicile: {
              voie: "7 Rue du Noyer",
              ville: "Bruxelles",
              arrondissement: null,
              region: "Flandre",
              pays: "BELGIQUE"
            },
            prenoms: ["Isabella"]
          },
          {
            lienParente: "PARENT_ADOPTANT",
            ordre: 1,
            nom: "TEST ADOPTANT",
            sexe: "MASCULIN",
            naissance: null,
            profession: "Livreur",
            age: null,
            domicile: {
              voie: "7 Rue du Noyer",
              ville: "Bruxelles",
              arrondissement: null,
              region: "Flandre",
              pays: "BELGIQUE"
            },
            prenoms: ["test"]
          },
          {
            lienParente: "PARENT",
            ordre: 1,
            nom: "Washington",
            sexe: "MASCULIN",
            naissance: null,
            profession: "Livreur",
            age: null,
            domicile: {
              voie: "7 Rue du Noyer",
              ville: "Bruxelles",
              arrondissement: null,
              region: "Flandre",
              pays: "BELGIQUE"
            },
            prenoms: ["Jsandye"]
          }
        ],
        typeDeclarationConjointe: null,
        dateDeclarationConjointe: null,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: null,
        nomApresMariage: "nomApresMariage feminin",
        nomDernierConjoint: null,
        prenomsDernierConjoint: null
      },
      {
        nom: "ORUS",
        prenoms: ["loana", "Sara", "judith"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 1,
        sexe: "MASCULIN",
        naissance: {
          minute: null,
          heure: null,
          jour: null,
          mois: 3,
          annee: 1948,
          voie: null,
          ville: "Milan",
          arrondissement: "",
          region: "Lombardie",
          pays: "Italie",
          lieuReprise: ""
        },
        profession: "POMPIER",
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
            lienParente: "PARENT",
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
          },
          {
            lienParente: "PARENT",
            ordre: 2,
            nom: "",
            sexe: "INCONNU",
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            prenoms: []
          }
        ],
        typeDeclarationConjointe: null,
        dateDeclarationConjointe: null,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: null,
        nomApresMariage: "nomApresMariage masculin",
        nomDernierConjoint: null,
        prenomsDernierConjoint: null
      }
    ],
    piecesAnnexes: [],
    alerteActes: [
      {
        id: "ee226a93-acbd-4d5f-a494-de6bcaa33c61",
        idActe: "0bce8edd-0183-495b-939d-0b3cf6918792",
        numeroActe: "736",
        numeroBisTerActe: "773",
        idTypeAlerte: "058a436b-330d-4c3c-83e0-d49c27390ab0",
        famille: "AR3",
        pocopa: "SEOUL",
        annee: 1986,
        support1: "support 1",
        support2: "support 2",
        complementDescription: "description 1 de l'alerte",
        dateCreation: 1552604400000,
        trigrammeUtilisateur: "MVI",
        idUtilisateur: null
      },
      {
        id: "ee223e0d-24b9-447b-bf75-cb123816d9cd",
        idActe: "0bce8edd-0183-495b-939d-0b3cf6918792",
        numeroActe: "736",
        numeroBisTerActe: "773",
        idTypeAlerte: "058a436b-330d-4c3c-83e0-d49c27390ab5",
        famille: "AR3",
        pocopa: "SEOUL",
        annee: 1986,
        support1: "support 1",
        support2: "support 2",
        complementDescription: "petit test de description",
        dateCreation: 1552777200000,
        trigrammeUtilisateur: "MLA",
        idUtilisateur: null
      },
      {
        id: "ee22cd2e-c263-43a7-ac7c-f85c68cf4ac8",
        idActe: "0bce8edd-0183-495b-939d-0b3cf6918792",
        numeroActe: "736",
        numeroBisTerActe: "773",
        idTypeAlerte: "058a436b-330d-4c3c-83e0-d49c27390aaa",
        famille: "AR3",
        pocopa: "SEOUL",
        annee: 1986,
        support1: "support 1",
        support2: "support 2",
        complementDescription: "ça c'est pas délivrable",
        dateCreation: 1552863600000,
        trigrammeUtilisateur: "AHE",
        idUtilisateur: null
      },
      {
        id: "ee22a104-3291-4f5a-9121-39302e2e4973",
        idActe: "0bce8edd-0183-495b-939d-0b3cf6918792",
        numeroActe: "736",
        numeroBisTerActe: "773",
        idTypeAlerte: "058a436b-330d-4c3c-83e0-d49c27390ab9",
        famille: "AR3",
        pocopa: "SEOUL",
        annee: 1986,
        support1: "support 1",
        support2: "support 2",
        complementDescription:
          "et encore une description avec du blabla et encore du blabla. Qu'est ce qu'elle est longue. Et une autre phrase. Aller une dernière",
        dateCreation: 1552690800000,
        trigrammeUtilisateur: "NSL",
        idUtilisateur: null
      },
      {
        id: "ee22d6f3-87ff-419b-8e74-c9feac91385d",
        idActe: "0bce8edd-0183-495b-939d-0b3cf6918792",
        numeroActe: "736",
        numeroBisTerActe: "773",
        idTypeAlerte: "9e00d7c7-10f8-441a-9f57-8051b24f3a65",
        famille: "AR3",
        pocopa: "SEOUL",
        annee: 1986,
        support1: "support 1",
        support2: "support 2",
        complementDescription: "description 2 de l'alerte",
        dateCreation: 1552518000000,
        trigrammeUtilisateur: "RECE",
        idUtilisateur: null
      }
    ],
    personnes: [
      {
        id: "e7114c57-d00d-48ad-bbee-af2b01e2da62",
        nom: "Dupont",
        sexe: "FEMININ",
        nationalite: "ETRANGERE",
        naissance: {
          minute: null,
          heure: null,
          jour: 15,
          mois: 6,
          annee: 1960,
          voie: null,
          ville: "paris",
          arrondissement: "3",
          region: "Ile de france",
          pays: "France",
          lieuReprise: null
        },
        autresNoms: [],
        prenoms: ["Mickaël", "Maxime"],
        autresPrenoms: ["Jules", "Louis"],
        parents: [],
        enfants: [],
        rcs: [
          {
            id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
            numero: "3",
            statut: "INACTIF",
            referenceComplete: "RC N° 2020-4"
          }
        ],
        rcas: [
          {
            id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63c",
            numero: "4092",
            statut: "ACTIF",
            referenceComplete: "RCA N° 2019-492"
          }
        ],
        pacss: [
          {
            id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
            numero: "1234507",
            statut: "ACTIF",
            referenceComplete: "PACS N° 2020-1234507"
          }
        ],
        actes: [
          {
            id: "0bce8edd-0183-495b-939d-0b3cf6918792",
            numero: "736",
            statut: null,
            nature: "MARIAGE"
          }
        ]
      },
      {
        id: "e7114c57-d00d-48ad-bbee-af2b01e2da74",
        nom: "ORUS",
        sexe: "FEMININ",
        nationalite: "FRANCAISE",
        naissance: {
          minute: null,
          heure: null,
          jour: 3,
          mois: 8,
          annee: 1975,
          voie: null,
          ville: "Lille",
          arrondissement: null,
          region: "Pas-de-Calais",
          pays: "France",
          lieuReprise: null
        },
        autresNoms: [],
        prenoms: ["Loana", "Sara", "Judith"],
        autresPrenoms: ["Alice"],
        parents: [],
        enfants: [],
        rcs: [],
        rcas: [],
        pacss: [],
        actes: [
          {
            id: "0bce8edd-0183-495b-939d-0b3cf6918792",
            numero: "736",
            statut: null,
            nature: "MARIAGE"
          },
          {
            id: "ee63e3c9-3636-4071-a511-e9e599580606",
            numero: "737",
            statut: null,
            nature: "NAISSANCE"
          }
        ]
      }
    ],
    estReecrit: true,
    detailMariage: {
      id: "fe25a6e8-6a79-4598-b912-7ae3cb0ad0e1",
      existenceContrat: "OUI",
      contrat: "texte du contrat de mariage"
    },
    registre: {
      id: "5fb45561-e668-4162-a332-aacff7a594c9",
      famille: "AR3",
      pocopa: "SEOUL",
      annee: 1986,
      support1: "support 1",
      support2: "support 2",
      numeroDernierActe: "1231",
      pvOuverture: "pv_ouverture",
      dateOuverture: [1936, 12, 24],
      pvFermeture: "pv_fermeture",
      dateFermeture: [1991, 11, 13],
      decret2017: false,
      type: {
        id: "d5f36d96-f1f8-437e-8371-86dba9837344",
        famille: "AR3",
        pocopa: "SEOUL",
        paysPocopa: "COREE DU SUD",
        dateRattachement: [1993, 6, 6],
        dateTransfertScec: [1969, 2, 16],
        gereScec: true,
        estOuvert: true,
        description: ""
      }
    },
    motifAnnulation: "",
    dateInitialisationprojet: null,
    numeroProjet: "a4",
    corpsExtraitRectifications: [],
    corpsImage: null,
    corpsTexte: null,
    analyseMarginales: [
      {
        id: "7f0f998a-5181-4266-a402-c2acad6a4c8f",
        dateDebut: 1124013600000,
        dateFin: null,
        nomOec: "Verse",
        prenomOec: "Alain",
        motifModification: "CHANGEMENT_NOM_PRENOM",
        titulaires: [
          {
            nom: "Céouver",
            prenoms: ["André"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
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
          },
          {
            nom: "BERTIER",
            prenoms: ["feliza"],
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
  }
};

export const ficheActeNaissance = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/923a10fb-0b15-452d-83c0-d24c76d1de8e",
  data: {
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
      ville: "Paris",
      arrondissement: "16",
      region: "Paris",
      pays: "France",
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
              ville: "Nantes",
              arrondissement: null,
              region: "Catalogne",
              pays: "France",
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
            statut: "INACTIF",
            referenceComplete: "RC N° 2020-4"
          }
        ],
        rcas: [
          {
            id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
            numero: "4094",
            statut: "ACTIF",
            referenceComplete: "RCA N° 2019-492"
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
  }
};

export const ficheActeDeces = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b41079a6-9e8d-478c-b04c-c4c2ac87134f",
  data: {
    id: "b41079a6-9e8d-478c-b04c-c4c2ac87134f",
    dateInitialisation: null,
    dateCreation: 812458800000,
    modeCreation: "DRESSE",
    statut: "VALIDE",
    dateStatut: 1045652400000,
    nature: "DECES",
    numero: "8413",
    numeroBisTer: null,
    nomOec: "MARTIN",
    prenomOec: "JULIE",
    dateDerniereDelivrance: 1413972000000,
    dateDerniereMaj: 1536400800000,
    visibiliteArchiviste: "NON",
    evenement: {
      minute: 34,
      heure: 12,
      jour: 11,
      mois: 3,
      annee: 1995,
      voie: null,
      ville: "Lille",
      arrondissement: null,
      region: "Loire-Atlantique",
      pays: "France",
      lieuReprise: null
    },
    mentions: [],
    titulaires: [
      {
        nom: "GREENWALD",
        prenoms: ["marie-paulita", "zaria", "léna"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 729,
        sexe: "FEMININ",
        naissance: {
          minute: null,
          heure: null,
          jour: null,
          mois: 3,
          annee: 1948,
          voie: null,
          ville: "Milan",
          arrondissement: null,
          region: "Lombardie",
          pays: "Italie",
          lieuReprise: null
        },
        profession: "POMPIER",
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
            lienParente: "PARENT",
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
        nomDernierConjoint: "De fontaine",
        prenomsDernierConjoint: "Ratus"
      }
    ],
    piecesAnnexes: [],
    alerteActes: [],
    personnes: [
      {
        id: "e7114c58-d00d-48ad-bbee-af2b01e2da74",
        nom: "Jones",
        sexe: "MASCULIN",
        nationalite: "ETRANGERE",
        naissance: {
          minute: null,
          heure: null,
          jour: 7,
          mois: 8,
          annee: 1975,
          voie: null,
          ville: "Seoul",
          arrondissement: null,
          region: "",
          pays: "Corée du Sud",
          lieuReprise: null
        },
        autresNoms: [],
        prenoms: ["Charlie"],
        autresPrenoms: [],
        parents: [],
        enfants: [],
        rcs: [],
        rcas: [],
        pacss: [],
        actes: [
          {
            id: "b41079a6-9e8d-478c-b04c-c4c2ac87134f",
            numero: "8413",
            statut: null,
            nature: "DECES"
          }
        ]
      },
      {
        id: "e7114c54-d00d-48ad-bbee-af2b01e2da77",
        nom: "HU'TIL",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        naissance: {
          minute: null,
          heure: null,
          jour: 6,
          mois: 8,
          annee: 1975,
          voie: null,
          ville: "Béthune",
          arrondissement: null,
          region: "Pas-de-Calais",
          pays: "France",
          lieuReprise: null
        },
        autresNoms: [],
        prenoms: ["Juan"],
        autresPrenoms: [],
        parents: [],
        enfants: [],
        rcs: [],
        rcas: [],
        pacss: [],
        actes: [
          {
            id: "b41079a6-9e8d-478c-b04c-c4c2ac87134f",
            numero: "8413",
            statut: null,
            nature: "DECES"
          }
        ]
      }
    ],
    estReecrit: null,
    detailMariage: null,
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
    numeroProjet: "b3",
    corpsExtraitRectifications: [],
    corpsImage: null,
    corpsTexte: {
      texte: `Acte décès`
    },
    analyseMarginales: [
      {
        dateDebut: 1577358000000,
        dateFin: null,
        nomOec: "Lens",
        prenomOec: "Alexis",
        motifModification: "CHANGEMENT_PRENOM",
        titulaires: [
          {
            nom: "GREENWALD",
            prenoms: ["Marie-paulita", "Zaria", "Léna"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 729,
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
    type: "TEXTE"
  }
};

export const ficheActeDeces2 = {
  errors: [],
  status: 200,
  data: {
    id: "b41079a5-9e8d-478c-b04c-c4c2ac67134c",
    dateInitialisation: null,
    dateCreation: 1256986800000,
    modeCreation: "DRESSE",
    statut: "VALIDE",
    dateStatut: 1045652400000,
    nature: "DECES",
    numero: "8013",
    numeroBisTer: "681ABC",
    nomOec: "MARTIN",
    prenomOec: "JULIE",
    dateDerniereDelivrance: 1413972000000,
    dateDerniereMaj: 1536400800000,
    visibiliteArchiviste: "NON",
    evenement: {
      minute: null,
      heure: null,
      jour: 13,
      mois: 4,
      annee: 2020,
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
        nom: "PRODESK",
        prenoms: ["Elodie"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 729,
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
        profession: "Anseignante",
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
            lienParente: "PARENT",
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
        nomDernierConjoint: "le dernier des ",
        prenomsDernierConjoint: "mohicans"
      }
    ],
    piecesAnnexes: [],
    alerteActes: [],
    personnes: [
      {
        id: "e7114c50-d00d-48ad-bbee-af2b01e2da8c",
        nom: "Prodesk",
        sexe: "FEMININ",
        nationalite: "ETRANGERE",
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
        autresNoms: [],
        prenoms: ["Elodie"],
        autresPrenoms: [],
        parents: [],
        enfants: [],
        rcs: [],
        rcas: [],
        pacss: [],
        actes: [
          {
            id: "b41079a5-9e8d-478c-b04c-c4c2ac67134c",
            numero: "8013",
            statut: null,
            nature: "DECES"
          }
        ]
      }
    ],
    estReecrit: true,
    detailMariage: null,
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
    numeroProjet: "a12",
    corpsExtraitRectifications: [],
    corpsImage: null,
    corpsTexte: null,
    analyseMarginales: [
      {
        id: "1ec56ede-ab6f-468a-afa7-61e64147b891",
        dateDebut: 1605006000000,
        dateFin: null,
        nomOec: "Lens",
        prenomOec: "Alexis",
        motifModification: "FRANCISATION_NOM_PRENOM",
        titulaires: [
          {
            nom: "PRODESK",
            prenoms: ["Elodie", "Margaux", "Sara"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
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
  }
};

const idFicheActeAvecImage = "b41079a5-9e8d-478c-b04c-c4c2ac671777";
export const ficheActeAvecImage = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134b",
  data: {
    id: idFicheActeAvecImage,
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
      lieuReprise: "Lieu de reprise evenement"
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
          pays: "France",
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
        nomAvantMariage: null,
        nomApresMariage: null,
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
          pays: "Espagne",
          lieuReprise: "Lieu de reprise"
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
      id: "ea2b891e-70f6-4f6e-a27f-dcb9d7d418a2",
      idActe: idFicheActeAvecImage,
      dateCreationActe: 1141815600000,
      numeroActe: "254",
      images: [
        {
          contenu: imagePngVideBase64,
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
              pays: "Fance",
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
            nomAvantMariage: null,
            nomApresMariage: null,
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
  }
};

export const idficheActeEC = "b41079a5-9e8f-478a-b04c-c4c2ac671123";
export const ficheActeEC = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b41079a5-9e8f-478a-b04c-c4c2ac671123",
  data: {
    id: "b41079a5-9e8f-478a-b04c-c4c2ac671123",
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
      ville: "Paris",
      arrondissement: "16",
      region: "Paris",
      pays: "France",
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
              ville: "Nantes",
              arrondissement: null,
              region: "Catalogne",
              pays: "France",
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
            statut: "INACTIF",
            referenceComplete: "RC N° 2020-4"
          }
        ],
        rcas: [
          {
            id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
            numero: "4094",
            statut: "ACTIF",
            referenceComplete: "RCA N° 2019-492"
          }
        ],
        pacss: [],
        actes: [
          {
            id: "b41079a5-9e8f-478a-b04c-c4c2ac671123",
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
      idActe: "b41079a5-9e8f-478a-b04c-c4c2ac671123",
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
            ordre: 1,
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
            ordre: 1,
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
  }
};

export const idFicheActeAvecGenreIndetermine = "b45079a5-9e8f-478a-b07c-c4c2az671123";
export const ficheActeAvecGenreIndetermine = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-478a-b07c-c4c2az671123",
  data: {
    id: "b45079a5-9e8f-478a-b07c-c4c2az671123",
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
      ville: "Paris",
      arrondissement: "16",
      region: "Paris",
      pays: "France",
      lieuReprise: null
    },
    mentions: [],
    titulaires: [
      {
        nom: "Micheldelavandièredugrand-large",
        ordre: 2,
        prenoms: ["lolita"],
        sexe: "INDETERMINE",
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
              ville: "Nantes",
              arrondissement: null,
              region: "Catalogne",
              pays: "France",
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
            statut: "INACTIF",
            referenceComplete: "RC N° 2020-4"
          }
        ],
        rcas: [
          {
            id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
            numero: "4094",
            statut: "ACTIF",
            referenceComplete: "RCA N° 2019-492"
          }
        ],
        pacss: [],
        actes: [
          {
            id: "b41079a5-9e8f-478a-b04c-c4c2ac671123",
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
      idActe: "b41079a5-9e8f-478a-b04c-c4c2ac671123",
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
            ordre: 1,
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
            ordre: 1,
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
  }
};

export const idFicheActeAvecTitulaireMultiple = "b45079a5-9e8f-488a-b07c-c4c2az613121";
export const ficheActeAvecTitulaireMultiple = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    id: idFicheActeMariage,
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
          pays: "Fance",
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
        filiations: [],
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
        filiations: [],
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
        prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 2,
        sexe: "INCONNU",
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
        filiations: [],
        typeDeclarationConjointe: null,
        dateDeclarationConjointe: null,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: null,
        nomApresMariage: null,
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
              pays: "Fance",
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
            nomAvantMariage: null,
            nomApresMariage: null,
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
  }
};

const idFicheActeAvecUnTitulaireIndetermine = "b45079a5-9e8f-488a-b07c-c4c2az613121";
export const ficheActeAvecUnTitulaireIndetermine = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    id: idFicheActeAvecUnTitulaireIndetermine,
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
          region: null,
          pays: null,
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
        filiations: [],
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
        prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 2,
        sexe: "INDETERMINE",
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
        filiations: [],
        typeDeclarationConjointe: null,
        dateDeclarationConjointe: null,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: null,
        nomApresMariage: null,
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
        dateDebut: 1577358000000,
        dateFin: null,
        nomOec: "Lens",
        prenomOec: "Alexis",
        motifModification: "CHANGEMENT_PRENOM",
        titulaires: [
          {
            nom: "Michou né Michel",
            prenoms: ["Joseph"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: "MASCULIN",
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
          },
          {
            nom: "Christine",
            prenoms: ["Joseph"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 2,
            sexe: "FEMININ",
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
    type: "IMAGE",
    detailMariage: {
      existenceContrat: "NON"
    }
  }
};

export const ficheActeAvecDeuxTitulaireIndetermine = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    id: idFicheActeAvecUnTitulaireIndetermine,
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
        sexe: "INDETERMINE",
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
          pays: "Fance",
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
        filiations: [],
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
        prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 2,
        sexe: "INDETERMINE",
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
        filiations: [],
        typeDeclarationConjointe: null,
        dateDeclarationConjointe: null,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: null,
        nomApresMariage: null,
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
              pays: "Fance",
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
            nomAvantMariage: null,
            nomApresMariage: null,
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
  }
};

export const ficheActeNaissanceAvecTitulaireInconnu = {
  ...ficheActeNaissance,
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    ...ficheActeNaissance.data,
    titulaires: [
      {
        nom: "Micheldelavandièredugrand-large",
        ordre: 2,
        prenoms: ["lolita"],
        sexe: "INCONNU",
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
              ville: "Nantes",
              arrondissement: null,
              region: "Catalogne",
              pays: "France",
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
    evenement: {
      minute: 15,
      heure: 13,
      jour: null,
      mois: null,
      annee: null,
      voie: null,
      ville: "Paris",
      arrondissement: "16",
      region: "Paris",
      pays: "France",
      lieuReprise: null
    }
  }
};

export const ficheActeAvecUnParentTitulaireInconnu = {
  ...ficheActeNaissance,
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    ...ficheActeNaissance.data,
    titulaires: [
      {
        nom: "Micheldelavandièredugrand-large",
        ordre: 2,
        prenoms: ["lolita"],
        sexe: "MASCULIN",
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
            nom: "SNP",
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
            prenoms: ["SPC"]
          },
          {
            lienParente: "PARENT",
            ordre: 2,
            nom: "DUPOND",
            sexe: "INCONNU",
            naissance: {
              minute: null,
              heure: null,
              jour: 26,
              mois: 6,
              annee: 1981,
              voie: null,
              ville: "Nantes",
              arrondissement: null,
              region: "Catalogne",
              pays: "France",
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
    ]
  }
};

export const ficheActeAvecAnneeNaissanceTitulaireAbsente = {
  ...ficheActeNaissance,
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    ...ficheActeNaissance.data,
    titulaires: [
      {
        nom: "Micheldelavandièredugrand-large",
        ordre: 2,
        prenoms: ["lolita"],
        sexe: "MASCULIN",
        naissance: {
          autresNoms: null,
          autresPrenoms: null,
          minute: null,
          heure: null,
          jour: 17,
          mois: 4,
          annee: null,
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
              ville: "Nantes",
              arrondissement: null,
              region: "Catalogne",
              pays: "France",
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
    evenement: {
      minute: 15,
      heure: 13,
      jour: 10,
      mois: 10,
      annee: 1901,
      voie: null,
      ville: "",
      arrondissement: "16",
      region: "",
      pays: "",
      lieuReprise: null
    }
  }
};

export const ficheActeAvecTitulaireIndetermine = {
  ...ficheActeNaissance,
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    ...ficheActeNaissance.data,
    titulaires: [
      {
        nom: "Micheldelavandièredugrand-large",
        ordre: 2,
        prenoms: ["lolita"],
        sexe: "INDETERMINE",
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
              ville: "Nantes",
              arrondissement: null,
              region: "Catalogne",
              pays: "France",
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
    ]
  }
};

const idFicheActeNaissanceAvecParentsDeMemeSexe = "b45079a5-9e8f-488a-b07c-c4c2az613121";
export const ficheActeNaissanceAvecParentsDeMemeSexe = {
  ...ficheActeNaissance,
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    ...ficheActeNaissance.data,
    id: idFicheActeNaissanceAvecParentsDeMemeSexe,
    titulaires: [
      {
        nom: "Micheldelavandièredugrand-large",
        ordre: 2,
        prenoms: ["lolita"],
        sexe: "MASCULIN",
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
            sexe: "MASCULIN",
            naissance: {
              minute: null,
              heure: null,
              jour: 26,
              mois: 6,
              annee: 1981,
              voie: null,
              ville: "Nantes",
              arrondissement: null,
              region: "Catalogne",
              pays: "France",
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
    ]
  }
};

export const ficheActeAvecUnParentTitulaireIndetermine = {
  ...ficheActeNaissance,
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    ...ficheActeNaissance.data,
    titulaires: [
      {
        nom: "Micheldelavandièredugrand-large",
        ordre: 2,
        prenoms: ["lolita"],
        sexe: "MASCULIN",
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
            sexe: "INDETERMINE",
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
            sexe: "MASCULIN",
            naissance: {
              minute: null,
              heure: null,
              jour: 26,
              mois: 6,
              annee: 1981,
              voie: null,
              ville: "Nantes",
              arrondissement: null,
              region: "Catalogne",
              pays: "France",
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
    ]
  }
};

export const ficheActeAvecUnNomTitulaireSNP = {
  ...ficheActeMariage,
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    ...ficheActeMariage.data,
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
            prenoms: ["SPC"],
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
          },
          {
            nom: "SNP",
            prenoms: ["Antoine"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: "MASCULIN",
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
            nom: "Michel",
            prenoms: ["Joseph"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: "MASCULIN",
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
          },
          {
            nom: "Christine",
            prenoms: ["Joseph"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 2,
            sexe: "FEMININ",
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
    ]
  }
};

export const ficheActeMariageAvecNomContientDesormais = {
  ...ficheActeMariage,
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b45079a5-9e8f-488a-b07c-c4c2az613121",
  data: {
    ...ficheActeMariage.data,
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
          pays: "France",
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
        nomAvantMariage: "nomAvantMariage",
        nomApresMariage: "nomApresMariage",
        nomDernierConjoint: null,
        prenomsDernierConjoint: null
      }
    ],
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
              pays: "France",
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
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          },
          {
            nom: "PRODESK désormais PRODESKA",
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
      lieuReprise: "Lieu de reprise Nantes"
    }
  }
};
