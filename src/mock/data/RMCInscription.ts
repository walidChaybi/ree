import { IResultatRMCInscription } from "../../model/rmc/acteInscription/resultat/IResultatRMCInscription";

export const DataTableauInscription = {
  previousDataLinkState: undefined,
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
        typeInscription: "PACS",
        statut: "ACTIF"
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
        numero: "1002",
        nature: "MESURE_ACCOMPAGNEMENT_SOCIAL_PERSONNALISE",
        typeInscription: "RC",
        statut: "ACTIF"
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
        numero: "1003",
        nature: "ACTE_NOTERIETE_CONSTATANT_LA_POSSESSION_ETAT",
        typeInscription: "RCA",
        statut: "INACTIF"
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
    typeInscription: "PACS",
    statutInscription: "Actif"
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
    typeInscription: "RC",
    statutInscription: "Actif"
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
    typeInscription: "RCA",
    statutInscription: "Inactif"
  },
  {
    idInscription: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1004",
    nature: "Sauvegarde justice (433cc)",
    typeInscription: "RC",
    statutInscription: "Actif"
  },
  {
    idInscription: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    numeroInscription: "1005",
    nature: "Annulation de reconnaissance",
    typeInscription: "RCA",
    statutInscription: "Actif"
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
    typeInscription: "PACS",
    statutInscription: "Actif"
  }
];
