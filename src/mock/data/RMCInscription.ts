import { IResultatRMCInscription } from "../../model/rmc/acteInscription/resultat/IResultatRMCInscription";

export const DataTableauInscription = {
  previousDataLinkState: "previousDataLinkState",
  nextDataLinkState:
    "http://localhost:8089/rece-etatcivil-api/v1/repertoirecivil/rmc?range=1-105",
  rowsNumberState: 6,
  minRangeState: 0,
  maxRangeState: 105
};

export const ReponseAppelRMCInscription = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 201,
  url: "/rece/rece-etatcivil-api/v1/repertoirecivil/rmc",
  data: {
    repertoiresCiviles: [
      {
        id: "85160d6e-893b-47c2-a9a8-b25573189f0c",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "1001",
        nature: "NULL",
        categorie: "PACS",
        statut: "ACTIF",
        typeInscription: "RADIATION"
      },
      {
        id: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "1022",
        nature: "MESURE_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE",
        categorie: "RC",
        statut: "ACTIF",
        typeInscription: "MAIN_LEVEE"
      },
      {
        id: "8244d136-729b-4fd3-b88a-fa1fe30a2215",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "1003",
        nature: "ACTE_NOTERIETE_CONSTATANT_LA_POSSESSION_ETAT",
        categorie: "RCA",
        statut: "INACTIF",
        typeInscription: "INSCRIPTION"
      }
    ]
  }
};

export const DataRMCInscriptionAvecResultat: IResultatRMCInscription[] = [
  {
    idInscription: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1001",
    nature: "",
    categorie: "PACS",
    statutInscription: "Actif",
    typeInscription: "INSCRIPTION",
    dateInscription: "2020-12-01",
    anneeInscription: "2020"
  },
  {
    idInscription: "85160d6e-893b-47c2-a9a8-b25573189f0c",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1002",
    nature: "Mesure d’accompagnement social personnalisé (L271-1 casf)",
    categorie: "RC",
    statutInscription: "Actif",
    typeInscription: "MAIN_LEVEE",
    dateInscription: "2019-11-05",
    anneeInscription: "2019"
  },
  {
    idInscription: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1003",
    nature: "Acte de notoriété constatant la possession d'état",
    categorie: "RCA",
    statutInscription: "Inactif",
    typeInscription: "CADUCITE 2",
    dateInscription: "2017-05-07",
    anneeInscription: "2017"
  },
  {
    idInscription: "135e4dfe-9757-4d5d-8715-359c6e73289b",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1004",
    nature: "Sauvegarde justice (433cc)",
    categorie: "RC",
    statutInscription: "Actif",
    typeInscription: "RENOUVELLEMENT",
    dateInscription: "2009-02-05",
    anneeInscription: "2009"
  },
  {
    idInscription: "8244d136-729b-4fd3-b88a-fa1fe30a2216",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1005",
    nature: "Annulation de reconnaissance",
    categorie: "RCA",
    statutInscription: "Actif",
    typeInscription: "RENOUVELLEMENT",
    dateInscription: "2007-07-07",
    anneeInscription: "2007"
  },
  {
    idInscription: "85160d6e-893b-47c2-a9a8-b25573189f0d",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1006",
    nature: "",
    categorie: "PACS",
    statutInscription: "Actif",
    typeInscription: "CADUCITE 2",
    dateInscription: "2000-02-11",
    anneeInscription: "2000"
  }
];

export const DataRMCInscriptionAvecUnSeulResultat: IResultatRMCInscription[] = [
  {
    idInscription: "135e4dfe-9757-4d5d-8715-359c6e73289b",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1005",
    nature: "Annulation de reconnaissance",
    categorie: "RCA",
    statutInscription: "Actif",
    typeInscription: "RENOUVELLEMENT",
    dateInscription: "2007-07-07",
    anneeInscription: "2007"
  }
];
