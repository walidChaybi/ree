import { ELienParente } from "@model/etatcivil/enum/ELienParente";
import { IFicheRcaDto } from "@model/etatcivil/rcrca/FicheRcRca";

export const mockRcaDto: IFicheRcaDto = {
  id: "135e4dfe-9757-4d5d-8715-359c6e73289b",
  categorie: "RCA",
  annee: "2015",
  numero: "15987",
  nature: {
    id: "c58a436b-330d-4c3c-83e0-e49d2739012c",
    nom: "NATURE_RCA",
    code: "REPRISE_VIE_COMMUNE",
    libelle: "reprise de la vie commune",
    estActif: true,
    decisionCouple: true,
    article: "la",
    categorieRCRCA: "DIVORCE"
  },
  dateInscription: [1, 1, 2020],
  dateDerniereMaj: 1435183200,
  dateDerniereDelivrance: 1457046000,
  statutsFiche: [
    {
      statut: "INACTIF",
      dateStatut: 1618480800000
    }
  ],
  alertes: [],
  typeInscription: "INSCRIPTION",
  interesses: [
    {
      nomFamille: "FAVARO",
      prenoms: [{ valeur: "Enrico", numeroOrdre: 0 }],
      numeroOrdreSaisi: 1,
      villeNaissance: "Lyon",
      paysNaissance: "France",
      regionNaissance: "Rhône",
      arrondissementNaissance: "8",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: [],
      autrePrenoms: [],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    },
    {
      nomFamille: "MAHMOUDI",
      prenoms: [{ valeur: "Ahmeda", numeroOrdre: 0 }],
      numeroOrdreSaisi: 1,
      villeNaissance: "Lyon",
      paysNaissance: "France",
      regionNaissance: "Rhône",
      arrondissementNaissance: "8",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: [],
      autrePrenoms: [],
      dateNaissance: { jour: "01", mois: "09", annee: "1983" }
    }
  ],
  decision: {
    dateDecision: [2018, 2, 15],
    type: "JUGEMENT",
    autorite: {
      numeroDepartement: "75",
      libelleDepartement: "Seine",
      pays: "France",
      arrondissement: "18"
    },
    enrolementRg: "1345",
    enrolementPortalis: "789521545",
    sourceConfirmation: {
      autorite: {
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: "Bouches-du-Rhône",
        pays: "France",
        region: "Ile de france",
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: ""
      },
      dateDecision: [2020, 3, 17],
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: "ARRET"
    }
  },
  personnes: [
    {
      id: "e7114c57-d00d-48ad-bbee-af2b01e2da63",
      nom: "Faulkner",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      naissance: {
        jour: 26,
        mois: 2,
        annee: 1980,
        voie: "",
        ville: "marseille",
        arrondissement: "2",
        region: "Provence-Aples-côte d'azur",
        pays: "France"
      },
      deces: {
        mois: 7,
        annee: 2020,
        voie: "",
        ville: "londres",
        arrondissement: "",
        region: "Angleterre",
        pays: "Grande bretagne"
      },
      autresNoms: [{ nom: "Elisa", type: "PSEUDONYME" }],
      prenoms: ["Elie_madelaine-henriette", "Maëlla", "Marie-Charlotte"],
      autresPrenoms: ["Solomon"],
      rcs: [
        { id: "85df1d10-71b7-4336-9463-bb1c5760d1a0", numero: "3", referenceComplete: "" },
        { id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918", numero: "4", referenceComplete: "" }
      ],
      rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e", numero: "4094", referenceComplete: "" }],
      pacss: [
        {
          id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
          numero: "123456",
          referenceComplete: ""
        },
        {
          id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df",
          numero: "1234506",
          referenceComplete: ""
        },
        {
          id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1",
          numero: "1234508",
          referenceComplete: ""
        },
        {
          id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2",
          numero: "1234509",
          referenceComplete: ""
        },
        {
          id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3",
          numero: "1234510",
          referenceComplete: ""
        }
      ]
    }
  ]
};

export const ficheRcaDecisionJuridictionEtrangere: IFicheRcaDto = {
  ...mockRcaDto,
  id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61d",
  categorie: "RCA",
  annee: "2020",
  numero: "4013",
  dateInscription: [2020, 2, 23],
  dateDerniereMaj: new Date(1552554000000).getTime(),
  dateDerniereDelivrance: new Date(1554105600000).getTime(),
  alertes: [],
  decision: {
    dateDecision: [2020, 11, 26],
    type: "JUGEMENT",
    autorite: {
      numeroDepartement: "75",
      region: "",
      ville: "Paris",
      pays: "France",
      arrondissement: "18",
      typeJuridiction: "Tribunal judiciaire"
    },
    dateDecisionEtrangere: [2020, 11, 26]
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
      dateNaissance: { jour: "01", mois: "09", annee: "1983" },
      parents: [
        {
          sexe: "MASCULIN",
          nomFamille: "Dupont",
          lienParente: ELienParente.PARENT_ADOPTANT,
          numeroOrdre: 1,
          dateNaissance: {
            jour: "01",
            mois: "02",
            annee: "1993"
          },
          paysNaissance: "France",
          prenomsParents: [
            {
              valeur: "Didier",
              numeroOrdre: 2
            },
            {
              valeur: "Lucas",
              numeroOrdre: 1
            }
          ],
          villeNaissance: "Nantes",
          regionNaissance: "Loire-Atlantique"
        }
      ]
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
      id: "",
      nom: "Prodesk",
      sexe: "FEMININ",
      nationalite: "ETRANGERE",
      naissance: {
        jour: 25,
        mois: 6,
        annee: 1990,
        ville: "Barcelone",
        region: "Catalogne",
        pays: "Espagne"
      },
      autresNoms: [],
      prenoms: ["Elodie"],
      autresPrenoms: [],
      rcs: [],
      rcas: [
        { id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61c", numero: "4012", referenceComplete: "" },
        { id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61d", numero: "4013", referenceComplete: "" }
      ],
      pacss: []
    }
  ],
  nature: {
    id: "488a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_REGIME_MATRIMONIAL_ACTE_NOTARIE_ETRANGER_INSTRUCTION_PROCUREUR",
    libelle: "changement de régime matrimonial par acte notarié étranger / instruction du Procureur",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  typeInscription: "INSCRIPTION"
};

export const ficheRcaDecisionAvecInstructionProcureur: IFicheRcaDto = {
  ...ficheRcaDecisionJuridictionEtrangere,
  id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61c",
  categorie: "RCA",
  numero: "4012",
  decision: {
    dateDecision: [2020, 11, 26],
    type: "ONAC",
    autorite: {
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
      arrondissement: "1"
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
      dateDeces: { mois: "03", annee: "2003" },
      villeDeces: "Londres",
      paysDeces: "Royaume-Uni",
      regionDeces: "Grand-Londres",
      dateNaissance: { jour: "02", mois: "09", annee: "1983" }
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
};
