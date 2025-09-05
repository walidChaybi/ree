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
