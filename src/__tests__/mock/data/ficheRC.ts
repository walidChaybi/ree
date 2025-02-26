import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import DateUtils from "@util/DateUtils";

export const FicheRcDecisionNotaire = {
  id: "135e4dfe-9757-4d5d-8715-359c6e73289b",
  categorie: "RC",
  annee: "2020",
  numero: "11",
  dateInscription: DateUtils.getDateFromDateCompose({
    jour: "18",
    mois: "11",
    annee: "2020"
  }),
  dateDerniereMaj: new Date(1606374000000),
  dateDerniereDelivrance: new Date(1606374000000),
  alertes: [],
  decision: {
    dateDecision: 1606374000000,
    type: "ACTE_NOTARIE",
    autorite: {
      typeAutorite: "NOTAIRE",
      numeroDepartement: "75",
      ville: "paris",
      pays: "France",
      arrondissement: "18",
      nomNotaire: "DUPONT",
      prenomNotaire: "Jean",
      numeroCrpcen: "1234567"
    }
  },
  interesses: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "SLAOUI",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: ["RAIS"],
      autrePrenoms: ["Nabil"],
      prenoms: [{ numeroOrdre: 1, valeur: "Mathieu" }],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      motif: "",
      statutFicheEvenement: {
        id: "594dcd34-846a-47c7-aed1-94352cb4ea5b",
        date: { jour: "13", mois: "5", annee: "2021" },
        ville: "Barcelone",
        region: "Catalogne",
        pays: "Espagne"
      },
      complementMotif: "",
      dateStatut: 1024135200000
    }
  ],
  personnes: [
    {
      nom: "Philips",
      sexe: "MASCULIN",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 13,
        mois: 4,
        annee: 1980,
        voie: null,
        ville: "Barcelone",
        arrondissement: null,
        region: "Catalogne",
        pays: "Espagne",
        lieuReprise: null
      },
      autresNoms: [],
      prenoms: ["Yann"],
      autresPrenoms: [],
      parents: [],
      enfants: [],
      rcs: [{ id: "76b62678-8b06-4442-ad5b-b9207627a6eb", numero: "11" }],
      rcas: [],
      pacss: [],
      actes: []
    }
  ],
  nature: {
    id: "058a436b-330d-4c3c-83e0-e49d2739012d",
    nom: "NATURE_RC",
    code: "CURATELLE_SIMPLE",
    libelle: "curatelle simple",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  complementNature: "complement",
  typeInscription: "INSCRIPTION",
  mandataires: [],
  inscriptionsImpactees: [],
  inscriptionsLiees: [],
  duree: { nombreDuree: 1, uniteDuree: "année", dateFinDeMesure: 1470204367000 }
} as any as IFicheRcRca;

export const FicheRcDecisionNotaireTypeRequete = {
  id: "135e4dfe-9757-4d5d-8715-359c6e73289b",
  categorie: "RC",
  annee: "2020",
  numero: "11",
  dateInscription: DateUtils.getDateFromDateCompose({
    jour: "18",
    mois: "11",
    annee: "2020"
  }),
  dateDerniereMaj: new Date(1606374000000),
  dateDerniereDelivrance: new Date(1606374000000),
  alertes: [],
  decision: {
    dateDecision: 1606374000000,
    type: "REQUETE",
    autorite: {
      typeAutorite: "NOTAIRE",
      numeroDepartement: "75",
      ville: "paris",
      pays: "France",
      arrondissement: "18",
      nomNotaire: "DUPONT",
      prenomNotaire: "Jean",
      numeroCrpcen: "1234567"
    },
    juridictionExecutante: {
      typeAutorite: "JURIDICTION",
      numeroDepartement: "75",
      ville: "paris",
      pays: "France",
      arrondissement: "20",
      typeJuridiction: "Tribunal judiciaire"
    }
  },
  interesses: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "SLAOUI",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: ["RAIS"],
      autrePrenoms: ["Nabil"],
      prenoms: [{ numeroOrdre: 1, valeur: "Mathieu" }],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      motif: "",
      statutFicheEvenement: {
        id: "594dcd34-846a-47c7-aed1-94352cb4ea5b",
        date: { jour: "13", mois: "5", annee: "2021" },
        ville: "Barcelone",
        region: "Catalogne",
        pays: "Espagne"
      },
      complementMotif: "",
      dateStatut: 1024135200000
    }
  ],
  personnes: [
    {
      nom: "Philips",
      sexe: "MASCULIN",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 13,
        mois: 4,
        annee: 1980,
        voie: null,
        ville: "Barcelone",
        arrondissement: null,
        region: "Catalogne",
        pays: "Espagne",
        lieuReprise: null
      },
      autresNoms: [],
      prenoms: ["Yann"],
      autresPrenoms: [],
      parents: [],
      enfants: [],
      rcs: [{ id: "76b62678-8b06-4442-ad5b-b9207627a6eb", numero: "11" }],
      rcas: [],
      pacss: [],
      actes: []
    }
  ],
  nature: {
    id: "058a436b-330d-4c3c-83e0-e49d2739012d",
    nom: "NATURE_RC",
    code: "TRANSFERT_POUVOIRS",
    libelle: "transfert des pouvoirs",
    estActif: true,
    type: "Requête",
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  complementNature: "complement",
  typeInscription: "INSCRIPTION",
  mandataires: [],
  inscriptionsImpactees: [],
  inscriptionsLiees: [],
  duree: { nombreDuree: 1, uniteDuree: "année", dateFinDeMesure: 1470204367000 }
} as any as IFicheRcRca;

export const FicheRcDecisionNotaireTypeRequete2 = {
  id: "135e4dfe-9757-4d5d-8715-359c6e73289b",
  categorie: "RC",
  annee: "2020",
  numero: "11",
  dateInscription: DateUtils.getDateFromDateCompose({
    jour: "18",
    mois: "11",
    annee: "2020"
  }),
  dateDerniereMaj: new Date(1606374000000),
  dateDerniereDelivrance: new Date(1606374000000),
  alertes: [],
  decision: {
    dateDecision: 1606374000000,
    type: "REQUETE",
    autorite: {
      typeAutorite: "NOTAIRE",
      numeroDepartement: "75",
      ville: "paris",
      pays: "France",
      arrondissement: "18",
      nomNotaire: "DUPONT",
      prenomNotaire: "Jean",
      numeroCrpcen: "1234567"
    },
    juridictionExecutante: {
      typeAutorite: "JURIDICTION",
      numeroDepartement: "75",
      ville: "paris",
      pays: "France",
      arrondissement: "20",
      typeJuridiction: "Tribunal judiciaire"
    }
  },
  interesses: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "SLAOUI",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: ["RAIS"],
      autrePrenoms: ["Nabil"],
      prenoms: [{ numeroOrdre: 1, valeur: "Mathieu" }],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      motif: "",
      statutFicheEvenement: {
        id: "594dcd34-846a-47c7-aed1-94352cb4ea5b",
        date: { jour: "13", mois: "5", annee: "2021" },
        ville: "Barcelone",
        region: "Catalogne",
        pays: "Espagne"
      },
      complementMotif: "",
      dateStatut: 1024135200000
    }
  ],
  personnes: [
    {
      nom: "Philips",
      sexe: "MASCULIN",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 13,
        mois: 4,
        annee: 1980,
        voie: null,
        ville: "Barcelone",
        arrondissement: null,
        region: "Catalogne",
        pays: "Espagne",
        lieuReprise: null
      },
      autresNoms: [],
      prenoms: ["Yann"],
      autresPrenoms: [],
      parents: [],
      enfants: [],
      rcs: [{ id: "76b62678-8b06-4442-ad5b-b9207627a6eb", numero: "11" }],
      rcas: [],
      pacss: [],
      actes: []
    }
  ],
  nature: {
    id: "058a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RC",
    code: "HABILITATION_FAMILIALE_GENERALE",
    libelle: "habilitation familiale générale",
    estActif: true,
    type: "Requête",
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "INTERDICTION"
  },
  complementNature: "complement",
  typeInscription: "INSCRIPTION",
  mandataires: [],
  inscriptionsImpactees: [],
  inscriptionsLiees: [],
  duree: { nombreDuree: 1, uniteDuree: "année", dateFinDeMesure: 1470204367000 }
} as any as IFicheRcRca;

export const FicheRcRadiation = [
  {
    id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
    dateInscription: [2020, 11, 29],
    nature: {
      // "058a436b-330d-4c3c-83e0-e49d2739012d"
      id: "058a436b-330d-4c3c-83e0-e49d27390138",
      nom: "NATURE_RC",
      code: "TUTELLE_AMENAGEE",
      libelle: "tutelle aménagée",
      estActif: true,
      type: "Protection des majeurs",
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "TUTELLE"
    },
    typeInscription: "RADIATION"
  }
];

export const FicheRcRenouvellementTypeJugement = {
  id: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
  categorie: "RC",
  annee: "2020",
  numero: "2",
  dateInscription: DateUtils.getDateFromDateCompose({
    jour: "22",
    mois: "11",
    annee: "2020"
  }),
  dateDerniereMaj: new Date(1606374000000),
  dateDerniereDelivrance: new Date(1606374000000),
  alertes: [],
  decision: {
    dateDecision: 1606374000000,
    type: "JUGEMENT",
    autorite: {
      typeAutorite: "JURIDICTION",
      numeroDepartement: "44",
      libelleDepartement: "Loire-Atlantique",
      ville: "nantes",
      pays: "France",
      arrondissement: null,
      typeJuridiction: "Tribunal judiciaire"
    },
    enrolementRg: "1345",
    enrolementPortalis: "789521545"
  },
  mariageInteresses: {
    villeMariage: "Nanning",
    regionMariage: "zhuang du Guangxi",
    paysMariage: "Chine, Pays du soleil levant",
    dateMariage: { jour: "12", mois: "06", annee: "2020" },
    aletranger: true
  },
  interesses: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "SLAOUI",
      villeNaissance: "Brest",
      paysNaissance: "France",
      regionNaissance: "Finistère",
      nationalite: "FRANCAISE",
      sexe: "FEMININ",
      autreNoms: ["RAIS"],
      autrePrenoms: ["Marie-Charlotte"],
      prenoms: [
        { numeroOrdre: 1, valeur: "Marie-Charlotte" },
        { numeroOrdre: 3, valeur: "Lily-Rose" },
        { numeroOrdre: 2, valeur: "Anne-Claire" },
        { numeroOrdre: 4, valeur: "Abby-Gaëlle" }
      ],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    },
    {
      numeroOrdreSaisi: 2,
      nomFamille: "LE ROUX",
      villeNaissance: "Châteauneuf-du-Faou",
      paysNaissance: "France",
      regionNaissance: "Finistère, Bretagne",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: [],
      autrePrenoms: [],
      prenoms: [
        { numeroOrdre: 1, valeur: "Pierre-Olivier" },
        { numeroOrdre: 3, valeur: "François-Xavier" },
        { numeroOrdre: 2, valeur: "Félix-Antoine" }
      ],
      dateNaissance: { jour: "24", mois: "12", annee: "1987" }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      motif: "",
      statutFicheEvenement: {
        id: "3ed6caae-871c-4c14-b06e-5150076d8110",
        date: { annee: "2020" },
        ville: "nantes",
        region: "Pays de Loire",
        pays: "France"
      },
      complementMotif: "",
      dateStatut: 1024135200000
    }
  ],
  personnes: [
    {
      nom: "Rose",
      sexe: "FEMININ",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 8,
        mois: 6,
        annee: 1960,
        voie: null,
        ville: "tunis",
        arrondissement: null,
        region: "",
        pays: "Tunisie",
        lieuReprise: null
      },
      deces: {
        minute: null,
        heure: null,
        jour: null,
        mois: null,
        annee: 2020,
        voie: null,
        ville: "nantes",
        arrondissement: null,
        region: "Pays de Loire",
        pays: "France",
        lieuReprise: null
      },
      autresNoms: [{ nom: "DUPE", type: "PSEUDONYME" }],
      prenoms: ["Jean-pierre", "Michel"],
      autresPrenoms: [],
      parents: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Meagan",
          prenoms: ["Emerson"]
        },
        { id: null, typeLienParente: "DIRECT", nom: "Nora", prenoms: ["Reed"] },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Turner",
          prenoms: ["Concetta"]
        },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Glenn",
          prenoms: ["Pearl", "Ginger"]
        }
      ],
      enfants: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Barton",
          prenoms: ["Buck"]
        },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Janine",
          prenoms: ["Alyce"]
        },
        {
          id: null,
          typeLienParente: "ADOPTION",
          nom: "Kirsten",
          prenoms: ["Louella"]
        }
      ],
      rcs: [{ id: "8244d136-729b-4fd3-b88a-fa1fe30a2214", numero: "2" }],
      rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d", numero: "4093" }],
      pacss: [
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df", numero: "1234506" },
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1", numero: "1234508" },
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2", numero: "1234509" },
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3", numero: "1234510" }
      ],
      actes: [
        {
          id: "d8708d77-a359-4553-be72-1eb5f246d4da",
          numero: "754",
          nature: "RECONNAISSANCE"
        }
      ]
    },
    {
      nom: "Latonya",
      sexe: "FEMININ",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 14,
        mois: 12,
        annee: 2001,
        voie: null,
        ville: "angers",
        arrondissement: null,
        region: "MAine et Loire",
        pays: "France",
        lieuReprise: null
      },
      autresNoms: [
        { nom: "Regina", type: "USAGE" },
        { nom: "Rosa", type: "USAGE" }
      ],
      prenoms: ["Nathan", "Pierre"],
      autresPrenoms: [],
      parents: [
        { id: null, typeLienParente: "DIRECT", nom: "Nora", prenoms: ["Reed"] }
      ],
      enfants: [],
      rcs: [{ id: "8244d136-729b-4fd3-b88a-fa1fe30a2214", numero: "2" }],
      rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d", numero: "4093" }],
      pacss: [],
      actes: []
    }
  ],
  nature: {
    id: "058a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RC",
    code: "TUTELLE_BIENS_PERSONNE",
    libelle: "tutelle aux biens et à la personne",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  complementNature: "complement",
  typeInscription: "RENOUVELLEMENT",
  mandataires: [
    {
      id: "058a436b-330d-4c3c-83e1-d49c27380226",
      libelle: "Mandataire judiciaire à la protection des majeurs association"
    }
  ],
  inscriptionsImpactees: [
    {
      id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
      numero: "3",
      typeInscription: "RADIATION",
      annee: "2020",
      nature: "058a436b-330d-4c3c-83e0-e49d2739012d"
    }
  ],
  inscriptionsLiees: [
    {
      id: "76b62678-8b06-4442-ad5b-b9207627a6e3",
      numero: "1",
      typeInscription: "INSCRIPTION",
      annee: "2020",
      nature: "058a436b-330d-4c3c-83e0-e49d2739012d"
    }
  ],
  duree: { nombreDuree: 1, uniteDuree: "mois", dateFinDeMesure: 1652162767000 }
} as any as IFicheRcRca;

export const FicheRcRenouvellementTypeOrdonnance = {
  id: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
  categorie: "RC",
  annee: "2020",
  numero: "2",
  dateInscription: DateUtils.getDateFromDateCompose({
    jour: "22",
    mois: "11",
    annee: "2020"
  }),
  dateDerniereMaj: new Date(1606374000000),
  dateDerniereDelivrance: new Date(1606374000000),
  alertes: [],
  decision: {
    dateDecision: 1606374000000,
    type: "ORDONNANCE",
    autorite: {
      typeAutorite: "JURIDICTION",
      numeroDepartement: "75",
      ville: "paris",
      pays: "France",
      arrondissement: "18",
      typeJuridiction: "Tribunal judiciaire"
    },
    enrolementRg: "1345",
    enrolementPortalis: "789521545"
  },
  mariageInteresses: {
    villeMariage: "Nanning",
    regionMariage: "zhuang du Guangxi",
    paysMariage: "Chine, Pays du soleil levant",
    dateMariage: { jour: "12", mois: "06", annee: "2020" },
    aletranger: true
  },
  interesses: [
    {
      numeroOrdreSaisi: 2,
      nomFamille: "SLAOUI",
      villeNaissance: "Brest",
      paysNaissance: "France",
      regionNaissance: "Finistère",
      nationalite: "FRANCAISE",
      sexe: "FEMININ",
      autreNoms: ["RAIS"],
      autrePrenoms: ["Marie-Charlotte"],
      prenoms: [
        { numeroOrdre: 1, valeur: "Marie-Charlotte" },
        { numeroOrdre: 3, valeur: "Lily-Rose" },
        { numeroOrdre: 2, valeur: "Anne-Claire" },
        { numeroOrdre: 4, valeur: "Abby-Gaëlle" }
      ],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    },
    {
      numeroOrdreSaisi: 1,
      nomFamille: "LE ROUX",
      villeNaissance: "Châteauneuf-du-Faou",
      paysNaissance: "France",
      regionNaissance: "Finistère, Bretagne",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: [],
      autrePrenoms: [],
      prenoms: [
        { numeroOrdre: 1, valeur: "Pierre-Olivier" },
        { numeroOrdre: 3, valeur: "François-Xavier" },
        { numeroOrdre: 2, valeur: "Félix-Antoine" }
      ],
      dateNaissance: { jour: "24", mois: "12", annee: "1987" }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      motif: "",
      statutFicheEvenement: {
        id: "3ed6caae-871c-4c14-b06e-5150076d8110",
        date: { annee: "2020" },
        ville: "nantes",
        region: "Pays de Loire",
        pays: "France"
      },
      complementMotif: "",
      dateStatut: 1024135200000
    }
  ],
  personnes: [
    {
      nom: "Rose",
      sexe: "FEMININ",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 8,
        mois: 6,
        annee: 1960,
        voie: null,
        ville: "tunis",
        arrondissement: null,
        region: "",
        pays: "Tunisie",
        lieuReprise: null
      },
      deces: {
        minute: null,
        heure: null,
        jour: null,
        mois: null,
        annee: 2020,
        voie: null,
        ville: "nantes",
        arrondissement: null,
        region: "Pays de Loire",
        pays: "France",
        lieuReprise: null
      },
      autresNoms: [{ nom: "DUPE", type: "PSEUDONYME" }],
      prenoms: ["Jean-pierre", "Michel"],
      autresPrenoms: [],
      parents: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Meagan",
          prenoms: ["Emerson"]
        },
        { id: null, typeLienParente: "DIRECT", nom: "Nora", prenoms: ["Reed"] },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Turner",
          prenoms: ["Concetta"]
        },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Glenn",
          prenoms: ["Pearl", "Ginger"]
        }
      ],
      enfants: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Barton",
          prenoms: ["Buck"]
        },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Janine",
          prenoms: ["Alyce"]
        },
        {
          id: null,
          typeLienParente: "ADOPTION",
          nom: "Kirsten",
          prenoms: ["Louella"]
        }
      ],
      rcs: [{ id: "8244d136-729b-4fd3-b88a-fa1fe30a2214", numero: "2" }],
      rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d", numero: "4093" }],
      pacss: [
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df", numero: "1234506" },
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1", numero: "1234508" },
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2", numero: "1234509" },
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3", numero: "1234510" }
      ],
      actes: [
        {
          id: "d8708d77-a359-4553-be72-1eb5f246d4da",
          numero: "754",
          nature: "RECONNAISSANCE"
        }
      ]
    },
    {
      nom: "Latonya",
      sexe: "FEMININ",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 14,
        mois: 12,
        annee: 2001,
        voie: null,
        ville: "angers",
        arrondissement: null,
        region: "MAine et Loire",
        pays: "France",
        lieuReprise: null
      },
      autresNoms: [
        { nom: "Regina", type: "USAGE" },
        { nom: "Rosa", type: "USAGE" }
      ],
      prenoms: ["Nathan", "Pierre"],
      autresPrenoms: [],
      parents: [
        { id: null, typeLienParente: "DIRECT", nom: "Nora", prenoms: ["Reed"] }
      ],
      enfants: [],
      rcs: [{ id: "8244d136-729b-4fd3-b88a-fa1fe30a2214", numero: "2" }],
      rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d", numero: "4093" }],
      pacss: [],
      actes: []
    }
  ],
  nature: {
    id: "058a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RC",
    code: "TUTELLE_BIENS_PERSONNE",
    libelle: "tutelle aux biens et à la personne",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  complementNature: "complement",
  typeInscription: "INSCRIPTION",
  mandataires: [
    {
      id: "058a436b-330d-4c3c-83e1-d49c27380226",
      libelle: "Mandataire judiciaire à la protection des majeurs association"
    }
  ],
  inscriptionsImpactees: [
    {
      id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
      numero: "3",
      typeInscription: "RADIATION",
      annee: "2020",
      nature: "058a436b-330d-4c3c-83e0-e49d27390133"
    }
  ],
  inscriptionsLiees: [
    {
      id: "76b62678-8b06-4442-ad5b-b9207627a6e3",
      numero: "1",
      typeInscription: "INSCRIPTION",
      annee: "2020",
      nature: "058a436b-330d-4c3c-83e0-e49d2739012d"
    }
  ],
  duree: { nombreDuree: 1, uniteDuree: "mois", dateFinDeMesure: 1652162767000 }
} as any as IFicheRcRca;

export const FicheRcModification = {
  id: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
  categorie: "RC",
  annee: "2020",
  numero: "2",
  dateInscription: DateUtils.getDateFromDateCompose({
    jour: "22",
    mois: "11",
    annee: "2020"
  }),
  dateDerniereMaj: new Date(1606374000000),
  dateDerniereDelivrance: new Date(1606374000000),
  alertes: [],
  decision: {
    dateDecision: 1606374000000,
    type: "JUGEMENT",
    autorite: {
      typeAutorite: "JURIDICTION",
      numeroDepartement: "44",
      libelleDepartement: "Loire-Atlantique",
      ville: "nantes",
      pays: "France",
      arrondissement: null,
      typeJuridiction: "Tribunal judiciaire"
    },
    enrolementRg: "1345",
    enrolementPortalis: "789521545"
  },
  mariageInteresses: {
    villeMariage: "Nanning",
    regionMariage: "zhuang du Guangxi",
    paysMariage: "Chine, Pays du soleil levant",
    dateMariage: { jour: "12", mois: "06", annee: "2020" },
    aletranger: true
  },
  interesses: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "SLAOUI",
      villeNaissance: "Brest",
      paysNaissance: "France",
      regionNaissance: "Finistère",
      nationalite: "FRANCAISE",
      sexe: "FEMININ",
      autreNoms: ["RAIS"],
      autrePrenoms: ["Marie-Charlotte"],
      prenoms: [
        { numeroOrdre: 1, valeur: "Marie-Charlotte" },
        { numeroOrdre: 3, valeur: "Lily-Rose" },
        { numeroOrdre: 2, valeur: "Anne-Claire" },
        { numeroOrdre: 4, valeur: "Abby-Gaëlle" }
      ],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    },
    {
      numeroOrdreSaisi: 2,
      nomFamille: "LE ROUX",
      villeNaissance: "Châteauneuf-du-Faou",
      paysNaissance: "France",
      regionNaissance: "Finistère, Bretagne",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: [],
      autrePrenoms: [],
      prenoms: [
        { numeroOrdre: 1, valeur: "Pierre-Olivier" },
        { numeroOrdre: 3, valeur: "François-Xavier" },
        { numeroOrdre: 2, valeur: "Félix-Antoine" }
      ],
      dateNaissance: { jour: "24", mois: "12", annee: "1987" }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      motif: "",
      statutFicheEvenement: {
        id: "3ed6caae-871c-4c14-b06e-5150076d8110",
        date: { annee: "2020" },
        ville: "nantes",
        region: "Pays de Loire",
        pays: "France"
      },
      complementMotif: "",
      dateStatut: 1024135200000
    }
  ],
  personnes: [
    {
      nom: "Rose",
      sexe: "FEMININ",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 8,
        mois: 6,
        annee: 1960,
        voie: null,
        ville: "tunis",
        arrondissement: null,
        region: "",
        pays: "Tunisie",
        lieuReprise: null
      },
      deces: {
        minute: null,
        heure: null,
        jour: null,
        mois: null,
        annee: 2020,
        voie: null,
        ville: "nantes",
        arrondissement: null,
        region: "Pays de Loire",
        pays: "France",
        lieuReprise: null
      },
      autresNoms: [{ nom: "DUPE", type: "PSEUDONYME" }],
      prenoms: ["Jean-pierre", "Michel"],
      autresPrenoms: [],
      parents: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Meagan",
          prenoms: ["Emerson"]
        },
        { id: null, typeLienParente: "DIRECT", nom: "Nora", prenoms: ["Reed"] },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Turner",
          prenoms: ["Concetta"]
        },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Glenn",
          prenoms: ["Pearl", "Ginger"]
        }
      ],
      enfants: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Barton",
          prenoms: ["Buck"]
        },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Janine",
          prenoms: ["Alyce"]
        },
        {
          id: null,
          typeLienParente: "ADOPTION",
          nom: "Kirsten",
          prenoms: ["Louella"]
        }
      ],
      rcs: [{ id: "8244d136-729b-4fd3-b88a-fa1fe30a2214", numero: "2" }],
      rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d", numero: "4093" }],
      pacss: [
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df", numero: "1234506" },
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1", numero: "1234508" },
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2", numero: "1234509" },
        { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3", numero: "1234510" }
      ],
      actes: [
        {
          id: "d8708d77-a359-4553-be72-1eb5f246d4da",
          numero: "754",
          nature: "RECONNAISSANCE"
        }
      ]
    },
    {
      nom: "Latonya",
      sexe: "FEMININ",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 14,
        mois: 12,
        annee: 2001,
        voie: null,
        ville: "angers",
        arrondissement: null,
        region: "MAine et Loire",
        pays: "France",
        lieuReprise: null
      },
      autresNoms: [
        { nom: "Regina", type: "USAGE" },
        { nom: "Rosa", type: "USAGE" }
      ],
      prenoms: ["Nathan", "Pierre"],
      autresPrenoms: [],
      parents: [
        { id: null, typeLienParente: "DIRECT", nom: "Nora", prenoms: ["Reed"] }
      ],
      enfants: [],
      rcs: [{ id: "8244d136-729b-4fd3-b88a-fa1fe30a2214", numero: "2" }],
      rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d", numero: "4093" }],
      pacss: [],
      actes: []
    }
  ],
  nature: {
    id: "058a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RC",
    code: "TUTELLE_BIENS_PERSONNE",
    libelle: "tutelle aux biens et à la personne",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  complementNature: "complement",
  typeInscription: "MODIFICATION",
  mandataires: [
    {
      id: "058a436b-330d-4c3c-83e1-d49c27380226",
      libelle: "Mandataire judiciaire à la protection des majeurs association"
    }
  ],
  inscriptionsImpactees: [
    {
      id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
      numero: "3",
      typeInscription: "RADIATION",
      annee: "2020",
      nature: "058a436b-330d-4c3c-83e0-e49d2739012d"
    }
  ],
  inscriptionsLiees: [
    {
      id: "76b62678-8b06-4442-ad5b-b9207627a6e3",
      numero: "1",
      typeInscription: "INSCRIPTION",
      annee: "2020",
      nature: "058a436b-330d-4c3c-83e0-e49d2739012d"
    }
  ],
  duree: { nombreDuree: 1, uniteDuree: "mois", dateFinDeMesure: 1652162767000 }
} as any as IFicheRcRca;

export const inscriptionsRc = [
  {
    id: "747c0b00-03f3-4c6e-9db3-ec73cbdc0747",
    dateInscription: [2020, 11, 23],
    nature: {
      id: "058a436b-330d-4c3c-83e0-e49d27390135",
      nom: "NATURE_RC",
      code: "TRANSFERT_POUVOIRS",
      libelle: "transfert de pouvoirs",
      estActif: true,
      type: "Requête",
      decisionCouple: true,
      article: "le",
      categorieRCRCA: "REGIME MATRIMONIAL"
    },
    typeInscription: "MODIFICATION"
  },
  {
    id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
    dateInscription: [2020, 11, 29],
    nature: {
      id: "058a436b-330d-4c3c-83e0-e49d27390138",
      nom: "NATURE_RC",
      code: "TUTELLE_AMENAGEE",
      libelle: "tutelle aménagée",
      estActif: true,
      type: "Protection des majeurs",
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "TUTELLE"
    },
    typeInscription: "RADIATION"
  },
  {
    id: "76b62678-8b06-4442-ad5b-b9207627a6ec",
    dateInscription: [2020, 11, 18],
    nature: {
      id: "058a436b-330d-4c3c-83e0-e49d27390121",
      nom: "NATURE_RC",
      code: "PRESOMPTION_ABSENCE",
      libelle: "présomption d'absence",
      estActif: true,
      type: "Requête",
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "ABSENCE"
    },
    typeInscription: "RADIATION"
  },
  {
    id: "747cd416-fcf5-4490-b540-59a89b7f5123",
    dateInscription: [2020, 10, 20],
    nature: {
      id: "058a436b-330d-4c3c-83e0-e49d27390131",
      nom: "NATURE_RC",
      code: "INTERDICTION",
      libelle: "interdiction",
      estActif: false,
      type: "Requête",
      decisionCouple: false,
      article: "l'",
      categorieRCRCA: "INTERDICTION"
    },
    typeInscription: "MODIFICATION"
  }
];
