import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";

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

export const requetesCreationAlimentationTableau = [
  {
    id: "b63ebccd-ba5e-443a-8837-c5e1e111e846",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
    idService: "67371a3c-5d2c-477c-8217-3f0041122997",
    numeroAffichage: "LKI17B / 45648231",
    numeroFonctionnel: "LKI17B",
    numeroNatali: "45648231",
    numeroDila: null,
    numeroAncien: "numeroAncienSI",
    tagPriorisation: "SCEC",
    sousType: "RCEXR",
    dateCreation: 1673967260164,
    dateDerniereAction: 1673967260164,
    statut: "A_TRAITER",
    nomCompletRequerant: "nomFamille prenom",
    alerte: "RECEPTION_MISE_A_JOUR_SDANF",
    titulaires: [
      {
        nom: "CEBALLOS",
        prenoms: ["ETHAN"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        sexe: "MASCULIN",
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        qualite: "PARENT",
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "FAMILLE"
      },
      {
        nom: "ALLON",
        prenoms: ["BENOIT"],
        jourNaissance: 4,
        moisNaissance: 3,
        anneeNaissance: 1963,
        sexe: "MASCULIN",
        villeNaissance: "nantes",
        paysNaissance: "paysNaissance",
        qualite: null,
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "POSTULANT_NATIONALITE"
      },
      {
        nom: "TITU 2",
        prenoms: ["ETHAN"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        sexe: "MASCULIN",
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        qualite: "PARENT",
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "FAMILLE"
      }
    ]
  },
  {
    id: "b63e0757-c702-4d14-a99e-7fd84f1d8807",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
    idService: "67371a3c-5d2c-477c-8217-3f0041122997",
    numeroAffichage: "H1SJ1N / 96135321",
    numeroFonctionnel: "H1SJ1N",
    numeroNatali: "96135321",
    numeroDila: null,
    numeroAncien: "numeroAncienSI",
    tagPriorisation: "SCEC",
    sousType: "RCEXR",
    dateCreation: 1673967260778,
    dateDerniereAction: 1673967260778,
    statut: "A_TRAITER",
    nomCompletRequerant: "nomFamille prenom",
    alerte: "RECEPTION_MISE_A_JOUR_SDANF",
    titulaires: [
      {
        nom: "MERLE",
        prenoms: ["MICHEL"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        sexe: "MASCULIN",
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        qualite: "PARENT",
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "FAMILLE"
      },
      {
        nom: "LEMOINE",
        prenoms: ["THIBAUT"],
        jourNaissance: 4,
        moisNaissance: 3,
        anneeNaissance: 1963,
        sexe: "MASCULIN",
        villeNaissance: "nantes",
        paysNaissance: "paysNaissance",
        qualite: null,
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "POSTULANT_NATIONALITE"
      }
    ]
  },
  {
    id: "b63eccb0-fca0-4a7d-92a7-4d9fb983c0cf",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
    idService: "67371a3c-5d2c-477c-8217-3f0041122997",
    numeroAffichage: "3GFQGF / 894361894",
    numeroFonctionnel: "3GFQGF",
    numeroNatali: "894361894",
    numeroDila: null,
    numeroAncien: "numeroAncienSI",
    tagPriorisation: "SCEC",
    sousType: "RCEXR",
    dateCreation: 1673967260898,
    dateDerniereAction: 1673967260898,
    statut: "A_TRAITER",
    nomCompletRequerant: "nomFamille prenom",
    titulaires: [
      {
        nom: "VEZZANI",
        prenoms: ["Elizabeth"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        sexe: "MASCULIN",
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        qualite: "PARENT",
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "FAMILLE"
      },
      {
        nom: "TYOMKIM",
        prenoms: ["HAORAN"],
        jourNaissance: 4,
        moisNaissance: 3,
        anneeNaissance: 1963,
        sexe: "MASCULIN",
        villeNaissance: "nantes",
        paysNaissance: "paysNaissance",
        qualite: null,
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "POSTULANT_NATIONALITE"
      }
    ]
  },
  {
    id: "b63e801e-8fe7-4c4b-80bd-76bfad28d58c",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
    idService: "67371a3c-5d2c-477c-8217-3f0041122997",
    numeroAffichage: "IWSZGB / 589762198",
    numeroFonctionnel: "IWSZGB",
    numeroNatali: "589762198",
    numeroDila: null,
    numeroAncien: "numeroAncienSI",
    tagPriorisation: "SCEC",
    sousType: "RCEXR",
    dateCreation: 1673967260988,
    dateDerniereAction: 1673967260988,
    statut: "A_TRAITER",
    nomCompletRequerant: "nomFamille prenom",
    titulaires: [
      {
        nom: "KIWI",
        prenoms: ["MATTHIAS"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        sexe: "MASCULIN",
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        qualite: "ENFANT_MINEUR",
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "FAMILLE"
      },
      {
        nom: "LAGERBERG",
        prenoms: ["MARTIN"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        sexe: "MASCULIN",
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        qualite: "PARENT2ENFANT",
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "FAMILLE"
      },
      {
        nom: "LANG",
        prenoms: ["LIONEL"],
        jourNaissance: 4,
        moisNaissance: 3,
        anneeNaissance: 1963,
        sexe: "MASCULIN",
        villeNaissance: "nantes",
        paysNaissance: "paysNaissance",
        qualite: null,
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "POSTULANT_NATIONALITE"
      }
    ]
  },
  {
    id: "b63e801e-8fe7-4c4b-80bd-76bfad28d58c",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
    idService: "67371a3c-5d2c-477c-8217-3f0041122997",
    numeroAffichage: "IWSZGB / 46478614",
    numeroFonctionnel: "IWSZGB",
    numeroNatali: "589762198",
    numeroDila: null,
    numeroAncien: "numeroAncienSI",
    tagPriorisation: "SCEC",
    sousType: "RCTC",
    dateCreation: 1673967260988,
    dateDerniereAction: 1673967260988,
    statut: "A_TRAITER",
    nomCompletRequerant: "nomFamille prenom",
    titulaires: [
      {
        nom: "KIWI",
        prenoms: ["MATTHIAS"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        sexe: "MASCULIN",
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        qualite: "ENFANT_MINEUR",
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "FAMILLE"
      },
      {
        nom: "LAGERBERG",
        prenoms: ["MARTIN"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        sexe: "MASCULIN",
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        qualite: "PARENT2ENFANT",
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "FAMILLE"
      },
      {
        nom: "MICHELINE",
        prenoms: ["LIONEL"],
        jourNaissance: 4,
        moisNaissance: 3,
        anneeNaissance: 1963,
        sexe: "MASCULIN",
        villeNaissance: "nantes",
        paysNaissance: "paysNaissance",
        qualite: null,
        nationalite: "FRANCAISE",
        typeObjetTitulaire: "POSTULANT_NATIONALITE"
      }
    ]
  }
];

export const requeteCreationEtablissement = {
  id: "3ed9aa4e-921b-489f-b8fe-531dd703c60c",
  numeroFonctionnel: "2H5U3Q",
  dateCreation: 1656404736683,
  canal: "RIE",
  type: "CREATION",
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
  idService: "6737566d-0f25-45dc-8443-97b444e6753a",
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
      suiviDossiers: [],
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
      suiviDossiers: [],
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
      suiviDossiers: [],
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
    nomUsage: "nomUsage",
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
      pays: "pays",
      courriel: "courriel"
    },
    qualite: "PARTICULIER",
    detailQualiteRece: null,
    detailQualiteParticulier: null,
    detailQualiteMandataireHabilite: null,
    detailQualiteInstitutionnel: null,
    detailQualiteAutreProfessionnel: null,
    courrielAutreContact: "courrielAutreContact@gmail.com",
    telephoneAutreContact: "0212456512",
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
      piecesJustificatives: [
        {
          ...pieceJustificative,
          nom: "carteIdentite"
        }
      ]
    },
    {
      id: "3ed90e37-a51b-4f1e-bd5a-6b2423ea9421",
      libelle: "etat_civil",
      categorie: "TITRE_SEJOUR",
      piecesJustificatives: [
        {
          ...pieceJustificative,
          nom: "titreSejour"
        }
      ]
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
      libelle: "unions_anterieures_1",
      categorie: "PREUVE_DIVORCE",
      piecesJustificatives: [{ ...pieceJustificative }]
    }
  ],
  campagne: "campagne",
  nature: "NATURALISATION",
  dossierNouveaux: null,
  dossierOrigines: null,
  decret: null
} as any as IRequeteCreationEtablissement;

export const requeteCreationTranscription = {
  id: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
  numeroFonctionnel: "2H5U3Q",
  dateCreation: 1656404736683,
  canal: "RIE",
  type: "CREATION",
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
  idService: "6737566d-0f25-45dc-8443-97b444e6753a",
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
      position: 1,
      nomNaissance: "nomNaissance",
      nomSouhaite: "nomSouhaite",
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
      suiviDossiers: [],
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
      id: "3ed9efe4-c196-4888-8ffe-938f37a5f73a",
      position: 1,
      nomNaissance: "Dupont",
      nomUsage: "Bernard",
      anneeNaissance: 1990,
      moisNaissance: 1,
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
          prenom: "Michel",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
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
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: "nomDemandeFrancisation",
      nomDemandeIdentification: "nomDemandeIdentification",
      nomSecable: true,
      nomPremierePartie: "nomPremierePartie",
      nomSecondePartie: "nomSecondePartie",
      qualite: "PARENT",
      courriel: "courriel",
      telephone: "telephone",
      situationFamilliale: "CELIBATAIRE",
      nationalites: [
        {
          id: "3ed9cf6f-137c-4193-87ea-901373a5e75e",
          nationalite: "nationalite"
        }
      ],
      suiviDossiers: [],
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
    }
  ],
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
      typePieceJustificative: "0f1f9eba-a0a7-47ea-bfb2-f473f88beb9a",
      typeObjetPj: "CREATION",
      idFichierNatali: "idFichierNatali",
      ordreNatali: 1,
      estPieceAnnexe: true,
      idActe: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    {
      id: "3ed92b89-268a-4883-a41f-0763cfea9ef8",
      nom: "nom",
      mimeType: "image/jpeg",
      extension: null,
      taille: 0,
      referenceSwift: "thumbnail_IMG-1279.jpg",
      conteneurSwift: "pieces_justificatives",
      contenu: null,
      typePieceJustificative: "0f1f9eba-a0a7-47ea-bfb2-f473f88beb9a",
      typeObjetPj: "CREATION",
      idFichierNatali: "idFichierNatali",
      ordreNatali: 1,
      estPieceAnnexe: true,
      idActe: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
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
      typePieceJustificative: "6c95641f-59fe-4155-a6ba-8b42433c04ec",
      typeObjetPj: "CREATION",
      idFichierNatali: "idFichierNatali",
      ordreNatali: 1,
      estPieceAnnexe: true,
      idActe: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
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
      typePieceJustificative: "93e4f39b-0fc5-47f4-8434-2d362f897987",
      typeObjetPj: "CREATION",
      idFichierNatali: "idFichierNatali",
      ordreNatali: 1,
      estPieceAnnexe: true,
      idActe: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    {
      id: "3ed9ad41-ca61-416a-91df-448690804364",
      nom: "nom",
      mimeType: "application/pdf",
      extension: null,
      taille: 0,
      referenceSwift: "Bon.pdf",
      conteneurSwift: "pieces_justificatives",
      contenu: null,
      typePieceJustificative: "f14f8f0d-a146-48c3-a04e-285b9a2a4451",
      typeObjetPj: "CREATION",
      idFichierNatali: "idFichierNatali",
      ordreNatali: 1,
      estPieceAnnexe: true,
      idActe: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
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
  sousType: "RCTC",
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
  documentsPj: [],
  dossierNouveaux: null,
  dossierOrigines: null
} as any as IRequeteCreationTranscription;

export const reponseRequeteCreationMessageSdanf = {
  emetteur: "SCEC",
  destinataire: "SDANF",
  nature: "REPONSE_SCEC",
  message: "Je suis un message test apiHook",
  pieceJustificativeRequeteCreation: []
};

export const requeteCreationATraiter = {
  ...requeteCreationEtablissement,
  id: "54ddf213-d9b7-4747-8e92-68c220f66de3",
  idService: "6737e047-16cc-4731-9a2e-d2e228f7d75f",
  statut: {
    id: "d135d60e-a7ee-4a45-9f43-ca0e2ca493e2",
    statutRequete: "A_TRAITER",
    dateEffet: 1664274211167,
    raisonStatut: null
  }
};
