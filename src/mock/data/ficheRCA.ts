import { IFicheRcRca } from "../../model/etatcivil/rcrca/IFicheRcRca";
import { getDateFromDateCompose } from "../../views/common/util/DateUtils";

export const IFicheRcRcaDecisionJuridictionEtrangere = ({
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

export const IFicheRcRcaDecisionAvecInstructionProcureur = ({
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
      ville: "Pékin",
      pays: "Chine",
      titreOnac: "Consul"
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
