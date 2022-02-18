import { ChoixDelivrance } from "../../model/requete/enum/ChoixDelivrance";
import {
  documentReponseCARN_CSPAC_01,
  documentReponseCertificatRCA
} from "./DocumentReponse";
import { TYPE_PIECE_JUSTIFICATIVE } from "./NomenclatureTypePieceJustificative";

export const ReponseAppelDetailRequeteDelivrance = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/requetes/a4cefb71-8457-4f6b-937e-34b49335d404",
  data: {
    id: "a4cefb71-8457-4f6b-937e-34b49335d404",
    numeroFonctionnel: "54j654j4jyfjtj456j4",
    idSagaDila: 45,
    dateCreation: 1612342296,
    canal: "COURRIER",
    type: "DELIVRANCE",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "BOB"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "APP"
      }
    ],
    titulaires: [
      {
        id: "0343e28b-b6f7-4dd4-bb81-3a38454907fb",
        position: 1,
        nomNaissance: "Campball",
        nomUsage: "",
        anneeNaissance: 1963,
        moisNaissance: 10,
        jourNaissance: 10,
        villeNaissance: "Guangzhou",
        paysNaissance: "Samoa",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [],
        parentsTitulaire: [
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde8",
            position: 1,
            nomNaissance: "JAMBON",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ec",
                numeroOrdre: 1,
                prenom: "Jean"
              }
            ]
          },
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde9",
            position: 2,
            nomNaissance: "BONO",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ed",
                numeroOrdre: 1,
                prenom: "Jen"
              },
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810609cd",
                numeroOrdre: 2,
                prenom: "Michèle"
              }
            ]
          }
        ]
      },
      {
        id: "a0b8eef9-5525-47d1-b971-0e9acbcad49d",
        position: 1,
        nomNaissance: "Ambrosia",
        nomUsage: "",
        anneeNaissance: 1941,
        moisNaissance: 3,
        jourNaissance: 26,
        villeNaissance: "Taiyuan",
        paysNaissance: "Portugal",
        sexe: "FEMININ",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "3377d3d1-6bbe-428b-9df5-f559bb8a465b",
            numeroOrdre: 2,
            prenom: "Zoé"
          },
          {
            id: "8221bf78-2d0b-4810-be0d-020a1b07a6df",
            numeroOrdre: 3,
            prenom: "Thérèse"
          },
          {
            id: "b113fa06-005f-4f8e-8576-95cd8ac35a99",
            numeroOrdre: 1,
            prenom: "Antoinette"
          }
        ],
        parentsTitulaire: [
          {
            id: "624c6c8a-b623-4508-b241-e96a408cddf7",
            position: 1,
            nomNaissance: "DUVAL",
            prenoms: [
              {
                id: "5ef2184f-eaec-4939-80f1-6e77a7636ce0",
                numeroOrdre: 1,
                prenom: "Marcel"
              }
            ]
          },
          {
            id: "c8a59637-7487-4056-af5a-5f50b03f0705",
            position: 2,
            nomNaissance: "DELAHYE",
            prenoms: [
              {
                id: "6892f48b-6486-475e-b0ef-e1124964066d",
                numeroOrdre: 1,
                prenom: "Augustine"
              }
            ]
          }
        ]
      }
    ],
    corbeilleAgent: {
      id: "4072e911-9f39-4910-8f58-bc355012bf7c",
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    corbeilleService: {
      id: "78d8b293-d07b-4d15-9b16-f5f5575f2adc",
      idEntiteRattachement: "6737d2f8-f2af-450d-a376-f22f6df6ff1d"
    },
    piecesJustificatives: [
      {
        conteneurSwift: "conteneur-swift",
        contenu: null,
        extension: null,
        id: "3feb09fb-1222-4356-a1ad-9a12fc03b218",
        referenceSwift: "reference_swift",
        mimeType: "application/pdf",
        nom: "justif carte",
        taille: 200,
        typePieceJustificative: TYPE_PIECE_JUSTIFICATIVE[0]
      }
    ],
    requerant: {
      id: "97d0e400-19d3-47fa-aedb-137002a96f18",
      dateCreation: 1528192343,
      nomFamille: "CHOULARD",
      prenom: "Thierry",
      courriel: "cjacques@candw.fr",
      telephone: "0152698741",
      adresse: {
        id: "074acd89-be79-4272-afe0-bb64925ee9ca",
        ligne2: "5 place de l'Eglise",
        ligne3: "",
        ligne4: "",
        ligne5: "",
        codePostal: "44000",
        ville: "Nantes",
        pays: "FRANCE"
      },
      qualite: "PARTICULIER",
      detailQualiteRece: null,
      detailQualiteParticulier: null,
      detailQualiteMandataireHabilite: null,
      detailQualiteInstitutionnel: null,
      detailQualiteAutreProfessionnel: null,
      lienRequerant: {
        id: "a4cefb71-8457-4f6b-937e-34b49335d406",
        typeLienRequerant: "PERE_MERE",
        natureLien: null
      }
    },
    mandant: {
      id: "94a2b37f-3744-4c3c-a53d-61c80c86a90d",
      typeMandant: "PERSONNE_PHYSIQUE",
      nom: "RANU",
      prenom: "THIERRY",
      raisonSociale: "",
      lienMandant: null,
      natureLien: null
    },
    observations: [
      {
        id: "1234",
        texte: "Je fais pas 30 charactères",
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        numeroOrdre: 12,
        dateObservation: 122335587,
        trigramme: "BTC"
      },
      {
        id: "id0000",
        texte:
          "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "LOS",
        numeroOrdre: 1234,
        dateObservation: 123456789
      }
    ],
    statut: {
      id: "2c055d1a-b437-48b1-bbd2-fa94d7defba2",
      statutRequete: "A_TRAITER",
      dateEffet: 1594714272000,
      raisonStatut: ""
    },
    lienRequerant: {
      id: "a4cefb71-8457-4f6b-937e-34b49335d406",
      typeLienRequerant: "PERE_MERE",
      natureLien: null
    },
    doublons: null,
    origines: null,
    sousType: "RDD",
    motif: "RETRAITE",
    complementMotif: "",
    dateDelivranceDemat: null,
    provenance: "PLANETE",
    documentDemande: "Attestation de PACS",
    nombreExemplairesDemandes: null,
    provenancePlanete: {
      id: "f5f8b346-3a73-412d-a581-a0d724f3a606",
      idMessagePlanete: 123,
      balNotaire: "notaire@notaire.fr",
      typeMessage: "message important",
      lcl: "",
      idConversation: "",
      champSaisieLibre: "une saisie complètement libre",
      referenceDemande: "",
      dateDemande: null
    },
    provenanceRece: null,
    provenanceServicePublic: null,
    documentsReponses: [
      documentReponseCARN_CSPAC_01,
      documentReponseCertificatRCA
    ],
    evenement: {
      id: "0fb80e4f-ab5c-4f26-afcc-3199b67aa2f0",
      natureActe: "MARIAGE",
      jour: 12,
      mois: 5,
      annee: 2019,
      ville: "Tunis",
      pays: "TUNISIE"
    }
  }
};

export const ReponseAppelDetailRequeteDelivranceASigner = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/requetes/a4cefb71-8457-4f6b-937e-34b49335d494",
  data: {
    id: "a4cefb71-8457-4f6b-937e-34b49335d494",
    numeroFonctionnel: "54j654j4jyfjtj456j4",
    idSagaDila: 45,
    dateCreation: 1612342296,
    canal: "COURRIER",
    type: "DELIVRANCE",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "BOB"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "APP"
      }
    ],
    titulaires: [
      {
        id: "0343e28b-b6f7-4dd4-bb81-3a38454907fb",
        position: 1,
        nomNaissance: "Campball",
        nomUsage: "",
        anneeNaissance: 1963,
        moisNaissance: 10,
        jourNaissance: 10,
        villeNaissance: "Guangzhou",
        paysNaissance: "Samoa",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [],
        parentsTitulaire: [
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde8",
            position: 1,
            nomNaissance: "JAMBON",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ec",
                numeroOrdre: 1,
                prenom: "Jean"
              }
            ]
          },
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde9",
            position: 2,
            nomNaissance: "BONO",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ed",
                numeroOrdre: 1,
                prenom: "Jen"
              },
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810609cd",
                numeroOrdre: 2,
                prenom: "Michèle"
              }
            ]
          }
        ]
      },
      {
        id: "a0b8eef9-5525-47d1-b971-0e9acbcad49d",
        position: 1,
        nomNaissance: "Ambrosia",
        nomUsage: "",
        anneeNaissance: 1941,
        moisNaissance: 3,
        jourNaissance: 26,
        villeNaissance: "Taiyuan",
        paysNaissance: "Portugal",
        sexe: "FEMININ",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "3377d3d1-6bbe-428b-9df5-f559bb8a465b",
            numeroOrdre: 2,
            prenom: "Zoé"
          },
          {
            id: "8221bf78-2d0b-4810-be0d-020a1b07a6df",
            numeroOrdre: 3,
            prenom: "Thérèse"
          },
          {
            id: "b113fa06-005f-4f8e-8576-95cd8ac35a99",
            numeroOrdre: 1,
            prenom: "Antoinette"
          }
        ],
        parentsTitulaire: [
          {
            id: "624c6c8a-b623-4508-b241-e96a408cddf7",
            position: 1,
            nomNaissance: "DUVAL",
            prenoms: [
              {
                id: "5ef2184f-eaec-4939-80f1-6e77a7636ce0",
                numeroOrdre: 1,
                prenom: "Marcel"
              }
            ]
          },
          {
            id: "c8a59637-7487-4056-af5a-5f50b03f0705",
            position: 2,
            nomNaissance: "DELAHYE",
            prenoms: [
              {
                id: "6892f48b-6486-475e-b0ef-e1124964066d",
                numeroOrdre: 1,
                prenom: "Augustine"
              }
            ]
          }
        ]
      }
    ],
    corbeilleAgent: {
      id: "4072e911-9f39-4910-8f58-bc355012bf7c",
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    corbeilleService: {
      id: "78d8b293-d07b-4d15-9b16-f5f5575f2adc",
      idEntiteRattachement: "6737d2f8-f2af-450d-a376-f22f6df6ff1d"
    },
    piecesJustificatives: [
      {
        conteneurSwift: "conteneur-swift",
        contenu: null,
        extension: null,
        id: "3feb09fb-1222-4356-a1ad-9a12fc03b218",
        referenceSwift: "reference_swift",
        mimeType: "application/pdf",
        nom: "justif carte",
        taille: 200,
        typePieceJustificative: "00c885c9-2918-46fe-b743-798b1b90e5dd"
      }
    ],
    requerant: {
      id: "97d0e400-19d3-47fa-aedb-137002a96f18",
      dateCreation: 1528192343,
      nomFamille: "CHOULARD",
      prenom: "Thierry",
      courriel: "cjacques@candw.fr",
      telephone: "0152698741",
      adresse: {
        id: "074acd89-be79-4272-afe0-bb64925ee9ca",
        ligne2: "5 place de l'Eglise",
        ligne3: "",
        ligne4: "",
        ligne5: "",
        codePostal: "44000",
        ville: "Nantes",
        pays: "FRANCE"
      },
      qualite: "PARTICULIER",
      detailQualiteRece: null,
      detailQualiteParticulier: null,
      detailQualiteMandataireHabilite: null,
      detailQualiteInstitutionnel: null,
      detailQualiteAutreProfessionnel: null,
      lienRequerant: {
        id: "a4cefb71-8457-4f6b-937e-34b49335d406",
        typeLienRequerant: "PERE_MERE",
        natureLien: null
      }
    },
    mandant: {
      id: "94a2b37f-3744-4c3c-a53d-61c80c86a90d",
      typeMandant: "PERSONNE_PHYSIQUE",
      nom: "RANU",
      prenom: "THIERRY",
      raisonSociale: "",
      lienMandant: null,
      natureLien: null
    },
    observations: [
      {
        id: "1234",
        texte: "Je fais pas 30 charactères",
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        numeroOrdre: 12,
        dateObservation: 122335587,
        trigramme: "BTC"
      },
      {
        id: "id0000",
        texte:
          "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "LOS",
        numeroOrdre: 1234,
        dateObservation: 123456789
      }
    ],
    statut: {
      id: "2c055d1a-b437-48b1-bbd2-fa94d7defba2",
      statutRequete: "A_SIGNER",
      dateEffet: 1594714272000,
      raisonStatut: ""
    },
    lienRequerant: {
      id: "a4cefb71-8457-4f6b-937e-34b49335d406",
      typeLienRequerant: "PERE_MERE",
      natureLien: null
    },
    doublons: null,
    origines: null,
    sousType: "RDD",
    motif: "RETRAITE",
    complementMotif: "",
    dateDelivranceDemat: null,
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE.nom,
    provenance: "PLANETE",
    documentDemande: "Attestation de PACS",
    nombreExemplairesDemandes: null,
    provenancePlanete: {
      id: "f5f8b346-3a73-412d-a581-a0d724f3a606",
      idMessagePlanete: 123,
      balNotaire: "notaire@notaire.fr",
      typeMessage: "message important",
      lcl: "",
      idConversation: "",
      champSaisieLibre: "une saisie complètement libre",
      referenceDemande: "",
      dateDemande: null
    },
    provenanceRece: null,
    provenanceServicePublic: null,
    documentsReponses: [
      documentReponseCARN_CSPAC_01,
      documentReponseCertificatRCA
    ],
    evenement: {
      id: "0fb80e4f-ab5c-4f26-afcc-3199b67aa2f0",
      natureActe: "MARIAGE",
      jour: 12,
      mois: 5,
      annee: 2019,
      ville: "Tunis",
      pays: "TUNISIE"
    }
  }
};
export const ReponseAppelDetailRequeteDelivrancePriseEnCharge = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/requetes/a4cefb71-8457-4f6b-937e-34b49335d884",
  data: {
    id: "a4cefb71-8457-4f6b-937e-34b49335d884",
    numeroFonctionnel: "54j654j4jyfjtj456j4",
    idSagaDila: 45,
    dateCreation: 1612342296,
    canal: "COURRIER",
    type: "DELIVRANCE",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "BOB"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "APP"
      }
    ],
    titulaires: [
      {
        id: "0343e28b-b6f7-4dd4-bb81-3a38454907fb",
        position: 1,
        nomNaissance: "Campball",
        nomUsage: "",
        anneeNaissance: 1963,
        moisNaissance: 10,
        jourNaissance: 10,
        villeNaissance: "Guangzhou",
        paysNaissance: "Samoa",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [],
        parentsTitulaire: [
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde8",
            position: 1,
            nomNaissance: "JAMBON",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ec",
                numeroOrdre: 1,
                prenom: "Jean"
              }
            ]
          },
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde9",
            position: 2,
            nomNaissance: "BONO",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ed",
                numeroOrdre: 1,
                prenom: "Jen"
              },
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810609cd",
                numeroOrdre: 2,
                prenom: "Michèle"
              }
            ]
          }
        ]
      },
      {
        id: "a0b8eef9-5525-47d1-b971-0e9acbcad49d",
        position: 1,
        nomNaissance: "Ambrosia",
        nomUsage: "",
        anneeNaissance: 1941,
        moisNaissance: 3,
        jourNaissance: 26,
        villeNaissance: "Taiyuan",
        paysNaissance: "Portugal",
        sexe: "FEMININ",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "3377d3d1-6bbe-428b-9df5-f559bb8a465b",
            numeroOrdre: 2,
            prenom: "Zoé"
          },
          {
            id: "8221bf78-2d0b-4810-be0d-020a1b07a6df",
            numeroOrdre: 3,
            prenom: "Thérèse"
          },
          {
            id: "b113fa06-005f-4f8e-8576-95cd8ac35a99",
            numeroOrdre: 1,
            prenom: "Antoinette"
          }
        ],
        parentsTitulaire: [
          {
            id: "624c6c8a-b623-4508-b241-e96a408cddf7",
            position: 1,
            nomNaissance: "DUVAL",
            prenoms: [
              {
                id: "5ef2184f-eaec-4939-80f1-6e77a7636ce0",
                numeroOrdre: 1,
                prenom: "Marcel"
              }
            ]
          },
          {
            id: "c8a59637-7487-4056-af5a-5f50b03f0705",
            position: 2,
            nomNaissance: "DELAHYE",
            prenoms: [
              {
                id: "6892f48b-6486-475e-b0ef-e1124964066d",
                numeroOrdre: 1,
                prenom: "Augustine"
              }
            ]
          }
        ]
      }
    ],
    corbeilleAgent: {
      id: "4072e911-9f39-4910-8f58-bc355012bf7c",
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    corbeilleService: {
      id: "78d8b293-d07b-4d15-9b16-f5f5575f2adc",
      idEntiteRattachement: "6737d2f8-f2af-450d-a376-f22f6df6ff1d"
    },
    piecesJustificatives: [
      {
        conteneurSwift: "conteneur-swift",
        contenu: null,
        extension: null,
        id: "3feb09fb-1222-4356-a1ad-9a12fc03b218",
        referenceSwift: "reference_swift",
        mimeType: "application/pdf",
        nom: "justif carte",
        taille: 200,
        typePieceJustificative: "00c885c9-2918-46fe-b743-798b1b90e5dd"
      }
    ],
    requerant: {
      id: "97d0e400-19d3-47fa-aedb-137002a96f18",
      dateCreation: 1528192343,
      nomFamille: "CHOULARD",
      prenom: "Thierry",
      courriel: "cjacques@candw.fr",
      telephone: "0152698741",
      adresse: {
        id: "074acd89-be79-4272-afe0-bb64925ee9ca",
        ligne2: "5 place de l'Eglise",
        ligne3: "",
        ligne4: "",
        ligne5: "",
        codePostal: "44000",
        ville: "Nantes",
        pays: "FRANCE"
      },
      qualite: "PARTICULIER",
      detailQualiteRece: null,
      detailQualiteParticulier: null,
      detailQualiteMandataireHabilite: null,
      detailQualiteInstitutionnel: null,
      detailQualiteAutreProfessionnel: null,
      lienRequerant: {
        id: "a4cefb71-8457-4f6b-937e-34b49335d406",
        typeLienRequerant: "PERE_MERE",
        natureLien: null
      }
    },
    mandant: {
      id: "94a2b37f-3744-4c3c-a53d-61c80c86a90d",
      typeMandant: "PERSONNE_PHYSIQUE",
      nom: "RANU",
      prenom: "THIERRY",
      raisonSociale: "",
      lienMandant: null,
      natureLien: null
    },
    observations: [
      {
        id: "1234",
        texte: "Je fais pas 30 charactères",
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        numeroOrdre: 12,
        dateObservation: 122335587,
        trigramme: "BTC"
      },
      {
        id: "id0000",
        texte:
          "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "LOS",
        numeroOrdre: 1234,
        dateObservation: 123456789
      }
    ],
    statut: {
      id: "2c055d1a-b437-48b1-bbd2-fa94d7defba2",
      statutRequete: "PRISE_EN_CHARGE",
      dateEffet: 1594714272000,
      raisonStatut: ""
    },
    lienRequerant: {
      id: "a4cefb71-8457-4f6b-937e-34b49335d406",
      typeLienRequerant: "PERE_MERE",
      natureLien: null
    },
    doublons: null,
    origines: null,
    sousType: "RDD",
    motif: "RETRAITE",
    complementMotif: "",
    dateDelivranceDemat: null,
    provenance: "PLANETE",
    documentDemande: "Attestation de PACS",
    nombreExemplairesDemandes: null,
    provenancePlanete: {
      id: "f5f8b346-3a73-412d-a581-a0d724f3a606",
      idMessagePlanete: 123,
      balNotaire: "notaire@notaire.fr",
      typeMessage: "message important",
      lcl: "",
      idConversation: "",
      champSaisieLibre: "une saisie complètement libre",
      referenceDemande: "",
      dateDemande: null
    },
    provenanceRece: null,
    provenanceServicePublic: null,
    documentsReponses: [
      documentReponseCARN_CSPAC_01,
      documentReponseCertificatRCA
    ],
    evenement: {
      id: "0fb80e4f-ab5c-4f26-afcc-3199b67aa2f0",
      natureActe: "MARIAGE",
      jour: 12,
      mois: 5,
      annee: 2019,
      ville: "Tunis",
      pays: "TUNISIE"
    }
  }
};

export const ReponseAppelDetailRequeteDelivranceRDC = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/requetes/a4cefb71-8457-4f6b-937e-34b49335d666",
  data: {
    id: "a4cefb71-8457-4f6b-937e-34b49335d666",
    numeroFonctionnel: "54j654j4jyfjtj456j4",
    idSagaDila: 45,
    dateCreation: 1612342296,
    canal: "COURRIER",
    type: "DELIVRANCE",
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION,
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "BOB"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "APP"
      }
    ],
    titulaires: [
      {
        id: "0343e28b-b6f7-4dd4-bb81-3a38454907fb",
        position: 1,
        nomNaissance: "Campball",
        nomUsage: "",
        anneeNaissance: 1963,
        moisNaissance: 10,
        jourNaissance: 10,
        villeNaissance: "Guangzhou",
        paysNaissance: "Samoa",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [],
        parentsTitulaire: [
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde8",
            position: 1,
            nomNaissance: "JAMBON",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ec",
                numeroOrdre: 1,
                prenom: "Jean"
              }
            ]
          },
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde9",
            position: 2,
            nomNaissance: "BONO",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ed",
                numeroOrdre: 1,
                prenom: "Jen"
              },
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810609cd",
                numeroOrdre: 2,
                prenom: "Michèle"
              }
            ]
          }
        ]
      },
      {
        id: "a0b8eef9-5525-47d1-b971-0e9acbcad49d",
        position: 1,
        nomNaissance: "Ambrosia",
        nomUsage: "",
        anneeNaissance: 1941,
        moisNaissance: 3,
        jourNaissance: 26,
        villeNaissance: "Taiyuan",
        paysNaissance: "Portugal",
        sexe: "FEMININ",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "3377d3d1-6bbe-428b-9df5-f559bb8a465b",
            numeroOrdre: 2,
            prenom: "Zoé"
          },
          {
            id: "8221bf78-2d0b-4810-be0d-020a1b07a6df",
            numeroOrdre: 3,
            prenom: "Thérèse"
          },
          {
            id: "b113fa06-005f-4f8e-8576-95cd8ac35a99",
            numeroOrdre: 1,
            prenom: "Antoinette"
          }
        ],
        parentsTitulaire: [
          {
            id: "624c6c8a-b623-4508-b241-e96a408cddf7",
            position: 1,
            nomNaissance: "DUVAL",
            prenoms: [
              {
                id: "5ef2184f-eaec-4939-80f1-6e77a7636ce0",
                numeroOrdre: 1,
                prenom: "Marcel"
              }
            ]
          },
          {
            id: "c8a59637-7487-4056-af5a-5f50b03f0705",
            position: 2,
            nomNaissance: "DELAHYE",
            prenoms: [
              {
                id: "6892f48b-6486-475e-b0ef-e1124964066d",
                numeroOrdre: 1,
                prenom: "Augustine"
              }
            ]
          }
        ]
      }
    ],
    corbeilleAgent: {
      id: "4072e911-9f39-4910-8f58-bc355012bf7c",
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    corbeilleService: {
      id: "78d8b293-d07b-4d15-9b16-f5f5575f2adc",
      idEntiteRattachement: "6737d2f8-f2af-450d-a376-f22f6df6ff1d"
    },
    piecesJustificatives: [
      {
        conteneurSwift: "conteneur-swift",
        contenu: null,
        extension: null,
        id: "3feb09fb-1222-4356-a1ad-9a12fc03b218",
        referenceSwift: "reference_swift",
        mimeType: "application/pdf",
        nom: "justif carte",
        taille: 200,
        typePieceJustificative: TYPE_PIECE_JUSTIFICATIVE[0]
      }
    ],
    requerant: {
      id: "97d0e400-19d3-47fa-aedb-137002a96f18",
      dateCreation: 1528192343,
      nomFamille: "CHOULARD",
      prenom: "Thierry",
      courriel: "cjacques@candw.fr",
      telephone: "0152698741",
      adresse: {
        id: "074acd89-be79-4272-afe0-bb64925ee9ca",
        ligne2: "",
        ligne3: "",
        ligne4: "5 place de l'Eglise",
        ligne5: "",
        codePostal: "44000",
        ville: "Nantes",
        pays: "FRANCE"
      },
      qualite: "PARTICULIER",
      detailQualiteRece: null,
      detailQualiteParticulier: null,
      detailQualiteMandataireHabilite: null,
      detailQualiteInstitutionnel: null,
      detailQualiteAutreProfessionnel: null,
      lienRequerant: {
        id: "a4cefb71-8457-4f6b-937e-34b49335d406",
        typeLienRequerant: "PERE_MERE",
        natureLien: null
      }
    },
    mandant: {
      id: "94a2b37f-3744-4c3c-a53d-61c80c86a90d",
      typeMandant: "PERSONNE_PHYSIQUE",
      nom: "RANU",
      prenom: "THIERRY",
      raisonSociale: "",
      lienMandant: null,
      natureLien: null
    },
    observations: [
      {
        id: "1234",
        texte: "Je fais pas 30 charactères",
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        numeroOrdre: 12,
        dateObservation: 122335587,
        trigramme: "BTC"
      },
      {
        id: "id0000",
        texte:
          "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "LOS",
        numeroOrdre: 1234,
        dateObservation: 123456789
      }
    ],
    statut: {
      id: "2c055d1a-b437-48b1-bbd2-fa94d7defba2",
      statutRequete: "PRISE_EN_CHARGE",
      dateEffet: 1594714272000,
      raisonStatut: ""
    },
    lienRequerant: {
      id: "a4cefb71-8457-4f6b-937e-34b49335d406",
      typeLienRequerant: "PERE_MERE",
      natureLien: null
    },
    doublons: null,
    origines: null,
    sousType: "RDC",
    motif: "RETRAITE",
    complementMotif: "",
    dateDelivranceDemat: null,
    provenance: "PLANETE",
    documentDemande: "Attestation de PACS",
    nombreExemplairesDemandes: null,
    provenancePlanete: {
      id: "f5f8b346-3a73-412d-a581-a0d724f3a606",
      idMessagePlanete: 123,
      balNotaire: "notaire@notaire.fr",
      typeMessage: "message important",
      lcl: "",
      idConversation: "",
      champSaisieLibre: "une saisie complètement libre",
      referenceDemande: "",
      dateDemande: null
    },
    provenanceRece: null,
    provenanceServicePublic: null,
    documentsReponses: [
      documentReponseCARN_CSPAC_01,
      documentReponseCertificatRCA
    ],
    evenement: {
      id: "0fb80e4f-ab5c-4f26-afcc-3199b67aa2f0",
      natureActe: "MARIAGE",
      jour: 12,
      mois: 5,
      annee: 2019,
      ville: "Tunis",
      pays: "TUNISIE"
    }
  }
};

export const ReponseAppelDetailRequeteDelivranceBrouillon = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/requetes/a4cefb71-8457-4f6b-937e-34b49335d405",
  data: {
    id: "a4cefb71-8457-4f6b-937e-34b49335d405",
    numeroRequete: "54j654j4jyfjtj456j4",
    idSagaDila: 45,
    dateCreation: 1612342296,
    canal: "COURRIER",
    type: "DELIVRANCE",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    actions: [],
    titulaires: [
      {
        id: "0343e28b-b6f7-4dd4-bb81-3a38454907fb",
        position: 1,
        nomNaissance: "Campball",
        nomUsage: "",
        anneeNaissance: 1963,
        moisNaissance: 10,
        jourNaissance: 10,
        villeNaissance: "Guangzhou",
        paysNaissance: "Samoa",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [],
        parentsTitulaire: []
      }
    ],
    corbeilleAgent: {
      id: "4072e911-9f39-4910-8f58-bc355012bf7c",
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    corbeilleService: {
      id: "78d8b293-d07b-4d15-9b16-f5f5575f2adc",
      idEntiteRattachement: "6737d2f8-f2af-450d-a376-f22f6df6ff1d"
    },
    piecesJustificatives: [
      {
        conteneurSwift: "conteneur-swift",
        contenu: null,
        extension: null,
        id: "3feb09fb-1222-4356-a1ad-9a12fc03b218",
        identifiantSwift: "reference_swift",
        mimeType: "application/pdf",
        nom: "justif carte",
        taille: 200,
        typePieceJustificative: TYPE_PIECE_JUSTIFICATIVE[0]
      }
    ],
    requerant: {
      id: "97d0e400-19d3-47fa-aedb-137002a96f18",
      dateCreation: 1528192343,
      nomFamille: "CHOULARD",
      prenom: "Thierry",
      courriel: "cjacques@candw.fr",
      telephone: "0152698741",
      adresse: {
        id: "074acd89-be79-4272-afe0-bb64925ee9ca",
        ligne2: "5 place de l'Eglise",
        ligne3: "",
        ligne4: "",
        ligne5: "",
        codePostal: "44000",
        ville: "Nantes",
        pays: "FRANCE"
      },
      qualite: "PARTICULIER",
      detailQualiteRece: null,
      detailQualiteParticulier: null,
      detailQualiteMandataireHabilite: null,
      detailQualiteInstitutionnel: null,
      detailQualiteAutreProfessionnel: null,
      lienRequerant: {
        id: "a4cefb71-8457-4f6b-937e-34b49335d406",
        typeLienRequerant: "PERE_MERE",
        natureLien: null
      }
    },

    statut: {
      id: "37a528fa-fbec-4f6d-a58b-3f728345650a",
      statutRequete: "BROUILLON",
      dateEffet: 1594714272000,
      raisonStatut: ""
    },
    documentDemande: "Certificat de situation au pacs"
  }
};

export const ReponseAppelDetailRequeteDelivranceUnTitulaire = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/requetes/a4cefb71-8457-4f6b-937e-34b49335d404",
  data: {
    id: "a4cefb71-8457-4f6b-937e-34b49335d404",
    numeroFonctionnel: "54j654j4jyfjtj456j4",
    idSagaDila: 45,
    dateCreation: 1612342296,
    canal: "COURRIER",
    type: "DELIVRANCE",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "BOB"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "APP"
      }
    ],
    titulaires: [
      {
        id: "0343e28b-b6f7-4dd4-bb81-3a38454907fb",
        position: 1,
        nomNaissance: "Campball",
        nomUsage: "",
        anneeNaissance: 1963,
        moisNaissance: 10,
        jourNaissance: 10,
        villeNaissance: "Guangzhou",
        paysNaissance: "Samoa",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        prenoms: [
          {
            id: "7d6f50e0-e984-4011-95ac-17acc198a60f",
            numeroOrdre: 2,
            prenom: "Marc"
          },
          {
            id: "19bd7c4f-7194-48de-bcaa-fae5307534e6",
            numeroOrdre: 1,
            prenom: "Gilles"
          }
        ],
        parentsTitulaire: [
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde8",
            position: 1,
            nomNaissance: "JAMBON",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ec",
                numeroOrdre: 1,
                prenom: "Jean"
              }
            ]
          },
          {
            id: "624c6c8a-b623-4508-b241-e96a408cdde9",
            position: 2,
            nomNaissance: "BONO",
            prenoms: [
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810608ed",
                numeroOrdre: 1,
                prenom: "Jen"
              },
              {
                id: "a1acf689-b2e3-4fc1-8e15-077c810609cd",
                numeroOrdre: 2,
                prenom: "Michèle"
              }
            ]
          }
        ]
      }
    ],
    corbeilleAgent: {
      id: "4072e911-9f39-4910-8f58-bc355012bf7c",
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    corbeilleService: {
      id: "78d8b293-d07b-4d15-9b16-f5f5575f2adc",
      idEntiteRattachement: "6737d2f8-f2af-450d-a376-f22f6df6ff1d"
    },
    piecesJustificatives: [],
    requerant: {
      id: "97d0e400-19d3-47fa-aedb-137002a96f18",
      dateCreation: 1528192343,
      nomFamille: "JACQUES",
      prenom: "Charles",
      courriel: "cjacques@candw.fr",
      telephone: "0152698741",
      adresse: {
        id: "074acd89-be79-4272-afe0-bb64925ee9ca",
        ligne2: "5 place de l'Eglise",
        ligne3: "",
        ligne4: "",
        ligne5: "",
        codePostal: "44000",
        ville: "Nantes",
        pays: "FRANCE"
      },
      qualite: "MANDATAIRE_HABILITE",
      detailQualiteRece: null,
      detailQualiteParticulier: null,
      detailQualiteMandataireHabilite: {
        id: "94cb55b0-7cb1-4d65-9aae-e6c972e29ed9",
        type: "AVOCAT",
        raisonSociale: "Cabinet WandC",
        nature: "",
        crpcen: ""
      },
      detailQualiteInstitutionnel: null,
      detailQualiteAutreProfessionnel: null,
      lienRequerant: {
        id: "a4cefb71-8457-4f6b-937e-34b49335d406",
        typeLienRequerant: "PERE_MERE",
        natureLien: null
      }
    },
    mandant: {
      id: "94a2b37f-3744-4c3c-a53d-61c80c86a90d",
      typeMandant: "PERSONNE_PHYSIQUE",
      nom: "RANU",
      prenom: "THIERRY",
      raisonSociale: "",
      lienMandant: "PERE_MERE_TITULAIRE",
      natureLien: null
    },
    observations: [
      {
        id: "1234",
        texte: "Je fais pas 30 charactères",
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        numeroOrdre: 12,
        dateObservation: 122335587,
        trigramme: "BTC"
      },
      {
        id: "id0000",
        texte:
          "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "LOS",
        numeroOrdre: 1234,
        dateObservation: 123456789
      }
    ],
    statut: {
      id: "2c055d1a-b437-48b1-bbd2-fa94d7defba2",
      statutRequete: "A_TRAITER",
      dateEffet: 1594714272000,
      raisonStatut: ""
    },
    lienRequerant: {
      id: "a4cefb71-8457-4f6b-937e-34b49335d406",
      typeLienRequerant: "PERE_MERE",
      natureLien: null
    },
    doublons: null,
    origines: null,
    sousType: "RDD",
    motif: "RETRAITE",
    complementMotif: "",
    dateDelivranceDemat: null,
    provenance: "PLANETE",
    documentDemande: "Attestation de PACS",
    nombreExemplairesDemandes: null,
    provenancePlanete: {
      id: "f5f8b346-3a73-412d-a581-a0d724f3a606",
      idMessagePlanete: 123,
      balNotaire: "notaire@notaire.fr",
      typeMessage: "message important",
      lcl: "",
      idConversation: "",
      champSaisieLibre: "une saisie complètement libre",
      referenceDemande: "",
      dateDemande: null
    },
    provenanceRece: null,
    provenanceServicePublic: null,
    documentsReponses: [],
    evenement: {
      id: "0fb80e4f-ab5c-4f26-afcc-3199b67aa2f0",
      natureActe: "MARIAGE",
      jour: 12,
      mois: 5,
      annee: 2019,
      ville: "Tunis",
      pays: null
    }
  }
};

export const ReponseAppelDetailRequeteDelivranceSansTitulairesAvecPJ = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/requetes/a4cefb71-8457-4f6b-937e-34b49335d404",
  data: {
    id: "a4cefb71-8457-4f6b-937e-34b49335d404",
    numeroFonctionnel: "54j654j4jyfjtj456j4",
    idSagaDila: 45,
    dateCreation: 1612342296,
    canal: "COURRIER",
    type: "DELIVRANCE",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "BOB"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "APP"
      }
    ],
    titulaires: [],
    corbeilleAgent: {
      id: "4072e911-9f39-4910-8f58-bc355012bf7c",
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    corbeilleService: {
      id: "78d8b293-d07b-4d15-9b16-f5f5575f2adc",
      idEntiteRattachement: "6737d2f8-f2af-450d-a376-f22f6df6ff1d"
    },
    piecesJustificatives: [
      {
        id: "519900ee-c9a0-4d41-8673-512949b64946",
        nom: "Carte professionelle",
        mimeType: "png",
        taille: 20,
        contenu: "contenu",
        typePieceJustificative: TYPE_PIECE_JUSTIFICATIVE[0]
      }
    ],
    requerant: {
      id: "97d0e400-19d3-47fa-aedb-137002a96f18",
      dateCreation: 1528192343,
      nomFamille: "",
      prenom: "",
      courriel: "cjacques@candw.fr",
      telephone: "0152698741",
      adresse: {
        id: "074acd89-be79-4272-afe0-bb64925ee9ca",
        ligne2: "5 place de l'Eglise",
        ligne3: "",
        ligne4: "",
        ligne5: "",
        codePostal: "44000",
        ville: "Nantes",
        pays: "FRANCE"
      },
      qualite: "INSTITUTIONNEL",
      detailQualiteRece: null,
      detailQualiteParticulier: null,
      detailQualiteMandataireHabilite: null,
      detailQualiteInstitutionnel: {
        id: "94cb55b0-7cb1-4d65-9aae-e6c972e29ed9",
        type: "TRIBUNAL",
        nom: "TGI Marseille",
        nature: null
      },
      detailQualiteAutreProfessionnel: null,
      lienRequerant: null
    },
    mandant: {
      id: "94a2b37f-3744-4c3c-a53d-61c80c86a90d",
      typeMandant: "PERSONNE_PHYSIQUE",
      nom: "RANU",
      prenom: "THIERRY",
      raisonSociale: "",
      lienMandant: "TITULAIRE",
      natureLien: null
    },
    observations: [
      {
        id: "1234",
        texte: "Je fais pas 30 charactères",
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        numeroOrdre: 12,
        dateObservation: 122335587,
        trigramme: "BTC"
      },
      {
        id: "id0000",
        texte:
          "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "LOS",
        numeroOrdre: 1234,
        dateObservation: 123456789
      }
    ],
    statut: {
      id: "2c055d1a-b437-48b1-bbd2-fa94d7defba2",
      statutRequete: "A_TRAITER",
      dateEffet: 1594714272000,
      raisonStatut: ""
    },
    lienRequerant: null,
    doublons: null,
    origines: null,
    sousType: "RDD",
    motif: "RETRAITE",
    complementMotif: "",
    dateDelivranceDemat: null,
    provenance: "PLANETE",
    documentDemande: "Attestation de PACS",
    nombreExemplairesDemandes: null,
    provenancePlanete: {
      id: "f5f8b346-3a73-412d-a581-a0d724f3a606",
      idMessagePlanete: 123,
      balNotaire: "notaire@notaire.fr",
      typeMessage: "message important",
      lcl: "",
      idConversation: "",
      champSaisieLibre: "une saisie complètement libre",
      referenceDemande: "",
      dateDemande: null
    },
    provenanceRece: null,
    provenanceServicePublic: null,
    documentsReponses: [],
    evenement: {
      id: "0fb80e4f-ab5c-4f26-afcc-3199b67aa2f0",
      natureActe: "MARIAGE",
      jour: 12,
      mois: 5,
      annee: 2019,
      ville: null,
      pays: "TUNISIE"
    }
  }
};

export const requeteAvecDocs = {
  id: "5f14ef25-d720-4c12-867f-d7fa6e3cb780",
  numeroFonctionnel: "QNFH8F",
  dateCreation: 1645103295461,
  canal: "COURRIER",
  type: "DELIVRANCE",
  actions: [
    {
      id: "5f1441af-1617-42d9-95e6-b7e4cdcfbd5d",
      numeroOrdre: 1,
      libelle: "Saisie de la requête",
      dateAction: 1645103295421,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    {
      id: "5f14f4bb-5064-4fc2-a4cd-1c57f960c977",
      numeroOrdre: 2,
      libelle: "Prise en charge",
      dateAction: 1645103295457,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    {
      id: "5f43778c-101c-47d7-b9b3-c48d99415199",
      numeroOrdre: 4,
      libelle: "À signer",
      dateAction: 1645106127997,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    {
      id: "5f432efd-4b2d-451c-8962-6f7fc081f3a6",
      numeroOrdre: 3,
      libelle: "À signer",
      dateAction: 1645106122907,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    }
  ],
  titulaires: [
    {
      id: "5f14f17b-7869-41e3-8abf-308bc627a0df",
      position: 1,
      nomNaissance: "PRODESK",
      nomUsage: null,
      anneeNaissance: 1990,
      moisNaissance: 6,
      jourNaissance: 25,
      villeNaissance: "V",
      paysNaissance: "V",
      sexe: "INCONNU",
      nationalite: "INCONNUE",
      prenoms: [
        {
          id: "5f14904a-b650-4489-a770-38945d28b51c",
          numeroOrdre: 1,
          prenom: "Elodie"
        }
      ],
      parentsTitulaire: []
    }
  ],
  corbeilleAgent: {
    id: "8ef08da4-95c3-4425-961e-ff3d2fc4ad1e",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
  },
  corbeilleService: {
    id: "78d8b293-d07b-4d15-9b16-f5f5575f2adc",
    idEntiteRattachement: "6737d2f8-f2af-450d-a376-f22f6df6ff1d"
  },
  piecesJustificatives: [],
  requerant: {
    id: "5f148033-dc34-46df-95b9-f0c62f70407c",
    dateCreation: 1645103295461,
    nomFamille: "PRODESK",
    prenom: "Elodie",
    courriel: null,
    telephone: null,
    adresse: {
      id: "5f43017e-2e9a-4611-8bdb-1044ba081aff",
      ligne2: "",
      ligne3: "",
      ligne4: "7 ALLÉE DES PLUVIERS",
      ligne5: "",
      codePostal: "44830",
      ville: "BOUAYE",
      pays: ""
    },
    qualite: "PARTICULIER",
    detailQualiteRece: null,
    detailQualiteParticulier: null,
    detailQualiteMandataireHabilite: null,
    detailQualiteInstitutionnel: null,
    detailQualiteAutreProfessionnel: null,
    lienRequerant: {
      id: "5f144c30-b858-4c2f-8187-7b5dff26a88b",
      typeLienRequerant: "TITULAIRE",
      nature: null
    }
  },
  mandant: null,
  observations: [],
  statut: {
    id: "5f140855-548d-475c-a789-c7f7c7fdcf84",
    statutRequete: "A_SIGNER",
    dateEffet: 1645106128004,
    raisonStatut: null
  },
  lienRequerant: {
    id: "5f144c30-b858-4c2f-8187-7b5dff26a88b",
    typeLienRequerant: "TITULAIRE",
    nature: null
  },
  doublons: null,
  origines: null,
  sousType: "RDC",
  motif: "CERTIFICAT_NATIONALITE_FRANCAISE",
  complementMotif: null,
  dateDelivranceDemat: null,
  provenance: "COURRIER",
  statutReponse: null,
  documentDemande: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
  documentComplementaire: null,
  nombreExemplairesDemandes: 1,
  provenancePlanete: null,
  provenanceRece: null,
  provenanceServicePublic: null,
  documentsReponses: [
    {
      id: "5f43b169-9a02-41eb-bc8f-a895084656ac",
      nom: "Extrait copie sans filiation",
      typeDocument: "318a2726-0d04-4558-8b36-8fe48780def5",
      mimeType: "application/pdf",
      taille: 28540,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift:
        "5f14ef25-d720-4c12-867f-d7fa6e3cb780_5f439b2a-2f89-49a6-acca-043151cd9f3c.pdf",
      conteneurSwift: "documents-delivres-2022-2",
      validation: "N",
      idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134b",
      optionsCourrier: [],
      mentionsRetirees: []
    },
    {
      id: "5f43dcf3-3388-487c-af06-f59b2f856bb2",
      nom: "Délivrance d'acte (116)",
      typeDocument: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
      mimeType: "application/pdf",
      taille: 54008,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift:
        "5f14ef25-d720-4c12-867f-d7fa6e3cb780_5f43afc0-645f-4b20-8708-ff6e0c6afd95.pdf",
      conteneurSwift: "documents-delivres-2022-2",
      optionsCourrier: [],
      mentionsRetirees: []
    }
  ],
  evenement: {
    id: "5f14a76b-bc9a-4207-9767-a9382d5f69ad",
    natureActe: "NAISSANCE",
    jour: 25,
    mois: 6,
    annee: 1990,
    ville: "V",
    pays: "V"
  },
  choixDelivrance: "DELIVRER_EC_EXTRAIT_SANS_FILIATION"
};