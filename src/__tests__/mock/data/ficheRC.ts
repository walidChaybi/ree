import { IFicheRcDto } from "@model/etatcivil/rcrca/FicheRcRca";

export const mockRcDto = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece/rece-requete-api/v1/repertoirecivil/rc/7566e16c-2b0e-11eb-adc1-0242ac120002",
  data: {
    id: "7566e16c-2b0e-11eb-adc1-0242ac120002",
    categorie: "RC",
    annee: "2018",
    numero: "56533",
    dateInscription: [2018, 2, 15],
    dateDerniereMaj: 1583971200,
    dateDerniereDelivrance: 1592092800,
    alertes: [
      {
        alerte: "DATE_DE_FIN_MESURE_DEPASSEE",
        dateCreation: 1581807600
      }
    ],
    decision: {
      dateDecision: [2018, 2, 15],
      type: "JUGEMENT",
      autorite: {
        type: "TRIBUNAL_JUDICIAIRE",
        numeroDepartement: "75",
        libelleDepartement: "Seine",
        pays: "France",
        arrondissement: "18"
      },
      enrolementRg: "1345",
      enrolementPortalis: "789521545",
      sourceConfirmation: {
        autorite: {
          type: null,
          ville: "Marseille",
          arrondissement: "10",
          numeroDepartement: "13",
          libelleDepartement: "Bouches-du-Rhône",
          pays: "France",
          region: "Ile de france",
          nomNotaire: "nomnotaire",
          prenomNotaire: "prenomnotaire",
          numeroCrpcen: "",
          nomOnac: "",
          prenomOnac: ""
        },
        dateDecision: [2020, 3, 17],
        enrolementRg: "enrolementRg",
        enrolementPortalis: "enrolementPortalis",
        type: "ARRET"
      }
    },
    mariageInterresses: [
      {
        villeMariage: "Caen",
        regionNaissance: "Normandie",
        paysNaissance: "France",
        dateMariage: {
          jour: null,
          mois: null,
          annee: "2020"
        },
        aletranger: false
      }
    ],
    interesses: [
      {
        numeroOrdreSaisi: 1,
        nomFamille: "FAVARO",
        autresNoms: ["FAVAROTTI"],
        prenoms: [{ valeur: "Enrico", numeroOrdre: 0 }],
        autresPrenoms: [],
        dateNaissance: {
          jour: "17",
          mois: "05",
          annee: "1945"
        },
        villeNaissance: "San remo",
        paysNaissance: "Italie",
        regionNaissance: "",
        arrondissementNaissance: "",
        nationalite: "ETRANGERE",
        sexe: "FEMININ"
      },
      {
        numeroOrdreSaisi: 2,
        nomFamille: "FAVARO",
        autreNoms: ["MAHMOUDI"],
        prenoms: [{ valeur: "Ahmeda", numeroOrdre: 0 }],
        autrePrenoms: [],
        dateNaissance: {
          jour: "17",
          mois: "05",
          annee: "1946"
        },
        villeNaissance: "San remo",
        paysNaissance: "Italie",
        regionNaissance: "",
        arrondissementNaissance: "",
        nationalite: "ETRANGERE",
        sexe: "FEMININ"
      }
    ],
    statutsFiche: [
      {
        statut: "ACTIF",
        dateStatut: 1584403200,
        statutFicheEvenement: {
          id: "",
          date: { annee: "2020" },
          ville: "Nantes",
          region: "Pays de la Loire",
          pays: "France"
        },
        motif: "",
        complementMotif: ""
      }
    ],
    nature: {
      id: "058a436b-330d-4c3c-83e0-e49d27390127",
      nom: "NATURE_RC",
      code: "CURATELLE_AMENAGEE",
      libelle: "curatelle aménagée",
      estActif: true,
      type: "Protection des majeurs",
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "CURATELLE"
    },
    typeInscription: "RENOUVELLEMENT",
    dureeInscription: {
      nombreDuree: 2,
      uniteDuree: "ans",
      dateFinDeMesure: [2020, 2, 15]
    },
    duree: {
      nombreDuree: 2,
      uniteDuree: "années",
      dateFinDeMesure: [2020, 2, 15]
    },
    codesMandataires: ["Mandataire judiciaire à la protection des majeurs association", "Préposé d'établissement"],
    inscriptionsImpactees: [
      { id: "0", numero: "2015-36547", annee: "2015", typeInscription: "INSCRIPTION", nature: "" },
      { id: "1", numero: "2020-36547", annee: "2020", typeInscription: "RENOUVELLEMENT", nature: "" }
    ],
    inscriptionsLiees: [
      {
        id: "",
        typeInscription: "MODIFICATION",
        numero: "2017 - 145235",
        annee: "2017",
        nature: ""
      }
    ],
    personnes: [],
    mandataires: []
  } as IFicheRcDto
};

export const FicheRcDecisionNotaire = {
  ...mockRcDto.data,
  id: "135e4dfe-9757-4d5d-8715-359c6e73289b",
  categorie: "RC",
  annee: "2020",
  numero: "11",
  dateInscription: [2020, 11, 18],
  dateDerniereMaj: new Date(1606374000000).getTime(),
  dateDerniereDelivrance: new Date(1606374000000).getTime(),
  alertes: [],
  decision: {
    dateDecision: [2020, 11, 26],
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
      id: "",
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
      rcs: [{ id: "76b62678-8b06-4442-ad5b-b9207627a6eb", numero: "11", referenceComplete: "" }],
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
  duree: { nombreDuree: 1, uniteDuree: "année", dateFinDeMesure: [2016, 8, 3] }
} as IFicheRcDto;

export const FicheRcDecisionNotaireTypeRequete = {
  ...FicheRcDecisionNotaire,
  decision: {
    dateDecision: [2020, 11, 26],
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
  }
} as IFicheRcDto;

export const FicheRcDecisionNotaireTypeRequete2 = {
  ...FicheRcDecisionNotaire,
  decision: {
    dateDecision: [2020, 11, 26],
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
  }
} as IFicheRcDto;

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
  dateInscription: [2020, 11, 22],
  dateDerniereMaj: new Date(1606374000000).getTime(),
  dateDerniereDelivrance: new Date(1606374000000).getTime(),
  alertes: [],
  decision: {
    dateDecision: [2020, 11, 26],
    type: "JUGEMENT",
    autorite: {
      typeAutorite: "JURIDICTION",
      numeroDepartement: "44",
      libelleDepartement: "Loire-Atlantique",
      ville: "nantes",
      pays: "France",
      arrondissement: undefined,
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
      id: "",
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
      id: "",
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
      parents: [{ nom: "Nora", prenoms: ["Reed"] }],
      enfants: [],
      rcs: [{ id: "8244d136-729b-4fd3-b88a-fa1fe30a2214", numero: "2", referenceComplete: "" }],
      rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d", numero: "4093", referenceComplete: "" }],
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
      libelle: "Mandataire judiciaire à la protection des majeurs association",
      nom: "",
      code: "",
      estActif: true
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
  duree: { nombreDuree: 1, uniteDuree: "mois", dateFinDeMesure: [2022, 5, 10] }
} as IFicheRcDto;

export const FicheRcRenouvellementTypeOrdonnance = {
  ...FicheRcRenouvellementTypeJugement,
  decision: {
    dateDecision: [2020, 11, 26],
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
  typeInscription: "INSCRIPTION"
} as IFicheRcDto;

export const FicheRcModification = {
  ...FicheRcRenouvellementTypeJugement,
  typeInscription: "MODIFICATION"
} as IFicheRcDto;

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

export const FicheRcPourBandeauFiche: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  categorie: "RC",
  id: "7566e16c-2b0e-11eb-adc1-0242ac120002",
  annee: "2018",
  numero: "56533",
  interesses: [
    {
      nomFamille: "nom1",
      prenoms: [
        { numeroOrdre: 1, valeur: "prenom11" },
        { numeroOrdre: 2, valeur: "prenom12" }
      ],
      numeroOrdreSaisi: 0,
      dateNaissance: { jour: "01", mois: "09", annee: "1983" },
      villeNaissance: "Châteauneuf-du-Faou",
      paysNaissance: "France",
      regionNaissance: "Finistère, Bretagne",
      sexe: "INCONNU",
      nationalite: "INCONNUE"
    },
    {
      nomFamille: "nom2",
      prenoms: [
        { numeroOrdre: 1, valeur: "prenom21" },
        { numeroOrdre: 2, valeur: "prenom22" }
      ],
      numeroOrdreSaisi: 1,
      dateNaissance: { jour: "01", mois: "09", annee: "1983" },
      villeNaissance: "Châteauneuf-du-Faou",
      paysNaissance: "France",
      regionNaissance: "Finistère, Bretagne",
      sexe: "INCONNU",
      nationalite: "INCONNUE"
    }
  ],
  alertes: [
    {
      alerte: "DATE_FIN_MESURE_DEPASSEE",
      dateCreation: 1581807600
    }
  ],
  dateDerniereMaj: 1583971200,
  dateDerniereDelivrance: 1592092800,
  statutsFiche: [
    {
      statut: "ACTIF",
      dateStatut: 1583971200
    },
    {
      statut: "INACTIF",
      dateStatut: 1583971200
    }
  ]
};
