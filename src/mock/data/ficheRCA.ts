import { IFicheRcRca } from "../../model/etatcivil/rcrca/IFicheRcRca";
import { getDateFromDateCompose } from "../../views/common/util/DateUtils";

export const FicheRcaDecisionJuridictionEtrangere = ({
  id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61d",
  categorie: "RCA",
  annee: "2020",
  numero: "4013",
  dateInscription: getDateFromDateCompose({
    jour: "23",
    mois: "02",
    annee: "2020"
  }),
  dateDerniereMaj: new Date(1552554000000),
  dateDerniereDelivrance: new Date(1554105600000),
  alertes: [],
  decision: {
    dateDecision: 1606374000000,
    type: "JUGEMENT",
    autorite: {
      typeAutorite: "JURIDICTION",
      numeroDepartement: "75",
      region: "",
      ville: "Paris",
      pays: "France",
      arrondissement: "18",
      typeJuridiction: "Tribunal judiciaire"
    },
    dateDecisionEtrangere: 1606374000000
  },
  interesses: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Fleck",
      villeNaissance: "Lyon",
      paysNaissance: "France",
      regionNaissance: "Rhône",
      arrondissementNaissance: "8",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: [],
      autrePrenoms: [],
      prenoms: [
        { numeroOrdre: 2, valeur: "Jules" },
        { numeroOrdre: 1, valeur: "Léo" }
      ],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      motif: "",
      statutFicheEvenement: {
        id: "594dcd34-846a-47c7-aed1-94352cb4ea54",
        date: { jour: "13", mois: "9", annee: "2011" },
        ville: "Barcelone",
        region: "Catalogne",
        pays: "Espagne"
      },
      complementMotif: "",
      dateStatut: 1618480800000
    }
  ],
  personnes: [
    {
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
      rcas: [
        { id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61c", numero: "4012" },
        { id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61d", numero: "4013" }
      ],
      pacss: [],
      actes: []
    }
  ],
  nature: {
    id: "488a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RCA",
    code:
      "CHANGEMENT_REGIME_MATRIMONIAL_ACTE_NOTARIE_ETRANGER_INSTRUCTION_PROCUREUR",
    libelle:
      "changement de régime matrimonial par acte notarié étranger / instruction du Procureur",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  typeInscription: "INSCRIPTION"
} as any) as IFicheRcRca;

export const FicheRcaDecisionAvecInstructionProcureur = ({
  id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61c",
  categorie: "RCA",
  annee: "2020",
  numero: "4012",
  dateInscription: getDateFromDateCompose({
    jour: "23",
    mois: "02",
    annee: "2020"
  }),
  dateDerniereMaj: new Date(1552554000000),
  dateDerniereDelivrance: new Date(1554105600000),
  alertes: [],
  decision: {
    dateDecision: 1606374000000,
    type: "ONAC",
    autorite: {
      typeAutorite: "ONAC",
      region: "",
      ville: "Pékin",
      pays: "Chine",
      titreOnac: "Directrice générale"
    },
    instructionProcureur: {
      dateInstruction: 1606374000000,
      numeroRef: "56848",
      ville: "Nantes",
      departement: "Loire-Atlantique",
      arrondissement: "arrondissement"
    }
  },
  interesses: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Fleck",
      villeNaissance: "Lyon",
      paysNaissance: "France",
      regionNaissance: "Rhône",
      arrondissementNaissance: "8",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: [],
      autrePrenoms: [],
      prenoms: [
        { numeroOrdre: 2, valeur: "Jules" },
        { numeroOrdre: 1, valeur: "Léo" }
      ],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      motif: "",
      statutFicheEvenement: {
        id: "594dcd34-846a-47c7-aed1-94352cb4ea51",
        date: { jour: "13", mois: "9", annee: "2011" },
        ville: "Barcelone",
        region: "Catalogne",
        pays: "Espagne"
      },
      complementMotif: "",
      dateStatut: 1618480800000
    }
  ],
  personnes: [
    {
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
      rcas: [
        { id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61c", numero: "4012" },
        { id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61d", numero: "4013" }
      ],
      pacss: [],
      actes: []
    }
  ],
  nature: {
    id: "168a436b-330d-4c3c-83e0-e49d27390132",
    nom: "NATURE_RCA",
    code: "ADOPTION_SIMPLE_ETRANGER_EXEQUATUR",
    libelle: "adoption simple prononcée à l'étranger avec jugement d'exequatur",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  typeInscription: "INSCRIPTION"
} as any) as IFicheRcRca;

export const FicheRcaDecisionNotaireConvention = ({
  id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
  categorie: "RCA",
  annee: "1998",
  numero: "4094",
  dateInscription: getDateFromDateCompose({
    jour: "1998",
    mois: "11",
    annee: "23"
  }),
  dateDerniereMaj: new Date(1552554000000),
  dateDerniereDelivrance: new Date(1554105600000),
  alertes: [],
  decision: {
    dateDecision: 1591167600000,
    type: "CONVENTION",
    autorite: {
      typeAutorite: "NOTAIRE",
      numeroDepartement: "44",
      region: "Pays de la Loire",
      ville: "Nantes",
      libelleDepartement: "Loire-Atlantique",
      pays: "France",
      nomNotaire: "Le-Grand",
      prenomNotaire: "Flavie",
      numeroCrpcen: "9AKLO"
    }
  },
  mariageInteresses: {
    villeMariage: "Rome",
    regionMariage: "Latium",
    paysMariage: "Italie",
    dateMariage: {
      jour: "28",
      mois: "06",
      annee: "2018"
    },
    aletranger: false
  },
  interesses: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "DURANT",
      villeNaissance: "Brooklyn",
      paysNaissance: "États-unis d'Amériques",
      regionNaissance: "New-York",
      villeDeces: "Londres",
      paysDeces: "Royaume-Uni",
      regionDeces: "Grand-Londres",
      nationalite: "ETRANGERE",
      sexe: "FEMININ",
      autreNoms: ["O"],
      autrePrenoms: ["Mireille"],
      prenoms: [
        {
          numeroOrdre: 2,
          valeur: "Sarah"
        },
        {
          numeroOrdre: 1,
          valeur: "Julie"
        }
      ],
      dateNaissance: {
        mois: "10",
        annee: "1960"
      },
      dateDeces: {
        mois: "03",
        annee: "2003"
      }
    },
    {
      numeroOrdreSaisi: 2,
      nomFamille: "Quinzel",
      villeNaissance: "Nantes",
      paysNaissance: "France",
      regionNaissance: "Loire-Atlantique",
      villeDeces: "Lille",
      paysDeces: "France",
      regionDeces: "Nord",
      nationalite: "FRANCAISE",
      sexe: "FEMININ",
      autreNoms: [],
      autrePrenoms: [],
      prenoms: [
        {
          numeroOrdre: 2,
          valeur: "Charlène"
        },
        {
          numeroOrdre: 1,
          valeur: "Harleen"
        }
      ],
      dateNaissance: {
        annee: "1993"
      },
      dateDeces: {
        annee: "2003"
      }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      motif: "",
      statutFicheEvenement: {
        id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
        date: {
          annee: "2019"
        },
        ville: "nantes",
        region: "Pays de Loire",
        pays: "France"
      },
      complementMotif: "",
      dateStatut: 1618480800000
    }
  ],
  personnes: [
    {
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
          nom: "Barton",
          prenoms: ["Buck"]
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
        }
      ],
      rcs: [
        {
          id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
          numero: "4"
        },
        {
          id: "76b62678-8b06-4442-ad5b-b9207627a6e3",
          numero: "1"
        }
      ],
      rcas: [
        {
          id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
          numero: "4094"
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
  nature: {
    id: "868a436b-330d-4c3c-83e0-e49d27390139",
    nom: "NATURE_RCA",
    code: "CONTESTATION_PATERNITE",
    libelle: "contestation de paternité",
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "FILIATION"
  },
  typeInscription: "INSCRIPTION"
} as any) as IFicheRcRca;
