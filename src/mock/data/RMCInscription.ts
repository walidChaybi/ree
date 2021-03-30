import {IResultatRMCInscription} from "../../model/rmc/acteInscription/resultat/IResultatRMCInscription";

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
    idInscription: "85160d6e-893b-47c2-a9a8-b25573189f0c",
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
    idInscription: "8244d136-729b-4fd3-b88a-fa1fe30a2214",
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
    idInscription: "85160d6e-893b-47c2-a9a8-b25573189f0c",
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

export const ReponseAppelNomenclatureNatureRC =
    {
      "hasTechnicalError": false,
      "hasBusinessError": false,
      "status": 200,
      "url": "/rece-etatcivil-api/v1/nomenclature/NATURE_RC",
      "data": [
        {
          "id": "058a436b-330d-4c3c-83e0-e49d27390121",
          "categorie": "NATURE_RC",
          "code": "PRESOMPTION_ABSENCE",
          "libelle": "présomption d'absence",
          "estActif": true,
          "usagePacs": null,
          "type": "Requête",
          "sousType": null,
          "decisionCouple": false,
          "article": "la",
          "categorieRCRCA": "ABSENCE"
        },
        {
          "id": "058a436b-330d-4c3c-83e0-e49d27390122",
          "categorie": "NATURE_RC",
          "code": "CO_CURATELLE_RENFORCEE",
          "libelle": "co-curatelle renforcée",
          "estActif": false,
          "usagePacs": null,
          "type": "Protection des majeurs",
          "sousType": null,
          "decisionCouple": false,
          "article": "la",
          "categorieRCRCA": "CURATELLE"
        },
        {
          "id": "058a436b-330d-4c3c-83e0-e49d27390123",
          "categorie": "NATURE_RC",
          "code": "CURATELLE_512",
          "libelle": "curatelle 512",
          "estActif": false,
          "usagePacs": null,
          "type": "Protection des majeurs",
          "sousType": null,
          "decisionCouple": false,
          "article": "la",
          "categorieRCRCA": "CURATELLE"
        }]
    };

export const ReponseAppelNomenclatureNatureRCA =
    {
      "hasTechnicalError": false,
      "hasBusinessError": false,
      "status": 200,
      "url": "/rece-etatcivil-api/v1/nomenclature/NATURE_RCA",
      "data":
          [
            {
              "id": "158a436b-330d-4c3c-83e0-e49d27390121",
              "categorie": "NATURE_RCA",
              "code": "DECLARATION_JUDICIAIRE_ABSENCE",
              "libelle": "déclaration judiciaire d'absence",
              "estActif": true,
              "usagePacs": null,
              "type": null,
              "sousType": null,
              "decisionCouple": false,
              "article": "la",
              "categorieRCRCA": "ABSENCE"
            },
            {
              "id": "258a436b-330d-4c3c-83e0-e49d27390122",
              "categorie": "NATURE_RCA",
              "code": "DECLARATION_JUDICIAIRE_DECES",
              "libelle": "déclaration judiciaire de décès",
              "estActif": true,
              "usagePacs": null,
              "type": null,
              "sousType": null,
              "decisionCouple": false,
              "article": "la",
              "categorieRCRCA": "DECES"
            },
            {
              "id": "358a436b-330d-4c3c-83e0-e49d27390123",
              "categorie": "NATURE_RCA",
              "code": "MORT_DEPORTATION",
              "libelle": "mort en déportation",
              "estActif": true,
              "usagePacs": null,
              "type": null,
              "sousType": null,
              "decisionCouple": false,
              "article": "la",
              "categorieRCRCA": "DECES"
            }]
    };