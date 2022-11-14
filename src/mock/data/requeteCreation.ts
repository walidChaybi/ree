import { IRequeteCreation } from "@model/requete/IRequeteCreation";

const pieceJustificative = {
  id: "1234",
  nom: "fichierPJ",
  mimeType: "application/pdf",
  extension: null,
  taille: 0,
  referenceSwift: "Bon.pdf",
  conteneurSwift: "pieces_justificatives",
  contenu: null,
  typePieceJustificative: "f4e3453b-7713-45ef-a82c-e40df43d5b67",
  typeObjetPj: "CREATION",
  idFichierNatali: "idFichierNatali",
  ordreNatali: 1,
  estPieceAnnexe: true,
  idActe: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  documentPj: null
};

export const requeteCreation = {
  id: "3ed9aa4e-921b-489f-b8fe-531dd703c60c",
  numeroFonctionnel: "2H5U3Q",
  dateCreation: 1656404736683,
  canal: "RIE",
  type: "CREATION",
  actions: [
    {
      id: "3ed97fb3-54ff-4bd4-925e-f0711ea215ec",
      numeroOrdre: 1,
      libelle: "A traiter",
      dateAction: 1656404736683,
      idUtilisateur: "c4b37383-54c8-4f65-afdf-be1355a90ee2"
    }
  ],
  titulaires: [
    {
      id: "3ed9efe4-c196-4888-8ffe-938f37a5f73f",
      position: 3,
      nomNaissance: "nomNaissance",
      nomUsage: "nomUsage",
      anneeNaissance: 2000,
      moisNaissance: 2,
      jourNaissance: 1,
      villeNaissance: "villeNaissance",
      codePostalNaissance: "codePostalNaissance",
      arrondissementNaissance: "arrondissementNaissance",
      villeEtrangereNaissance: "villeEtrangereNaissance",
      regionNaissance: "regionNaissance",
      paysNaissance: "paysNaissance",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "3ed9b068-0bd6-4238-a1a0-eebf314f0f2b",
          numeroOrdre: 1,
          prenom: "prenom",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [
        {
          id: "3ed998db-c315-4c4a-91d7-91a4d96d15ca",
          position: 1,
          nomNaissance: "nomNaissance",
          prenoms: [
            {
              id: "3ed94f2b-5cfe-4f49-ab33-1d3e4be2fc8e",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ]
        }
      ],
      deces: {
        id: "3ed93fb2-693e-4e2b-af82-5977e02962b2",
        jour: 1,
        mois: 2,
        annee: 2000,
        ville: "ville",
        arrondissement: "arrondissement",
        region: "region",
        pays: "pays"
      },
      domiciliation: {
        id: "3ed9df35-de02-4930-a4e0-6bbd1163aac1",
        ligne2: "ligne2",
        ligne3: "ligne3",
        ligne4: "ligne4",
        ligne5: "ligne5",
        codePostal: "codePostal",
        ville: "ville",
        villeEtrangere: "villeEtrangere",
        arrondissement: "arrondissement",
        region: "region",
        pays: "pays"
      },
      evenementUnions: [],
      typeObjetTitulaire: "TITULAIRE_ACTE_TRANSCRIT_DRESSE",
      nomDemandeFrancisation: "nomDemandeFrancisation",
      nomDemandeIdentification: "nomDemandeIdentification",
      nomSecable: true,
      nomPremierePartie: "nomPremierePartie",
      nomSecondePartie: "nomSecondePartie",
      courriel: "courriel",
      telephone: "telephone",
      situationFamilliale: "CELIBATAIRE",
      nationalites: [
        {
          id: "3ed9cf6f-137c-4193-87ea-901373a5e75e",
          nationalite: "nationalite"
        }
      ],
      prenomsDemande: [
        {
          id: "3ed90039-998d-4597-a4f7-a11423a68a46",
          numeroOrdre: 1,
          prenom: "prenom",
          estPrenomFrRetenuSdanf: null
        }
      ],
      lienEtatCivil: [],
      retenueSdanf: {
        id: "3ed91e46-24ce-46ae-b366-665bfddae946",
        nomNaissance: "nomNaissance",
        nomUsage: "nomUsage",
        nomActuel: "nomActuel",
        nomDemandeFrancisation: null,
        nomDemandeIdentification: null,
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        codePostalNaissance: "codePostalNaissance",
        villeNaissance: "villeNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance",
        prenomsRetenu: [
          {
            id: "3ed9afff-6da3-489b-bc06-be897bdfe279",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ]
      },
      nomEtrangerUtilise: true,
      nomEtranger: "nomEtranger",
      choixDeNom: "NOM_PERE"
    },
    {
      id: "3ed943e2-daa0-45c0-befd-b5f6b69c31d8",
      position: 1,
      nomNaissance: "dupont",
      nomUsage: "dupont",
      anneeNaissance: 1963,
      moisNaissance: 3,
      jourNaissance: 4,
      villeNaissance: "nantes",
      codePostalNaissance: "44000",
      arrondissementNaissance: "arrondissementNaissance",
      villeEtrangereNaissance: "villeEtrangereNaissance",
      regionNaissance: "regionNaissance",
      paysNaissance: "paysNaissance",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "3ed9d90f-3e67-42d2-9215-a85c6fa4943b",
          numeroOrdre: 1,
          prenom: "paul",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [
        {
          id: "3ed9aa36-dfed-4d6c-b711-af5202e5b920",
          position: 1,
          nomNaissance: "dupont",
          prenoms: [
            {
              id: "3ed9d127-ad70-4fa6-8b19-ed530b9be9f9",
              numeroOrdre: 1,
              prenom: "luc",
              estPrenomFrRetenuSdanf: null
            }
          ]
        }
      ],
      deces: {
        id: "3ed9b86b-cd4e-4799-94c4-e047e6e74850",
        jour: 1,
        mois: 2,
        annee: 2000,
        ville: "ville",
        arrondissement: "arrondissement",
        region: "region",
        pays: "pays"
      },
      domiciliation: {
        id: "3ed990d2-aba8-4fa1-9d0e-6f02c957ba2a",
        ligne2: "ligne2",
        ligne3: "ligne3",
        ligne4: "ligne4",
        ligne5: "ligne5",
        codePostal: "44000",
        ville: "ville",
        villeEtrangere: "villeEtrangere",
        arrondissement: "arrondissement",
        region: "region",
        pays: "pays"
      },
      evenementUnions: [],
      typeObjetTitulaire: "POSTULANT_NATIONALITE",
      nomDemandeFrancisation: "nomDemandeFrancisation",
      nomDemandeIdentification: "nomDemandeIdentification",
      nomSecable: true,
      nomPremierePartie: "nomPremierePartie",
      nomSecondePartie: "nomSecondePartie",
      courriel: "courriel",
      telephone: "telephone",
      situationFamilliale: "CELIBATAIRE",
      nationalites: [
        {
          id: "3ed99c75-17eb-4a09-b747-4cb82387e065",
          nationalite: "francaise"
        }
      ],
      prenomsDemande: [
        {
          id: "3ed9b0f7-921c-4ef3-90a5-bff52013a780",
          numeroOrdre: 1,
          prenom: "prenom",
          estPrenomFrRetenuSdanf: null
        }
      ],
      lienEtatCivil: [],
      retenueSdanf: {
        id: "3ed91bb9-1949-4625-b06f-7ce487f8f827",
        nomNaissance: "nomNaissance",
        nomUsage: "nomUsage",
        nomActuel: "nomActuel",
        nomDemandeFrancisation: null,
        nomDemandeIdentification: null,
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        codePostalNaissance: "codePostalNaissance",
        villeNaissance: "villeNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance",
        prenomsRetenu: [
          {
            id: "3ed99ec3-a80f-480d-b91f-b4068f0b3bf6",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ]
      },
      nomActuel: "nomActuel",
      nombreEnfantMineur: 0,
      nombreEnfantEffetCollectif: 0
    },
    {
      id: "3ed91fbd-d9c4-491a-adb3-b673f794b8cd",
      position: 2,
      nomNaissance: "nomNaissance",
      nomUsage: "nomUsage",
      anneeNaissance: 2000,
      moisNaissance: 2,
      jourNaissance: 1,
      villeNaissance: "villeNaissance",
      codePostalNaissance: "codePostalNaissance",
      arrondissementNaissance: "arrondissementNaissance",
      villeEtrangereNaissance: "villeEtrangereNaissance",
      regionNaissance: "regionNaissance",
      paysNaissance: "paysNaissance",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "3ed95add-6e3d-4e48-b278-1f25b570659e",
          numeroOrdre: 1,
          prenom: "prenom",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [
        {
          id: "3ed9bfb9-acef-4243-8c91-e28a4c150f2c",
          position: 1,
          nomNaissance: "nomNaissance",
          prenoms: [
            {
              id: "3ed9c7b6-f22f-41ab-96e3-c8ef1ca8b6d0",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ]
        }
      ],
      deces: {
        id: "3ed99e76-772b-45fc-bd94-bad9839c7e10",
        jour: 1,
        mois: 2,
        annee: 2000,
        ville: "ville",
        arrondissement: "arrondissement",
        region: "region",
        pays: "pays"
      },
      domiciliation: {
        id: "3ed92761-bdba-4012-bdb8-0798a5c9ed75",
        ligne2: "ligne2",
        ligne3: "ligne3",
        ligne4: "ligne4",
        ligne5: "ligne5",
        codePostal: "codePostal",
        ville: "ville",
        villeEtrangere: "villeEtrangere",
        arrondissement: "arrondissement",
        region: "region",
        pays: "pays"
      },
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: "nomDemandeFrancisation",
      nomDemandeIdentification: "nomDemandeIdentification",
      nomSecable: true,
      nomPremierePartie: "nomPremierePartie",
      nomSecondePartie: "nomSecondePartie",
      courriel: "courriel",
      telephone: "telephone",
      situationFamilliale: "CELIBATAIRE",
      nationalites: [
        {
          id: "3ed976c8-3d2f-4207-99e3-c226d8e1f2e8",
          nationalite: "nationalite"
        }
      ],
      prenomsDemande: [
        {
          id: "3ed981bb-027d-43e8-bb0a-759128070b9e",
          numeroOrdre: 1,
          prenom: "prenom",
          estPrenomFrRetenuSdanf: null
        }
      ],
      lienEtatCivil: [],
      retenueSdanf: {
        id: "3ed92be9-acf6-4cab-92f4-0f56a7657cf9",
        nomNaissance: "nomNaissance",
        nomUsage: "nomUsage",
        nomActuel: "nomActuel",
        nomDemandeFrancisation: null,
        nomDemandeIdentification: null,
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        codePostalNaissance: "codePostalNaissance",
        villeNaissance: "villeNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance",
        prenomsRetenu: [
          {
            id: "3ed9ad11-a3bb-43e5-aef1-36236d665b0a",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ]
      },
      qualite: "PARENT",
      numeroDossierNational: "numeroDossierNational",
      demandeEffetCollectif: true,
      valideEffetCollectif: "valideEffetCollectif",
      residence: "IDENTIQUE_TITULAIRE_REQUETE",
      domiciliationEnfant: "domiciliationEnfant",
      parent2Enfant: null
    }
  ],
  corbeilleAgent: {
    id: "bbdba5f5-0b65-40d1-a44c-fbbab948b3b6",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55"
  },
  corbeilleService: {
    id: "8035fb6c-df33-11eb-ba80-0242ac130004",
    idEntiteRattachement: "6737566d-0f25-45dc-8443-97b444e6753a"
  },
  piecesJustificatives: [
    {
      id: "3ed92b89-268a-4883-a41f-0763cfea9ef7",
      nom: "nom",
      mimeType: "image/jpeg",
      extension: null,
      taille: 0,
      referenceSwift: "thumbnail_IMG-1279.jpg",
      conteneurSwift: "pieces_justificatives",
      contenu: null,
      typePieceJustificative: "f4e3453b-7713-45ef-a82c-e40df43d5b67",
      typeObjetPj: "CREATION",
      idFichierNatali: "idFichierNatali",
      ordreNatali: 1,
      estPieceAnnexe: true,
      idActe: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      documentPj: {
        id: "3ed9969b-d439-48d4-b163-4e1a525aaf6d",
        libelle: "etat_civil",
        categorie: "PIECE_IDENTITE",
        piecesJustificatives: null
      }
    },
    {
      id: "3ed999b9-bdaa-44e6-8c02-84b94635a912",
      nom: "nom",
      mimeType: "image/jpeg",
      extension: null,
      taille: 0,
      referenceSwift: "thumbnail_IMG-1279.jpg",
      conteneurSwift: "pieces_justificatives",
      contenu: null,
      typePieceJustificative: "f4e3453b-7713-45ef-a82c-e40df43d5b67",
      typeObjetPj: "CREATION",
      idFichierNatali: "idFichierNatali",
      ordreNatali: 1,
      estPieceAnnexe: true,
      idActe: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      documentPj: {
        id: "3ed9969b-d439-48d4-b163-4e1a525aaf6d",
        libelle: "etat_civil",
        categorie: "PIECE_IDENTITE",
        piecesJustificatives: null
      }
    },
    {
      id: "3ed9ad41-ca61-416a-91df-448690804363",
      nom: "nom",
      mimeType: "application/pdf",
      extension: null,
      taille: 0,
      referenceSwift: "Bon.pdf",
      conteneurSwift: "pieces_justificatives",
      contenu: null,
      typePieceJustificative: "f4e3453b-7713-45ef-a82c-e40df43d5b67",
      typeObjetPj: "CREATION",
      idFichierNatali: "idFichierNatali",
      ordreNatali: 1,
      estPieceAnnexe: true,
      idActe: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      documentPj: {
        id: "3ed90e37-a51b-4f1e-bd5a-6b2423ea9427",
        libelle: "etat_civil",
        categorie: "PIECE_IDENTITE",
        piecesJustificatives: null
      }
    }
  ],
  requerant: {
    id: "3ed9ea0d-9e13-4249-a82c-3ec2e600175a",
    dateCreation: 1,
    nomFamille: "nomFamille",
    prenom: "prenom",
    courriel: "courriel",
    telephone: "telephone",
    adresse: {
      id: "3ed9e295-ef27-4ea3-9034-79da79947fdb",
      ligne2: "ligne2",
      ligne3: "ligne3",
      ligne4: "ligne4",
      ligne5: "ligne5",
      codePostal: "codePostal",
      ville: "ville",
      pays: "pays"
    },
    qualite: "PARTICULIER",
    detailQualiteRece: null,
    detailQualiteParticulier: null,
    detailQualiteMandataireHabilite: null,
    detailQualiteInstitutionnel: null,
    detailQualiteAutreProfessionnel: null,
    lienRequerant: {
      id: "3ed961da-d02e-4a6d-8855-a01d6b719488",
      typeLienRequerant: "TITULAIRE",
      nature: "nature"
    }
  },
  mandant: null,
  observations: [],
  statut: {
    id: "3ed97a35-c9b0-4ae4-b2dc-75eb84e4e82d",
    statutRequete: "PRISE_EN_CHARGE",
    dateEffet: 1656404736683,
    raisonStatut: null
  },
  lienRequerant: {
    id: "3ed961da-d02e-4a6d-8855-a01d6b719488",
    typeLienRequerant: "TITULAIRE",
    nature: "nature"
  },
  doublons: [],
  origines: null,
  numeroRequeteOrigine: null,
  sousType: "RCEXR",
  numeroAncienSI: "numeroAncienSI",
  dossierSignale: true,
  commentaire: "commentaire",
  demandeIdentification: null,
  demandeFrancisation: true,
  provenance: "COURRIER",
  provenanceServicePublic: null,
  provenanceNatali: {
    id: "3ed9bc79-6d67-45c6-98a1-d4b3b53d3132",
    numeroDossierNational: "numeroDossierNational",
    statutNatali: "statutNatali",
    provenanceNaturalisation: "NATALI",
    numeroDossierLocal: "numeroDossierLocal",
    dateDepot: 0,
    datePriseEnChargeSdanf: 0,
    decisionSdanf: "decisionSdanf",
    tagPriorisation: "SCEC",
    agentSdanf: {
      id: "3ed92284-1ef8-468f-b920-2edd64a9d1a0",
      nom: "nom",
      prenom: "prenom",
      courriel: "courriel"
    }
  },
  provenanceRece: null,
  documentsPj: [
    {
      id: "3ed9969b-d439-48d4-b163-4e1a525aaf6d",
      libelle: "etat_civil",
      categorie: "PIECE_IDENTITE",
      piecesJustificatives: [pieceJustificative]
    },
    {
      id: "3ed90e37-a51b-4f1e-bd5a-6b2423ea9421",
      libelle: "etat_civil",
      categorie: "TITRE_SEJOUR",
      piecesJustificatives: [{ ...pieceJustificative }]
    },
    {
      id: "3ed90e37-a51b-4f1e-bd5a-6b2423ea9422",
      libelle: "union_actuelle",
      categorie: "ACTE_MARIAGE",
      piecesJustificatives: [{ ...pieceJustificative }]
    },
    {
      id: "3ed90e37-a51b-4f1e-bd5a-6b2423ea9423",
      libelle: "parents_et_fratrie",
      categorie: "ACTE_MARIAGE_PARENTS",
      piecesJustificatives: [{ ...pieceJustificative }]
    },
    {
      id: "3ed90e37-a51b-4f1e-bd5a-6b2423ea9424",
      libelle: "parents 2",
      categorie: "ACTE_ETAT_CIVIL_PARENT",
      piecesJustificatives: [{ ...pieceJustificative }]
    },
    {
      id: "3ed90e37-a51b-4f1e-bd5a-6b2423ea9425",
      libelle: "parents 1",
      categorie: "ACTE_ETAT_CIVIL_PARENT",
      piecesJustificatives: [{ ...pieceJustificative }]
    },
    {
      id: "3ed90e37-a51b-4f1e-bd5a-6b2423ea9426",
      libelle: "parents 3",
      categorie: "ACTE_ETAT_CIVIL_PARENT",
      piecesJustificatives: [{ ...pieceJustificative }]
    },
    {
      id: "3ed90e37-a51b-4f1e-bd5a-6b2423ea9429",
      libelle: "libelle pourri 10",
      categorie: "PREUVE_DIVORCE",
      piecesJustificatives: [{ ...pieceJustificative }]
    }
  ],
  campagne: "campagne",
  nature: "NATURALISATION",
  dossierNouveaux: null,
  dossierOrigines: null,
  decret: null
} as any as IRequeteCreation;

export const requeteCreationSansRequerantAvecInfosSpecifiquesEtInformationsTitulaireEtUnEnfantMajeur =
  {
    id: "6ccc9d0d-0895-48cb-8a9b-f56ee0beb85b",
    numeroFonctionnel: "FVWM1E",
    dateCreation: 1657110493196,
    canal: "RIE",
    type: "CREATION",
    actions: [
      {
        id: "6ccc49a8-1f63-427d-a6f1-59f4c29a494c",
        numeroOrdre: 1,
        libelle: "A traiter",
        dateAction: 1657110493196,
        idUtilisateur: "c4b37383-54c8-4f65-afdf-be1355a90ee2"
      }
    ],
    titulaires: [
      {
        id: "6ccc5c15-629e-4371-977a-b8cb8d90e99a",
        position: 3,
        nomNaissance: "nomNaissance",
        nomUsage: "nomUsage",
        anneeNaissance: 2000,
        moisNaissance: 2,
        jourNaissance: 1,
        villeNaissance: "villeNaissance",
        codePostalNaissance: "codePostalNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "6cccb9d4-369c-45a7-982f-6ecdc1006969",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: [],
        deces: {
          id: "6ccc6d55-3c03-470a-8dd1-df941fca9624",
          jour: 1,
          mois: 2,
          annee: 2000,
          ville: "ville",
          arrondissement: "arrondissement",
          region: "region",
          pays: "pays"
        },
        domiciliation: {
          id: "6ccc026c-9a6e-4dd6-888a-9107d5e5af84",
          ligne2: "ligne2",
          ligne3: "ligne3",
          ligne4: "ligne4",
          ligne5: "ligne5",
          codePostal: "codePostal",
          ville: "ville",
          villeEtrangere: "villeEtrangere",
          arrondissement: "arrondissement",
          region: "region",
          pays: "pays"
        },
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "nomDemandeFrancisation",
        nomDemandeIdentification: "nomDemandeIdentification",
        nomSecable: true,
        nomPremierePartie: "nomPremierePartie",
        nomSecondePartie: "nomSecondePartie",
        courriel: "courriel",
        telephone: "telephone",
        situationFamilliale: "CELIBATAIRE",
        nationalites: [
          {
            id: "6cccd86a-535b-4ee1-9805-5e146e09718d",
            nationalite: "nationalite"
          }
        ],
        prenomsDemande: [
          {
            id: "6ccc59cc-afb6-4506-9b19-af580a332d5d",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        lienEtatCivil: [],
        retenueSdanf: {
          id: "6ccc98eb-632f-48b2-b898-6fae9066e734",
          nomNaissance: "nomNaissance",
          nomUsage: "nomUsage",
          nomActuel: "nomActuel",
          nomDemandeFrancisation: null,
          nomDemandeIdentification: null,
          jourNaissance: 1,
          moisNaissance: 2,
          anneeNaissance: 2000,
          codePostalNaissance: "codePostalNaissance",
          villeNaissance: "villeNaissance",
          villeEtrangereNaissance: "villeEtrangereNaissance",
          arrondissementNaissance: "arrondissementNaissance",
          regionNaissance: "regionNaissance",
          paysNaissance: "paysNaissance",
          prenomsRetenu: [
            {
              id: "6cccd80a-ff7a-4e49-856a-173932ee15b0",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ]
        },
        qualite: "PARENT2ENFANT",
        numeroDossierNational: "numeroDossierNational",
        demandeEffetCollectif: true,
        valideEffetCollectif: "valideEffetCollectif",
        residence: "IDENTIQUE_TITULAIRE_REQUETE",
        domiciliationEnfant: "domiciliationEnfant",
        parent2Enfant: null
      },
      {
        id: "6ccc7855-569c-4ed4-b5e5-206191d46cdc",
        position: 1,
        nomNaissance: "dupont",
        nomUsage: "dupont",
        anneeNaissance: 1963,
        moisNaissance: 3,
        jourNaissance: 4,
        villeNaissance: "nantes",
        codePostalNaissance: "44000",
        arrondissementNaissance: "arrondissementNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "6ccc6cee-1a41-48c2-b6b8-378be40d4af9",
            numeroOrdre: 1,
            prenom: "paul",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: [
          {
            id: "6ccc821f-5575-4cd1-8333-c867b2d2cbd2",
            position: 1,
            nomNaissance: "dupont",
            prenoms: [
              {
                id: "6cccff75-4a37-41e0-80b5-307ada9672b8",
                numeroOrdre: 1,
                prenom: "luc",
                estPrenomFrRetenuSdanf: null
              }
            ]
          }
        ],
        deces: {
          id: "6cccb8c3-d733-41ea-acb9-9a39ac43770d",
          jour: 1,
          mois: 2,
          annee: 2000,
          ville: "ville",
          arrondissement: "arrondissement",
          region: "region",
          pays: "pays"
        },
        domiciliation: {
          id: "6cccea7d-d1e2-466f-9e60-6f88d89d2312",
          ligne2: "ligne2",
          ligne3: "ligne3",
          ligne4: "ligne4",
          ligne5: "ligne5",
          codePostal: "44000",
          ville: "ville",
          villeEtrangere: "villeEtrangere",
          arrondissement: "arrondissement",
          region: "region",
          pays: "pays"
        },
        evenementUnions: [],
        typeObjetTitulaire: "POSTULANT_NATIONALITE",
        nomDemandeFrancisation: "nomDemandeFrancisation",
        nomDemandeIdentification: "nomDemandeIdentification",
        nomSecable: true,
        nomPremierePartie: "nomPremierePartie",
        nomSecondePartie: "nomSecondePartie",
        courriel: "courriel",
        telephone: "telephone",
        situationFamilliale: "CELIBATAIRE",
        nationalites: [
          {
            id: "6ccc914d-6cf1-4a16-8628-21cc27811663",
            nationalite: "francaise"
          }
        ],
        prenomsDemande: [
          {
            id: "6ccc4028-7422-4e7a-b733-a43b8114c6c6",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        lienEtatCivil: [],
        retenueSdanf: {
          id: "6ccc9d4a-fbbe-4d39-9eca-bbc1ef7d9eff",
          nomNaissance: "nomNaissance",
          nomUsage: "nomUsage",
          nomActuel: "nomActuel",
          nomDemandeFrancisation: null,
          nomDemandeIdentification: null,
          jourNaissance: 1,
          moisNaissance: 2,
          anneeNaissance: 2000,
          codePostalNaissance: "codePostalNaissance",
          villeNaissance: "villeNaissance",
          villeEtrangereNaissance: "villeEtrangereNaissance",
          arrondissementNaissance: "arrondissementNaissance",
          regionNaissance: "regionNaissance",
          paysNaissance: "paysNaissance",
          prenomsRetenu: [
            {
              id: "6cccd039-e349-4194-821b-73a7f794a2e1",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ]
        },
        nomActuel: "nomActuel",
        nombreEnfantMineur: 0,
        nombreEnfantEffetCollectif: 0
      },
      {
        id: "6ccc6706-a3d8-4fc9-b2fc-2f26338519f4",
        position: 2,
        nomNaissance: "toto",
        nomUsage: "nomUsage",
        anneeNaissance: 2000,
        moisNaissance: 2,
        jourNaissance: 1,
        villeNaissance: "villeNaissance",
        codePostalNaissance: "codePostalNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "6ccc6e6d-d4a7-48ad-a378-83815b1fef88",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: [],
        deces: null,
        domiciliation: {
          id: "6cccd4a8-fd10-4387-b772-b6955038a851",
          ligne2: "ligne2",
          ligne3: "ligne3",
          ligne4: "ligne4",
          ligne5: "ligne5",
          codePostal: "codePostal",
          ville: "ville",
          villeEtrangere: "villeEtrangere",
          arrondissement: "arrondissement",
          region: "region",
          pays: "pays"
        },
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "nomDemandeFrancisation",
        nomDemandeIdentification: "nomDemandeIdentification",
        nomSecable: true,
        nomPremierePartie: "nomPremierePartie",
        nomSecondePartie: "nomSecondePartie",
        courriel: "courriel",
        telephone: "telephone",
        situationFamilliale: "CELIBATAIRE",
        nationalites: [],
        prenomsDemande: [
          {
            id: "6cccb308-8372-42ed-9609-783af08d76dd",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        lienEtatCivil: [],
        retenueSdanf: {
          id: "6ccce804-d0af-44ae-b8ed-4241707a22d9",
          nomNaissance: "nomNaissance",
          nomUsage: "nomUsage",
          nomActuel: "nomActuel",
          nomDemandeFrancisation: null,
          nomDemandeIdentification: null,
          jourNaissance: 1,
          moisNaissance: 2,
          anneeNaissance: 2000,
          codePostalNaissance: "codePostalNaissance",
          villeNaissance: "villeNaissance",
          villeEtrangereNaissance: "villeEtrangereNaissance",
          arrondissementNaissance: "arrondissementNaissance",
          regionNaissance: "regionNaissance",
          paysNaissance: "paysNaissance",
          prenomsRetenu: [
            {
              id: "6ccc8f99-76b1-4a74-b9b8-7bc5edb33216",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ]
        },
        qualite: "ENFANT_MINEUR",
        numeroDossierNational: "numeroDossierNational",
        demandeEffetCollectif: true,
        valideEffetCollectif: "valideEffetCollectif",
        residence: "IDENTIQUE_TITULAIRE_REQUETE",
        domiciliationEnfant: "domiciliationEnfant",
        parent2Enfant: {
          id: "6ccc5c15-629e-4371-977a-b8cb8d90e99a",
          position: 3,
          nomNaissance: "nomNaissance",
          nomUsage: "nomUsage",
          anneeNaissance: 2000,
          moisNaissance: 2,
          jourNaissance: 1,
          villeNaissance: "villeNaissance",
          codePostalNaissance: "codePostalNaissance",
          arrondissementNaissance: "arrondissementNaissance",
          villeEtrangereNaissance: "villeEtrangereNaissance",
          regionNaissance: "regionNaissance",
          paysNaissance: "paysNaissance",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: [
            {
              id: "6cccb9d4-369c-45a7-982f-6ecdc1006969",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ],
          parentsTitulaire: [],
          deces: {
            id: "6ccc6d55-3c03-470a-8dd1-df941fca9624",
            jour: 1,
            mois: 2,
            annee: 2000,
            ville: "ville",
            arrondissement: "arrondissement",
            region: "region",
            pays: "pays"
          },
          domiciliation: {
            id: "6ccc026c-9a6e-4dd6-888a-9107d5e5af84",
            ligne2: "ligne2",
            ligne3: "ligne3",
            ligne4: "ligne4",
            ligne5: "ligne5",
            codePostal: "codePostal",
            ville: "ville",
            villeEtrangere: "villeEtrangere",
            arrondissement: "arrondissement",
            region: "region",
            pays: "pays"
          },
          evenementUnions: [],
          typeObjetTitulaire: "FAMILLE",
          nomDemandeFrancisation: "nomDemandeFrancisation",
          nomDemandeIdentification: "nomDemandeIdentification",
          nomSecable: true,
          nomPremierePartie: "nomPremierePartie",
          nomSecondePartie: "nomSecondePartie",
          courriel: "courriel",
          telephone: "telephone",
          situationFamilliale: "CELIBATAIRE",
          nationalites: [
            {
              id: "6cccd86a-535b-4ee1-9805-5e146e09718d",
              nationalite: "nationalite"
            }
          ],
          prenomsDemande: [
            {
              id: "6ccc59cc-afb6-4506-9b19-af580a332d5d",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ],
          lienEtatCivil: [],
          retenueSdanf: {
            id: "6ccc98eb-632f-48b2-b898-6fae9066e734",
            nomNaissance: "nomNaissance",
            nomUsage: "nomUsage",
            nomActuel: "nomActuel",
            nomDemandeFrancisation: null,
            nomDemandeIdentification: null,
            jourNaissance: 1,
            moisNaissance: 2,
            anneeNaissance: 2000,
            codePostalNaissance: "codePostalNaissance",
            villeNaissance: "villeNaissance",
            villeEtrangereNaissance: "villeEtrangereNaissance",
            arrondissementNaissance: "arrondissementNaissance",
            regionNaissance: "regionNaissance",
            paysNaissance: "paysNaissance",
            prenomsRetenu: [
              {
                id: "6cccd80a-ff7a-4e49-856a-173932ee15b0",
                numeroOrdre: 1,
                prenom: "prenom",
                estPrenomFrRetenuSdanf: null
              }
            ]
          },
          qualite: "PARENT2ENFANT",
          numeroDossierNational: "numeroDossierNational",
          demandeEffetCollectif: true,
          valideEffetCollectif: "valideEffetCollectif",
          residence: "IDENTIQUE_TITULAIRE_REQUETE",
          domiciliationEnfant: "domiciliationEnfant",
          parent2Enfant: null
        }
      },
      {
        id: "6ccc6706-a3d8-4fc9-b2fc-2f26338519f4",
        position: 4,
        nomNaissance: "toto",
        nomUsage: "nomUsage",
        anneeNaissance: 2000,
        moisNaissance: 2,
        jourNaissance: 1,
        villeNaissance: "villeNaissance",
        codePostalNaissance: "codePostalNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "6ccc6e6d-d4a7-48ad-a378-83815b1fef88",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: [],
        deces: null,
        domiciliation: {
          id: "6cccd4a8-fd10-4387-b772-b6955038a851",
          ligne2: "ligne2",
          ligne3: "ligne3",
          ligne4: "ligne4",
          ligne5: "ligne5",
          codePostal: "codePostal",
          ville: "ville",
          villeEtrangere: "villeEtrangere",
          arrondissement: "arrondissement",
          region: "region",
          pays: "pays"
        },
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "nomDemandeFrancisation",
        nomDemandeIdentification: "nomDemandeIdentification",
        nomSecable: true,
        nomPremierePartie: "nomPremierePartie",
        nomSecondePartie: "nomSecondePartie",
        courriel: "courriel",
        telephone: "telephone",
        situationFamilliale: "CELIBATAIRE",
        nationalites: [],
        prenomsDemande: [
          {
            id: "6cccb308-8372-42ed-9609-783af08d76dd",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        lienEtatCivil: [],
        retenueSdanf: {
          id: "6ccce804-d0af-44ae-b8ed-4241707a22d9",
          nomNaissance: "nomNaissance",
          nomUsage: "nomUsage",
          nomActuel: "nomActuel",
          nomDemandeFrancisation: null,
          nomDemandeIdentification: null,
          jourNaissance: 1,
          moisNaissance: 2,
          anneeNaissance: 2000,
          codePostalNaissance: "codePostalNaissance",
          villeNaissance: "villeNaissance",
          villeEtrangereNaissance: "villeEtrangereNaissance",
          arrondissementNaissance: "arrondissementNaissance",
          regionNaissance: "regionNaissance",
          paysNaissance: "paysNaissance",
          prenomsRetenu: [
            {
              id: "6ccc8f99-76b1-4a74-b9b8-7bc5edb33216",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ]
        },
        qualite: "ENFANT_MINEUR",
        numeroDossierNational: "numeroDossierNational",
        demandeEffetCollectif: true,
        valideEffetCollectif: "valideEffetCollectif",
        residence: "IDENTIQUE_TITULAIRE_REQUETE",
        domiciliationEnfant: "domiciliationEnfant",
        parent2Enfant: {
          id: "6ccc5c15-629e-4371-977a-b8cb8d90e99a",
          position: 3,
          nomNaissance: "nomNaissance",
          nomUsage: "nomUsage",
          anneeNaissance: 2000,
          moisNaissance: 2,
          jourNaissance: 1,
          villeNaissance: "villeNaissance",
          codePostalNaissance: "codePostalNaissance",
          arrondissementNaissance: "arrondissementNaissance",
          villeEtrangereNaissance: "villeEtrangereNaissance",
          regionNaissance: "regionNaissance",
          paysNaissance: "paysNaissance",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: [
            {
              id: "6cccb9d4-369c-45a7-982f-6ecdc1006969",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ],
          parentsTitulaire: [],
          deces: {
            id: "6ccc6d55-3c03-470a-8dd1-df941fca9624",
            jour: 1,
            mois: 2,
            annee: 2000,
            ville: "ville",
            arrondissement: "arrondissement",
            region: "region",
            pays: "pays"
          },
          domiciliation: {
            id: "6ccc026c-9a6e-4dd6-888a-9107d5e5af84",
            ligne2: "ligne2",
            ligne3: "ligne3",
            ligne4: "ligne4",
            ligne5: "ligne5",
            codePostal: "codePostal",
            ville: "ville",
            villeEtrangere: "villeEtrangere",
            arrondissement: "arrondissement",
            region: "region",
            pays: "pays"
          },
          evenementUnions: [],
          typeObjetTitulaire: "FAMILLE",
          nomDemandeFrancisation: "nomDemandeFrancisation",
          nomDemandeIdentification: "nomDemandeIdentification",
          nomSecable: true,
          nomPremierePartie: "nomPremierePartie",
          nomSecondePartie: "nomSecondePartie",
          courriel: "courriel",
          telephone: "telephone",
          situationFamilliale: "CELIBATAIRE",
          nationalites: [
            {
              id: "6cccd86a-535b-4ee1-9805-5e146e09718d",
              nationalite: "nationalite"
            }
          ],
          prenomsDemande: [
            {
              id: "6ccc59cc-afb6-4506-9b19-af580a332d5d",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ],
          lienEtatCivil: [],
          retenueSdanf: {
            id: "6ccc98eb-632f-48b2-b898-6fae9066e734",
            nomNaissance: "nomNaissance",
            nomUsage: "nomUsage",
            nomActuel: "nomActuel",
            nomDemandeFrancisation: null,
            nomDemandeIdentification: null,
            jourNaissance: 1,
            moisNaissance: 2,
            anneeNaissance: 2000,
            codePostalNaissance: "codePostalNaissance",
            villeNaissance: "villeNaissance",
            villeEtrangereNaissance: "villeEtrangereNaissance",
            arrondissementNaissance: "arrondissementNaissance",
            regionNaissance: "regionNaissance",
            paysNaissance: "paysNaissance",
            prenomsRetenu: [
              {
                id: "6cccd80a-ff7a-4e49-856a-173932ee15b0",
                numeroOrdre: 1,
                prenom: "prenom",
                estPrenomFrRetenuSdanf: null
              }
            ]
          },
          qualite: "PARENT2ENFANT",
          numeroDossierNational: "numeroDossierNational",
          demandeEffetCollectif: true,
          valideEffetCollectif: "valideEffetCollectif",
          residence: "IDENTIQUE_TITULAIRE_REQUETE",
          domiciliationEnfant: "domiciliationEnfant",
          parent2Enfant: null
        }
      },
      {
        id: "6ccc6706-a3d8-4fc9-b2fc-2f26338519f4",
        position: 5,
        nomNaissance: "toto",
        nomUsage: "nomUsage",
        anneeNaissance: 2000,
        moisNaissance: 2,
        jourNaissance: 1,
        villeNaissance: "villeNaissance",
        codePostalNaissance: "codePostalNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "6ccc6e6d-d4a7-48ad-a378-83815b1fef88",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: [],
        deces: null,
        domiciliation: {
          id: "6cccd4a8-fd10-4387-b772-b6955038a851",
          ligne2: "ligne2",
          ligne3: "ligne3",
          ligne4: "ligne4",
          ligne5: "ligne5",
          codePostal: "codePostal",
          ville: "ville",
          villeEtrangere: "villeEtrangere",
          arrondissement: "arrondissement",
          region: "region",
          pays: "pays"
        },
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "nomDemandeFrancisation",
        nomDemandeIdentification: "nomDemandeIdentification",
        nomSecable: true,
        nomPremierePartie: "nomPremierePartie",
        nomSecondePartie: "nomSecondePartie",
        courriel: "courriel",
        telephone: "telephone",
        situationFamilliale: "CELIBATAIRE",
        nationalites: [],
        prenomsDemande: [
          {
            id: "6cccb308-8372-42ed-9609-783af08d76dd",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        lienEtatCivil: [],
        retenueSdanf: {
          id: "6ccce804-d0af-44ae-b8ed-4241707a22d9",
          nomNaissance: "nomNaissance",
          nomUsage: "nomUsage",
          nomActuel: "nomActuel",
          nomDemandeFrancisation: null,
          nomDemandeIdentification: null,
          jourNaissance: 1,
          moisNaissance: 2,
          anneeNaissance: 2000,
          codePostalNaissance: "codePostalNaissance",
          villeNaissance: "villeNaissance",
          villeEtrangereNaissance: "villeEtrangereNaissance",
          arrondissementNaissance: "arrondissementNaissance",
          regionNaissance: "regionNaissance",
          paysNaissance: "paysNaissance",
          prenomsRetenu: [
            {
              id: "6ccc8f99-76b1-4a74-b9b8-7bc5edb33216",
              numeroOrdre: 1,
              prenom: "prenom",
              estPrenomFrRetenuSdanf: null
            }
          ]
        },
        qualite: "ENFANT_MAJEUR",
        numeroDossierNational: "numeroDossierNational"
      },
      {
        id: "d849143b-1ad8-480b-aa4c-ed2a86bf916e",
        position: 6,
        nomNaissance: "ERIC",
        nomUsage: null,
        anneeNaissance: 1977,
        moisNaissance: 4,
        jourNaissance: 3,
        villeNaissance: null,
        codePostalNaissance: null,
        arrondissementNaissance: null,
        villeEtrangereNaissance: "lieuTunis",
        regionNaissance: null,
        paysNaissance: "TUNISIE",
        sexe: "FEMININ",
        nationalite: {
          _libelle: "Étrangère",
          _nom: "ETRANGERE"
        },
        prenoms: [
          {
            id: "d8495c0b-3cc7-4af7-8f94-279c9e215547",
            numeroOrdre: 1,
            prenom: "Sarah",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: [],
        deces: null,
        domiciliation: null,
        evenementUnions: [
          {
            id: "d84972a1-c59f-4005-bfe7-b02422d7a3c0",
            type: "DISSOLUTION_DIVORCE",
            jour: 2,
            mois: 12,
            annee: 1993,
            ville: "testVille",
            arrondissement: null,
            region: null,
            pays: "TUNISIE",
            situationActuelle: false
          },
          {
            id: "d84988df-05b5-4f29-bb8d-7fc4b93b8d91",
            type: "UNION",
            jour: 12,
            mois: 4,
            annee: 1992,
            ville: "VilleTest",
            arrondissement: null,
            region: null,
            pays: "TUNISIE",
            situationActuelle: false
          }
        ],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: null,
        nomDemandeIdentification: null,
        nomSecable: null,
        nomPremierePartie: null,
        nomSecondePartie: null,
        courriel: null,
        telephone: null,
        situationFamilliale: null,
        nationalites: [
          {
            id: "d849c550-c4e3-4215-997a-d498ea63e010",
            nationalite: "tunisienne"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        retenueSdanf: null,
        qualite: "ANCIEN_CONJOINT",
        numeroDossierNational: null,
        demandeEffetCollectif: null,
        valideEffetCollectif: null,
        residence: null,
        domiciliationEnfant: null,
        parent2Enfant: null,
        situationFamiliale: null
      },
      {
        id: "d84903a8-f4c3-43e6-a8e1-1c762d082b89",
        position: 7,
        nomNaissance: "DUPONT",
        nomUsage: null,
        anneeNaissance: 1994,
        moisNaissance: 2,
        jourNaissance: 3,
        villeNaissance: "Versailles",
        codePostalNaissance: "78000",
        arrondissementNaissance: null,
        villeEtrangereNaissance: null,
        regionNaissance: null,
        paysNaissance: "FRANCE",
        sexe: "FEMININ",
        nationalite: {
          _libelle: "Française",
          _nom: "FRANCAISE"
        },
        prenoms: [
          {
            id: "d849f6fd-84cf-4aba-8f51-92315f95405c",
            numeroOrdre: 1,
            prenom: "Marie",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: [],
        deces: null,
        domiciliation: null,
        evenementUnions: [
          {
            id: "d849f293-2218-4752-8f61-ca6023c6c4da",
            type: "MARIAGE",
            jour: 12,
            mois: 1,
            annee: 1994,
            ville: "France",
            arrondissement: null,
            region: null,
            pays: "FRANCE",
            situationActuelle: true
          }
        ],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: null,
        nomDemandeIdentification: null,
        nomSecable: null,
        nomPremierePartie: null,
        nomSecondePartie: null,
        courriel: null,
        telephone: null,
        situationFamilliale: null,
        nationalites: [
          {
            id: "d8490c10-92c0-42c3-a68c-4bcf6627fed0",
            nationalite: "française"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        retenueSdanf: {
          id: "d84929f5-da58-4804-8452-578113581654",
          nomNaissance: "DUPONT",
          nomUsage: null,
          nomActuel: null,
          nomDemandeFrancisation: null,
          nomDemandeIdentification: null,
          jourNaissance: 3,
          moisNaissance: 2,
          anneeNaissance: 1994,
          codePostalNaissance: "78000",
          villeNaissance: "Versailles",
          villeEtrangereNaissance: null,
          arrondissementNaissance: null,
          regionNaissance: null,
          paysNaissance: "FRANCE",
          prenomsRetenu: [
            {
              id: "d8490ac0-1378-46a5-8e08-96cf3edc425a",
              numeroOrdre: 1,
              prenom: "Marie",
              estPrenomFrRetenuSdanf: null
            }
          ]
        },
        qualite: "CONJOINT_ACTUEL",
        numeroDossierNational: null,
        demandeEffetCollectif: null,
        valideEffetCollectif: null,
        residence: null,
        domiciliationEnfant: null,
        parent2Enfant: null,
        situationFamiliale: null
      },
      {
        id: "d8494659-335b-4b40-a687-6f64e4933e61",
        position: 8,
        nomNaissance: "RAMIRES",
        nomUsage: null,
        anneeNaissance: 1994,
        moisNaissance: 11,
        jourNaissance: 3,
        villeNaissance: "Paris",
        codePostalNaissance: "75000",
        arrondissementNaissance: null,
        villeEtrangereNaissance: null,
        regionNaissance: null,
        paysNaissance: "FRANCE",
        sexe: "MASCULIN",
        nationalite: {
          _libelle: "Française",
          _nom: "FRANCAISE"
        },
        prenoms: [
          {
            id: "d849adb4-fe58-4dcf-be5c-c265b7e0f3be",
            numeroOrdre: 1,
            prenom: "Alex",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: [],
        deces: null,
        domiciliation: null,
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: null,
        nomDemandeIdentification: null,
        nomSecable: null,
        nomPremierePartie: null,
        nomSecondePartie: null,
        courriel: null,
        telephone: null,
        situationFamilliale: null,
        nationalites: [
          {
            id: "d849b62a-e9e0-494f-a00b-c066a6f769ec",
            nationalite: "française"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        retenueSdanf: {
          id: "d84901a9-0af9-4248-88d5-df9ae4853fbf",
          nomNaissance: "DUPOND",
          nomUsage: null,
          nomActuel: null,
          nomDemandeFrancisation: null,
          nomDemandeIdentification: null,
          jourNaissance: 3,
          moisNaissance: 11,
          anneeNaissance: 1994,
          codePostalNaissance: "75000",
          villeNaissance: "Paris",
          villeEtrangereNaissance: null,
          arrondissementNaissance: null,
          regionNaissance: null,
          paysNaissance: "FRANCE",
          prenomsRetenu: [
            {
              id: "d8497e48-57ec-4616-bead-ae73d582cf30",
              numeroOrdre: 1,
              prenom: "Alex",
              estPrenomFrRetenuSdanf: null
            }
          ]
        },
        qualite: "FRATRIE",
        numeroDossierNational: null,
        demandeEffetCollectif: null,
        valideEffetCollectif: null,
        residence: null,
        domiciliationEnfant: null,
        parent2Enfant: null,
        situationFamiliale: null
      }
    ],
    corbeilleAgent: null,
    corbeilleService: {
      id: "8035fb6c-df33-11eb-ba80-0242ac130004",
      idEntiteRattachement: "6737566d-0f25-45dc-8443-97b444e6753a"
    },
    piecesJustificatives: [],
    requerant: {
      id: "6ccccf51-2777-42a5-a37b-5c2e19457a5b",
      dateCreation: 1,
      nomFamille: "nomFamille",
      prenom: "prenom",
      courriel: "courriel",
      telephone: "telephone",
      adresse: {
        id: "6ccc1b20-73c8-4ae6-929d-b22fa393b755",
        ligne2: "ligne2",
        ligne3: "ligne3",
        ligne4: "ligne4",
        ligne5: "ligne5",
        codePostal: "codePostal",
        ville: "ville",
        pays: "pays"
      },
      qualite: "PARTICULIER",
      detailQualiteRece: null,
      detailQualiteParticulier: null,
      detailQualiteMandataireHabilite: null,
      detailQualiteInstitutionnel: null,
      detailQualiteAutreProfessionnel: null,
      lienRequerant: {
        id: "6ccc2e39-07cd-42d1-934e-c7898809f7ec",
        typeLienRequerant: "TITULAIRE",
        nature: "nature"
      }
    },
    mandant: null,
    observations: [],
    statut: {
      id: "6ccc6eaa-4fc6-4252-88a2-f2ce1d27c947",
      statutRequete: "A_TRAITER",
      dateEffet: 1657110493196,
      raisonStatut: null
    },
    lienRequerant: {
      id: "6ccc2e39-07cd-42d1-934e-c7898809f7ec",
      typeLienRequerant: "TITULAIRE",
      nature: "nature"
    },
    doublons: [],
    origines: null,
    numeroRequeteOrigine: null,
    sousType: "RCEXR",
    numeroAncienSI: "numeroAncienSI",
    dossierSignale: true,
    commentaire: "commentaire",
    demandeIdentification: null,
    demandeFrancisation: true,
    provenance: "COURRIER",
    provenanceServicePublic: null,
    provenanceNatali: {
      id: "6ccc27a3-42bd-4a50-a7fc-5c79ff8c9995",
      numeroDossierNational: "numeroDossierNational2",
      statutNatali: "statutNatali",
      provenanceNaturalisation: "NATALI",
      numeroDossierLocal: "numeroDossierLocal",
      dateDepot: 0,
      datePriseEnChargeSdanf: 0,
      decisionSdanf: "decisionSdanf",
      tagPriorisation: "SCEC",
      agentSdanf: {
        id: "6ccc4c18-115e-406f-9a99-241888fc6394",
        nom: "nom",
        prenom: "prenom",
        courriel: "courriel"
      }
    },
    provenanceRece: null,
    documentsPj: [],
    campagne: "campagne",
    nature: "NATURALISATION",
    dossierNouveaux: null,
    dossierOrigines: null,
    decret: null
  } as any as IRequeteCreation;

export const requeteCreationAvecMessagesRetourSDANFSansLesDroits = {
  ...requeteCreation,
  provenanceNatali: {
    ...requeteCreation.provenanceNatali,
    echanges: [
      {
        id: "0feca576-2766-4937-af7c-d921270518e6",
        emetteur: "SCEC",
        destinataire: "SDANF",
        nature: "RESPONSE_SCEC",
        dateMessage: 1659616136550,
        message:
          "Acte irrecevable - Bonjour je ne peux recevoir votre demande - Johann"
      },
      {
        id: "0feca576-2766-4937-af7c-d921270518e7",
        emetteur: "SCEC",
        destinataire: "SDANF",
        nature: "RESPONSE_SCEC",
        dateMessage: 1659616134450,
        message: "Acte irrecevable - Je suis un message de test - Johann"
      }
    ]
  }
};

export const requeteCreationAvecMessagesRetourSDANFAvecMauvaisStatus = {
  ...requeteCreation,
  id: "3ed97a35-c9b0-4ae4-b2dc-75eb84e4085c",
  provenanceNatali: {
    ...requeteCreation.provenanceNatali,
    echanges: [
      {
        id: "0feca576-2766-4937-af7c-d921270518e6",
        emetteur: "SCEC",
        destinataire: "SDANF",
        nature: "RESPONSE_SCEC",
        dateMessage: 1659616136550,
        message:
          "Acte irrecevable - Bonjour je ne peux recevoir votre demande - Johann"
      },
      {
        id: "0feca576-2766-4937-af7c-d921270518e7",
        emetteur: "SCEC",
        destinataire: "SDANF",
        nature: "RESPONSE_SCEC",
        dateMessage: 1659616134450,
        message: "Acte irrecevable - Je suis un message de test - Johann"
      }
    ]
  }
};

export const requeteCreationAvecMessagesRetourSDANFAvecMauvaisIdCorbeilleMaisBonStatut =
  {
    ...requeteCreation,
    id: "3ed9aa4e-921b-489f-b8fe-531dd703c68f",
    statut: {
      id: "3ed97a35-c9b0-4ae4-b2dc-75eb84e4082d",
      statutRequete: "PRISE_EN_CHARGE",
      dateEffet: 1656404736683,
      raisonStatut: null
    },
    corbeilleAgent: {
      idUtilisateur: "90c6aee1-21be-4ba6-9e55-fc8831252646"
    },
    provenanceNatali: {
      ...requeteCreation.provenanceNatali,
      echanges: [
        {
          id: "0fe2a576-2766-4937-af7c-d921270518e7",
          emetteur: "SCEC",
          destinataire: "SDANF",
          nature: "RESPONSE_SCEC",
          dateMessage: 1659616136550,
          message:
            "Acte irrecevable - Bonjour je ne peux recevoir votre demande - Johann"
        },
        {
          id: "0feca576-2766-4937-af7c-d921270518e6",
          emetteur: "SCEC",
          destinataire: "SDANF",
          nature: "RESPONSE_SCEC",
          dateMessage: 1659616134450,
          message: "Acte irrecevable - Je suis un message de test - Johann"
        }
      ]
    }
  };

export const requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut =
  {
    ...requeteCreation,
    id: "3ed9aa4e-921b-429f-b8fe-531dd103c68f",
    statut: {
      id: "3ed97a35-c9b0-4ae4-b2dc-75eb84e4082d",
      statutRequete: "PRISE_EN_CHARGE",
      dateEffet: 1656404736683,
      raisonStatut: null
    },
    corbeilleAgent: {
      idUtilisateur: "90c6aee1-21be-4ba6-9e55-fc8831252646"
    }
  };

export const requeteCreationAvecMessagesRetourSDANFAvecMessages = {
  ...requeteCreation,
  id: "3ed9aa4e-921b-429f-b8fe-531dd103c68s",
  statut: {
    id: "3ed97a35-c9b0-4ae4-b2dc-75eb84e4082d",
    statutRequete: "PRISE_EN_CHARGE",
    dateEffet: 1656404736683,
    raisonStatut: null
  },
  corbeilleAgent: {
    idUtilisateur: "90c6aee1-21be-4ba6-9e55-fc8831252646"
  },
  provenanceNatali: {
    ...requeteCreation.provenanceNatali,
    echanges: [
      {
        id: "0fe2a576-2766-4937-af7c-d921270518e7",
        emetteur: "SCEC",
        destinataire: "SDANF",
        nature: "RESPONSE_SCEC",
        dateMessage: 1659616136550,
        message:
          "Acte irrecevable - Bonjour je ne peux recevoir votre demande - Johann Le Biannic"
      },
      {
        id: "0feca576-2766-4937-af7c-d921270518e6",
        emetteur: "SCEC",
        destinataire: "SDANF",
        nature: "RESPONSE_SCEC",
        dateMessage: 1659616134450,
        message: "Acte irrecevable - Je suis un message de test - Johann"
      }
    ]
  }
};

export const reponseRequeteCreationMessageSdanf = {
  emetteur: "SCEC",
  destinataire: "SDANF",
  nature: "REPONSE_SCEC",
  message: "Je suis un message test apiHook",
  pieceJustificativeRequeteCreation: []
};

export const requeteCreationATraiter = {
  ...requeteCreation,
  id: "54ddf213-d9b7-4747-8e92-68c220f66de3",
  statut: {
    id: "d135d60e-a7ee-4a45-9f43-ca0e2ca493e2",
    statutRequete: "A_TRAITER",
    dateEffet: 1664274211167,
    raisonStatut: null
  },
  corbeilleService: {
    idEntiteRattachement: "6737e047-16cc-4731-9a2e-d2e228f7d75f"
  }
};