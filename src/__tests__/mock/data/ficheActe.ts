import { IFicheActeDto } from "@model/etatcivil/acte/FicheActe";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { ELienParente } from "@model/etatcivil/enum/ELienParente";
import { EOrigineActe } from "@model/etatcivil/enum/EOrigineActe";
import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";
import DateRECE from "../../../utils/DateRECE";
import { imagePngVideBase64 } from "./ImagePng";

export const ficheActe1: IFicheActeDto = {
  id: "923a10fb-0b15-452d-83c0-d24c76d1de8d",
  referenceActe: "DEP.IRAN.1987.254.35",
  statut: "ANNULE",
  nature: "NAISSANCE",
  numero: "254",
  numeroBisTer: "35",
  dateDerniereDelivrance: 1207130400000,
  dateDerniereMaj: DateRECE.depuisTimestamp(1041505200000).versDateArrayDTO(),
  visibiliteArchiviste: "NON",
  origine: "RECE",
  type: "IMAGE",
  evenement: {
    minute: 15,
    heure: 13,
    jour: 10,
    mois: 10,
    annee: 1901,
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
      ordre: 2,
      sexe: "FEMININ",
      naissance: {
        jour: 17,
        mois: 4,
        annee: 1970,
        ville: "Sitka",
        region: "Alaska",
        pays: "États-Unis"
      },
      profession: "DEVELOPPEUR",
      domicile: {
        voie: "Ilot du Héron",
        ville: "Djibouti",
        pays: "DJIBOUTI"
      },
      filiations: [
        {
          lienParente: "PARENT",
          ordre: 752,
          nom: "Rodriguez",
          sexe: "FEMININ",
          profession: "Technicien",
          domicile: {
            voie: "40 place de la République",
            ville: "Nantes",
            pays: "France"
          },
          prenoms: ["Constance"]
        }
      ]
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
      autresNoms: [{ nom: "O", type: "ANCIEN_NOM" }],
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
          nom: "Kirsten",
          prenoms: ["Louella"]
        },
        {
          nom: "Reynolds",
          prenoms: ["Mcleod", "Bates"]
        },
        {
          nom: "Janine",
          prenoms: ["Alyce"]
        },
        {
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
        { id: "76b62678-8b06-4442-ad5b-b9207627a6e3", numero: "1", referenceComplete: "RC N° 2020-1" }
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
      id: "b66a9304-48b4-4aa3-920d-6cb27dd76c83",
      pocopa: "T"
    }
  },
  corpsExtraitRectifications: [],
  corpsImage: {
    images: [
      {
        noPage: 1,
        contenu: imagePngVideBase64
      },
      {
        noPage: 1,
        contenu: imagePngVideBase64
      }
    ]
  },
  analyseMarginales: [
    {
      id: "am2",
      dateDebut: 1612782000000,
      titulaires: [
        {
          nom: "Patamod eler",
          prenoms: ["Alphonse"],
          ordre: 2
        }
      ],
      estValide: true
    },
    {
      id: "am1",
      dateDebut: 1577358000000,
      dateFin: 1612781000000,
      titulaires: [
        {
          nom: "Ozaur",
          prenoms: ["Amandine"],
          ordre: 1
        }
      ],
      estValide: false
    }
  ]
};

const idFicheActe2 = "b41079a3-9e8d-478c-b04c-c4c2ac47134f";

export const ficheActeTexte: IFicheActeDto = {
  id: idFicheActe2,
  alerteActes: [],
  referenceActe: "ACQ.X.1951.1.483",
  nature: "NAISSANCE",
  statut: "VALIDE",
  numero: "483",
  numeroBisTer: "",
  visibiliteArchiviste: "NON",
  evenement: {
    minute: 20,
    heure: 3,
    jour: 15,
    mois: 9,
    annee: 2015,
    voie: "",
    ville: "Seoul",
    arrondissement: "",
    region: "Sudogwon",
    pays: "Corée du sud",
    lieuReprise: ""
  },
  mentions: [],
  titulaires: [
    {
      nom: "GREENWALD",
      prenoms: ["marie-paulita", "zaria", "léna"],
      ordre: 729,
      sexe: "FEMININ",
      naissance: {
        minute: 0,
        heure: 1,
        jour: 1,
        mois: 3,
        annee: 1948,
        voie: undefined,
        ville: "Milan",
        arrondissement: undefined,
        region: "Lombardie",
        pays: "Italie",
        lieuReprise: undefined
      },
      profession: "POMPIER",
      age: undefined,
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        arrondissement: undefined,
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: [
        {
          ordre: 752,
          nom: "Sacken",
          sexe: "MASCULIN",
          naissance: {} as IEvenement,
          profession: "Informaticien",
          age: 10,
          domicile: {
            voie: "16 avenue des Palmiers",
            ville: "Djibouti",
            arrondissement: undefined,
            region: undefined,
            pays: "DJIBOUTI"
          },
          prenoms: ["Carmela", "Linzy"],
          lienParente: "PARENT"
        }
      ]
    }
  ],
  personnes: [
    {
      id: "e7114c54-d00d-48ad-bbee-af2b01e2da74",
      nom: "HU",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
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
          referenceComplete: ""
        }
      ],
      naissance: {
        pays: ""
      }
    }
  ],
  registre: {
    famille: "ACQ",
    annee: 1995,
    support1: "1",
    support2: "",
    dateOuverture: [1995, 11, 25],
    type: {
      id: "d5f36d96-f1f8-437e-8371-86dba9837339",
      pocopa: "X"
    }
  },
  corpsExtraitRectifications: [],
  corpsTexte: { texte: "Corps texte" },
  analyseMarginales: [],
  type: ETypeActe.TEXTE,
  origine: EOrigineActe.RECE
};

export const ficheActeMentionIntegrationRECE: IFicheActeDto = {
  id: idFicheActe2,
  referenceActe: "ACQ.X.1951.1.483",
  alerteActes: [],
  nature: "NAISSANCE",
  statut: "VALIDE",
  numero: "483",
  numeroBisTer: "",
  dateDerniereDelivrance: undefined,
  dateDerniereMaj: undefined,
  visibiliteArchiviste: "NON",
  evenement: {
    minute: 20,
    heure: 3,
    jour: 15,
    mois: 9,
    annee: 2015,
    voie: "",
    ville: "Seoul",
    arrondissement: "",
    region: "Sudogwon",
    pays: "Corée du sud",
    lieuReprise: ""
  },
  mentions: [],
  titulaires: [
    {
      nom: "GREENWALD",
      prenoms: ["marie-paulita", "zaria", "léna"],
      ordre: 729,
      sexe: "FEMININ",
      naissance: {
        minute: 0,
        heure: 1,
        jour: 1,
        mois: 3,
        annee: 1948,
        voie: undefined,
        ville: "Milan",
        arrondissement: undefined,
        region: "Lombardie",
        pays: "Italie",
        lieuReprise: undefined
      },
      profession: "POMPIER",
      age: undefined,
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        arrondissement: undefined,
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: [
        {
          ordre: 752,
          nom: "Sacken",
          sexe: "MASCULIN",
          naissance: {} as IEvenement,
          profession: "Informaticien",
          age: 10,
          domicile: {
            voie: "16 avenue des Palmiers",
            ville: "Djibouti",
            arrondissement: undefined,
            region: undefined,
            pays: "DJIBOUTI"
          },
          prenoms: ["Carmela", "Linzy"],
          lienParente: "PARENT"
        }
      ]
    }
  ],
  personnes: [
    {
      id: "e7114c54-d00d-48ad-bbee-af2b01e2da74",
      naissance: { pays: "" },
      nom: "HU",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
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
          referenceComplete: ""
        }
      ]
    }
  ],
  estReecrit: undefined,
  detailMariage: undefined,
  registre: {
    famille: "ACQ",
    annee: 1995,
    support1: "1",
    support2: "",
    dateOuverture: [1995, 11, 25],
    type: {
      id: "d5f36d96-f1f8-437e-8371-86dba9837339",
      pocopa: "X"
    }
  },
  corpsExtraitRectifications: [],
  corpsImage: undefined,
  analyseMarginales: [],
  type: ETypeActe.TEXTE,
  origine: EOrigineActe.SCEC_DOCS
};

export const ficheActeMentionIntegrationRECENonEligible: IFicheActeDto = {
  id: idFicheActe2,
  referenceActe: "",
  alerteActes: [],
  nature: "NAISSANCE",
  statut: "VALIDE",
  numero: "483",
  numeroBisTer: "",
  dateDerniereDelivrance: undefined,
  dateDerniereMaj: undefined,
  visibiliteArchiviste: "NON",
  evenement: {
    minute: 20,
    heure: 3,
    jour: 15,
    mois: 9,
    annee: 2015,
    voie: "",
    ville: "Seoul",
    arrondissement: "",
    region: "Sudogwon",
    pays: "Corée du sud",
    lieuReprise: ""
  },
  mentions: [],
  titulaires: [
    {
      nom: "GREENWALD",
      prenoms: ["marie-paulita", "zaria", "léna"],
      ordre: 729,
      sexe: "FEMININ",
      naissance: {
        minute: 0,
        heure: 1,
        jour: 1,
        mois: 3,
        annee: 1948,
        voie: undefined,
        ville: "Milan",
        arrondissement: undefined,
        region: "Lombardie",
        pays: "Italie",
        lieuReprise: undefined
      },
      profession: "POMPIER",
      age: undefined,
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        arrondissement: undefined,
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: [
        {
          ordre: 752,
          nom: "Sacken",
          sexe: "MASCULIN",
          profession: "Informaticien",
          age: 10,
          domicile: {
            voie: "16 avenue des Palmiers",
            ville: "Djibouti",
            arrondissement: undefined,
            region: undefined,
            pays: "DJIBOUTI"
          },
          prenoms: ["Carmela", "Linzy"],
          lienParente: ELienParente.PARENT
        }
      ]
    }
  ],
  personnes: [
    {
      id: "e7114c54-d00d-48ad-bbee-af2b01e2da74",
      nom: "HU",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      naissance: { pays: "" },
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
          referenceComplete: ""
        }
      ]
    }
  ],
  estReecrit: undefined,
  detailMariage: undefined,
  registre: {
    famille: "ACQ",
    annee: 1951,
    support1: "1",
    support2: "",
    dateOuverture: [1995, 11, 25],
    dateFermeture: [1990, 1, 20],
    type: {
      id: "d5f36d96-f1f8-437e-8371-86dba9837339",
      pocopa: "X"
    }
  },
  corpsExtraitRectifications: [],
  corpsImage: undefined,
  analyseMarginales: [],
  type: ETypeActe.INCONNU,
  origine: EOrigineActe.RECE
};

export const idFicheActeMariage = "b41079a5-9e8d-478c-b04c-c4c2ac67134b";
export const ficheActeMariage: IFicheActeDto = {
  id: idFicheActeMariage,
  origine: "RECE",
  referenceActe: "",
  statut: "VALIDE",
  nature: "MARIAGE",
  numero: "8012",
  numeroBisTer: "681ABC",
  dateDerniereDelivrance: 1413972000000,
  dateDerniereMaj: DateRECE.depuisTimestamp(1536400800000).versDateArrayDTO(),
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
        pays: "France"
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
        pays: "Espagne"
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
      id: "",
      estValide: true,
      dateDebut: 1612782000000,
      titulaires: [
        {
          nom: "MARTIN",
          prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
          ordre: 1
        },
        {
          nom: "PRODESK",
          prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
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

export const ficheActeNaissance: IFicheActeDto = {
  id: "923a10fb-0b15-452d-83c0-d24c76d1de8e",
  origine: "RECE",
  referenceActe: "",
  statut: "ANNULE",
  nature: "NAISSANCE",
  numero: "254",
  numeroBisTer: "35",
  dateDerniereDelivrance: 1207130400000,
  dateDerniereMaj: DateRECE.depuisTimestamp(1041505200000).versDateArrayDTO(),
  visibiliteArchiviste: "NON",
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
  mentions: [],
  titulaires: [
    {
      nom: "Micheldelavandièredugrand-large",
      ordre: 2,
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
            ville: "Nantes",
            region: "Catalogne",
            pays: "France"
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
          referenceComplete: "RC N° 2020-1"
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
      pocopa: "T"
    }
  },
  corpsExtraitRectifications: [],
  corpsImage: {
    images: [
      {
        noPage: 1,
        contenu: imagePngVideBase64
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
      dateDebut: 1612782000000,
      dateFin: 1577358000000,
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

export const ficheActeDeces: IFicheActeDto = {
  id: "b41079a6-9e8d-478c-b04c-c4c2ac87134f",
  statut: "VALIDE",
  nature: "DECES",
  numero: "8413",
  dateDerniereDelivrance: 1413972000000,
  dateDerniereMaj: DateRECE.depuisTimestamp(1536400800000).versDateArrayDTO(),
  visibiliteArchiviste: "NON",
  origine: "RECE",
  referenceActe: "",
  evenement: {
    minute: 34,
    heure: 12,
    jour: 11,
    mois: 3,
    annee: 1995,
    ville: "Lille",
    region: "Loire-Atlantique",
    pays: "France"
  },
  mentions: [],
  titulaires: [
    {
      nom: "GREENWALD",
      prenoms: ["marie-paulita", "zaria", "léna"],
      ordre: 729,
      sexe: "FEMININ",
      naissance: {
        mois: 3,
        annee: 1948,
        ville: "Milan",
        region: "Lombardie",
        pays: "Italie"
      },
      profession: "POMPIER",
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: [
        {
          lienParente: "PARENT",
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
      nomDernierConjoint: "De fontaine",
      prenomsDernierConjoint: "Ratus"
    }
  ],
  alerteActes: [],
  personnes: [
    {
      id: "e7114c58-d00d-48ad-bbee-af2b01e2da74",
      nom: "Jones",
      sexe: "MASCULIN",
      nationalite: "ETRANGERE",
      naissance: {
        jour: 7,
        mois: 8,
        annee: 1975,
        ville: "Seoul",
        region: "",
        pays: "Corée du Sud"
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
          referenceComplete: ""
        }
      ]
    },
    {
      id: "e7114c54-d00d-48ad-bbee-af2b01e2da77",
      nom: "HU'TIL",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      naissance: {
        jour: 6,
        mois: 8,
        annee: 1975,
        ville: "Béthune",
        region: "Pas-de-Calais",
        pays: "France"
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
          referenceComplete: ""
        }
      ]
    }
  ],
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
  corpsTexte: {
    texte: `Acte décès`
  },
  analyseMarginales: [
    {
      id: "",
      estValide: true,
      dateDebut: 1577358000000,
      titulaires: [
        {
          nom: "GREENWALD",
          prenoms: ["Marie-paulita", "Zaria", "Léna"],
          ordre: 729
        }
      ]
    }
  ],
  type: "TEXTE"
};

const idFicheActeAvecImage = "b41079a5-9e8d-478c-b04c-c4c2ac671777";
export const ficheActeAvecImage: IFicheActeDto = {
  id: idFicheActeAvecImage,
  origine: "RECE",
  referenceActe: "",
  statut: "VALIDE",
  nature: "MARIAGE",
  numero: "8012",
  numeroBisTer: "681ABC",
  dateDerniereDelivrance: 1413972000000,
  dateDerniereMaj: DateRECE.depuisTimestamp(1536400800000).versDateArrayDTO(),
  visibiliteArchiviste: "NON",
  evenement: {
    jour: 25,
    mois: 6,
    annee: 1990,
    ville: "Barcelone",
    region: "Catalogne",
    pays: "Espagne",
    lieuReprise: "Lieu de reprise evenement"
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
        pays: "France"
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
        pays: "Espagne",
        lieuReprise: "Lieu de reprise"
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
      ]
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
          nom: "MARTIN",
          prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
          ordre: 1
        },
        {
          nom: "PRODESK",
          prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
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

export const idficheActeEC = "b41079a5-9e8f-478a-b04c-c4c2ac671123";
export const ficheActeEC: IFicheActeDto = {
  id: "b41079a5-9e8f-478a-b04c-c4c2ac671123",
  origine: "RECE",
  referenceActe: "",
  statut: "ANNULE",
  nature: "NAISSANCE",
  numero: "254",
  numeroBisTer: "35",
  dateDerniereDelivrance: 1207130400000,
  dateDerniereMaj: DateRECE.depuisTimestamp(1041505200000).versDateArrayDTO(),
  visibiliteArchiviste: "NON",
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
  mentions: [],
  titulaires: [
    {
      nom: "Micheldelavandièredugrand-large",
      ordre: 2,
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
            ville: "Nantes",
            region: "Catalogne",
            pays: "France"
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
          referenceComplete: "RC N° 2020-1"
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
      pocopa: "TUNIS"
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

export const idFicheActeAvecGenreIndetermine = "b45079a5-9e8f-478a-b07c-c4c2az671123";

export const idFicheActeAvecTitulaireMultiple = "b45079a5-9e8f-488a-b07c-c4c2az613121";

const idFicheActeAvecUnTitulaireIndetermine = "b45079a5-9e8f-488a-b07c-c4c2az613121";
export const ficheActeAvecUnTitulaireIndetermine: IFicheActeDto = {
  id: idFicheActeAvecUnTitulaireIndetermine,
  origine: "RECE",
  referenceActe: "",
  statut: "VALIDE",
  nature: "MARIAGE",
  numero: "8012",
  numeroBisTer: "681ABC",
  dateDerniereDelivrance: 1413972000000,
  dateDerniereMaj: DateRECE.depuisTimestamp(1536400800000).versDateArrayDTO(),
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
        pays: ""
      },
      profession: "Enseignante",
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: []
    },
    {
      nom: "PRODESK",
      prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
      ordre: 2,
      sexe: "INDETERMINE",
      naissance: {
        jour: 25,
        mois: 6,
        annee: 1990,
        ville: "Barcelone",
        region: "Catalogne",
        pays: "Espagne"
      },
      profession: "Enseignante",
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: []
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
      pocopa: "TUNIS"
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
      id: "",
      estValide: true,
      dateDebut: 1577358000000,
      titulaires: [
        {
          nom: "Michou né Michel",
          prenoms: ["Joseph"],
          ordre: 1
        },
        {
          nom: "Christine",
          prenoms: ["Joseph"],
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

export const ficheActeAvecDeuxTitulaireIndetermine: IFicheActeDto = {
  id: idFicheActeAvecUnTitulaireIndetermine,
  origine: "RECE",
  referenceActe: "",
  statut: "VALIDE",
  nature: "MARIAGE",
  numero: "8012",
  numeroBisTer: "681ABC",
  dateDerniereDelivrance: 1413972000000,
  dateDerniereMaj: DateRECE.depuisTimestamp(1536400800000).versDateArrayDTO(),
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
      sexe: "INDETERMINE",
      naissance: {
        jour: 29,
        mois: 11,
        annee: 1989,
        ville: "Paris",
        region: "",
        pays: "Fance"
      },
      profession: "Enseignante",
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: []
    },
    {
      nom: "PRODESK",
      prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
      ordre: 2,
      sexe: "INDETERMINE",
      naissance: {
        jour: 25,
        mois: 6,
        annee: 1990,
        ville: "Barcelone",
        region: "Catalogne",
        pays: "Espagne"
      },
      profession: "Enseignante",
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: []
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
      pocopa: "TUNIS"
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
      id: "",
      estValide: true,
      dateDebut: 1612782000000,
      titulaires: [
        {
          nom: "MARTIN",
          prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
          ordre: 1
        },
        {
          nom: "PRODESK",
          prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
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

export const ficheActeNaissanceAvecTitulaireInconnu: IFicheActeDto = {
  ...ficheActeNaissance,
  titulaires: [
    {
      nom: "Micheldelavandièredugrand-large",
      ordre: 2,
      prenoms: ["lolita"],
      sexe: "INCONNU",
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
            ville: "Nantes",
            region: "Catalogne",
            pays: "France"
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
  evenement: {
    minute: 15,
    heure: 13,
    ville: "Paris",
    arrondissement: "16",
    region: "Paris",
    pays: "France"
  }
};

export const ficheActeAvecUnParentTitulaireInconnu: IFicheActeDto = {
  ...ficheActeNaissance,
  titulaires: [
    {
      nom: "Micheldelavandièredugrand-large",
      ordre: 1,
      prenoms: ["lolita"],
      sexe: "MASCULIN",
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
          nom: "SNP",
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
          prenoms: ["SPC"]
        },
        {
          lienParente: "PARENT",
          ordre: 2,
          nom: "DUPOND",
          sexe: "INCONNU",
          naissance: {
            jour: 26,
            mois: 6,
            annee: 1981,
            ville: "Nantes",
            region: "Catalogne",
            pays: "France"
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
  ]
};

export const ficheActeAvecAnneeNaissanceTitulaireAbsente: IFicheActeDto = {
  ...ficheActeNaissance,
  titulaires: [
    {
      nom: "Micheldelavandièredugrand-large",
      ordre: 2,
      prenoms: ["lolita"],
      sexe: "MASCULIN",
      naissance: {
        jour: 17,
        mois: 4,
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
            ville: "Nantes",
            region: "Catalogne",
            pays: "France"
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
  evenement: {
    minute: 15,
    heure: 13,
    jour: 10,
    mois: 10,
    annee: 1901,
    ville: "",
    arrondissement: "16",
    region: "",
    pays: ""
  }
};

export const ficheActeAvecTitulaireIndetermine: IFicheActeDto = {
  ...ficheActeNaissance,
  titulaires: [
    {
      nom: "Micheldelavandièredugrand-large",
      ordre: 2,
      prenoms: ["lolita"],
      sexe: "INDETERMINE",
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
            ville: "Nantes",
            region: "Catalogne",
            pays: "France"
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
  ]
};

export const ficheActeNaissanceAvecParentsDeMemeSexe: IFicheActeDto = {
  ...ficheActeNaissance,
  id: "b45079a5-9e8f-488a-b07c-c4c2az613121",
  titulaires: [
    {
      nom: "Micheldelavandièredugrand-large",
      ordre: 2,
      prenoms: ["lolita"],
      sexe: "MASCULIN",
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
          sexe: "MASCULIN",
          naissance: {
            jour: 26,
            mois: 6,
            annee: 1981,
            ville: "Nantes",
            region: "Catalogne",
            pays: "France"
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
  ]
};

export const ficheActeAvecUnParentTitulaireIndetermine: IFicheActeDto = {
  ...ficheActeNaissance,
  titulaires: [
    {
      nom: "Micheldelavandièredugrand-large",
      ordre: 2,
      prenoms: ["lolita"],
      sexe: "MASCULIN",
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
          sexe: "INDETERMINE",
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
          sexe: "MASCULIN",
          naissance: {
            jour: 26,
            mois: 6,
            annee: 1981,
            ville: "Nantes",
            region: "Catalogne",
            pays: "France"
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
  ]
};

export const ficheActeAvecUnNomTitulaireSNP: IFicheActeDto = {
  ...ficheActeMariage,
  analyseMarginales: [
    {
      id: "",
      estValide: true,
      dateDebut: 1612782000000,
      titulaires: [
        {
          nom: "Patamob",
          prenoms: ["SPC"],
          ordre: 2,
          typeDeclarationConjointe: "CHANGEMENT_NOM"
        },
        {
          nom: "SNP",
          prenoms: ["Antoine"],
          ordre: 1,
          typeDeclarationConjointe: "CHANGEMENT_NOM"
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
          nom: "Michel",
          prenoms: ["Joseph"],
          ordre: 1
        },
        {
          nom: "Christine",
          prenoms: ["Joseph"],
          ordre: 2
        }
      ]
    }
  ]
};

export const ficheActeMariageAvecNomContientDesormais: IFicheActeDto = {
  ...ficheActeMariage,
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
        pays: "Espagne"
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
  analyseMarginales: [
    {
      id: "",
      estValide: true,
      dateDebut: 1612782000000,
      titulaires: [
        {
          nom: "MARTIN",
          prenoms: ["Jean-Louis", "Alphonse", "Raoül"],
          ordre: 1
        },
        {
          nom: "PRODESK désormais PRODESKA",
          prenoms: ["Elodie", "Marie-Charlotte", "Pauline"],
          ordre: 2
        }
      ]
    }
  ],
  evenement: {
    jour: 25,
    mois: 6,
    annee: 1990,
    ville: "Barcelone",
    region: "Catalogne",
    pays: "Espagne",
    lieuReprise: "Lieu de reprise Nantes"
  }
};
