import { ICreationRequeteCreationParams } from "@hook/requete/CreationRequeteCreationApiHook";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";

export const requeteCreationTranscription = {
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
      nomNaissance: "Philips",
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
          prenom: "Yann",
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
    },
    {
      id: "29a284f4-5af0-4d3a-852c-8d2af38e0811",
      nom: "acteNaissance",
      mimeType: "application/pdf",
      extension: null,
      taille: 0,
      referenceSwift: "acteNaissance.pdf",
      conteneurSwift: "pieces_justificatives",
      contenu: null,
      typePieceJustificative: "6c95641f-59fe-4155-a6ba-8b42433c04ec",
      typeObjetPj: "CREATION",
      idFichierNatali: null,
      ordreNatali: 1,
      estPieceAnnexe: true,
      idPersonne: "e7114c50-d00d-48ad-bbee-af2b01e2da8e",
      idActe: "c8cbe885-fbd7-4d35-af99-10c827b0238b",
      idRc: null,
      idRca: null,
      idPacs: null
    },
    {
      id: "f574212d-4a7a-499e-a190-396d49bf1948",
      nom: "inscriptionRc",
      mimeType: "application/pdf",
      extension: null,
      taille: 0,
      referenceSwift: "inscription.pdf",
      conteneurSwift: "pieces_justificatives",
      contenu: null,
      typePieceJustificative: "93e4f39b-0fc5-47f4-8434-2d362f897987",
      typeObjetPj: "CREATION",
      idFichierNatali: null,
      ordreNatali: 1,
      estPieceAnnexe: true,
      idPersonne: "74a7e873-a06f-4a3c-9abc-8d50b59343ba",
      idActe: null,
      idRc: "747cd416-fcf5-4490-b540-59a89b7f5123",
      idRca: null,
      idPacs: null
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
  natureActeTranscrit: "NAISSANCE_MINEUR",
  dossierSignale: true,
  commentaire: "commentaire",
  demandeIdentification: null,
  demandeFrancisation: true,
  personnesSauvegardees: [
    {
      idPersonne: "e7114c54-d00d-48ad-bbee-af2b01e2da7a",
      role: "TITULAIRE_1"
    },
    {
      idPersonne: "e7114c54-d00d-48ad-bbee-af2b01e2da7c",
      role: "PARENT_1_TITULAIRE_1"
    }
  ],
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
  campagne: "campagne",
  nature: "NATURALISATION",
  dossierNouveaux: null,
  dossierOrigines: null,
  decret: null
} as any as IRequeteCreationTranscription;

export const requeteCreationTranscriptionStatutATraiter = {
  ...requeteCreationTranscription,
  idUtilisateur: "idUtilisateurConnectedUser",
  idService: "6737e047-16cc-4731-9a2e-d2e228f7d75f",
  statut: {
    id: "3ed97a35-c9b0-4ae4-b2dc-75eb84e4e82d",
    statutRequete: "A_TRAITER",
    dateEffet: 1656404736683,
    raisonStatut: null
  },
  sousType: "RCTC",
  piecesJustificatives: []
} as any as IRequeteCreationTranscription;

export const creationRequeteTranscriptionParams: ICreationRequeteCreationParams = {
  requete: {
    villeRegistre: "",
    canal: "COURRIER",
    type: "CREATION",
    sousType: "RCTC",
    provenance: "COURRIER",
    natureActeTranscrit: "NAISSANCE_MINEUR",
    lienRequerant: { typeLienRequerant: "PERE_MERE" },
    titulaires: [
      {
        prenoms: [{ prenom: "Prenom", numeroOrdre: 1 }],
        sexe: "INCONNU",
        nationalite: "INCONNUE",
        typeObjetTitulaire: "TITULAIRE_ACTE_TRANSCRIT_DRESSE",
        position: 1,
        nomNaissance: "Nom acte etranger",
        nomSouhaite: "Nom souhaite FR",
        evenementUnions: []
      },
      {
        prenoms: [{ prenom: "SPC", numeroOrdre: 1 }],
        sexe: "INCONNU",
        nationalite: "INCONNUE",
        nomNaissance: "SNP",
        typeObjetTitulaire: "FAMILLE",
        qualite: "PARENT",
        position: 1,
        nationalites: [],
        evenementUnions: []
      }
    ],
    requerant: { adresse: {}, qualite: "PARTICULIER" }
  }
};

export const creationRequeteRCTCResultat = [
  {
    id: "3ed9aa4e-921b-489f-b8fe-531dd703c60c",
    numeroFonctionnel: "8WY3I6",
    dateCreation: 1678784544723,
    canal: "COURRIER",
    type: "CREATION",
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
    idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
    actions: [
      {
        id: "efdeecd1-340c-46c5-8741-69d853bd07b5",
        numeroOrdre: 2,
        libelle: "Prise en charge",
        dateAction: 1678784544723,
        idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
        nomUtilisateur: null,
        prenomUtilisateur: null,
        courrielUtilisateur: null
      }
    ],
    titulaires: [
      {
        id: "efded836-e3a0-4969-8df1-dfca380fb95b",
        position: 1,
        nomNaissance: "Nom acte etranger",
        nomUsage: null,
        anneeNaissance: null,
        moisNaissance: null,
        jourNaissance: null,
        villeNaissance: null,
        codePostalNaissance: null,
        arrondissementNaissance: null,
        villeEtrangereNaissance: null,
        regionNaissance: null,
        paysNaissance: null,
        sexe: "INCONNU",
        nationalite: "INCONNUE",
        prenoms: [
          {
            id: "efde9ae6-7c66-4584-bcc1-d50fc0be7702",
            numeroOrdre: 1,
            prenom: "Prenom",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: null,
        deces: null,
        domiciliation: null,
        evenementUnions: [],
        typeObjetTitulaire: "TITULAIRE_ACTE_TRANSCRIT_DRESSE",
        nomDemandeFrancisation: null,
        nomDemandeIdentification: null,
        nomSecable: null,
        nomPremierePartie: null,
        nomSecondePartie: null,
        courriel: null,
        telephone: null,
        situationFamilliale: null,
        nationalites: null,
        prenomsDemande: null,
        suiviDossiers: null,
        retenueSdanf: null,
        paysStatutRefugie: null,
        paysOrigine: null,
        nomEtrangerUtilise: null,
        nomSouhaite: null,
        nomEtranger: null,
        choixDeNom: null
      },
      {
        id: "efde530f-5082-4ea8-8455-cd5ec055f516",
        position: 1,
        nomNaissance: "SNP",
        nomUsage: null,
        anneeNaissance: null,
        moisNaissance: null,
        jourNaissance: null,
        villeNaissance: null,
        codePostalNaissance: null,
        arrondissementNaissance: null,
        villeEtrangereNaissance: null,
        regionNaissance: null,
        paysNaissance: null,
        sexe: "INCONNU",
        nationalite: "INCONNUE",
        prenoms: [
          {
            id: "efde9664-5133-4d99-8058-223b3bf8f34f",
            numeroOrdre: 1,
            prenom: "SPC",
            estPrenomFrRetenuSdanf: null
          }
        ],
        parentsTitulaire: null,
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
        nationalites: [],
        prenomsDemande: null,
        suiviDossiers: null,
        retenueSdanf: null,
        paysStatutRefugie: null,
        paysOrigine: null,
        qualite: "PARENT",
        numeroDossierNational: null,
        demandeEffetCollectif: null,
        valideEffetCollectif: null,
        residence: null,
        domiciliationEnfant: null,
        parent2Enfant: null,
        enfantTitulaireActeTranscritDresse: null
      }
    ],
    piecesJustificatives: [],
    requerant: {
      id: "efded426-2e1b-45fa-8a25-f349d1baa7fe",
      dateCreation: 1678784544709,
      nomFamille: null,
      prenom: null,
      courriel: null,
      telephone: null,
      adresse: {
        id: "efde569d-10da-4641-80af-f281c6302056",
        ligne2: null,
        ligne3: null,
        ligne4: null,
        ligne5: null,
        codePostal: null,
        ville: null,
        pays: null
      },
      qualite: "PARTICULIER",
      detailQualiteRece: null,
      detailQualiteParticulier: null,
      detailQualiteMandataireHabilite: null,
      detailQualiteInstitutionnel: null,
      detailQualiteAutreProfessionnel: null,
      lienRequerant: null,
      courrielAutreContact: null,
      telephoneAutreContact: null
    },
    mandant: null,
    observations: null,
    statut: {
      id: "efded83d-680b-45b5-967a-5a1119c9a586",
      statutRequete: "PRISE_EN_CHARGE",
      dateEffet: 1678784544723,
      raisonStatut: null
    },
    lienRequerant: {
      id: "efded1ef-d313-4234-8f1d-e026de0d8d0a",
      typeLienRequerant: "PERE_MERE",
      nature: null
    },
    doublons: null,
    origines: null,
    numeroRequeteOrigine: null,
    sousType: "RCTC",
    numeroAncienSI: null,
    dossierSignale: null,
    commentaire: null,
    demandeIdentification: null,
    demandeFrancisation: null,
    provenance: "COURRIER",
    provenanceServicePublic: null,
    provenanceNatali: null,
    provenanceRece: null,
    documentsPj: null,
    natureActeTranscrit: "NAISSANCE_MINEUR",
    villeRegistre: "",
    dateDelivranceCopie: null
  }
];
