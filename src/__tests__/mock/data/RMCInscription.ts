import { ETypeInscriptionRcRca } from "@model/etatcivil/enum/ETypeInscriptionRcRca";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { idFichePacs } from "./fichePACS";

export const DataTableauInscription = {
  previousDataLinkState: "previousDataLinkState",
  nextDataLinkState: "http://localhost:8089/rece-etatcivil-api/v1/repertoirecivil/rmc?range=1-105",
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
    idPersonne: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1001",
    nature: "",
    categorie: "PACS",
    statutInscription: "Actif",
    typeInscription: ETypeInscriptionRcRca.INSCRIPTION,
    dateInscription: "2020-12-01",
    anneeInscription: "2020"
  },
  {
    idInscription: "85160d6e-893b-47c2-a9a8-b25573189f0c",
    idPersonne: "89c9d030-26c3-41d3-bdde-8b4dcc042fe0",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1002",
    nature: "Mesure d’accompagnement social personnalisé (L271-1 casf)",
    categorie: "RC",
    statutInscription: "Actif",
    typeInscription: ETypeInscriptionRcRca.MAIN_LEVEE,
    dateInscription: "2019-11-05",
    anneeInscription: "2019"
  },
  {
    idInscription: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
    idPersonne: "89c9d030-26c3-41d3-bdde-8b4dcc0a20e0",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1003",
    nature: "Acte de notoriété constatant la possession d'état",
    categorie: "RCA",
    statutInscription: "Inactif",
    typeInscription: ETypeInscriptionRcRca.CADUCITE,
    dateInscription: "2017-05-07",
    anneeInscription: "2017"
  },
  {
    idInscription: "135e4dfe-9757-4d5d-8715-359c6e73289b",
    idPersonne: "89c9d030-26c3-41d3-bcde-8b4dcc0420e0",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1004",
    nature: "Sauvegarde justice (433cc)",
    categorie: "RC",
    statutInscription: "Actif",
    typeInscription: ETypeInscriptionRcRca.RENOUVELLEMENT,
    dateInscription: "2009-02-05",
    anneeInscription: "2009"
  },
  {
    idInscription: "8244d136-729b-4fd3-b88a-fa1fe30a2216",
    idPersonne: "89c9d030-26c3-41d3-bdde-8b4bcc0420e0",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1005",
    nature: "Annulation de reconnaissance",
    categorie: "RCA",
    statutInscription: "Actif",
    typeInscription: ETypeInscriptionRcRca.RENOUVELLEMENT,
    dateInscription: "2007-07-07",
    anneeInscription: "2007"
  },
  {
    idInscription: "85160d6e-893b-47c2-a9a8-b25573189f0d",
    idPersonne: "89c9d030-26c3-4dd3-bdde-8b4dcc0420e0",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1006",
    nature: "",
    categorie: "PACS",
    statutInscription: "Actif",
    typeInscription: ETypeInscriptionRcRca.CADUCITE,
    dateInscription: "2000-02-11",
    anneeInscription: "2000"
  }
];

export const DataRMCInscriptionAvecUnRCA: IResultatRMCInscription[] = [
  {
    idInscription: "215e4dfe-9757-4d5d-8715-359c6e73288c",
    idPersonne: "89c9d030-26c3-41d3-bdde-8b4dcs0420e0",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1005",
    nature: "Annulation de reconnaissance",
    categorie: "RCA",
    statutInscription: "Actif",
    typeInscription: ETypeInscriptionRcRca.RENOUVELLEMENT,
    dateInscription: "2007-07-07",
    anneeInscription: "2007"
  }
];

export const DataRMCInscriptionAvecUnRC: IResultatRMCInscription[] = [
  {
    idInscription: "135e4dfe-9757-4d5d-8715-359c6e73289b",
    idPersonne: "89d9d030-26c3-41d3-bdde-8b4dcc0420e0",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1004",
    nature: "Sauvegarde justice (433cc)",
    categorie: "RC",
    statutInscription: "Actif",
    typeInscription: ETypeInscriptionRcRca.RENOUVELLEMENT,
    dateInscription: "2009-02-05",
    anneeInscription: "2009"
  }
];

export const DataRMCInscriptionAvecUnPACS: IResultatRMCInscription[] = [
  {
    idInscription: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
    idPersonne: "89c9d030-2jc3-41d3-bdde-8b4dcc0420e0",
    nom: "Rose",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1234508",
    typeInscription: ETypeInscriptionRcRca.INSCRIPTION,
    categorie: "PACS",
    statutInscription: "ACTIF",
    dateInscription: "2013-05-02",
    anneeInscription: "2013"
  }
];

export const ReponseAppelRMCInscription4PremiersResultats = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/repertoirecivil/rmc",
  headers: {
    "content-range": "0-4/8",
    link: '<http://localhost:80/rece/rece-etatcivil-api/repertoirecivil/rmc?range=1-4>;rel="next"'
  },
  data: {
    repertoiresCiviles: [
      {
        id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "1234508",
        nature: null,
        typeInscription: "",
        categorie: "PACS",
        statut: "ACTIF",
        dateInscription: "2013-05-02",
        anneeInscription: "2013"
      },
      {
        id: "8c9ea77f-55dc-494f-8e75-b136ac7ce52a",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "4093",
        nature: "168a436b-330d-4c3c-83e0-e49d27390132",
        typeInscription: "INSCRIPTION",
        categorie: "RCA",
        statut: "ACTIF",
        dateInscription: "2020-02-23",
        anneeInscription: "2020"
      },
      {
        id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "1234510",
        nature: null,
        typeInscription: "",
        categorie: "PACS",
        statut: "ACTIF",
        dateInscription: "1986-01-12",
        anneeInscription: "1986"
      },
      {
        id: idFichePacs,
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "1234506",
        nature: null,
        typeInscription: "",
        categorie: "PACS",
        statut: "ACTIF",
        dateInscription: "2001-08-31",
        anneeInscription: "2001"
      }
    ]
  }
};

export const ReponseAppelRMCInscription4DernierResultats = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/repertoirecivil/rmc",
  headers: {
    "content-range": "4-8/8",
    link: '<http://localhost:80/rece/rece-etatcivil-api/repertoirecivil/rmc?range=0-4>;rel="prev"'
  },
  data: {
    repertoiresCiviles: [
      {
        id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "4093",
        nature: "168a436b-330d-4c3c-83e0-e49d27390132",
        typeInscription: "INSCRIPTION",
        categorie: "RCA",
        statut: "INACTIF",
        dateInscription: "2020-02-23",
        anneeInscription: "2020"
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
        numero: "2",
        nature: "058a436b-330d-4c3c-83e0-e49d2739013a",
        typeInscription: "RENOUVELLEMENT",
        categorie: "RC",
        statut: "ACTIF",
        dateInscription: "2020-11-22",
        anneeInscription: "2020"
      },
      {
        id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "1234509",
        nature: null,
        typeInscription: "",
        categorie: "PACS",
        statut: "INACTIF",
        dateInscription: "1996-10-31",
        anneeInscription: "1996"
      },
      {
        id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        numero: "1234509",
        nature: null,
        typeInscription: "",
        categorie: "PACS",
        statut: "ACTIF",
        dateInscription: "1996-10-31",
        anneeInscription: "1996"
      }
    ]
  }
};
