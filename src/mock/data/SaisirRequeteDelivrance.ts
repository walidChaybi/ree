import { idRequeteRDCPourModification } from "./requeteDelivrance";

export const CreationRDCSC = {
  id: "1072bc37-f889-4365-8f75-912166b767dd",
  numeroFonctionnel: "U2UN5W",
  idSagaDila: null,
  dateCreation: 18 / 10 / 2020,
  canal: "COURRIER",
  type: "DELIVRANCE",
  statut: "A_TRAITER",
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
  documentsReponses: []
};

export const UpdateRDCSC = {
  ...CreationRDCSC,
  id: "1072bc37-f889-4365-8f75-912166b767dd"
};

export const UpdateRDC = {
  ...CreationRDCSC,
  id: idRequeteRDCPourModification,
  sousType: "RDC",
  statut: "PRISE_EN_CHARGE"
};
