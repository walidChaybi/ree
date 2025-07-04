import { IService } from "@model/agent/IService";
import { Utilisateur, UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { IActionOption } from "@model/requete/IActionOption";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteDelivrance, RequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { IRequeteTableauCreation, mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IRequeteTableauDelivrance, mappingUneRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IRequeteTableauInformation, mappingUneRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";

export const indexParamsReq = {
  Statut: 0,
  Tri: 1,
  Sens: 2,
  Range: 3
};

export const autorisePrendreEnChargeDelivrance = (utilisateurConnecte: UtilisateurConnecte, requete: IRequeteDelivrance) => {
  return (
    TypeRequete.estDelivrance(requete.type) &&
    StatutRequete.estATraiterOuTransferee(requete.statutCourant.statut) &&
    (!requete.idUtilisateur || utilisateurConnecte.id === requete.idUtilisateur) &&
    [utilisateurConnecte.idService, ...utilisateurConnecte.idServicesFils, ...utilisateurConnecte.idServicesParent].includes(
      requete.idService
    ) &&
    ((requete.provenanceRequete.provenance.libelle === Provenance.COMEDEC.libelle &&
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER_COMEDEC })) ||
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER }))
  );
};

export const autorisePrendreEnChargeReqTableauDelivrance = (
  utilisateurConnecte: UtilisateurConnecte,
  requete: IRequeteTableauDelivrance
): boolean => {
  const type = requete.type ? TypeRequete.getEnumFromLibelle(requete.type) : "";
  const sousType = SousTypeDelivrance.getEnumFromLibelleCourt(requete.sousType);
  const statut = StatutRequete.getEnumFromLibelle(requete.statut);

  return (
    (TypeRequete.estDelivrance(type) &&
      SousTypeDelivrance.estPossibleAPrendreEnCharge(sousType) &&
      StatutRequete.estATraiterOuTransferee(statut) &&
      utilisateurConnecte.id === requete.idUtilisateur &&
      [utilisateurConnecte.idService, ...utilisateurConnecte.idServicesFils, ...utilisateurConnecte.idServicesParent].includes(
        requete.idService ?? ""
      ) &&
      requete.provenance === Provenance.COMEDEC.libelle &&
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER_COMEDEC })) ||
    utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER })
  );
};

export const autorisePrendreEnChargeReqTableauInformation = (
  utilisateurConnecte: UtilisateurConnecte,
  requete: IRequeteTableauInformation
) => {
  const type = requete.type ? TypeRequete.getEnumFromLibelle(requete.type) : "";
  const statut = StatutRequete.getEnumFromLibelle(requete.statut);

  return (
    TypeRequete.estInformation(type) && StatutRequete.estATraiterOuTransferee(statut) && utilisateurConnecte.id === requete.idUtilisateur
  );
};

const estRequeteCreationAuStatutATraiter = (type: TypeRequete, sousType: SousTypeCreation, statut: StatutRequete) => {
  return TypeRequete.estCreation(type) && SousTypeCreation.estRCEXROuRCTDOuRCTC(sousType) && StatutRequete.estATraiter(statut);
};

export const autorisePrendreEnChargeDepuisPageCreation = (
  utilisateurConnecte: UtilisateurConnecte,
  requete?: IRequeteCreation
): boolean => {
  if (requete) {
    return (
      estRequeteCreationAuStatutATraiter(requete.type, requete.sousType, requete.statutCourant.statut) &&
      [utilisateurConnecte.idService, ...utilisateurConnecte.idServicesParent, ...utilisateurConnecte.idServicesFils].includes(
        requete.idService
      )
    );
  } else {
    return false;
  }
};

export const autorisePrendreEnChargeReqTableauCreation = (
  requete: IRequeteTableauCreation,
  utilisateurConnecte: UtilisateurConnecte
): boolean => {
  const type = requete.type ? TypeRequete.getEnumFromLibelle(requete.type) : "";
  const sousType = SousTypeCreation.getEnumFromLibelleCourt(requete.sousType);
  const statut = StatutRequete.getEnumFromLibelle(requete.statut);

  return estRequeteCreationAuStatutATraiter(type, sousType, statut) && utilisateurConnecte.id === requete.idUtilisateur;
};

export const filtrerListeActionsParSousTypes = (requete: IRequeteDelivrance, listeOptions: IActionOption[]): IActionOption[] => {
  return listeOptions?.filter(option => {
    return option.sousTypes ? option.sousTypes.find(sousType => sousType === requete?.sousType) != null : true;
  });
};

export function getIdDocumentReponseAAfficher(requete?: IRequeteDelivrance): string {
  let idDocumentAAfficher = "";
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const requeteDelivrance = requete;

    const documentsDeDelivrance = RequeteDelivrance.getDocumentsDeDelivrance(requeteDelivrance);
    if (documentsDeDelivrance.length > 0) {
      idDocumentAAfficher = DocumentReponse.triDocumentsDelivrance(documentsDeDelivrance)[0].id;
    } else if (requeteDelivrance.documentsReponses.length > 0) {
      // Il y a peu de chance de passer dans ce code car tous les documents réponse sont des documents de délivrance (du point de vue Catégorie)
      idDocumentAAfficher = DocumentReponse.triDocumentsDelivrance(requeteDelivrance.documentsReponses)[0].id;
    }
  }
  return idDocumentAAfficher;
}

export function mappingRequetesTableau(
  resultatsRecherche: any,
  mappingSupplementaire: boolean,
  utilisateurs: Utilisateur[],
  services: IService[]
): TRequeteTableau[] {
  return resultatsRecherche?.map((requete: TRequeteTableau) => {
    if (requete.type && TypeRequete.getEnumFor(requete.type ?? "") === TypeRequete.DELIVRANCE) {
      return mappingUneRequeteTableauDelivrance(requete, mappingSupplementaire, utilisateurs, services);
    } else if (requete.type && TypeRequete.getEnumFor(requete.type) === TypeRequete.INFORMATION) {
      return mappingUneRequeteTableauInformation(requete, mappingSupplementaire, utilisateurs, services);
    } else {
      // TODO Mapping provisoire pour les autres Type Requete ( CREATION et MISE_A_JOUR )
      return mappingUneRequeteTableauCreation(requete, mappingSupplementaire, utilisateurs, services);
    }
  });
}
