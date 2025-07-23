import { IResultatRMCInscriptionDto } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";

export const DataTableauInscription = {
  previousDataLinkState: "previousDataLinkState",
  nextDataLinkState: "http://localhost:8089/rece-etatcivil-api/v1/repertoirecivil/rmc?range=1-105",
  rowsNumberState: 6,
  minRangeState: 0,
  maxRangeState: 105
};

export const ReponseAppelRMCInscription: (
  | IResultatRMCInscriptionDto<"PACS">
  | IResultatRMCInscriptionDto<"RCA">
  | IResultatRMCInscriptionDto<"RC">
)[] = [
  {
    id: "85160d6e-893b-47c2-a9a8-b25573189f0c",
    personne: {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0a20e0",
      nom: "ROSE",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: {
        jour: 8,
        mois: 6,
        annee: 1960
      },
      paysNaissance: "Tunisie"
    },
    numero: "1001",
    idNature: undefined,
    categorie: "PACS",
    statut: "ACTIF",
    type: undefined,
    annee: "2020"
  },
  {
    id: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
    personne: {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0a20e0",
      nom: "ROSE",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: {
        jour: 8,
        mois: 6,
        annee: 1960
      },
      paysNaissance: "Tunisie"
    },
    numero: "1022",
    idNature: "MESURE_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE",
    categorie: "RC",
    statut: "ACTIF",
    type: "MAIN_LEVEE",
    annee: "2020"
  },
  {
    id: "8244d136-729b-4fd3-b88a-fa1fe30a2215",
    personne: {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0a20e0",
      nom: "ROSE",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: {
        jour: 8,
        mois: 6,
        annee: 1960
      },
      paysNaissance: "Tunisie"
    },
    numero: "1003",
    idNature: "ACTE_NOTERIETE_CONSTATANT_LA_POSSESSION_ETAT",
    categorie: "RCA",
    statut: "INACTIF",
    type: "INSCRIPTION",
    annee: "2017"
  }
];

export const MOCK_LISTE_RESULTAT_RMC_INSCRIPTION_DTO: (
  | IResultatRMCInscriptionDto<"PACS">
  | IResultatRMCInscriptionDto<"RCA">
  | IResultatRMCInscriptionDto<"RC">
)[] = [
  {
    id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
    personne: {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
      nom: "ROSE",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: {
        jour: 8,
        mois: 6,
        annee: 1960
      },
      paysNaissance: "Tunisie"
    },
    numero: "1001",
    idNature: undefined,
    categorie: "PACS",
    statut: "ACTIF",
    type: undefined,
    annee: "2020"
  },
  {
    id: "85160d6e-893b-47c2-a9a8-b25573189f0c",
    personne: {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc042fe0",
      nom: "ROSE",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: {
        jour: 8,
        mois: 6,
        annee: 1960
      }
    },
    numero: "1002",
    idNature: "",
    categorie: "RC",
    statut: "ACTIF",
    type: "MAIN_LEVEE",
    annee: "2019"
  },
  {
    id: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
    personne: {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0a20e0",
      nom: "ROSE",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: {
        jour: 8,
        mois: 6,
        annee: 1960
      },
      paysNaissance: "Tunisie"
    },
    numero: "1003",
    idNature: "Acte de notoriété constatant la possession d'état",
    categorie: "RCA",
    statut: "INACTIF",
    type: "INSCRIPTION",
    annee: "2017"
  },
  {
    id: "135e4dfe-9757-4d5d-8715-359c6e73289b",
    personne: {
      id: "89c9d030-26c3-41d3-bcde-8b4dcc0420e0",
      nom: "ROSE",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: {
        jour: 8,
        mois: 6,
        annee: 1960
      },
      paysNaissance: "Tunisie"
    },
    numero: "1004",
    idNature: "Sauvegarde justice (433cc)",
    categorie: "RC",
    statut: "ACTIF",
    type: "RENOUVELLEMENT",
    annee: "2009"
  },
  {
    id: "8244d136-729b-4fd3-b88a-fa1fe30a2216",
    personne: {
      id: "89c9d030-26c3-41d3-bdde-8b4bcc0420e0",
      nom: "ROSE",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: {
        jour: 8,
        mois: 6,
        annee: 1960
      },
      paysNaissance: "Tunisie"
    },
    numero: "1005",
    idNature: "Annulation de reconnaissance",
    categorie: "RCA",
    statut: "ACTIF",
    type: "INSCRIPTION",
    annee: "2007"
  },
  {
    id: "85160d6e-893b-47c2-a9a8-b25573189f0d",
    personne: {
      id: "89c9d030-26c3-4dd3-bdde-8b4dcc0420e0",
      nom: "ROSE",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: {
        jour: 8,
        mois: 6,
        annee: 1960
      },
      paysNaissance: "Tunisie"
    },
    numero: "1006",
    categorie: "PACS",
    statut: "ACTIF",
    annee: "2000",
    idNature: undefined,
    type: undefined
  }
];

export const MOCK_RESULTAT_RMC_INSCRIPTION_RCA: IResultatRMCInscriptionDto<"RCA"> = {
  id: "215e4dfe-9757-4d5d-8715-359c6e73288c",
  personne: {
    id: "89c9d030-26c3-41d3-bdde-8b4dcs0420e0",
    nom: "ROSE",
    autresNoms: ["DUPE"],
    prenoms: [
      { prenom: "Jean-pierre", numeroOrdre: 1 },
      { prenom: "Michel", numeroOrdre: 2 }
    ],
    dateNaissance: {
      jour: 8,
      mois: 6,
      annee: 1960
    },
    paysNaissance: "Tunisie"
  },
  numero: "1005",
  idNature: "Annulation de reconnaissance",
  categorie: "RCA",
  statut: "ACTIF",
  type: "INSCRIPTION",
  annee: "2007"
};

export const MOCK_RESULTAT_RMC_INSCRIPTION_RC: IResultatRMCInscriptionDto<"RC"> = {
  id: "135e4dfe-9757-4d5d-8715-359c6e73289b",
  personne: {
    id: "89d9d030-26c3-41d3-bdde-8b4dcc0420e0",
    nom: "ROSE",
    autresNoms: ["DUPE"],
    prenoms: [
      { prenom: "Jean-pierre", numeroOrdre: 1 },
      { prenom: "Michel", numeroOrdre: 2 }
    ],
    dateNaissance: {
      jour: 8,
      mois: 6,
      annee: 1960
    },
    paysNaissance: "Tunisie"
  },
  numero: "1004",
  idNature: "Sauvegarde justice (433cc)",
  categorie: "RC",
  statut: "ACTIF",
  type: "RENOUVELLEMENT",
  annee: "2009"
};

export const MOCK_RESULTAT_RMC_INSCRIPTION_PACS: IResultatRMCInscriptionDto<"PACS"> = {
  id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
  personne: {
    id: "89c9d030-2jc3-41d3-bdde-8b4dcc0420e0",
    nom: "Rose",
    autresNoms: ["DUPE"],
    prenoms: [
      { prenom: "Jean-pierre", numeroOrdre: 1 },
      { prenom: "Michel", numeroOrdre: 2 }
    ],
    dateNaissance: {
      jour: 8,
      mois: 6,
      annee: 1960
    },
    paysNaissance: "Tunisie"
  },
  numero: "1234508",
  type: undefined,
  categorie: "PACS",
  statut: "ACTIF",
  annee: "2013",
  idNature: undefined
};
