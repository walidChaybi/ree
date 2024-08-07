import { Sexe } from "@model/etatcivil/enum/Sexe";

export const ReponseMesRequetesInformation = [
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EVIPG4",
    objet: "Objet de la requête",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "TRANSFEREE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EVIPG5",
    objet: "Objet de la requête",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: [
      {
        nom: "nom1",
        prenoms: ["p1", "p2"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        sexe: Sexe.MASCULIN
      },
      {
        nom: "nom2",
        prenoms: ["p1", "p2"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        sexe: Sexe.MASCULIN
      }
    ]
  }
];

export const ReponseRequetesInfoService = [
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EVIPG4",
    objet: "Objet de la requête",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "TRANSFEREE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EVIPG5",
    objet: "Objet de la requête",
    qualiteRequerant: "MANDATAIRE_HABILITE",
    typeMandataire: "AVOCAT",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: [
      {
        nom: "nom1",
        prenoms: ["p1", "p2"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        sexe: Sexe.MASCULIN
      },
      {
        nom: "nom2",
        prenoms: ["p1", "p2"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        sexe: Sexe.MASCULIN
      }
    ]
  }
];

export const ReponseRequetesInfoServiceFiltreSousType = [
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AZERTY1",
    objet: "Objet de la requête",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "TRANSFEREE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf36",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AZERTY2",
    objet: "Objet de la requête",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "TRANSFEREE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf70",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AZERTY3",
    objet: "Objet de la requête",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  }
];

export const ReponseRequetesInfoServiceFiltreObjet = [
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AZERTY123",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "TRANSFEREE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf36",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AZERTY456",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "TRANSFEREE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf70",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AZERTY789",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf71",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "URANUS",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "A_TRAITER",
    titulaires: []
  }
];

export const ReponseRequetesInfoServiceFiltreStatut = [
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EMANUMERLE1",
    idUtilisateur: "e534a9e0-5908-480d-8dba-fc77fe7a4065",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf36",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EMANUMERLE2",
    idUtilisateur: "e534a9e0-5908-480d-8dba-fc77fe7a4065",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf70",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EMANUMERLE3",
    idUtilisateur: "e534a9e0-5908-480d-8dba-fc77fe7a4065",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf71",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EMANUMERLE4",
    idUtilisateur: "e534a9e0-5908-480d-8dba-fc77fe7a4065",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  }
];

export const ReponseRequetesInfoServiceFiltreTypeRequerant = [
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AVOCAT1",
    idUtilisateur: "e534a9e0-5908-480d-8dba-fc77fe7a4065",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "AVOCAT",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf36",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AVOCAT2",
    idUtilisateur: "e534a9e0-5908-480d-8dba-fc77fe7a4065",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "AVOCAT",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf70",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AVOCAT3",
    idUtilisateur: "e534a9e0-5908-480d-8dba-fc77fe7a4065",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "AVOCAT",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf71",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "AVOCAT4",
    idUtilisateur: "e534a9e0-5908-480d-8dba-fc77fe7a4065",
    objet: "DEMANDE_COPIE_ACTE",
    qualiteRequerant: "AVOCAT",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: []
  }
];

