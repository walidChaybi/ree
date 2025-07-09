import { IRequeteRMCAutoDto } from "@api/configurations/requete/rmc/PostRMCAutoRequeteConfigApi";

export const REQUETE_CREATION_RMC_AUTO_DTO: IRequeteRMCAutoDto<"CREATION"> = {
  id: "requeteCreation",
  dateCreation: 1749081600000,
  titulaires: [
    {
      nom: "NOM CREATION",
      prenom: "PrénomCréation"
    }
  ],
  type: "CREATION",
  sousType: "RCEDXR",
  statut: "A_TRAITER",
  numero: ""
};

export const REQUETE_DELIVRANCE_RMC_AUTO_DTO: IRequeteRMCAutoDto<"DELIVRANCE"> = {
  id: "requeteDelivrance",
  dateCreation: 1749081600000,
  titulaires: [
    {
      nom: "NOM DELIVRANCE",
      prenom: "PrénomDélivrance"
    }
  ],
  type: "DELIVRANCE",
  sousType: "RDD",
  statut: "BROUILLON",
  numero: ""
};

export const REQUETE_INFORMATION_RMC_AUTO_DTO: IRequeteRMCAutoDto<"INFORMATION"> = {
  id: "requeteInformation",
  dateCreation: 1749081600000,
  titulaires: [
    {
      nom: "NOM INFORMATION",
      prenom: "PrénomInformation"
    }
  ],
  type: "INFORMATION",
  sousType: "INFORMATION",
  statut: "BROUILLON",
  numero: ""
};

export const REQUETE_MAJ_RMC_AUTO_DTO: IRequeteRMCAutoDto<"MISE_A_JOUR"> = {
  id: "requeteMAJ",
  dateCreation: 1749081600000,
  titulaires: [
    {
      nom: "NOM MAJ",
      prenom: "PrénomMaJ"
    }
  ],
  type: "MISE_A_JOUR",
  sousType: "RMAC",
  statut: "BROUILLON",
  numero: ""
};
