import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { IActionOption } from "@model/requete/IActionOption";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteDelivrance, RequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { EProvenance, Provenance } from "@model/requete/enum/Provenance";
import { ESousTypeCreation, SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ESousTypeDelivrance, SousTypeDelivrance, SousTypeDelivranceUtils } from "@model/requete/enum/SousTypeDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { ETypeRequete, TypeRequete } from "@model/requete/enum/TypeRequete";
import { RequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";

export const indexParamsReq = {
  Statut: 0,
  Tri: 1,
  Sens: 2,
  Range: 3
};

export const autorisePrendreEnChargeDelivrance = (utilisateurConnecte: UtilisateurConnecte, requete: IRequeteDelivrance) => {
  return (
    requete.type === TypeRequete.DELIVRANCE &&
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
  requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">
): boolean => {
  let type: keyof typeof ETypeRequete | "";
  let sousType: keyof typeof ESousTypeDelivrance | "";
  let statut: keyof typeof EStatutRequete | "";

  if ("idRequete" in requete) {
    type = requete.type ? TypeRequete.getEnumFromLibelle(requete.type) : "";
    sousType = (SousTypeDelivrance.getEnumFromLibelleCourt(requete.sousType)?.nom as keyof typeof ESousTypeDelivrance) ?? "";
    statut = (StatutRequete.getEnumFromLibelle(requete.statut)?.nom as keyof typeof EStatutRequete) ?? "";
  } else {
    type = requete.type;
    sousType = requete.sousType;
    statut = requete.statut;
  }

  return (
    type === "DELIVRANCE" &&
    SousTypeDelivranceUtils.estPossibleAPrendreEnCharge(sousType) &&
    ["A_TRAITER", "TRANSFEREE"].includes(statut) &&
    utilisateurConnecte.id === (requete.idUtilisateur ?? undefined) &&
    [utilisateurConnecte.idService, ...utilisateurConnecte.idServicesParent, ...utilisateurConnecte.idServicesFils].includes(
      requete.idService ?? ""
    ) &&
    utilisateurConnecte.estHabilitePour({ leDroit: requete.provenance === EProvenance.COMEDEC ? Droit.DELIVRER_COMEDEC : Droit.DELIVRER })
  );
};

export const autorisePrendreEnChargeReqTableauInformation = (
  utilisateurConnecte: UtilisateurConnecte,
  requete: IRequeteTableauInformation | RequeteTableauRMC<"INFORMATION">
) => {
  let type: keyof typeof ETypeRequete | "";
  let statut: keyof typeof EStatutRequete | "";

  // Type gard à supprimer quand IRequeteTableauInformation sera supprimé
  if ("idRequete" in requete) {
    type = ((TypeRequete.getEnumFromLibelle(requete.type ?? "") as TypeRequete)?.nom as keyof typeof ETypeRequete) ?? "";
    statut = (StatutRequete.getEnumFromLibelle(requete.statut)?.nom as keyof typeof EStatutRequete) ?? "";
  } else {
    type = requete.type;
    statut = requete.statut;
  }

  return (
    type === "INFORMATION" &&
    ["A_TRAITER", "TRANSFEREE"].includes(statut) &&
    utilisateurConnecte.id === (requete.idUtilisateur ?? undefined)
  );
};

const estRequeteCreationAuStatutATraiter = (
  type: keyof typeof ETypeRequete,
  sousType: keyof typeof ESousTypeCreation,
  statut: keyof typeof EStatutRequete
) => type === "CREATION" && ["RCEXR", "RCTD", "RCTC"].includes(sousType) && statut === "A_TRAITER";

export const autorisePrendreEnChargeDepuisPageCreation = (utilisateurConnecte: UtilisateurConnecte, requete?: IRequeteCreation): boolean =>
  Boolean(
    requete &&
      estRequeteCreationAuStatutATraiter(
        requete.type.nom as keyof typeof ETypeRequete,
        requete.sousType.nom as keyof typeof ESousTypeCreation,
        requete.statutCourant.statut.nom as keyof typeof EStatutRequete
      ) &&
      [utilisateurConnecte.idService, ...utilisateurConnecte.idServicesParent, ...utilisateurConnecte.idServicesFils].includes(
        requete.idService ?? ""
      )
  );

export const autorisePrendreEnChargeReqTableauCreation = (
  requete: IRequeteTableauCreation | RequeteTableauRMC<"CREATION">,
  utilisateurConnecte: UtilisateurConnecte
): boolean => {
  let type: keyof typeof ETypeRequete | "";
  let sousType: keyof typeof ESousTypeCreation | "";
  let statut: keyof typeof EStatutRequete | "";
  if ("idRequete" in requete) {
    type = requete.type ? TypeRequete.getEnumFromLibelle(requete.type) : "";
    sousType = (SousTypeCreation.getEnumFromLibelleCourt(requete.sousType)?.nom as keyof typeof ESousTypeCreation) ?? "";
    statut = (StatutRequete.getEnumFromLibelle(requete.statut)?.nom as keyof typeof EStatutRequete) ?? "";
  } else {
    type = requete.type;
    sousType = requete.sousType;
    statut = requete.statut;
  }

  return Boolean(
    type && estRequeteCreationAuStatutATraiter(type, sousType, statut) && utilisateurConnecte.id === (requete.idUtilisateur ?? undefined)
  );
};

export const filtrerListeActionsParSousTypes = (requete: IRequeteDelivrance, listeOptions: IActionOption[]): IActionOption[] => {
  return listeOptions?.filter(option => {
    return option.sousTypes ? option.sousTypes.find(sousType => sousType === requete?.sousType) != null : true;
  });
};

export const getIdDocumentReponseAAfficher = (requete?: IRequeteDelivrance): string => {
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
};
