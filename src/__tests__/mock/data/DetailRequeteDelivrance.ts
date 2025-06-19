import { documentReponseCARN_CSPAC_01, documentReponseCertificatRCA } from "./DocumentReponse";
import { idFicheActeAvecGenreIndetermine, idFicheActeAvecTitulaireMultiple, idficheActeEC, idFicheActeMariage } from "./ficheActe";
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
    idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "Dylan Bob"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "Lennon John"
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
        trigramme: "WONDER Stevie"
      },
      {
        id: "id0000",
        texte: "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "JACKSON Michael",
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
    documentsReponses: [documentReponseCARN_CSPAC_01, documentReponseCertificatRCA],
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
    idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "Dylan Bob"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "Lennon John"
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
        trigramme: "WONDER Stevie"
      },
      {
        id: "id0000",
        texte: "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "JACKSON Michael",
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
    choixDelivrance: "DELIVRER_EC_COPIE_INTEGRALE",
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
    documentsReponses: [documentReponseCARN_CSPAC_01, documentReponseCertificatRCA],
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
    idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "Dylan Bob"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "Lennon John"
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
        trigramme: "WONDER Stevie"
      },
      {
        id: "id0000",
        texte: "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "JACKSON Michael",
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
    documentsReponses: [documentReponseCARN_CSPAC_01, documentReponseCertificatRCA],
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
    choixDelivrance: "DELIVRER_EC_EXTRAIT_SANS_FILIATION",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
    actions: [
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
        numeroOrdre: 2,
        libelle: "Saisie de la requête",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
        trigramme: "Dylan Bob"
      },
      {
        id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
        numeroOrdre: 1,
        libelle: "À traiter",
        dateAction: 1583794800000,
        idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
        trigramme: "Lennon John"
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
        trigramme: "WONDER Stevie"
      },
      {
        id: "id0000",
        texte: "C'est vraiment dur de pouvoir trouver un texte adequate pour remplir ce mock mais bon on fait avec",
        idUtilisateur: "",
        trigramme: "JACKSON Michael",
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
    documentsReponses: [documentReponseCARN_CSPAC_01, documentReponseCertificatRCA],
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
    idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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

export const requeteRDDPAvecDocs = {
  id: "9bfa282d-1e66-4538-b242-b9de4f683f0f",
  numeroFonctionnel: "BBLMAN",
  dateCreation: 1646038685506,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "idUtilisateurConnectedUser",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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
  sousType: "RDDP",
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
      referenceSwift: "9bfa282d-1e66-4538-b242-b9de4f683f0f_9c09e355-6e87-424b-8e4d-2531c59863d6.pdf",
      conteneurSwift: "documents-delivres-2022-2",
      optionsCourrier: [],
      mentionsRetirees: [],
      ordre: 0
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
      referenceSwift: "9bfa282d-1e66-4538-b242-b9de4f683f0f_9bfaca5e-a9f5-4e68-83fb-4b97d3e50285.pdf",
      conteneurSwift: "documents-delivres-2022-2",
      validation: "O",
      idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
      optionsCourrier: [],
      mentionsRetirees: [],
      ordre: 1
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

export const requeteAvecDocs = {
  id: "9bfa282d-1e66-4538-b242-b9de4f683f0f",
  numeroFonctionnel: "BBLMAN",
  dateCreation: 1646038685506,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "idUtilisateurConnectedUser",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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
    statutRequete: "A_VALIDER",
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
  provenance: "COMEDEC",
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
      referenceSwift: "9bfa282d-1e66-4538-b242-b9de4f683f0f_9c09e355-6e87-424b-8e4d-2531c59863d6.pdf",
      conteneurSwift: "documents-delivres-2022-2",
      optionsCourrier: [],
      mentionsRetirees: [],
      ordre: 0
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
      referenceSwift: "9bfa282d-1e66-4538-b242-b9de4f683f0f_9bfaca5e-a9f5-4e68-83fb-4b97d3e50285.pdf",
      conteneurSwift: "documents-delivres-2022-2",
      validation: "O",
      idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
      optionsCourrier: [],
      mentionsRetirees: [],
      ordre: 1
    },
    {
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502573",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
      optionsCourrier: [],
      mentionsRetirees: [],
      ordre: 2
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

export const requeteAvecDocsPlurilingue = {
  id: "3f52370d-14ed-4c55-8cf4-afe006d9aa38",
  numeroFonctionnel: "XZA6TQ",
  dateCreation: 1664276289612,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
  idService: "6737f85c-6207-4174-8825-d5f65d757e4f",
  actions: [
    {
      id: "3f526162-947f-4fc7-af6b-96d6407954ac",
      numeroOrdre: 2,
      libelle: "Prise en charge",
      dateAction: 1664276289608,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162"
    },
    {
      id: "3f527873-8ad7-4fa2-a579-98180e33d488",
      numeroOrdre: 1,
      libelle: "Saisie de la requête",
      dateAction: 1664276289582,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162"
    },
    {
      id: "4474fb56-81fe-4273-ab06-0b730531b3ab",
      numeroOrdre: 3,
      libelle: "À signer",
      dateAction: 1664355173778,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162"
    }
  ],
  titulaires: [
    {
      id: "3f525db0-a4c1-47fc-ab8d-cb6c4048608d",
      position: 1,
      nomNaissance: "V",
      nomUsage: null,
      anneeNaissance: 1990,
      moisNaissance: 6,
      jourNaissance: 25,
      villeNaissance: "V",
      codePostalNaissance: null,
      arrondissementNaissance: null,
      villeEtrangereNaissance: null,
      regionNaissance: null,
      paysNaissance: "V",
      sexe: "INCONNU",
      nationalite: "INCONNUE",
      prenoms: [
        {
          id: "3f523eaf-6842-442e-b1e7-0dca600113c2",
          numeroOrdre: 1,
          prenom: "V",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: null
    }
  ],
  piecesJustificatives: [],
  requerant: {
    id: "3f523c72-e43e-4aa1-af84-8387843b560e",
    dateCreation: 1664276289612,
    nomFamille: "V",
    prenom: "V",
    courriel: null,
    telephone: null,
    adresse: {
      id: "44745762-c433-41c4-b91a-197e082eabb1",
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
      id: "3f52ffae-2686-4060-97e0-d9be76bbc0ad",
      typeLienRequerant: "TITULAIRE",
      nature: null
    }
  },
  mandant: null,
  observations: [],
  statut: {
    id: "3f52bae7-bd80-4109-a3f3-d7a97e8d40ce",
    statutRequete: "A_SIGNER",
    dateEffet: 1664355173796,
    raisonStatut: null
  },
  lienRequerant: {
    id: "3f52ffae-2686-4060-97e0-d9be76bbc0ad",
    typeLienRequerant: "TITULAIRE",
    nature: null
  },
  doublons: null,
  origines: null,
  numeroRequeteOrigine: null,
  sousType: "RDC",
  motif: "NON_PRECISE_PAR_REQUERANT",
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
      id: "4474a9a0-4168-4bf1-a394-a6fa80ae5363",
      nom: "Délivrance d'acte (116)",
      typeDocument: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
      mimeType: "application/pdf",
      taille: 47376,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "3f52370d-14ed-4c55-8cf4-afe006d9aa38_44745c09-2d1d-4d2a-8b2c-c1a98e03f52e.pdf",
      conteneurSwift: "documents-delivres-2022-9",
      empreinte: "�S�`��8,�[�\u0010O��[",
      optionsCourrier: [],
      mentionsRetirees: []
    },
    {
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502573",
      nom: "Extrait avec filiation",
      typeDocument: "28580709-06dd-4df2-bf6e-70a9482940a1",
      mimeType: "application/pdf",
      taille: 23304,
      avecCtv: true,
      nbPages: 1,
      orientation: "Portrait",
      documentASignerElec: {
        id: "4474b85f-9ec6-474d-924a-d332cd2b5aa1",
        dateSignatureElectronique: null,
        referenceActe: null,
        empreinte: null
      },
      referenceSwift: "3f52370d-14ed-4c55-8cf4-afe006d9aa38_4474d2b3-82e9-4716-9c77-0343210d166d.pdf",
      conteneurSwift: "documents-delivres-2022-9",
      empreinte: "Tj�.�\u0014@d\u0018� 2\u001e\u001fq�",
      validation: "O",
      idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235e",
      optionsCourrier: [],
      mentionsRetirees: [
        {
          id: "4474742f-e921-4d83-8099-105e5500fff3",
          idMention: "1a0aa3be-8311-465d-b750-d4c19834430e"
        }
      ]
    },
    {
      id: "4475fe91-62f6-4849-9474-1309364866ab",
      nom: "Extrait plurilingue",
      typeDocument: "ff7fe1fa-a2d6-4bc5-8681-deba65d9e2c6",
      mimeType: "application/pdf",
      taille: 81060,
      avecCtv: true,
      nbPages: 2,
      orientation: "Portrait",
      documentASignerElec: {
        id: "4475738f-0a1d-4fe5-a6d0-d257fca6c502",
        dateSignatureElectronique: null,
        referenceActe: null,
        empreinte: null
      },
      referenceSwift: "3f52370d-14ed-4c55-8cf4-afe006d9aa38_447584c8-e195-49de-9e66-b3e41dce3d70.pdf",
      conteneurSwift: "documents-delivres-2022-9",
      empreinte: "��<8\u0010���0Ow5Ӿ��",
      validation: "O",
      idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235e",
      optionsCourrier: [],
      mentionsRetirees: []
    }
  ],
  evenement: {
    id: "3f528202-eb30-4bd6-87fc-d80dc9c8a8e3",
    natureActe: "NAISSANCE",
    jour: 25,
    mois: 6,
    annee: 1990,
    ville: "V",
    pays: "V"
  },
  choixDelivrance: "DELIVRER_EC_EXTRAIT_AVEC_FILIATION"
};

export function getRequeteSansDoc(requete: any) {
  const requeteSansDoc = { ...requete };

  requeteSansDoc.documentsReponses = [];
  return requeteSansDoc;
}

export function getRequeteAvecDeuxDocs(requete: any) {
  const requeteAvecDeuxDoc = { ...requete };

  requeteAvecDeuxDoc.documentsReponses = [...requete.documentsReponses];

  requeteAvecDeuxDoc.documentsReponses.push({
    id: "9bfa865e-6d7a-4d66-900e-b548178854db",
    nom: "Extrait copie avec filiation",
    typeDocument: "28580709-06dd-4df2-bf6e-70a9482940a1",
    mimeType: "application/pdf",
    taille: 28828,
    avecCtv: false,
    nbPages: 1,
    orientation: "Portrait",
    referenceSwift: "9bfa282d-1e66-4538-b242-b9de4f683f0f_9bfaca5e-a9f5-4e68-83fb-4b97d3e50285.pdf",
    conteneurSwift: "documents-delivres-2022-2",
    validation: "O",
    idActe: "b41079a5-9e8f-478a-b04c-c4c2ac671123",
    optionsCourrier: [],
    mentionsRetirees: []
  });

  return requeteAvecDeuxDoc;
}

export const requeteAvecCopieIntegraleActeImage = {
  id: "9bfa282d-1e66-4538-b242-b9de4f683f77",
  numeroFonctionnel: "BBLMAN",
  dateCreation: 1646038685506,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "idUtilisateurConnectedUser",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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
      sexe: "FEMME",
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
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502574",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: idFicheActeMariage,
      optionsCourrier: [],
      mentionsRetirees: []
    },
    {
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502573",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: idFicheActeMariage,
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
  choixDelivrance: "DELIVRER_EC_COPIE_INTEGRALE"
};

export const detailRequeteDelivranceAvecRequerantQualiteInstitutionnel = {
  ...ReponseAppelDetailRequeteDelivrance,
  data: {
    ...ReponseAppelDetailRequeteDelivrance.data,
    id: "a4cefb71-8457-4f6b-937e-34b49335d423",
    requerant: {
      ...ReponseAppelDetailRequeteDelivrance.data.requerant,
      qualite: "INSTITUTIONNEL",
      detailQualiteInstitutionnel: {
        type: "typeTest",
        nomInstitution: " TRIBUNAL",
        nature: "natureInstitution"
      },
      institutionnel: {
        type: "typeTest",
        nomInstitution: "testNomInstitution",
        nature: "natureInstitution"
      }
    }
  }
};

export const requeteSansDocument = {
  id: "7b448d64-add5-4dbd-8041-b7081ea7bc86",
  numeroFonctionnel: "4ANXFD",
  dateCreation: 1661264881377,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
  idService: "6737f85c-6207-4174-8825-d5f65d757e4f",
  actions: [
    {
      id: "7b441a04-e1aa-4cbe-bb06-ef406a0b9a82",
      numeroOrdre: 1,
      libelle: "Saisie de la requête",
      dateAction: 1661264881307,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162"
    },
    {
      id: "7b63df57-18da-40c8-8aca-8c41190ea7fb",
      numeroOrdre: 2,
      libelle: "À signer",
      dateAction: 1661266788548,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162"
    }
  ],
  titulaires: [
    {
      id: "7b443639-337e-44f1-8601-dd6cc02038ba",
      position: 1,
      nomNaissance: "PRODESK",
      nomUsage: null,
      anneeNaissance: 1990,
      moisNaissance: 6,
      jourNaissance: 25,
      villeNaissance: "V",
      codePostalNaissance: null,
      arrondissementNaissance: null,
      villeEtrangereNaissance: null,
      regionNaissance: null,
      paysNaissance: "V",
      sexe: "INCONNU",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "7b44cd0f-7ee8-479a-8de1-f3128fd6fa9c",
          numeroOrdre: 1,
          prenom: "Elodie",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: null
    }
  ],
  piecesJustificatives: [],
  requerant: {
    id: "7b4460a6-26fc-48e6-9344-7990117fd763",
    dateCreation: 1661264881377,
    nomFamille: "PRODESK",
    prenom: "Elodie",
    courriel: null,
    telephone: null,
    adresse: {
      id: "80ddc98e-7b5d-48bd-9dce-1daca8c0c31b",
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
      id: "7b44ae71-f4c0-4355-bc2f-29c68de95005",
      typeLienRequerant: "TITULAIRE",
      nature: null
    }
  },
  mandant: null,
  observations: [],
  statut: {
    id: "7b44716d-910c-448d-95be-322d1719451b",
    statutRequete: "PRISE_EN_CHARGE",
    dateEffet: 1661350928866,
    raisonStatut: ""
  },
  lienRequerant: {
    id: "7b44ae71-f4c0-4355-bc2f-29c68de95005",
    typeLienRequerant: "TITULAIRE",
    nature: null
  },
  doublons: null,
  origines: null,
  numeroRequeteOrigine: null,
  sousType: "RDC",
  motif: "NON_PRECISE_PAR_REQUERANT",
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
  documentsReponses: [],
  evenement: {
    id: "7b441518-8367-431c-979a-c28716ff7990",
    natureActe: "NAISSANCE",
    jour: 25,
    mois: 6,
    annee: 1990,
    ville: "V",
    pays: "V"
  },
  choixDelivrance: "DELIVRER_EC_EXTRAIT_AVEC_FILIATION"
};

export const detailRequeteDelivranceAvecRequerantQualiteAutreProfessionnel = {
  ...ReponseAppelDetailRequeteDelivrance,
  data: {
    ...ReponseAppelDetailRequeteDelivrance.data,
    id: "a4cefb71-8457-4f6b-937e-34b49335d412",
    requerant: {
      ...ReponseAppelDetailRequeteDelivrance.data.requerant,
      qualite: "AUTRE_PROFESSIONNEL",
      detailQualiteAutreProfessionnel: {
        nature: "TestAutrePro",
        raisonSociale: "RaisonSocialAutrePro"
      },
      autreProfessionnel: {}
    }
  }
};

export const detailRequeteDelivranceAvecRequerantQualiteUtilisateurRece = {
  ...ReponseAppelDetailRequeteDelivrance,
  data: {
    ...ReponseAppelDetailRequeteDelivrance.data,
    id: "a4cefb71-8457-4f6b-937e-34b49335d412",
    requerant: {
      ...ReponseAppelDetailRequeteDelivrance.data.requerant,
      qualite: "UTILISATEUR_RECE",
      nomFamille: "UtilRece"
    }
  }
};

export const detailRequeteDelivranceCopieArchive = {
  id: "9bfa282d-1e66-4538-b272-b9de4g683aaf",
  numeroFonctionnel: "BBLMAN",
  dateCreation: 1646038685506,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "idUtilisateurConnectedUser",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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
      sexe: "FEMME",
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
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502574",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: idficheActeEC,
      optionsCourrier: [],
      mentionsRetirees: []
    },
    {
      id: "28bc3078-7e53-4b8b-8cf8-7f75a25025743",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: idficheActeEC,
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
  choixDelivrance: "DELIVRER_EC_COPIE_INTEGRALE"
};

export const detailRequeteDelivranceGenreIndetermine = {
  id: "9bfa282d-1e66-4038-b272-b9de48683a8f",
  numeroFonctionnel: "BBLMAN",
  dateCreation: 1646038685506,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "idUtilisateurConnectedUser",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502574",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: idFicheActeAvecGenreIndetermine,
      optionsCourrier: [],
      mentionsRetirees: []
    },
    {
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502573",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: idFicheActeAvecGenreIndetermine,
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
  choixDelivrance: "DELIVRER_EC_COPIE_INTEGRALE"
};

export const detailRequeteDelivranceAvecTitulaireMultiple = {
  id: "9bfa282d-1e66-4038-b271-b9de48283a8f",
  numeroFonctionnel: "BBLMAN",
  dateCreation: 1646038685506,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "idUtilisateurConnectedUser",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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
      sexe: "FEMME",
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
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502574",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: idFicheActeAvecTitulaireMultiple,
      optionsCourrier: [],
      mentionsRetirees: []
    },
    {
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502573",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: idFicheActeAvecTitulaireMultiple,
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
  choixDelivrance: "DELIVRER_EC_COPIE_INTEGRALE"
};

export const requeteActeMariageAvecTroisTitulaire = {
  id: "9bfa282d-1e66-4038-b271-b9de48283a1f",
  numeroFonctionnel: "BBLMAN",
  dateCreation: 1646038685506,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "idUtilisateurConnectedUser",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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
      sexe: "FEMININ",
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
      id: "28bc3078-7e53-4b8b-8cf8-7f75a2502573",
      nom: "Copie Intégral",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      mimeType: "application/pdf",
      taille: 30132,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift: "1de62453-249b-43ae-acc4-116457842d3c_28bc92ab-3386-4ca7-9dcc-4b22e72cf204.pdf",
      conteneurSwift: "documents-delivres-2022-3",
      validation: "O",
      idActe: idFicheActeMariage,
      optionsCourrier: [],
      mentionsRetirees: []
    }
  ],
  evenement: {
    id: "0fb80e4f-ab5c-4f26-afcc-3199b67aa2f0",
    natureActe: "MARIAGE",
    jour: 12,
    mois: 5,
    annee: 2019,
    ville: null,
    pays: "TUNISIE"
  },
  choixDelivrance: "DELIVRER_EC_COPIE_INTEGRALE"
};
