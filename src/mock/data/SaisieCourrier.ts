import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { ISaisieAdresse, Requete } from "@model/form/delivrance/ISaisirRequetePageForm";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { OptionsCourrier } from "@model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";

export const SaisieCourrier17 = {
  choixCourrier: {
    delivrance: "Réponse sans délivrance E/C - Divers",
    courrier: "fce55a9f-4f4b-4996-a60b-59332bc10565"
  },
  requerant: {
    nom: "POINTEAU",
    prenom: "Louis"
  },
  option: {
    libelleOption: "",
    contenu: ""
  },
  texteLibre: {
    texte: "Test Texte Libre courrier 17"
  },
  adresse: {} as ISaisieAdresse,
  requete: {
    motif: "DIVORCE_CONTENTIEUX",
    complementMotif: "",
    nbExemplaire: 2
  } as Requete
} as SaisieCourrier;

export const RequeteRDDCourrier17 = {
  id: "85b32284-d3dd-4502-bfbd-5634ba52ba22",
  numero: "D8JI37",
  idSagaDila: 8710,
  dateCreation: 1629967295000,
  canal: TypeCanal.INTERNET,
  type: TypeRequete.DELIVRANCE,
  statutCourant: {
    statut: StatutRequete.A_VALIDER,
    dateEffet: 1633532477476,
    raisonStatut: ""
  },
  titulaires: [
    {
      id: "5ee3e0c4-c1af-4d0a-8815-807466e3bcf3",
      position: 1,
      nomNaissance: "PRODESK",
      nomUsage: "",
      anneeNaissance: 1990,
      moisNaissance: 6,
      jourNaissance: 25,
      villeNaissance: "Nantes",
      paysNaissance: "France",
      sexe: "FEMININ",
      nationalite: Nationalite.FRANCAISE,
      prenoms: [
        {
          numeroOrdre: 2,
          prenom: "Juliette"
        },
        {
          numeroOrdre: 1,
          prenom: "Elodie"
        }
      ],
      parentsTitulaire: []
    },
    {
      id: "5ee3e0c4-c1af-4d0a-8815-807466e3bcf4",
      position: 2,
      nomNaissance: "PRODESK",
      nomUsage: "",
      anneeNaissance: 1991,
      moisNaissance: 8,
      jourNaissance: 23,
      villeNaissance: "Nantes",
      paysNaissance: "France",
      sexe: "MASCULIN",
      nationalite: Nationalite.FRANCAISE,
      prenoms: [
        {
          numeroOrdre: 2,
          prenom: "Charles"
        },
        {
          numeroOrdre: 1,
          prenom: "Henri"
        }
      ],
      parentsTitulaire: []
    }
  ],
  requerant: {
    id: "85b853a2-f70c-4a2f-92d4-1ba1c0702ff1",
    dateCreation: new Date(1629964866000),
    nomFamille: "POINTEAU",
    prenom: "Louis",
    courriel: "pointeau.louis@wanadoo.fr",
    telephone: "",
    adresse: undefined,
    qualiteRequerant: {
      qualite: Qualite.PARTICULIER,
      utilisateurRece: undefined,
      particulier: undefined,
      mandataireHabilite: undefined,
      autreProfessionnel: undefined,
      institutionnel: undefined
    }
  },
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d57",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
  actions: [
    {
      id: "6dc3be62-7734-4669-8eca-2a676f39b914",
      numeroOrdre: 2,
      libelle: "Revue du traitement",
      dateAction: 1633532379796,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d5f",
      trigramme: "MLA"
    },
    {
      id: "6dc0fa55-46cb-4bf2-92b3-7b061519e1bc",
      numeroOrdre: 1,
      libelle: "À valider",
      dateAction: 1633532202703,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d5e",
      trigramme: "MLA"
    }
  ],
  observations: [],
  piecesJustificatives: [],
  sousType: SousTypeDelivrance.RDD,
  documentDemande: DocumentDelivrance.depuisId("fce55a9f-4f4b-4996-a60b-59332bc10565"),
  nbExemplaireImpression: 2,
  provenanceRequete: {
    provenance: Provenance.SERVICE_PUBLIC,
    provenancePlanete: undefined,
    provenanceRece: undefined,
    provenanceServicePublic: {
      id: "85b853a2-f70c-4a2f-92d4-1ba1c0702ff1",
      referenceDila: "MEL-8728",
      caseId: ""
    }
  },
  evenement: {
    id: "869ecbcc-af69-4ca3-9695-0d79358a5628",
    natureActe: NatureActeRequete.MARIAGE,
    jour: 21,
    mois: 7,
    annee: 2015,
    ville: "Saint-Pétersbourg",
    pays: "Russie"
  },
  motif: MotifDelivrance.DIVORCE_CONTENTIEUX,
  complementMotif: "",
  choixDelivrance: ChoixDelivrance.REP_SANS_DEL_EC_DIVERS,
  documentsReponses: [
    {
      id: "6dc5d50d-ae81-4fa4-bc2d-4ffd10a5eea5",
      nom: "Divers (17)",
      typeDocument: "fce55a9f-4f4b-4996-a60b-59332bc10565",
      mimeType: "application/pdf",
      taille: 44592,
      contenu: "",
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      texteLibreCourrier: undefined,
      optionsCourrier: [],
      conteneurSwift: "conteneurSwift"
    }
  ]
} as IRequeteDelivrance;

// ATTENTION
export const OptionsChoisiesCourrier17 = [
  {
    id: "58a982e0-c297-4314-8c67-4f8629ca5608",
    code: "CARN_EC_17-1",
    libelle: "Demande de copie intégrale par un tiers",
    estActif: true,
    documentDelivrance: "fce55a9f-4f4b-4996-a60b-59332bc10565",
    ordreEdition: 1,
    presenceVariables: false,
    acteNaissance: true,
    acteMariage: true,
    acteDeces: true,
    optionParDefaut: false,
    optionExclusive: false,
    optionATiret: false,
    optionLibre: false,
    texteOptionCourrier: "Demande de copie intégrale par un tiers"
  },
  {
    id: "4b10023e-9dfc-4733-9c72-e07988c68d46",
    code: "CARN_EC_17-2",
    libelle: "Requérant mineur",
    estActif: true,
    documentDelivrance: "fce55a9f-4f4b-4996-a60b-59332bc10565",
    ordreEdition: 2,
    presenceVariables: true,
    acteNaissance: true,
    acteMariage: true,
    acteDeces: true,
    optionParDefaut: false,
    optionExclusive: false,
    optionATiret: false,
    optionLibre: false,
    texteOptionCourrier: "Requérant mineur",
    texteOptionCourrierModifie: "Requérant mineur (modifié)"
  },
  {
    id: "710366f5-4f17-4218-b83b-e5da1f16a42b",
    code: "CARN_EC_17-5",
    libelle: "Mge consulat étranger en France",
    estActif: true,
    documentDelivrance: "fce55a9f-4f4b-4996-a60b-59332bc10565",
    ordreEdition: 5,
    presenceVariables: false,
    acteNaissance: true,
    acteMariage: true,
    acteDeces: true,
    optionParDefaut: false,
    optionExclusive: false,
    optionATiret: true,
    optionLibre: false,
    texteOptionCourrier: "- Mge consulat étranger en France"
  },
  {
    id: "710366f5-4f17-4218-b83b-e5da1f16a42d",
    code: "CARN_EC_17-25",
    libelle: "Option à tiret test",
    estActif: true,
    documentDelivrance: "fce55a9f-4f4b-4996-a60b-59332bc10565",
    ordreEdition: 25,
    presenceVariables: true,
    acteNaissance: true,
    acteMariage: true,
    acteDeces: true,
    optionParDefaut: false,
    optionExclusive: false,
    optionATiret: true,
    optionLibre: false,
    texteOptionCourrier: "- Option à tiret test",
    texteOptionCourrierModifie: "- Option à tiret test (modifié)"
  },
  {
    id: "710366f5-4f17-4218-b83b-e5da1f16a42e",
    code: "CARN_EC_17-996",
    libelle: "Option 996 tiret",
    estActif: true,
    documentDelivrance: "fce55a9f-4f4b-4996-a60b-59332bc10565",
    ordreEdition: 996,
    presenceVariables: false,
    acteNaissance: true,
    acteMariage: true,
    acteDeces: true,
    optionParDefaut: false,
    optionExclusive: false,
    optionATiret: true,
    optionLibre: false,
    texteOptionCourrier: "- Option 996 A tiret"
  },
  {
    id: "710366f5-4f17-4218-b83b-e5da1f16a42f",
    code: "CARN_EC_17-997",
    libelle: "Option 997 tiret",
    estActif: true,
    documentDelivrance: "fce55a9f-4f4b-4996-a60b-59332bc10565",
    ordreEdition: 997,
    presenceVariables: true,
    acteNaissance: true,
    acteMariage: true,
    acteDeces: true,
    optionParDefaut: false,
    optionExclusive: false,
    optionATiret: true,
    optionLibre: false,
    texteOptionCourrier: "- Option 997 A tiret",
    texteOptionCourrierModifie: "- Option 997 A tiret (modifié)"
  },
  {
    id: "710366f5-4f17-4218-b83b-e5da1f16a421",
    code: "CARN_EC_17-998",
    libelle: "Option 998",
    estActif: true,
    documentDelivrance: "fce55a9f-4f4b-4996-a60b-59332bc10565",
    ordreEdition: 998,
    presenceVariables: false,
    acteNaissance: true,
    acteMariage: true,
    acteDeces: true,
    optionParDefaut: false,
    optionExclusive: false,
    optionATiret: false,
    optionLibre: false,
    texteOptionCourrier: "Option 998"
  },
  {
    id: "710366f5-4f17-4218-b83b-e5da1f16a422",
    code: "CARN_EC_17-999",
    libelle: "Option 999",
    estActif: true,
    documentDelivrance: "fce55a9f-4f4b-4996-a60b-59332bc10565",
    ordreEdition: 999,
    presenceVariables: true,
    acteNaissance: true,
    acteMariage: true,
    acteDeces: true,
    optionParDefaut: false,
    optionExclusive: false,
    optionATiret: false,
    optionLibre: false,
    texteOptionCourrier: "Option 999",
    texteOptionCourrierModifie: "Option 999 (modifié)"
  }
] as OptionsCourrier;

export const ActeAnalyseMarginales = {
  id: "923a10fb-0b15-452d-83c0-d24c76d1d19d",
  dateInitialisation: null,
  dateCreation: 1636527600000,
  modeCreation: "ETABLI",
  statut: "VALIDE",
  dateStatut: 1131706800000,
  nature: "MARIAGE",
  numero: "8714",
  numeroBisTer: "35",
  nomOec: "DUBOIS",
  prenomOec: "Juliette",
  dateDerniereDelivrance: 1131706800000,
  dateDerniereMaj: 1041505200000,
  visibiliteArchiviste: "NON",
  evenement: {
    minute: null,
    heure: null,
    jour: 11,
    mois: 11,
    annee: 2005,
    voie: null,
    ville: "Rome",
    arrondissement: null,
    region: "Grand Rome",
    pays: "Italie",
    lieuReprise: null
  },
  mentions: [],
  titulaires: [
    {
      nom: "BAGOT",
      prenoms: ["Sébastien"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      naissance: {
        minute: null,
        heure: null,
        jour: 25,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand-Rome",
        pays: "ITALIE",
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
      filiations: null
    },
    {
      nom: "MARECHAL",
      prenoms: ["Sophie"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      naissance: {
        minute: null,
        heure: null,
        jour: 14,
        mois: 2,
        annee: 1980,
        voie: null,
        ville: "Nantes",
        arrondissement: null,
        region: "Loire-Atlantique",
        pays: "FRANCE",
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
      filiations: null
    }
  ],
  piecesAnnexes: [],
  alerteActes: [],
  personnes: [
    {
      id: "923a10fb-0b15-452d-83c0-d24c76d1d19e",
      nom: "MARECHAL",
      sexe: "FEMININ",
      nationalite: "FRANCAISE",
      naissance: {
        minute: 25,
        heure: 6,
        jour: 14,
        mois: 2,
        annee: 1980,
        voie: null,
        ville: "Nantes",
        arrondissement: null,
        region: "Loire-Atlantique",
        pays: "FRANCE",
        lieuReprise: null
      },
      autresNoms: [],
      prenoms: ["Sophie", "Taïs", "Uliana"],
      autresPrenoms: [],
      parents: [],
      enfants: [],
      rcs: [],
      rcas: [],
      pacss: [],
      actes: [
        {
          id: "923a10fb-0b15-452d-83c0-d24c76d1d19f",
          numero: "8714",
          nature: "MARIAGE"
        }
      ]
    },
    {
      id: "923a10fb-0b15-452d-83c0-d24c76d1d19e",
      nom: "BAGOT",
      sexe: "MASCULIN",
      nationalite: "ETRANGERE",
      naissance: {
        minute: 30,
        heure: 16,
        jour: 25,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      autresNoms: [],
      prenoms: ["Sébastien", "Théo", "Ulysse"],
      autresPrenoms: [],
      parents: [],
      enfants: [],
      rcs: [],
      rcas: [],
      pacss: [],
      actes: [
        {
          id: "923a10fb-0b15-452d-83c0-d24c76d1d19f",
          numero: "8714",
          nature: "MARIAGE"
        }
      ]
    }
  ],
  estReecrit: null,
  detailMariage: null,
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
  numeroProjet: "c17",
  corpsExtraitRectifications: [],
  corpsImage: null,
  analyseMarginales: [
    {
      dateDebut: null,
      dateFin: null,
      nomOec: "Lens",
      prenomOec: "Alexis",
      motif: null,
      titulaires: [
        {
          nom: "BAGOT",
          prenoms: ["Sébastien", "Théo", "Ulysse"],
          autresNoms: null,
          autresPrenoms: null,
          ordre: 2,
          sexe: null,
          naissance: null,
          profession: null,
          age: null,
          domicile: null,
          filiations: null
        },
        {
          nom: "MARECHAL",
          prenoms: ["Sophie", "Thaîs", "Uliana"],
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
};
