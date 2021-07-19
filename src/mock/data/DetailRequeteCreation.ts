export const ReponseAppelDetailRequeteCreation = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/requetes/a4cefb71-8457-4f6b-937e-34b49335d404",
  data: {
    id: "a4cefb71-8457-4f6b-937e-34b49335d404",
    numeroRequete: "54j654j4jyfjtj456j4",
    idSagaDila: 45,
    dateCreation: 1612342296,
    canal: "COURRIER",
    type: "CREATION",
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
        libelle: "A traiter",
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
        typePieceJustificative: "00c885c9-2918-46fe-b743-798b1b90e5dd"
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
    provenanceSianf: null,
    provenanceRece: null,
    provenanceServicePublic: null
  }
};
