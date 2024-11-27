import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";

export const requeteCreationEtablissement = {
  id: "a2724cc9-450c-4e50-9d05-a44a28717954",
  numeroFonctionnel: "3S3WN7",
  dateCreation: 1669731006000,
  idUtilisateur: "b67f9d14-cc5e-4002-aa06-e54029ffa073",
  idService: "6737dca8-2f96-4086-8288-fd1a136a61df",
  canal: {
    _libelle: "RIE",
    _nom: "RIE"
  },
  type: {
    _libelle: "Création",
    _nom: "CREATION"
  },
  actions: [
    {
      id: "a272f8e0-d9d9-4051-940e-a27112d99a25",
      numeroOrdre: 1,
      libelle: "A traiter",
      dateAction: 1669731006000,
      idUtilisateur: "c4b37383-54c8-4f65-afdf-be1355a90ee2",
      trigramme: "RECE"
    },
    {
      id: "ce6205c8-3f09-4862-b855-426a69b7da4c",
      numeroOrdre: 2,
      libelle: "Prise en charge",
      dateAction: 1670405938000,
      idUtilisateur: "95874922-2011-4266-8a1d-76271afec4a4",
      trigramme: ""
    },
    {
      id: "ce645cd8-a31f-4716-990a-9b31914f8d8d",
      numeroOrdre: 3,
      libelle: "Retour SDANF",
      dateAction: 1670406024000,
      idUtilisateur: "95874922-2011-4266-8a1d-76271afec4a4",
      trigramme: ""
    }
  ],
  titulaires: [
    {
      id: "a2727123-6665-4e27-9f2f-3065124dc1e7",
      position: 1,
      nomNaissance: "PLAGNE",
      nomUsage: "",
      anneeNaissance: 1991,
      moisNaissance: 1,
      jourNaissance: 5,
      villeNaissance: "INC",
      codePostalNaissance: "",
      arrondissementNaissance: "",
      villeEtrangereNaissance: "",
      regionNaissance: "",
      paysNaissance: "CUBA",
      lieuNaissanceFormate: "INC (CUBA)",
      dateNaissanceFormatee: "05/01/1991",
      sexe: "MASCULIN",
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      prenoms: [
        {
          id: "a2720cd2-41ab-497e-a4fa-0ffb9d36f41e",
          numeroOrdre: 1,
          prenom: "Sylvie"
        }
      ],
      parentsTitulaire: [],
      domiciliation: {
        id: "a27223d9-ea20-45a7-b8a7-68916726926c",
        ligne2: "",
        ligne3: "10 Rue Jean Pierre Timbaud",
        ligne4: "",
        ligne5: "",
        codePostal: "92400",
        ville: "Courbevoie",
        villeEtrangere: "",
        arrondissement: "",
        region: "",
        pays: "FRANCE"
      },
      evenementUnions: [
        {
          id: "a272c9b3-c0e0-4d13-b125-149af95bc4b3",
          type: "MARIAGE",
          jour: 10,
          mois: 2,
          annee: 2012,
          ville: "la havane",
          region: "",
          pays: "CUBA",
          lieuFormate: "la havane (CUBA)",
          dateFormatee: "10/02/2012",
          situationActuelle: true
        }
      ],
      typeObjetTitulaire: "POSTULANT_NATIONALITE",
      nomDemandeFrancisation: "",
      nomDemandeIdentification: "",
      nomPremierePartie: "",
      nomSecondePartie: "",
      courriel: "feffuquiffaru-1138@yopmail.com",
      telephone: "",
      situationFamilliale: "MARIE",
      nationalites: [
        {
          id: "a2725587-1327-4162-bd23-0a1cb67732ba",
          nationalite: "cubaine"
        }
      ],
      prenomsDemande: [],
      suiviDossiers: [
        {
          id: "a272ec8a-1351-4edd-99b8-03004292a9d2",
          dateEtablissement: 1492693480000,
          natureProjet: "NAISSANCE",
          avancement: "A_SAISIR"
        }
      ],
      retenueSdanf: {
        id: "a272d78a-a260-40ea-8692-cc64d56d5ec8",
        nomNaissance: "PLAGNE",
        nomUsage: "",
        nomActuel: "",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        jourNaissance: 5,
        moisNaissance: 1,
        anneeNaissance: 1991,
        codePostalNaissance: "",
        villeNaissance: "INC",
        villeEtrangereNaissance: "",
        arrondissementNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        prenomsRetenu: [
          {
            id: "a2726344-81cb-4078-8ab2-48037cdc1620",
            numeroOrdre: 1,
            prenom: "Sylvie"
          }
        ]
      },
      nomActuel: "",
      nombreEnfantMineur: 3,
      nombreEnfantEffetCollectif: 3,
      situationFamiliale: "MARIE",
      qualite: ""
    },
    {
      id: "a272d50a-2850-495f-848b-a660be79cea8",
      position: 1,
      nomNaissance: "ANBDE",
      nomUsage: "",
      anneeNaissance: 1962,
      villeNaissance: "la havane",
      codePostalNaissance: "",
      arrondissementNaissance: "",
      villeEtrangereNaissance: "",
      regionNaissance: "",
      paysNaissance: "CUBA",
      lieuNaissanceFormate: "la havane (CUBA)",
      dateNaissanceFormatee: "1962",
      sexe: "FEMININ",
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      prenoms: [
        {
          id: "a272b8c5-e92e-4409-b755-946d980d44a2",
          numeroOrdre: 1,
          prenom: "Anne"
        }
      ],
      parentsTitulaire: [],
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: "",
      nomDemandeIdentification: "",
      nomPremierePartie: "",
      nomSecondePartie: "",
      courriel: "",
      telephone: "",
      nationalites: [
        {
          id: "a2723816-b047-4f98-a274-310a64b1bf4f",
          nationalite: "cubaine"
        }
      ],
      prenomsDemande: [],
      suiviDossiers: [],
      retenueSdanf: {
        id: "a2726fe6-4c4a-4da1-9201-202ea54ab236",
        nomNaissance: "ANBDE",
        nomUsage: "",
        nomActuel: "",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        anneeNaissance: 1962,
        codePostalNaissance: "",
        villeNaissance: "la havane",
        villeEtrangereNaissance: "",
        arrondissementNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        prenomsRetenu: [
          {
            id: "a272481e-b34a-4ce0-bacb-db08ecd4aadb",
            numeroOrdre: 1,
            prenom: "Anne"
          }
        ]
      },
      qualite: {
        _libelle: "Parent"
      },
      numeroDossierNational: "",
      domiciliationEnfant: ""
    },
    {
      id: "a272b563-7a26-4416-9391-8d028947433c",
      position: 1,
      nomNaissance: "PLAGNE",
      nomUsage: "",
      anneeNaissance: 2018,
      moisNaissance: 2,
      jourNaissance: 10,
      villeNaissance: "la havane",
      codePostalNaissance: "",
      arrondissementNaissance: "",
      villeEtrangereNaissance: "",
      regionNaissance: "",
      paysNaissance: "CUBA",
      lieuNaissanceFormate: "la havane (CUBA)",
      dateNaissanceFormatee: "10/02/2018",
      sexe: "MASCULIN",
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      prenoms: [
        {
          id: "a272e985-0184-4207-9d4a-3a67fe8d73fa",
          numeroOrdre: 1,
          prenom: "Joe"
        }
      ],
      parentsTitulaire: [],
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: "",
      nomDemandeIdentification: "",
      nomPremierePartie: "",
      nomSecondePartie: "",
      courriel: "",
      telephone: "",
      nationalites: [
        {
          id: "a272ad7e-11de-46e6-b739-be10ff144b53",
          nationalite: "cubaine"
        }
      ],
      prenomsDemande: [],
      suiviDossiers: [
        {
          id: "a27241d3-c3fc-46e9-bd1b-92f1b98c3743",
          dateEtablissement: 1492693480000,
          natureProjet: "MARIAGE",
          avancement: "A_SAISIR"
        }
      ],
      retenueSdanf: {
        id: "a272aed6-a3ce-480c-a4d1-d4190cd60f16",
        nomNaissance: "PLAGNE",
        nomUsage: "",
        nomActuel: "",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        jourNaissance: 10,
        moisNaissance: 2,
        anneeNaissance: 2018,
        codePostalNaissance: "",
        villeNaissance: "la havane",
        villeEtrangereNaissance: "",
        arrondissementNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        prenomsRetenu: [
          {
            id: "a2720162-2d8e-4d75-82e5-2472b1c2babe",
            numeroOrdre: 1,
            prenom: "Joe"
          }
        ]
      },
      qualite: {
        _libelle: "Enfant mineur"
      },
      numeroDossierNational: "",
      valideEffetCollectif: "NON_RENSEIGNE",
      residence: "IDENTIQUE_TITULAIRE_REQUETE",
      domiciliationEnfant: ""
    },
    {
      id: "a272b594-c9a9-4491-b92e-91ff4405242b",
      position: 1,
      nomNaissance: "BILLY",
      nomUsage: "",
      anneeNaissance: 1970,
      moisNaissance: 3,
      jourNaissance: 10,
      villeNaissance: "la havane",
      codePostalNaissance: "",
      arrondissementNaissance: "",
      villeEtrangereNaissance: "",
      regionNaissance: "",
      paysNaissance: "CUBA",
      lieuNaissanceFormate: "la havane (CUBA)",
      dateNaissanceFormatee: "10/03/1970",
      sexe: "MASCULIN",
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      prenoms: [
        {
          id: "a272bce0-3b83-411f-8ade-0f0544f475a8",
          numeroOrdre: 1,
          prenom: "Jean"
        }
      ],
      parentsTitulaire: [],
      evenementUnions: [
        {
          id: "a272c9b3-c0e0-4d13-b125-149af95bc4b3",
          type: "MARIAGE",
          jour: 10,
          mois: 2,
          annee: 2012,
          ville: "la havane",
          region: "",
          pays: "CUBA",
          lieuFormate: "la havane (CUBA)",
          dateFormatee: "10/02/2012",
          situationActuelle: true
        }
      ],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: "",
      nomDemandeIdentification: "",
      nomPremierePartie: "",
      nomSecondePartie: "",
      courriel: "",
      telephone: "",
      nationalites: [
        {
          id: "a272ed57-a628-4e35-9490-afa3939c5952",
          nationalite: "cubaine"
        }
      ],
      prenomsDemande: [],
      suiviDossiers: [
        {
          id: "a27241d3-c3fc-46e9-bd1b-92f1b98c3744",
          dateEtablissement: 1492693480000,
          natureProjet: "NAISSANCE",
          avancement: "A_SAISIR"
        },
        {
          id: "a27241d3-c3fc-46e9-bd1b-92f1b98c3742",
          dateEtablissement: 1492693480000,
          natureProjet: "NAISSANCE",
          avancement: "A_SAISIR"
        }
      ],
      retenueSdanf: {
        id: "a272ca8d-be4f-4e21-908e-9e19832dab0e",
        nomNaissance: "BILLY",
        nomUsage: "",
        nomActuel: "",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        jourNaissance: 10,
        moisNaissance: 3,
        anneeNaissance: 1970,
        codePostalNaissance: "",
        villeNaissance: "la havane",
        villeEtrangereNaissance: "",
        arrondissementNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        prenomsRetenu: [
          {
            id: "a272e3d2-047b-4763-bb3e-34af64b309a4",
            numeroOrdre: 1,
            prenom: "Jean"
          }
        ]
      },
      qualite: {
        _libelle: "Conjoint actuel"
      },
      numeroDossierNational: "",
      domiciliationEnfant: ""
    },
    {
      id: "a272f77f-ae56-4a92-a713-fdbb50f19004",
      position: 2,
      nomNaissance: "PLAGNE",
      nomUsage: "",
      anneeNaissance: 1963,
      villeNaissance: "la havane",
      codePostalNaissance: "",
      arrondissementNaissance: "",
      villeEtrangereNaissance: "",
      regionNaissance: "",
      paysNaissance: "CUBA",
      lieuNaissanceFormate: "la havane (CUBA)",
      dateNaissanceFormatee: "1963",
      sexe: "MASCULIN",
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      prenoms: [
        {
          id: "a2725353-0b3b-4c3a-bc7c-fc5fcc774d85",
          numeroOrdre: 1,
          prenom: "Paul"
        }
      ],
      parentsTitulaire: [],
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: "",
      nomDemandeIdentification: "",
      nomPremierePartie: "",
      nomSecondePartie: "",
      courriel: "",
      telephone: "",
      nationalites: [
        {
          id: "a272b21c-be9e-4b32-bc4c-d7509b6628dc",
          nationalite: "cubaine"
        }
      ],
      prenomsDemande: [],
      suiviDossiers: [],
      retenueSdanf: {
        id: "a272150f-8ff8-42b4-8736-0b9960c5479a",
        nomNaissance: "PLAGNE",
        nomUsage: "",
        nomActuel: "",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        anneeNaissance: 1963,
        codePostalNaissance: "",
        villeNaissance: "la havane",
        villeEtrangereNaissance: "",
        arrondissementNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        prenomsRetenu: [
          {
            id: "a2720e1d-ea16-463e-8045-020c9b6a0c30",
            numeroOrdre: 1,
            prenom: "Paul"
          }
        ]
      },
      qualite: {
        _libelle: "Parent"
      },
      numeroDossierNational: "",
      domiciliationEnfant: ""
    },
    {
      id: "a272fed8-aa10-43c8-994d-04e7194e7e82",
      position: 2,
      nomNaissance: "PLAGNE",
      nomUsage: "",
      anneeNaissance: 2018,
      moisNaissance: 2,
      jourNaissance: 10,
      villeNaissance: "la havane",
      codePostalNaissance: "",
      arrondissementNaissance: "",
      villeEtrangereNaissance: "",
      regionNaissance: "",
      paysNaissance: "CUBA",
      lieuNaissanceFormate: "la havane (CUBA)",
      dateNaissanceFormatee: "10/02/2018",
      sexe: "MASCULIN",
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      prenoms: [
        {
          id: "a272112c-4794-4777-9677-c20525f1b637",
          numeroOrdre: 1,
          prenom: "Jean"
        }
      ],
      parentsTitulaire: [],
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: "",
      nomDemandeIdentification: "",
      nomPremierePartie: "",
      nomSecondePartie: "",
      courriel: "",
      telephone: "",
      nationalites: [
        {
          id: "a2726d56-4299-4b48-9ee9-22530cad51f5",
          nationalite: "cubaine"
        }
      ],
      prenomsDemande: [],
      suiviDossiers: [],
      retenueSdanf: {
        id: "a272f921-85b8-410b-9bde-d226d21b7b2c",
        nomNaissance: "PLAGNE",
        nomUsage: "",
        nomActuel: "",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        jourNaissance: 10,
        moisNaissance: 2,
        anneeNaissance: 2018,
        codePostalNaissance: "",
        villeNaissance: "la havane",
        villeEtrangereNaissance: "",
        arrondissementNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        prenomsRetenu: [
          {
            id: "a272d865-feee-46de-a0e8-39c7b34b76ad",
            numeroOrdre: 1,
            prenom: "Jean"
          }
        ]
      },
      qualite: {
        _libelle: "Enfant mineur"
      },
      numeroDossierNational: "",
      valideEffetCollectif: "NON_RENSEIGNE",
      residence: "IDENTIQUE_TITULAIRE_REQUETE",
      domiciliationEnfant: ""
    },
    {
      id: "a2725ecd-1d07-40b5-881b-2dbdff396535",
      position: 3,
      nomNaissance: "PLAGNE",
      nomUsage: "",
      anneeNaissance: 2016,
      moisNaissance: 2,
      jourNaissance: 5,
      villeNaissance: "la havane",
      codePostalNaissance: "",
      arrondissementNaissance: "",
      villeEtrangereNaissance: "",
      regionNaissance: "",
      paysNaissance: "CUBA",
      lieuNaissanceFormate: "la havane (CUBA)",
      dateNaissanceFormatee: "05/02/2016",
      sexe: "FEMININ",
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      prenoms: [
        {
          id: "a2728565-af21-4b0e-a5a1-fdba7695ddc0",
          numeroOrdre: 1,
          prenom: "Ali"
        }
      ],
      parentsTitulaire: [],
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: "",
      nomDemandeIdentification: "",
      nomPremierePartie: "",
      nomSecondePartie: "",
      courriel: "",
      telephone: "",
      nationalites: [
        {
          id: "a2729055-ea8a-457e-b4e7-f7795ac90b9e",
          nationalite: "cubaine"
        }
      ],
      prenomsDemande: [],
      suiviDossiers: [],
      retenueSdanf: {
        id: "a27225ea-c410-4f0d-838e-de041ea95f59",
        nomNaissance: "PLAGNE",
        nomUsage: "",
        nomActuel: "",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        jourNaissance: 5,
        moisNaissance: 2,
        anneeNaissance: 2016,
        codePostalNaissance: "",
        villeNaissance: "la havane",
        villeEtrangereNaissance: "",
        arrondissementNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        prenomsRetenu: [
          {
            id: "a272a315-c1d2-46ac-86be-6aca01013cac",
            numeroOrdre: 1,
            prenom: "Ali"
          }
        ]
      },
      qualite: {
        _libelle: "Enfant mineur"
      },
      numeroDossierNational: "",
      valideEffetCollectif: "NON_RENSEIGNE",
      residence: "IDENTIQUE_TITULAIRE_REQUETE",
      domiciliationEnfant: ""
    }
  ],
  piecesJustificatives: [
    {
      id: "a272746d-709f-4690-95a3-b42bbc408d4d",
      nom: "acteMariage.jpg",
      mimeType: "image/jpeg",
      referenceSwift: "a2722436-5cdb-418f-94a7-83afc50fcecd",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25be53123c201ef8e57fd",
      ordreNatali: 0,
      documentPj: {
        id: "a27241f7-9ee3-40ee-9a25-afa3a1ce23bb",
        libelle: "parents_et_fratrie",
        categorie: {
          libelleAAfficher: "AM parents",
          ordre: 5000
        }
      }
    },
    {
      id: "a27296b3-bf1c-4060-b3b1-2a8accae9559",
      nom: "acteMariage.jpg",
      mimeType: "image/jpeg",
      referenceSwift: "a2720e58-55ef-489d-aa12-ad8101e9d23c",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25c023123c201ef8e5803",
      ordreNatali: 1,
      documentPj: {
        id: "a272338a-e931-42e5-9a6e-394764db1388",
        libelle: "union_actuelle_conjoint",
        categorie: {
          libelleAAfficher: "AM union actuelle",
          ordre: 8000
        }
      }
    },
    {
      id: "a272535c-6a25-49d1-ae6c-4df653c8c7d4",
      nom: "acteNaissanceFemme.png",
      mimeType: "image/png",
      referenceSwift: "a272f8be-aba1-438d-bbde-96f026c23717",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25beb3835ae496f53790d",
      ordreNatali: 2,
      documentPj: {
        id: "a27205a3-a741-4f02-ae7a-f99a887323be",
        libelle: "parents_1",
        categorie: {
          libelleAAfficher: "AN parent 1",
          ordre: 4001
        }
      }
    },
    {
      id: "a272a10a-f1ab-442f-9d6b-8693b32cca34",
      nom: "acteNaissanceFemme.png",
      mimeType: "image/png",
      referenceSwift: "a27273d6-07b3-483b-b672-2f942e4833f4",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25a353835ae496f537901",
      ordreNatali: 3,
      documentPj: {
        id: "a272a8ad-8295-4742-9b89-b571d298e881",
        libelle: "etat_civil",
        categorie: {
          libelleAAfficher: "AN Postulant",
          ordre: 1000
        }
      },
      nouveauLibelleFichierPJ: "acteNaissanceFemme.pdf"
    },
    {
      id: "a272a029-db45-496f-919c-f388d37693ef",
      nom: "acteNaissanceFemme.png",
      mimeType: "image/png",
      referenceSwift: "a2720bff-76b2-48d4-9efc-5b3cfd16682c",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25d043123c201ef8e580f",
      ordreNatali: 4,
      documentPj: {
        id: "a272a12c-88b6-4c6e-86c2-0b4876d230bf",
        libelle: "enfants_2",
        categorie: {
          libelleAAfficher: "AN enfant 2",
          ordre: 14002
        }
      }
    },
    {
      id: "a2723ef5-04a6-4c00-a38a-6b3af20ff7ac",
      nom: "acteNaissanceHomme.jpg",
      mimeType: "image/jpeg",
      referenceSwift: "a2724aa7-9771-4132-b68b-849540d3a29b",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25ce93835ae496f53792b",
      ordreNatali: 5,
      documentPj: {
        id: "a2726148-255f-4f78-9ab2-70190c7e4f32",
        libelle: "enfants_1",
        categorie: {
          libelleAAfficher: "AN enfant 1",
          ordre: 14001
        }
      }
    },
    {
      id: "a272015d-4e53-4e73-9fef-a31b56730b77",
      nom: "acteNaissanceHomme.jpg",
      mimeType: "image/jpeg",
      referenceSwift: "a27297cb-367e-4e97-99cb-0a16ce2287e7",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25bf33835ae496f537913",
      ordreNatali: 6,
      documentPj: {
        id: "a2725caa-69ff-4452-b455-bd959b833d53",
        libelle: "parents_2",
        categorie: {
          libelleAAfficher: "AN parent 2",
          ordre: 4002
        }
      }
    },
    {
      id: "a2725882-6d01-4d30-aea3-9b9daac3e446",
      nom: "acteNaissanceHomme.jpg",
      mimeType: "image/jpeg",
      referenceSwift: "a27259aa-3ca9-4f47-8627-59f2266a177c",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25d123123c201ef8e5821",
      ordreNatali: 7,
      documentPj: {
        id: "a2725d07-f6a1-4dff-9108-635d7adcdd39",
        libelle: "enfants_3",
        categorie: {
          libelleAAfficher: "AN enfant 3",
          ordre: 14003
        }
      }
    },
    {
      id: "a2725a27-0c8e-4fe8-8828-9b838558db1c",
      nom: "carteSejourFemme.png",
      mimeType: "image/png",
      referenceSwift: "a272acab-30c2-4de4-b313-6880ea47b9de",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25a3b3835ae496f537907",
      ordreNatali: 8,
      documentPj: {
        id: "a2726fb1-bf74-4186-9831-d4c278ca3506",
        libelle: "etat_civil",
        categorie: {
          libelleAAfficher: "Titre de séjour postulant",
          ordre: 18000
        }
      }
    },
    {
      id: "a272d747-3f32-4d2e-a429-b7d23f073c81",
      nom: "passportPortugalFemme.png",
      mimeType: "image/png",
      referenceSwift: "a272ed5d-a45d-4e2c-b61e-332d1eb89097",
      conteneurSwift: "pieces-justificatives-2022-11",
      typePieceJustificative: {
        _libelle: "Pièce requête création",
        _code: "CREATION",
        _categorie: "TYPE_PIECE_JUSTIFICATIVE",
        _typeRequete: "CREATION",
        _ordre: 1,
        _typeRedactionActe: "ETABLI"
      },
      idFichierNatali: "62e25a2b3123c201ef8e57eb",
      ordreNatali: 9,
      documentPj: {
        id: "a2729f6c-56e3-4e49-864f-61991bf83a50",
        libelle: "etat_civil",
        categorie: {
          libelleAAfficher: "Pièce d'identité postulant",
          ordre: 19000
        }
      }
    }
  ],
  requerant: {
    id: "a2720d6d-6a57-4036-ae3e-e82562c61724",
    dateCreation: 1669731003000,
    nomFamille: "",
    nomUsage: "",
    prenom: "",
    courriel: "",
    telephone: "",
    qualiteRequerant: {
      qualite: {
        _libelle: "Institutionnel",
        _nom: "INSTITUTIONNEL"
      },
      mandataireHabilite: {},
      institutionnel: {
        type: "PREFECTURE",
        nomInstitution: "",
        nature: ""
      }
    }
  },
  observations: [],
  statut: {
    id: "a2720901-e0e2-468f-bce4-a1fcf0043dcf",
    statutRequete: "RETOUR_SDANF",
    dateEffet: 1670406024000,
    raisonStatut: ""
  },
  doublons: [],
  sousType: {
    _libelle: "Création Etablissement par décret (X) Démat",
    _nom: "RCEXR",
    _libelleCourt: "Acte Etab X (d)"
  },
  numeroAncienSI: "",
  dossierSignale: false,
  commentaire: "",
  demandeIdentification: false,
  demandeFrancisation: false,
  provenance: {
    _libelle: "Natali",
    _nom: "NATALI"
  },
  provenanceNatali: {
    id: "a2723d95-9c6e-4959-930b-f08ec6eabeea",
    numeroDossierNational: "2022X 200150",
    statutNatali: "CONTROLE_EN_ATTENTE_PEC",
    provenanceNaturalisation: "NATALI",
    numeroDossierLocal: "",
    dateDepot: 1658996525000,
    datePriseEnChargeSdanf: 0,
    decisionSdanf: "NON_CONNUE",
    tagPriorisation: {
      _libelle: "SDANF"
    },
    echanges: [
      {
        date: "07/12/2022",
        id: "ce64f67c-02f2-49b0-afab-f9d755bf87d2",
        emetteur: "SCEC",
        destinataire: "SDANF",
        nature: "REPONSE_SCEC",
        message: "Élément manquant - CAS F\nRetour SCEC (flux3) : Décision défavorable élément manquant - Cecile LAMARQUE",
        dateTransfert: 1670406608000,
        pieceJustificativeRequeteCreation: []
      }
    ]
  },
  documentsPj: [
    {
      id: "a272a8ad-8295-4742-9b89-b571d298e881",
      libelle: "etat_civil",
      categorie: {
        libelleAAfficher: "AN Postulant",
        ordre: 1000
      },
      piecesJustificatives: [
        {
          id: "a272a10a-f1ab-442f-9d6b-8693b32cca34",
          nom: "acteNaissanceFemme.png",
          mimeType: "image/png",
          taille: 0,
          referenceSwift: "a27273d6-07b3-483b-b672-2f942e4833f4",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25a353835ae496f537901",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: "acteNaissanceFemme.pdf"
        }
      ]
    },
    {
      id: "a27205a3-a741-4f02-ae7a-f99a887323be",
      libelle: "parents_1",
      categorie: {
        libelleAAfficher: "AN parent 1",
        ordre: 4001
      },
      piecesJustificatives: [
        {
          id: "a272535c-6a25-49d1-ae6c-4df653c8c7d4",
          nom: "acteNaissanceFemme.png",
          mimeType: "image/png",
          taille: 0,
          referenceSwift: "a272f8be-aba1-438d-bbde-96f026c23717",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25beb3835ae496f53790d",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: ""
        }
      ]
    },
    {
      id: "a2725caa-69ff-4452-b455-bd959b833d53",
      libelle: "parents_2",
      categorie: {
        libelleAAfficher: "AN parent 2",
        ordre: 4002
      },
      piecesJustificatives: [
        {
          id: "a272015d-4e53-4e73-9fef-a31b56730b77",
          nom: "acteNaissanceHomme.jpg",
          mimeType: "image/jpeg",
          taille: 0,
          referenceSwift: "a27297cb-367e-4e97-99cb-0a16ce2287e7",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25bf33835ae496f537913",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: ""
        }
      ]
    },
    {
      id: "a27241f7-9ee3-40ee-9a25-afa3a1ce23bb",
      libelle: "parents_et_fratrie",
      categorie: {
        libelleAAfficher: "AM parents",
        ordre: 5000
      },
      piecesJustificatives: [
        {
          id: "a272746d-709f-4690-95a3-b42bbc408d4d",
          nom: "acteMariage.jpg",
          mimeType: "image/jpeg",
          taille: 0,
          referenceSwift: "a2722436-5cdb-418f-94a7-83afc50fcecd",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25be53123c201ef8e57fd",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: ""
        }
      ]
    },
    {
      id: "a272338a-e931-42e5-9a6e-394764db1388",
      libelle: "union_actuelle_conjoint",
      categorie: {
        libelleAAfficher: "AM union actuelle",
        ordre: 8000
      },
      piecesJustificatives: [
        {
          id: "a27296b3-bf1c-4060-b3b1-2a8accae9559",
          nom: "acteMariage.jpg",
          mimeType: "image/jpeg",
          taille: 0,
          referenceSwift: "a2720e58-55ef-489d-aa12-ad8101e9d23c",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25c023123c201ef8e5803",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: ""
        }
      ]
    },
    {
      id: "a2726148-255f-4f78-9ab2-70190c7e4f32",
      libelle: "enfants_1",
      categorie: {
        libelleAAfficher: "AN enfant 1",
        ordre: 14001
      },
      piecesJustificatives: [
        {
          id: "a2723ef5-04a6-4c00-a38a-6b3af20ff7ac",
          nom: "acteNaissanceHomme.jpg",
          mimeType: "image/jpeg",
          taille: 0,
          referenceSwift: "a2724aa7-9771-4132-b68b-849540d3a29b",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25ce93835ae496f53792b",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: ""
        }
      ]
    },
    {
      id: "a272a12c-88b6-4c6e-86c2-0b4876d230bf",
      libelle: "enfants_2",
      categorie: {
        libelleAAfficher: "AN enfant 2",
        ordre: 14002
      },
      piecesJustificatives: [
        {
          id: "a272a029-db45-496f-919c-f388d37693ef",
          nom: "acteNaissanceFemme.png",
          mimeType: "image/png",
          taille: 0,
          referenceSwift: "a2720bff-76b2-48d4-9efc-5b3cfd16682c",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25d043123c201ef8e580f",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: ""
        }
      ]
    },
    {
      id: "a2725d07-f6a1-4dff-9108-635d7adcdd39",
      libelle: "enfants_3",
      categorie: {
        libelleAAfficher: "AN enfant 3",
        ordre: 14003
      },
      piecesJustificatives: [
        {
          id: "a2725882-6d01-4d30-aea3-9b9daac3e446",
          nom: "acteNaissanceHomme.jpg",
          mimeType: "image/jpeg",
          taille: 0,
          referenceSwift: "a27259aa-3ca9-4f47-8627-59f2266a177c",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25d123123c201ef8e5821",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: ""
        }
      ]
    },
    {
      id: "a2726fb1-bf74-4186-9831-d4c278ca3506",
      libelle: "etat_civil",
      categorie: {
        libelleAAfficher: "Titre de séjour postulant",
        ordre: 18000
      },
      piecesJustificatives: [
        {
          id: "a2725a27-0c8e-4fe8-8828-9b838558db1c",
          nom: "carteSejourFemme.png",
          mimeType: "image/png",
          taille: 0,
          referenceSwift: "a272acab-30c2-4de4-b313-6880ea47b9de",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25a3b3835ae496f537907",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: ""
        }
      ]
    },
    {
      id: "a2729f6c-56e3-4e49-864f-61991bf83a50",
      libelle: "etat_civil",
      categorie: {
        libelleAAfficher: "Pièce d'identité postulant",
        ordre: 19000
      },
      piecesJustificatives: [
        {
          id: "a272d747-3f32-4d2e-a429-b7d23f073c81",
          nom: "passportPortugalFemme.png",
          mimeType: "image/png",
          taille: 0,
          referenceSwift: "a272ed5d-a45d-4e2c-b61e-332d1eb89097",
          conteneurSwift: "pieces-justificatives-2022-11",
          typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
          typeObjetPj: "CREATION",
          idFichierNatali: "62e25a2b3123c201ef8e57eb",
          ordreNatali: 1,
          nouveauLibelleFichierPJ: ""
        }
      ]
    }
  ],
  campagne: "",
  nature: "REINTEGRATION",
  numero: "3S3WN7",
  statutCourant: {
    statut: {
      _libelle: "Retour SDANF",
      _nom: "RETOUR_SDANF"
    },
    dateEffet: 1670406024000,
    raisonStatut: ""
  },
  numeroAncien: "",
  natureActeTranscrit: "",
  personnesSauvegardees: []
};

export const requeteCreationEtablissementSaisieProjet = {
  id: "er5ez456-354v-461z-c5fd-162md289m74h",
  numeroFonctionnel: "2H5U3Q",
  dateCreation: 1656404736683,
  canal: "RIE",
  type: "CREATION",
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
  idService: "6737566d-0f25-45dc-8443-97b444e6753a",
  actions: [],
  titulaires: [
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
      qualite: "",
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
      suiviDossiers: [
        {
          id: "a272ec8a-1351-4edd-99b8-03004292a9d2",
          dateEtablissement: 1492693480000,
          natureProjet: "NAISSANCE",
          avancement: "A_SAISIR"
        }
      ],
      retenueSdanf: {
        id: "3ed91bb9-1949-4625-b06f-7ce487f8f827",
        nomNaissance: "nomNaissance",
        nomUsage: "nomUsage",
        nomActuel: "nomActuel",
        nomDemandeFrancisation: "nomFrancisation",
        nomDemandeIdentification: null,
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        codePostalNaissance: "codePostalNaissance",
        villeNaissance: "villeNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        regionNaissance: "",
        paysNaissance: "paysNaissance",
        prenomsRetenu: [
          {
            id: "3ed99ec3-a80f-480d-b91f-b4068f0b3bf6",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          },
          {
            id: "3ed99ec3-a80f-480d-b91f-b4068f0b3bf7",
            numeroOrdre: 1,
            prenom: "prenomFrancisation",
            estPrenomFrRetenuSdanf: true
          }
        ]
      },
      nomActuel: "nomActuel",
      nombreEnfantMineur: 0,
      nombreEnfantEffetCollectif: 0,
      decret: {
        id: "db48117d-3b19-483f-ae3e-188feff9eac4",
        numeroDecret: "123456",
        dateSignature: 1500000000000,
        datePublication: 1600000000000
      }
    },
    {
      id: "3ed943e2-daa0-45c0-befd-b5f6b69c31c3",
      position: 1,
      nomNaissance: "champNomParent2",
      nomUsage: "champNomParent2",
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
          prenom: "champPrenomParent1",
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
      typeObjetTitulaire: "FAMILLE",
      qualite: "PARENT",
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
      suiviDossiers: [
        {
          id: "a272ec8a-1351-4edd-99b8-03004292a9d2",
          dateEtablissement: 1492693480000,
          natureProjet: "NAISSANCE",
          avancement: "A_SAISIR"
        }
      ],
      retenueSdanf: {
        id: "3ed91bb9-1949-4625-b06f-7ce487f8f827",
        nomNaissance: "champNomNaissanceParent1",
        nomUsage: "champNomNaissanceParent1",
        nomActuel: "champNomParent1",
        nomDemandeFrancisation: "champNomNaissanceParent1",
        nomDemandeIdentification: null,
        jourNaissance: 1,
        moisNaissance: 1,
        anneeNaissance: 2001,
        codePostalNaissance: "champCodePostalNaissanceParent1",
        villeNaissance: "champVilleNaissanceParent1",
        villeEtrangereNaissance: "champVilleEtrangereNaissanceParent1",
        arrondissementNaissance: "champArrondissementNaissanceParent1",
        regionNaissance: "",
        paysNaissance: "champPaysNaissanceParent1",
        prenomsRetenu: [
          {
            id: "3ed9d90f-3e67-42d2-9215-a85c6fa4943b",
            numeroOrdre: 1,
            prenom: "champPrenomParent1",
            estPrenomFrRetenuSdanf: null
          }
        ]
      },
      nomActuel: "nomActuel",
      nombreEnfantMineur: 0,
      nombreEnfantEffetCollectif: 0
    },
    {
      id: "3ed943e2-daa0-45c0-befd-b5f6b69c31d8",
      position: 2,
      nomNaissance: "champNomParent2",
      nomUsage: "champNomParent2",
      anneeNaissance: 1963,
      moisNaissance: 3,
      jourNaissance: 4,
      villeNaissance: "nantes",
      codePostalNaissance: "44000",
      arrondissementNaissance: "arrondissementNaissance",
      villeEtrangereNaissance: "villeEtrangereNaissance",
      regionNaissance: "regionNaissance",
      paysNaissance: "paysNaissance",
      sexe: "FEMININ",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "3ed9d90f-3e67-42d2-9215-a85c6fa4943b",
          numeroOrdre: 1,
          prenom: "Sarah",
          estPrenomFrRetenuSdanf: null
        },
        {
          id: "3ed9d90f-3e67-42d2-9215-a85c6fa4943b",
          numeroOrdre: 2,
          prenom: "Beths",
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
      typeObjetTitulaire: "FAMILLE",
      qualite: "PARENT",
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
      suiviDossiers: [
        {
          id: "a272ec8a-1351-4edd-99b8-03004292a9d2",
          dateEtablissement: 1492693480000,
          natureProjet: "NAISSANCE",
          avancement: "A_SAISIR"
        }
      ],
      retenueSdanf: {
        id: "3ed91bb9-1949-4625-b06f-7ce487f8f827",
        nomNaissance: "champNomNaissanceParent2",
        nomUsage: "champNomNaissanceParent2",
        nomActuel: "champNomNaissanceParent2",
        nomDemandeFrancisation: "nomFrancisation",
        nomDemandeIdentification: null,
        jourNaissance: 2,
        moisNaissance: 2,
        anneeNaissance: 2002,
        codePostalNaissance: "champCodePostalNaissanceParent2",
        villeNaissance: "champVilleNaissanceParent2",
        villeEtrangereNaissance: "champVilleEtrangereNaissanceParent2",
        arrondissementNaissance: "champArrondissementNaissance",
        regionNaissance: "",
        paysNaissance: "champPaysNaissanceParent2",
        prenomsRetenu: [
          {
            id: "3ed9d90f-3e67-42d2-9215-a85c6fa4943b",
            numeroOrdre: 1,
            prenom: "champPrenomParent2",
            estPrenomFrRetenuSdanf: null
          }
        ]
      },
      nomActuel: "nomActuel",
      nombreEnfantMineur: 0,
      nombreEnfantEffetCollectif: 0
    }
  ],
  piecesJustificatives: [],
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
  documentsPj: [],
  campagne: "campagne",
  nature: "NATURALISATION",
  dossierNouveaux: null,
  dossierOrigines: null,
  decret: null
} as any as IRequeteCreationEtablissement;

export const requeteCreationEtablissementSaisieProjetEnCours = {
  id: "er5ez456-354v-461z-c5fd-162md289m75v",
  numeroFonctionnel: "2H5U3Q",
  dateCreation: 1656404736683,
  canal: "RIE",
  type: "CREATION",
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
  idService: "6737566d-0f25-45dc-8443-97b444e6753a",
  actions: [],
  titulaires: [
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
      qualite: "",
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
      suiviDossiers: [
        {
          id: "a272ec8a-1351-4edd-99b8-03004292a9d2",
          dateEtablissement: 1492693480000,
          natureProjet: "NAISSANCE",
          avancement: "EN_COURS"
        }
      ],
      retenueSdanf: {
        id: "3ed91bb9-1949-4625-b06f-7ce487f8f827",
        nomNaissance: "nomNaissance",
        nomUsage: "nomUsage",
        nomActuel: "nomActuel",
        nomDemandeFrancisation: "nomFrancisation",
        nomDemandeIdentification: null,
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        codePostalNaissance: "codePostalNaissance",
        villeNaissance: "villeNaissance",
        villeEtrangereNaissance: "villeEtrangereNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        regionNaissance: "",
        paysNaissance: "paysNaissance",
        prenomsRetenu: [
          {
            id: "3ed99ec3-a80f-480d-b91f-b4068f0b3bf6",
            numeroOrdre: 1,
            prenom: "prenom",
            estPrenomFrRetenuSdanf: null
          },
          {
            id: "3ed99ec3-a80f-480d-b91f-b4068f0b3bf7",
            numeroOrdre: 1,
            prenom: "prenomFrancisation",
            estPrenomFrRetenuSdanf: true
          }
        ]
      },
      nomActuel: "nomActuel",
      nombreEnfantMineur: 0,
      nombreEnfantEffetCollectif: 0,
      decret: {
        id: "db48117d-3b19-483f-ae3e-188feff9eac4",
        numeroDecret: "123456",
        dateSignature: 1500000000000,
        datePublication: 1600000000000
      }
    },
    {
      id: "3ed943e2-daa0-45c0-befd-b5f6b69c31c3",
      position: 1,
      nomNaissance: "champNomParent2",
      nomUsage: "champNomParent2",
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
          prenom: "champPrenomParent1",
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
      typeObjetTitulaire: "FAMILLE",
      qualite: "PARENT",
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
      suiviDossiers: [
        {
          id: "a272ec8a-1351-4edd-99b8-03004292a9d2",
          dateEtablissement: 1492693480000,
          natureProjet: "NAISSANCE",
          avancement: "A_SAISIR"
        }
      ],
      retenueSdanf: {
        id: "3ed91bb9-1949-4625-b06f-7ce487f8f827",
        nomNaissance: "champNomNaissanceParent1",
        nomUsage: "champNomNaissanceParent1",
        nomActuel: "champNomParent1",
        nomDemandeFrancisation: "champNomNaissanceParent1",
        nomDemandeIdentification: null,
        jourNaissance: 1,
        moisNaissance: 1,
        anneeNaissance: 2001,
        codePostalNaissance: "champCodePostalNaissanceParent1",
        villeNaissance: "champVilleNaissanceParent1",
        villeEtrangereNaissance: "champVilleEtrangereNaissanceParent1",
        arrondissementNaissance: "champArrondissementNaissanceParent1",
        regionNaissance: "",
        paysNaissance: "champPaysNaissanceParent1",
        prenomsRetenu: [
          {
            id: "3ed9d90f-3e67-42d2-9215-a85c6fa4943b",
            numeroOrdre: 1,
            prenom: "champPrenomParent1",
            estPrenomFrRetenuSdanf: null
          }
        ]
      },
      nomActuel: "nomActuel",
      nombreEnfantMineur: 0,
      nombreEnfantEffetCollectif: 0
    },
    {
      id: "3ed943e2-daa0-45c0-befd-b5f6b69c31d8",
      position: 2,
      nomNaissance: "champNomParent2",
      nomUsage: "champNomParent2",
      anneeNaissance: 1963,
      moisNaissance: 3,
      jourNaissance: 4,
      villeNaissance: "nantes",
      codePostalNaissance: "44000",
      arrondissementNaissance: "arrondissementNaissance",
      villeEtrangereNaissance: "villeEtrangereNaissance",
      regionNaissance: "regionNaissance",
      paysNaissance: "paysNaissance",
      sexe: "FEMININ",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "3ed9d90f-3e67-42d2-9215-a85c6fa4943b",
          numeroOrdre: 1,
          prenom: "Sarah",
          estPrenomFrRetenuSdanf: null
        },
        {
          id: "3ed9d90f-3e67-42d2-9215-a85c6fa4943b",
          numeroOrdre: 2,
          prenom: "Beths",
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
      typeObjetTitulaire: "FAMILLE",
      qualite: "PARENT",
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
      suiviDossiers: [
        {
          id: "a272ec8a-1351-4edd-99b8-03004292a9d2",
          dateEtablissement: 1492693480000,
          natureProjet: "NAISSANCE",
          avancement: "A_SAISIR"
        }
      ],
      retenueSdanf: {
        id: "3ed91bb9-1949-4625-b06f-7ce487f8f827",
        nomNaissance: "champNomNaissanceParent2",
        nomUsage: "champNomNaissanceParent2",
        nomActuel: "champNomNaissanceParent2",
        nomDemandeFrancisation: "nomFrancisation",
        nomDemandeIdentification: null,
        jourNaissance: 2,
        moisNaissance: 2,
        anneeNaissance: 2002,
        codePostalNaissance: "champCodePostalNaissanceParent2",
        villeNaissance: "champVilleNaissanceParent2",
        villeEtrangereNaissance: "champVilleEtrangereNaissanceParent2",
        arrondissementNaissance: "champArrondissementNaissance",
        regionNaissance: "",
        paysNaissance: "champPaysNaissanceParent2",
        prenomsRetenu: [
          {
            id: "3ed9d90f-3e67-42d2-9215-a85c6fa4943b",
            numeroOrdre: 1,
            prenom: "champPrenomParent2",
            estPrenomFrRetenuSdanf: null
          }
        ]
      },
      nomActuel: "nomActuel",
      nombreEnfantMineur: 0,
      nombreEnfantEffetCollectif: 0
    }
  ],
  piecesJustificatives: [],
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
  documentsPj: [],
  campagne: "campagne",
  nature: "NATURALISATION",
  dossierNouveaux: null,
  dossierOrigines: null,
  decret: null
} as any as IRequeteCreationEtablissement;

export const requeteCreationEtablissementPieceJustificative = {
  errors: [],
  data: {
    id: "a2724cc9-450c-4e50-9d05-a44a28717954",
    numeroFonctionnel: "3S3WN7",
    dateCreation: 1669731006000,
    canal: "RIE",
    type: "CREATION",
    idUtilisateur: "b67f9d14-cc5e-4002-aa06-e54029ffa073",
    idService: "6737dca8-2f96-4086-8288-fd1a136a61df",
    actions: [
      {
        id: "a272f8e0-d9d9-4051-940e-a27112d99a25",
        numeroOrdre: 1,
        libelle: "A traiter",
        dateAction: 1669731006000,
        idUtilisateur: "c4b37383-54c8-4f65-afdf-be1355a90ee2"
      },
      {
        id: "ce6205c8-3f09-4862-b855-426a69b7da4c",
        numeroOrdre: 2,
        libelle: "Prise en charge",
        dateAction: 1670405938000,
        idUtilisateur: "95874922-2011-4266-8a1d-76271afec4a4"
      },
      {
        id: "ce645cd8-a31f-4716-990a-9b31914f8d8d",
        numeroOrdre: 3,
        libelle: "Retour SDANF",
        dateAction: 1670406024000,
        idUtilisateur: "95874922-2011-4266-8a1d-76271afec4a4"
      },
      {
        id: "12cda08e-efb6-4103-b851-08d93caf5baf",
        numeroOrdre: 4,
        libelle: "Prise en charge",
        dateAction: 1695049779851,
        idUtilisateur: "b67f9d14-cc5e-4002-aa06-e54029ffa073"
      },
      {
        id: "1317cce3-2275-411a-a2e2-3231add8c64d",
        numeroOrdre: 5,
        libelle: "Prise en charge",
        dateAction: 1695054204622,
        idUtilisateur: "b67f9d14-cc5e-4002-aa06-e54029ffa073"
      },
      {
        id: "1317eac4-7584-4eec-b3e3-1a1c0ba7073f",
        numeroOrdre: 6,
        libelle: "Prise en charge",
        dateAction: 1695054232461,
        idUtilisateur: "b67f9d14-cc5e-4002-aa06-e54029ffa073"
      }
    ],
    titulaires: [
      {
        id: "a272d50a-2850-495f-848b-a660be79cea8",
        position: 1,
        nomNaissance: "ANBDE",
        nomUsage: "",
        anneeNaissance: 1962,
        villeNaissance: "la havane",
        codePostalNaissance: "",
        arrondissementNaissance: "",
        villeEtrangereNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        lieuNaissanceFormate: "la havane (CUBA)",
        dateNaissanceFormatee: "1962",
        sexe: "FEMININ",
        nationalite: "ETRANGERE",
        prenoms: [
          {
            id: "a272b8c5-e92e-4409-b755-946d980d44a2",
            numeroOrdre: 1,
            prenom: "Anne"
          }
        ],
        parentsTitulaire: [],
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        nomPremierePartie: "",
        nomSecondePartie: "",
        courriel: "",
        telephone: "",
        nationalites: [
          {
            id: "a2723816-b047-4f98-a274-310a64b1bf4f",
            nationalite: "cubaine"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        suiviDossiers: [],
        retenueSdanf: {
          id: "a2726fe6-4c4a-4da1-9201-202ea54ab236",
          nomNaissance: "ANBDE",
          nomUsage: "",
          nomActuel: "",
          nomDemandeFrancisation: "",
          nomDemandeIdentification: "",
          anneeNaissance: 1962,
          codePostalNaissance: "",
          villeNaissance: "la havane",
          villeEtrangereNaissance: "",
          arrondissementNaissance: "",
          regionNaissance: "",
          paysNaissance: "CUBA",
          prenomsRetenu: [
            {
              id: "a272481e-b34a-4ce0-bacb-db08ecd4aadb",
              numeroOrdre: 1,
              prenom: "Anne"
            }
          ]
        },
        qualite: "PARENT",
        numeroDossierNational: "",
        domiciliationEnfant: ""
      },
      {
        id: "a272b563-7a26-4416-9391-8d028947433c",
        position: 1,
        nomNaissance: "PLAGNE",
        nomUsage: "",
        anneeNaissance: 2018,
        moisNaissance: 2,
        jourNaissance: 10,
        villeNaissance: "la havane",
        codePostalNaissance: "",
        arrondissementNaissance: "",
        villeEtrangereNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        lieuNaissanceFormate: "la havane (CUBA)",
        dateNaissanceFormatee: "10/02/2018",
        sexe: "MASCULIN",
        nationalite: "ETRANGERE",
        prenoms: [
          {
            id: "a272e985-0184-4207-9d4a-3a67fe8d73fa",
            numeroOrdre: 1,
            prenom: "Joe"
          }
        ],
        parentsTitulaire: [],
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        nomPremierePartie: "",
        nomSecondePartie: "",
        courriel: "",
        telephone: "",
        nationalites: [
          {
            id: "a272ad7e-11de-46e6-b739-be10ff144b53",
            nationalite: "cubaine"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        suiviDossiers: [
          {
            id: "a27241d3-c3fc-46e9-bd1b-92f1b98c3742",
            jourEvenement: 10,
            moisEvenement: 2,
            anneeEvenement: 2018,
            referenceActe: "",
            natureProjet: "NAISSANCE",
            avancement: "A_SAISIR",
            unionActuelle: "OUI"
          }
        ],
        retenueSdanf: {
          id: "a272aed6-a3ce-480c-a4d1-d4190cd60f16",
          nomNaissance: "PLAGNE",
          nomUsage: "",
          nomActuel: "",
          nomDemandeFrancisation: "",
          nomDemandeIdentification: "",
          jourNaissance: 10,
          moisNaissance: 2,
          anneeNaissance: 2018,
          codePostalNaissance: "",
          villeNaissance: "la havane",
          villeEtrangereNaissance: "",
          arrondissementNaissance: "",
          regionNaissance: "",
          paysNaissance: "CUBA",
          prenomsRetenu: [
            {
              id: "a2720162-2d8e-4d75-82e5-2472b1c2babe",
              numeroOrdre: 1,
              prenom: "Joe"
            }
          ]
        },
        qualite: "ENFANT_MINEUR",
        numeroDossierNational: "",
        valideEffetCollectif: "NON_RENSEIGNE",
        residence: "IDENTIQUE_TITULAIRE_REQUETE",
        domiciliationEnfant: ""
      },
      {
        id: "a2727123-6665-4e27-9f2f-3065124dc1e7",
        position: 1,
        nomNaissance: "PLAGNE",
        nomUsage: "",
        anneeNaissance: 1991,
        moisNaissance: 1,
        jourNaissance: 5,
        villeNaissance: "INC",
        codePostalNaissance: "",
        arrondissementNaissance: "",
        villeEtrangereNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        lieuNaissanceFormate: "INC (CUBA)",
        dateNaissanceFormatee: "05/01/1991",
        sexe: "MASCULIN",
        nationalite: "ETRANGERE",
        prenoms: [
          {
            id: "a2720cd2-41ab-497e-a4fa-0ffb9d36f41e",
            numeroOrdre: 1,
            prenom: "Sylvie"
          }
        ],
        parentsTitulaire: [],
        domiciliation: {
          id: "a27223d9-ea20-45a7-b8a7-68916726926c",
          ligne2: "",
          ligne3: "10 Rue Jean Pierre Timbaud",
          ligne4: "",
          ligne5: "",
          codePostal: "92400",
          ville: "Courbevoie",
          villeEtrangere: "",
          arrondissement: "",
          region: "",
          pays: "FRANCE"
        },
        evenementUnions: [
          {
            id: "a272c9b3-c0e0-4d13-b125-149af95bc4b3",
            type: "MARIAGE",
            jour: 10,
            mois: 2,
            annee: 2012,
            ville: "la havane",
            region: "",
            pays: "CUBA",
            lieuFormate: "la havane (CUBA)",
            dateFormatee: "10/02/2012",
            situationActuelle: true
          }
        ],
        typeObjetTitulaire: "POSTULANT_NATIONALITE",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        nomPremierePartie: "",
        nomSecondePartie: "",
        courriel: "feffuquiffaru-1138@yopmail.com",
        telephone: "",
        situationFamilliale: "MARIE",
        nationalites: [
          {
            id: "a2725587-1327-4162-bd23-0a1cb67732ba",
            nationalite: "cubaine"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        suiviDossiers: [
          {
            id: "a272ec8a-1351-4edd-99b8-03004292a9d2",
            idActe: "6e89c1c1-16c4-4e40-9b72-7b567270b26f",
            jourEvenement: 5,
            moisEvenement: 1,
            anneeEvenement: 1991,
            referenceActe: "",
            natureProjet: "NAISSANCE",
            avancement: "A_VERIFIER",
            unionActuelle: "OUI"
          },
          {
            id: "a272ec8a-1351-4edd-99b8-03004292a9d3",
            idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134b",
            jourEvenement: 10,
            moisEvenement: 10,
            anneeEvenement: 2015,
            referenceActe: "",
            natureProjet: "MARIAGE",
            avancement: "A_VERIFIER",
            unionActuelle: "OUI"
          }
        ],
        retenueSdanf: {
          id: "a272d78a-a260-40ea-8692-cc64d56d5ec8",
          nomNaissance: "PLAGNE",
          nomUsage: "",
          nomActuel: "",
          nomDemandeFrancisation: "",
          nomDemandeIdentification: "",
          jourNaissance: 5,
          moisNaissance: 1,
          anneeNaissance: 1991,
          codePostalNaissance: "",
          villeNaissance: "INC",
          villeEtrangereNaissance: "",
          arrondissementNaissance: "",
          regionNaissance: "",
          paysNaissance: "CUBA",
          prenomsRetenu: [
            {
              id: "a2726344-81cb-4078-8ab2-48037cdc1620",
              numeroOrdre: 1,
              prenom: "Sylvie"
            }
          ]
        },
        nomActuel: "",
        nombreEnfantMineur: 3,
        nombreEnfantEffetCollectif: 3
      },
      {
        id: "a272b594-c9a9-4491-b92e-91ff4405242b",
        position: 1,
        nomNaissance: "BILLY",
        nomUsage: "",
        anneeNaissance: 1970,
        moisNaissance: 3,
        jourNaissance: 10,
        villeNaissance: "la havane",
        codePostalNaissance: "",
        arrondissementNaissance: "",
        villeEtrangereNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        lieuNaissanceFormate: "la havane (CUBA)",
        dateNaissanceFormatee: "10/03/1970",
        sexe: "MASCULIN",
        nationalite: "ETRANGERE",
        prenoms: [
          {
            id: "a272bce0-3b83-411f-8ade-0f0544f475a8",
            numeroOrdre: 1,
            prenom: "Jean"
          }
        ],
        parentsTitulaire: [],
        evenementUnions: [
          {
            id: "a272c9b3-c0e0-4d13-b125-149af95bc4b3",
            type: "MARIAGE",
            jour: 10,
            mois: 2,
            annee: 2012,
            ville: "la havane",
            region: "",
            pays: "CUBA",
            lieuFormate: "la havane (CUBA)",
            dateFormatee: "10/02/2012",
            situationActuelle: true
          }
        ],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        nomPremierePartie: "",
        nomSecondePartie: "",
        courriel: "",
        telephone: "",
        nationalites: [
          {
            id: "a272ed57-a628-4e35-9490-afa3939c5952",
            nationalite: "cubaine"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        suiviDossiers: [
          {
            id: "a272db4b-229d-4be1-aea4-f8df6e9ba187",
            jourEvenement: 10,
            moisEvenement: 3,
            anneeEvenement: 1970,
            referenceActe: "",
            natureProjet: "NAISSANCE",
            avancement: "A_VERIFIER",
            unionActuelle: "OUI"
          },
          {
            id: "a272db4b-229d-4be1-aea4-f8df6e9ba188",
            idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134b",
            jourEvenement: 10,
            moisEvenement: 10,
            anneeEvenement: 2015,
            referenceActe: "",
            natureProjet: "MARIAGE",
            avancement: "A_VERIFIER",
            unionActuelle: "OUI"
          }
        ],
        retenueSdanf: {
          id: "a272ca8d-be4f-4e21-908e-9e19832dab0e",
          nomNaissance: "BILLY",
          nomUsage: "",
          nomActuel: "",
          nomDemandeFrancisation: "",
          nomDemandeIdentification: "",
          jourNaissance: 10,
          moisNaissance: 3,
          anneeNaissance: 1970,
          codePostalNaissance: "",
          villeNaissance: "la havane",
          villeEtrangereNaissance: "",
          arrondissementNaissance: "",
          regionNaissance: "",
          paysNaissance: "CUBA",
          prenomsRetenu: [
            {
              id: "a272e3d2-047b-4763-bb3e-34af64b309a4",
              numeroOrdre: 1,
              prenom: "Jean"
            }
          ]
        },
        qualite: "CONJOINT_ACTUEL",
        numeroDossierNational: "",
        domiciliationEnfant: ""
      },
      {
        id: "a272f77f-ae56-4a92-a713-fdbb50f19004",
        position: 2,
        nomNaissance: "PLAGNE",
        nomUsage: "",
        anneeNaissance: 1963,
        villeNaissance: "la havane",
        codePostalNaissance: "",
        arrondissementNaissance: "",
        villeEtrangereNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        lieuNaissanceFormate: "la havane (CUBA)",
        dateNaissanceFormatee: "1963",
        sexe: "MASCULIN",
        nationalite: "ETRANGERE",
        prenoms: [
          {
            id: "a2725353-0b3b-4c3a-bc7c-fc5fcc774d85",
            numeroOrdre: 1,
            prenom: "Paul"
          }
        ],
        parentsTitulaire: [],
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        nomPremierePartie: "",
        nomSecondePartie: "",
        courriel: "",
        telephone: "",
        nationalites: [
          {
            id: "a272b21c-be9e-4b32-bc4c-d7509b6628dc",
            nationalite: "cubaine"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        suiviDossiers: [],
        retenueSdanf: {
          id: "a272150f-8ff8-42b4-8736-0b9960c5479a",
          nomNaissance: "PLAGNE",
          nomUsage: "",
          nomActuel: "",
          nomDemandeFrancisation: "",
          nomDemandeIdentification: "",
          anneeNaissance: 1963,
          codePostalNaissance: "",
          villeNaissance: "la havane",
          villeEtrangereNaissance: "",
          arrondissementNaissance: "",
          regionNaissance: "",
          paysNaissance: "CUBA",
          prenomsRetenu: [
            {
              id: "a2720e1d-ea16-463e-8045-020c9b6a0c30",
              numeroOrdre: 1,
              prenom: "Paul"
            }
          ]
        },
        qualite: "PARENT",
        numeroDossierNational: "",
        domiciliationEnfant: ""
      },
      {
        id: "a272fed8-aa10-43c8-994d-04e7194e7e82",
        position: 2,
        nomNaissance: "PLAGNE",
        nomUsage: "",
        anneeNaissance: 2018,
        moisNaissance: 2,
        jourNaissance: 10,
        villeNaissance: "la havane",
        codePostalNaissance: "",
        arrondissementNaissance: "",
        villeEtrangereNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        lieuNaissanceFormate: "la havane (CUBA)",
        dateNaissanceFormatee: "10/02/2018",
        sexe: "MASCULIN",
        nationalite: "ETRANGERE",
        prenoms: [
          {
            id: "a272112c-4794-4777-9677-c20525f1b637",
            numeroOrdre: 1,
            prenom: "Jean"
          }
        ],
        parentsTitulaire: [],
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        nomPremierePartie: "",
        nomSecondePartie: "",
        courriel: "",
        telephone: "",
        nationalites: [
          {
            id: "a2726d56-4299-4b48-9ee9-22530cad51f5",
            nationalite: "cubaine"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        suiviDossiers: [
          {
            id: "a272c039-604c-4f54-b6d5-5b8eb66a80e0",
            jourEvenement: 10,
            moisEvenement: 2,
            anneeEvenement: 2018,
            referenceActe: "",
            natureProjet: "NAISSANCE",
            avancement: "A_SAISIR",
            unionActuelle: "OUI"
          }
        ],
        retenueSdanf: {
          id: "a272f921-85b8-410b-9bde-d226d21b7b2c",
          nomNaissance: "PLAGNE",
          nomUsage: "",
          nomActuel: "",
          nomDemandeFrancisation: "",
          nomDemandeIdentification: "",
          jourNaissance: 10,
          moisNaissance: 2,
          anneeNaissance: 2018,
          codePostalNaissance: "",
          villeNaissance: "la havane",
          villeEtrangereNaissance: "",
          arrondissementNaissance: "",
          regionNaissance: "",
          paysNaissance: "CUBA",
          prenomsRetenu: [
            {
              id: "a272d865-feee-46de-a0e8-39c7b34b76ad",
              numeroOrdre: 1,
              prenom: "Jean"
            }
          ]
        },
        qualite: "ENFANT_MINEUR",
        numeroDossierNational: "",
        valideEffetCollectif: "NON_RENSEIGNE",
        residence: "IDENTIQUE_TITULAIRE_REQUETE",
        domiciliationEnfant: ""
      },
      {
        id: "a2725ecd-1d07-40b5-881b-2dbdff396535",
        position: 3,
        nomNaissance: "PLAGNE",
        nomUsage: "",
        anneeNaissance: 2016,
        moisNaissance: 2,
        jourNaissance: 5,
        villeNaissance: "la havane",
        codePostalNaissance: "",
        arrondissementNaissance: "",
        villeEtrangereNaissance: "",
        regionNaissance: "",
        paysNaissance: "CUBA",
        lieuNaissanceFormate: "la havane (CUBA)",
        dateNaissanceFormatee: "05/02/2016",
        sexe: "FEMININ",
        nationalite: "ETRANGERE",
        prenoms: [
          {
            id: "a2728565-af21-4b0e-a5a1-fdba7695ddc0",
            numeroOrdre: 1,
            prenom: "Ali"
          }
        ],
        parentsTitulaire: [],
        evenementUnions: [],
        typeObjetTitulaire: "FAMILLE",
        nomDemandeFrancisation: "",
        nomDemandeIdentification: "",
        nomPremierePartie: "",
        nomSecondePartie: "",
        courriel: "",
        telephone: "",
        nationalites: [
          {
            id: "a2729055-ea8a-457e-b4e7-f7795ac90b9e",
            nationalite: "cubaine"
          }
        ],
        prenomsDemande: [],
        lienEtatCivil: [],
        suiviDossiers: [
          {
            id: "a27259a6-8f44-43bd-bd30-c402aeea60d8",
            jourEvenement: 5,
            moisEvenement: 2,
            anneeEvenement: 2016,
            referenceActe: "",
            natureProjet: "NAISSANCE",
            avancement: "A_SAISIR",
            unionActuelle: "OUI"
          }
        ],
        retenueSdanf: {
          id: "a27225ea-c410-4f0d-838e-de041ea95f59",
          nomNaissance: "PLAGNE",
          nomUsage: "",
          nomActuel: "",
          nomDemandeFrancisation: "",
          nomDemandeIdentification: "",
          jourNaissance: 5,
          moisNaissance: 2,
          anneeNaissance: 2016,
          codePostalNaissance: "",
          villeNaissance: "la havane",
          villeEtrangereNaissance: "",
          arrondissementNaissance: "",
          regionNaissance: "",
          paysNaissance: "CUBA",
          prenomsRetenu: [
            {
              id: "a272a315-c1d2-46ac-86be-6aca01013cac",
              numeroOrdre: 1,
              prenom: "Ali"
            }
          ]
        },
        qualite: "ENFANT_MINEUR",
        numeroDossierNational: "",
        valideEffetCollectif: "NON_RENSEIGNE",
        residence: "IDENTIQUE_TITULAIRE_REQUETE",
        domiciliationEnfant: ""
      }
    ],
    piecesJustificatives: [
      {
        id: "a272015d-4e53-4e73-9fef-a31b56730b77",
        nom: "acteNaissanceHomme.jpg",
        mimeType: "image/jpeg",
        taille: 0,
        referenceSwift: "a27297cb-367e-4e97-99cb-0a16ce2287e7",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25bf33835ae496f537913",
        ordreNatali: 1,
        documentPj: {
          id: "a2725caa-69ff-4452-b455-bd959b833d53",
          libelle: "parents_2",
          categorie: "ACTE_ETAT_CIVIL_PARENT"
        },
        nouveauLibelleFichierPJ: ""
      },
      {
        id: "a272a029-db45-496f-919c-f388d37693ef",
        nom: "acteNaissanceFemme.png",
        mimeType: "image/png",
        taille: 0,
        referenceSwift: "a2720bff-76b2-48d4-9efc-5b3cfd16682c",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25d043123c201ef8e580f",
        ordreNatali: 1,
        documentPj: {
          id: "a272a12c-88b6-4c6e-86c2-0b4876d230bf",
          libelle: "enfants_2",
          categorie: "ACTE_NAISSANCE_ENFANT"
        },
        nouveauLibelleFichierPJ: ""
      },
      {
        id: "a2725a27-0c8e-4fe8-8828-9b838558db1c",
        nom: "carteSejourFemme.png",
        mimeType: "image/png",
        taille: 0,
        referenceSwift: "a272acab-30c2-4de4-b313-6880ea47b9de",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25a3b3835ae496f537907",
        ordreNatali: 1,
        documentPj: {
          id: "a2726fb1-bf74-4186-9831-d4c278ca3506",
          libelle: "etat_civil",
          categorie: "TITRE_SEJOUR"
        },
        nouveauLibelleFichierPJ: ""
      },
      {
        id: "a272a10a-f1ab-442f-9d6b-8693b32cca34",
        nom: "acteNaissanceFemme.png",
        mimeType: "image/png",
        taille: 0,
        referenceSwift: "a27273d6-07b3-483b-b672-2f942e4833f4",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25a353835ae496f537901",
        ordreNatali: 1,
        documentPj: {
          id: "a272a8ad-8295-4742-9b89-b571d298e881",
          libelle: "etat_civil",
          categorie: "ACTE_NAISSANCE"
        },
        nouveauLibelleFichierPJ: "acteNaissanceFemme.pdf"
      },
      {
        id: "a27296b3-bf1c-4060-b3b1-2a8accae9559",
        nom: "acteMariage.jpg",
        mimeType: "image/jpeg",
        taille: 0,
        referenceSwift: "a2720e58-55ef-489d-aa12-ad8101e9d23c",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25c023123c201ef8e5803",
        ordreNatali: 1,
        documentPj: {
          id: "a272338a-e931-42e5-9a6e-394764db1388",
          libelle: "union_actuelle_conjoint",
          categorie: "ACTE_MARIAGE"
        },
        nouveauLibelleFichierPJ: ""
      },
      {
        id: "12c6a857-798a-4fb1-adc0-c3b0cb6c73dc",
        nom: "CreationService_Tri_Ko.png",
        mimeType: "image/png",
        taille: 143882,
        referenceSwift: "12c6ac3f-a2e2-4770-8824-6664b8ad5d74.png",
        conteneurSwift: "pieces-justificatives-2023-9",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        documentPj: {
          id: "a272a8ad-8295-4742-9b89-b571d298e881",
          libelle: "etat_civil",
          categorie: "ACTE_NAISSANCE"
        }
      },
      {
        id: "a272535c-6a25-49d1-ae6c-4df653c8c7d4",
        nom: "acteNaissanceFemme.png",
        mimeType: "image/png",
        taille: 0,
        referenceSwift: "a272f8be-aba1-438d-bbde-96f026c23717",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25beb3835ae496f53790d",
        ordreNatali: 1,
        documentPj: {
          id: "a27205a3-a741-4f02-ae7a-f99a887323be",
          libelle: "parents_1",
          categorie: "ACTE_ETAT_CIVIL_PARENT"
        },
        nouveauLibelleFichierPJ: ""
      },
      {
        id: "a2725882-6d01-4d30-aea3-9b9daac3e446",
        nom: "acteNaissanceHomme.jpg",
        mimeType: "image/jpeg",
        taille: 0,
        referenceSwift: "a27259aa-3ca9-4f47-8627-59f2266a177c",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25d123123c201ef8e5821",
        ordreNatali: 1,
        documentPj: {
          id: "a2725d07-f6a1-4dff-9108-635d7adcdd39",
          libelle: "enfants_3",
          categorie: "ACTE_NAISSANCE_ENFANT"
        },
        nouveauLibelleFichierPJ: ""
      },
      {
        id: "a272746d-709f-4690-95a3-b42bbc408d4d",
        nom: "acteMariage.jpg",
        mimeType: "image/jpeg",
        taille: 0,
        referenceSwift: "a2722436-5cdb-418f-94a7-83afc50fcecd",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25be53123c201ef8e57fd",
        ordreNatali: 1,
        documentPj: {
          id: "a27241f7-9ee3-40ee-9a25-afa3a1ce23bb",
          libelle: "parents_et_fratrie",
          categorie: "ACTE_MARIAGE_PARENTS"
        },
        nouveauLibelleFichierPJ: ""
      },
      {
        id: "12d1da77-ab9d-41d6-b6a2-db5b9b2044dc",
        nom: "nom persone avec minsucule.png",
        mimeType: "image/png",
        taille: 37199,
        referenceSwift: "12d10643-3042-42fe-8fdc-f7a905ba6d03.png",
        conteneurSwift: "pieces-justificatives-2023-9",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        documentPj: {
          id: "a272a8ad-8295-4742-9b89-b571d298e881",
          libelle: "etat_civil",
          categorie: "ACTE_NAISSANCE"
        }
      },
      {
        id: "a2723ef5-04a6-4c00-a38a-6b3af20ff7ac",
        nom: "acteNaissanceHomme.jpg",
        mimeType: "image/jpeg",
        taille: 0,
        referenceSwift: "a2724aa7-9771-4132-b68b-849540d3a29b",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25ce93835ae496f53792b",
        ordreNatali: 1,
        documentPj: {
          id: "a2726148-255f-4f78-9ab2-70190c7e4f32",
          libelle: "enfants_1",
          categorie: "ACTE_NAISSANCE_ENFANT"
        },
        nouveauLibelleFichierPJ: ""
      },
      {
        id: "12f57d4b-d1c1-4c0b-b549-4de988fcbbb2",
        nom: "nom persone avec minsucule.png",
        mimeType: "image/png",
        taille: 37199,
        referenceSwift: "12f5a531-acf2-4717-8524-aca3bc23c1ea.png",
        conteneurSwift: "pieces-justificatives-2023-9",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        documentPj: {
          id: "a272338a-e931-42e5-9a6e-394764db1388",
          libelle: "union_actuelle_conjoint",
          categorie: "ACTE_MARIAGE"
        },
        nouveauLibelleFichierPJ: "666DevilIsHere.png"
      },
      {
        id: "a272d747-3f32-4d2e-a429-b7d23f073c81",
        nom: "passportPortugalFemme.png",
        mimeType: "image/png",
        taille: 0,
        referenceSwift: "a272ed5d-a45d-4e2c-b61e-332d1eb89097",
        conteneurSwift: "pieces-justificatives-2022-11",
        typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
        typeObjetPj: "CREATION",
        idFichierNatali: "62e25a2b3123c201ef8e57eb",
        ordreNatali: 1,
        documentPj: {
          id: "a2729f6c-56e3-4e49-864f-61991bf83a50",
          libelle: "etat_civil",
          categorie: "PIECE_IDENTITE"
        },
        nouveauLibelleFichierPJ: ""
      }
    ],
    requerant: {
      id: "a2720d6d-6a57-4036-ae3e-e82562c61724",
      dateCreation: 1669731003000,
      nomFamille: "",
      prenom: "",
      courriel: "",
      telephone: "",
      qualite: "INSTITUTIONNEL",
      detailQualiteInstitutionnel: {
        id: "a2723b2b-6688-4faf-a5a9-d7dd8aa27ed7",
        type: "PREFECTURE",
        nomInstitution: "",
        nature: ""
      }
    },
    observations: [],
    statut: {
      id: "a2720901-e0e2-468f-bce4-a1fcf0043dcf",
      statutRequete: "A_SIGNER",
      dateEffet: 1695054232481,
      raisonStatut: ""
    },
    doublons: [],
    sousType: "RCEXR",
    numeroAncienSI: "",
    dossierSignale: false,
    commentaire: "",
    demandeIdentification: false,
    demandeFrancisation: false,
    provenance: "NATALI",
    provenanceNatali: {
      id: "a2723d95-9c6e-4959-930b-f08ec6eabeea",
      numeroDossierNational: "2022X 200150",
      statutNatali: "CONTROLE_EN_ATTENTE_PEC",
      provenanceNaturalisation: "NATALI",
      numeroDossierLocal: "",
      dateDepot: 1658996525000,
      datePriseEnChargeSdanf: 0,
      decisionSdanf: "NON_CONNUE",
      tagPriorisation: "SDANF",
      echanges: [
        {
          id: "ce64f67c-02f2-49b0-afab-f9d755bf87d2",
          emetteur: "SCEC",
          destinataire: "SDANF",
          nature: "REPONSE_SCEC",
          message: "Élément manquant - CAS F\nRetour SCEC (flux3) : Décision défavorable élément manquant - Cecile LAMARQUE",
          dateMessage: 1670406024000,
          dateTransfert: 1670406608000,
          pieceJustificativeRequeteCreation: []
        }
      ]
    },
    documentsPj: [
      {
        id: "a2729f6c-56e3-4e49-864f-61991bf83a50",
        libelle: "etat_civil",
        categorie: "PIECE_IDENTITE",
        piecesJustificatives: [
          {
            id: "a272d747-3f32-4d2e-a429-b7d23f073c81",
            nom: "passportPortugalFemme.png",
            mimeType: "image/png",
            taille: 0,
            referenceSwift: "a272ed5d-a45d-4e2c-b61e-332d1eb89097",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25a2b3123c201ef8e57eb",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: ""
          }
        ]
      },
      {
        id: "a272a8ad-8295-4742-9b89-b571d298e881",
        libelle: "etat_civil",
        categorie: "ACTE_NAISSANCE",
        piecesJustificatives: [
          {
            id: "12d1da77-ab9d-41d6-b6a2-db5b9b2044dc",
            nom: "nom persone avec minsucule.png",
            mimeType: "image/png",
            taille: 37199,
            referenceSwift: "12d10643-3042-42fe-8fdc-f7a905ba6d03.png",
            conteneurSwift: "pieces-justificatives-2023-9",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION"
          },
          {
            id: "a272a10a-f1ab-442f-9d6b-8693b32cca34",
            nom: "acteNaissanceFemme.png",
            mimeType: "image/png",
            taille: 0,
            referenceSwift: "a27273d6-07b3-483b-b672-2f942e4833f4",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25a353835ae496f537901",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: "acteNaissanceFemme.pdf"
          },
          {
            id: "12c6a857-798a-4fb1-adc0-c3b0cb6c73dc",
            nom: "CreationService_Tri_Ko.png",
            mimeType: "image/png",
            taille: 143882,
            referenceSwift: "12c6ac3f-a2e2-4770-8824-6664b8ad5d74.png",
            conteneurSwift: "pieces-justificatives-2023-9",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION"
          }
        ]
      },
      {
        id: "a2726fb1-bf74-4186-9831-d4c278ca3506",
        libelle: "etat_civil",
        categorie: "TITRE_SEJOUR",
        piecesJustificatives: [
          {
            id: "a2725a27-0c8e-4fe8-8828-9b838558db1c",
            nom: "carteSejourFemme.png",
            mimeType: "image/png",
            taille: 0,
            referenceSwift: "a272acab-30c2-4de4-b313-6880ea47b9de",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25a3b3835ae496f537907",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: ""
          }
        ]
      },
      {
        id: "a27205a3-a741-4f02-ae7a-f99a887323be",
        libelle: "parents_1",
        categorie: "ACTE_ETAT_CIVIL_PARENT",
        piecesJustificatives: [
          {
            id: "a272535c-6a25-49d1-ae6c-4df653c8c7d4",
            nom: "acteNaissanceFemme.png",
            mimeType: "image/png",
            taille: 0,
            referenceSwift: "a272f8be-aba1-438d-bbde-96f026c23717",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25beb3835ae496f53790d",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: ""
          }
        ]
      },
      {
        id: "a2725caa-69ff-4452-b455-bd959b833d53",
        libelle: "parents_2",
        categorie: "ACTE_ETAT_CIVIL_PARENT",
        piecesJustificatives: [
          {
            id: "a272015d-4e53-4e73-9fef-a31b56730b77",
            nom: "acteNaissanceHomme.jpg",
            mimeType: "image/jpeg",
            taille: 0,
            referenceSwift: "a27297cb-367e-4e97-99cb-0a16ce2287e7",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25bf33835ae496f537913",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: ""
          }
        ]
      },
      {
        id: "a27241f7-9ee3-40ee-9a25-afa3a1ce23bb",
        libelle: "parents_et_fratrie",
        categorie: "ACTE_MARIAGE_PARENTS",
        piecesJustificatives: [
          {
            id: "a272746d-709f-4690-95a3-b42bbc408d4d",
            nom: "acteMariage.jpg",
            mimeType: "image/jpeg",
            taille: 0,
            referenceSwift: "a2722436-5cdb-418f-94a7-83afc50fcecd",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25be53123c201ef8e57fd",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: ""
          }
        ]
      },
      {
        id: "a272338a-e931-42e5-9a6e-394764db1388",
        libelle: "union_actuelle_conjoint",
        categorie: "ACTE_MARIAGE",
        piecesJustificatives: [
          {
            id: "12f57d4b-d1c1-4c0b-b549-4de988fcbbb2",
            nom: "nom persone avec minsucule.png",
            mimeType: "image/png",
            taille: 37199,
            referenceSwift: "12f5a531-acf2-4717-8524-aca3bc23c1ea.png",
            conteneurSwift: "pieces-justificatives-2023-9",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            nouveauLibelleFichierPJ: "666DevilIsHere.png"
          },
          {
            id: "a27296b3-bf1c-4060-b3b1-2a8accae9559",
            nom: "acteMariage.jpg",
            mimeType: "image/jpeg",
            taille: 0,
            referenceSwift: "a2720e58-55ef-489d-aa12-ad8101e9d23c",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25c023123c201ef8e5803",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: ""
          }
        ]
      },
      {
        id: "a2726148-255f-4f78-9ab2-70190c7e4f32",
        libelle: "enfants_1",
        categorie: "ACTE_NAISSANCE_ENFANT",
        piecesJustificatives: [
          {
            id: "a2723ef5-04a6-4c00-a38a-6b3af20ff7ac",
            nom: "acteNaissanceHomme.jpg",
            mimeType: "image/jpeg",
            taille: 0,
            referenceSwift: "a2724aa7-9771-4132-b68b-849540d3a29b",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25ce93835ae496f53792b",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: ""
          }
        ]
      },
      {
        id: "a272a12c-88b6-4c6e-86c2-0b4876d230bf",
        libelle: "enfants_2",
        categorie: "ACTE_NAISSANCE_ENFANT",
        piecesJustificatives: [
          {
            id: "a272a029-db45-496f-919c-f388d37693ef",
            nom: "acteNaissanceFemme.png",
            mimeType: "image/png",
            taille: 0,
            referenceSwift: "a2720bff-76b2-48d4-9efc-5b3cfd16682c",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25d043123c201ef8e580f",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: ""
          }
        ]
      },
      {
        id: "a2725d07-f6a1-4dff-9108-635d7adcdd39",
        libelle: "enfants_3",
        categorie: "ACTE_NAISSANCE_ENFANT",
        piecesJustificatives: [
          {
            id: "a2725882-6d01-4d30-aea3-9b9daac3e446",
            nom: "acteNaissanceHomme.jpg",
            mimeType: "image/jpeg",
            taille: 0,
            referenceSwift: "a27259aa-3ca9-4f47-8627-59f2266a177c",
            conteneurSwift: "pieces-justificatives-2022-11",
            typePieceJustificative: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
            typeObjetPj: "CREATION",
            idFichierNatali: "62e25d123123c201ef8e5821",
            ordreNatali: 1,
            nouveauLibelleFichierPJ: ""
          }
        ]
      }
    ],
    campagne: "",
    nature: "REINTEGRATION"
  }
};
