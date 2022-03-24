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
  id: "9bfa282d-1e66-4538-b242-b9de4f683f0f",
  numeroFonctionnel: "BBLMAN",
  dateCreation: 1646038685506,
  canal: "COURRIER",
  type: "DELIVRANCE",
  actions: [
    {
      id: "9c09e900-d09f-4a82-8762-2437c811bb4f",
      numeroOrdre: 4,
      libelle: "À signer",
      dateAction: 1646039622822,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    {
      id: "9bfa0db6-04ae-4718-b8f8-95ad6628d11c",
      numeroOrdre: 2,
      libelle: "Prise en charge",
      dateAction: 1646038685464,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    {
      id: "9bfa396a-14b9-439a-ac0a-cd42a6314967",
      numeroOrdre: 3,
      libelle: "À signer",
      dateAction: 1646038723435,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    },
    {
      id: "9bfa962a-20c9-4596-a070-a6a6a03a74f4",
      numeroOrdre: 1,
      libelle: "Saisie de la requête",
      dateAction: 1646038685402,
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
    }
  ],
  titulaires: [
    {
      id: "9bfa6a27-3e1a-44b4-ac57-56ba923a2d16",
      position: 1,
      nomNaissance: "PRODESK",
      nomUsage: null,
      anneeNaissance: 1990,
      moisNaissance: 6,
      jourNaissance: 25,
      villeNaissance: "V",
      paysNaissance: "Hn",
      sexe: "INCONNU",
      nationalite: "ETRANGERE",
      prenoms: [
        {
          id: "9bfac719-5bc8-4b8e-9e5f-686fed2a6bcb",
          numeroOrdre: 1,
          prenom: "Elodie"
        }
      ],
      parentsTitulaire: []
    }
  ],
  corbeilleAgent: {
    id: "8ef08da4-95c3-4425-961e-ff3d2fc4ad1e",
    idUtilisateur: "idUtilisateurConnectedUser"
  },
  corbeilleService: {
    id: "78d8b293-d07b-4d15-9b16-f5f5575f2adc",
    idEntiteRattachement: "6737d2f8-f2af-450d-a376-f22f6df6ff1d"
  },
  piecesJustificatives: [],
  requerant: {
    id: "9bfa2963-43f2-43e9-91a6-aa360fed5dd6",
    dateCreation: 1646038685506,
    nomFamille: "PRODESK",
    prenom: "Elodie",
    courriel: null,
    telephone: null,
    adresse: {
      id: "9c09b9d6-e86c-4c9d-9545-13b5cb36bdf2",
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
      id: "9bfae886-fc59-49b3-85a5-ec535b325f40",
      typeLienRequerant: "TITULAIRE",
      nature: null
    }
  },
  mandant: null,
  observations: [],
  statut: {
    id: "9bfa4727-6826-448c-b16f-d44e56b733aa",
    statutRequete: "A_SIGNER",
    dateEffet: 1646039622830,
    raisonStatut: null
  },
  lienRequerant: {
    id: "9bfae886-fc59-49b3-85a5-ec535b325f40",
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
  documentDemande: "28580709-06dd-4df2-bf6e-70a9482940a1",
  documentComplementaire: null,
  nombreExemplairesDemandes: 1,
  provenancePlanete: null,
  provenanceRece: null,
  provenanceServicePublic: null,
  documentsReponses: [
    {
      id: "9c099809-951e-4b05-a27a-01d1344f479f",
      nom: "Délivrance d'acte (116)",
      typeDocument: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
      mimeType: "application/pdf",
      taille: 53976,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift:
        "9bfa282d-1e66-4538-b242-b9de4f683f0f_9c09e355-6e87-424b-8e4d-2531c59863d6.pdf",
      conteneurSwift: "documents-delivres-2022-2",
      optionsCourrier: [],
      mentionsRetirees: []
    },
    {
      id: "9bfa865e-6d7a-4d66-900e-b548178854db",
      nom: "Extrait copie avec filiation",
      typeDocument: "28580709-06dd-4df2-bf6e-70a9482940a1",
      mimeType: "application/pdf",
      taille: 28828,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift:
        "9bfa282d-1e66-4538-b242-b9de4f683f0f_9bfaca5e-a9f5-4e68-83fb-4b97d3e50285.pdf",
      conteneurSwift: "documents-delivres-2022-2",
      validation: "O",
      idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
      optionsCourrier: [],
      mentionsRetirees: []
    }
  ],
  evenement: {
    id: "9bfa62a9-670c-4cfc-a180-eaf5bcb07159",
    natureActe: "NAISSANCE",
    jour: 25,
    mois: 6,
    annee: 1990,
    ville: "V",
    pays: "Hn"
  },
  choixDelivrance: "DELIVRER_EC_EXTRAIT_AVEC_FILIATION"
};