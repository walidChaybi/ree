import {
  idRequeteRDCPourModification,
  idRequeteRDCPourModificationMaCorbeille
} from "./requeteDelivrance";

export const CreationRDCSC = {
  id: "1072bc37-f889-4365-8f75-912166b767dd",
  numeroFonctionnel: "U2UN5W",
  idSagaDila: null,
  dateCreation: 18 / 10 / 2020,
  canal: "COURRIER",
  type: "DELIVRANCE",
  titulaires: [],
  requerant: [],
  mandant: null,
  idUtilisateur: "id",
  idEntite: "id",
  actions: [],
  observations: [],
  piecesJustificatives: [],
  sousType: "RDCSC",
  documentDemande: "34da88e2-c5c7-4324-ac8e-b35193352e64",
  nbExemplaireImpression: 1,
  provenanceRequete: "COURRIER",
  evenement: [],
  motif: "Certificat de nationalité française",
  complementMotif: null,
  choixDelivrance: null,
  documentsReponses: [],
  corbeilleAgent: {
    idUtilisateur: "idUtilisateurConnectedUser"
  },
  statut: {
    id: "9d002653-710b-4a78-b651-e5c8cce92ed8",
    statutRequete: "PRISE_EN_CHARGE",
    dateEffet: 1669647394274,
    raisonStatut: null
  }
};

export const UpdateRDCSC = {
  ...CreationRDCSC,
  id: "1072bc37-f889-4365-8f75-912166b767dd",
  corbeilleAgent: {
    idUtilisateur: "9587453e-c9a5-44da-873f-a046a727e726"
  }
};

export const UpdateRDC = {
  ...CreationRDCSC,
  id: idRequeteRDCPourModification,
  sousType: "RDC",
  statut: "PRISE_EN_CHARGE"
};

export const UpdateRDCMaCorbeille = {
  ...UpdateRDC,
  id: idRequeteRDCPourModificationMaCorbeille,
  corbeilleAgent: {
    idUtilisateur: "9587453e-c9a5-44da-873f-a046a727e726"
  }
};
