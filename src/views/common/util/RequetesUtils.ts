import classNames from "classnames";
import moment from "moment";
import {
  appartientAMonServiceOuServicesMeresOuServicesFilles,
  mAppartient,
  mAppartientOuAppartientAPersonne,
  provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer
} from "../../../model/agent/IOfficier";
import { SousTypeDelivrance } from "../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../model/requete/enum/TypeRequete";
import { IActionOption } from "../../../model/requete/IActionOption";
import { DocumentReponse } from "../../../model/requete/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../model/requete/IRequeteDelivrance";
import { TRequeteTableau } from "../../../model/requete/IRequeteTableau";
import {
  IRequeteTableauDelivrance,
  mappingUneRequeteTableauDelivrance
} from "../../../model/requete/IRequeteTableauDelivrance";
import {
  IRequeteTableauInformation,
  mappingUneRequeteTableauInformation
} from "../../../model/requete/IRequeteTableauInformation";
import { getLibelle } from "../../common/util/Utils";
import { FormatDate } from "./DateUtils";

export const indexParamsReq = {
  Statut: 0,
  Tri: 1,
  Sens: 2,
  Range: 3
};

const limiteBasse = 2;
const limiteHaute = 5;

export function prioriteDeLaRequete(dateStatut: string): string {
  const ecartEnJours = moment().diff(
    moment(dateStatut, FormatDate.DDMMYYYY),
    "days"
  );

  return classNames({
    PrioriteBasse: ecartEnJours <= limiteBasse,
    PrioriteMoyenne: ecartEnJours > limiteBasse && ecartEnJours <= limiteHaute,
    PrioriteHaute: ecartEnJours > limiteHaute
  });
}

export function getMessagePrioriteDeLaRequete(dateStatut: string): string {
  const ecartEnJours = moment().diff(
    moment(dateStatut, FormatDate.DDMMYYYY),
    "days"
  );
  if (ecartEnJours <= limiteBasse) {
    return getLibelle("Priorité basse");
  } else if (ecartEnJours > limiteBasse && ecartEnJours <= limiteHaute) {
    return getLibelle("Priorité moyenne");
  } else {
    return getLibelle("Priorité haute");
  }
}

export const statutEstATraiterOuTransferee = (statut: string) =>
  statut === StatutRequete.A_TRAITER.libelle ||
  statut === StatutRequete.TRANSFEREE.libelle;

export const statutEstPrendreEnCharge = (statut: string) =>
  statut === StatutRequete.PRISE_EN_CHARGE.libelle;

export const statutEstBrouillon = (statut: string) =>
  statut === StatutRequete.BROUILLON.libelle;

export const statutEstASignerAValider = (statut: string) =>
  statut === StatutRequete.A_VALIDER.libelle ||
  statut === StatutRequete.A_SIGNER.libelle;

export const statutEstAValider = (statut: string) =>
  statut === StatutRequete.A_VALIDER.libelle;

export const statutEstASigner = (statut: string) =>
  statut === StatutRequete.A_SIGNER.libelle;

export const typeEstDelivrance = (type: string) =>
  type === TypeRequete.DELIVRANCE.libelle;

export const typeEstInformation = (type: string) => {
  return type === TypeRequete.INFORMATION.libelle;
};

export const autorisePrendreEnChargeDelivrance = (
  requete: IRequeteDelivrance
) => {
  return (
    typeEstDelivrance(requete.type.libelle) &&
    statutEstATraiterOuTransferee(requete.statutCourant.statut.libelle) &&
    mAppartientOuAppartientAPersonne(requete.idUtilisateur) &&
    provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
      requete.provenanceRequete.provenance.libelle
    ) &&
    appartientAMonServiceOuServicesMeresOuServicesFilles(requete.idEntite)
  );
};

export const autorisePrendreEnChargeReqTableauDelivrance = (
  requete: IRequeteTableauDelivrance
): boolean => {
  const sousType = SousTypeDelivrance.getEnumFromLibelleCourt(requete.sousType);
  return (
    SousTypeDelivrance.possibleAPrendreEnCharge(sousType) &&
    estAutorisePrendreEnChargeReqTableauDelivrance(requete)
  );
};

const estAutorisePrendreEnChargeReqTableauDelivrance = (
  requete: IRequeteTableauDelivrance
) =>
  typeEstDelivrance(requete.type ? requete.type : "") &&
  statutEstATraiterOuTransferee(requete.statut ? requete.statut : "") &&
  mAppartient(requete.idUtilisateur ? requete.idUtilisateur : "") &&
  provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
    requete.provenance ? requete.provenance : ""
  ) &&
  appartientAMonServiceOuServicesMeresOuServicesFilles(
    requete.idEntiteRattachement ? requete.idEntiteRattachement : ""
  );

export const autorisePrendreEnChargeReqTableauInformation = (
  requete: IRequeteTableauInformation
) => {
  const amoi = mAppartient(requete.idUtilisateur ? requete.idUtilisateur : "");
  const statutTransfereeOuTraite =
    requete.statut === StatutRequete.TRANSFEREE.libelle ||
    requete.statut === StatutRequete.A_TRAITER.libelle;

  return (
    amoi &&
    statutTransfereeOuTraite /*||
    requete.statut === StatutRequete.A_TRAITER.libelle */ &&
    typeEstInformation(requete.type ? requete.type : "")
  );
};

export const filtrerListeActions = (
  requete: IRequeteDelivrance,
  listeOptions: IActionOption[]
): IActionOption[] => {
  return listeOptions?.filter(r => {
    return r.sousTypes
      ? r.sousTypes.find(st => st === requete?.sousType) != null
      : true;
  });
};

export function getIdDocumentReponseAAfficher(
  requete?: IRequeteDelivrance
): string {
  let idDocumentAAfficher = "";
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const requeteDelivrance = requete;

    const documentsDeDelivrance =
      RequeteDelivrance.getDocumentsDeDelivrance(requeteDelivrance);
    if (documentsDeDelivrance.length > 0) {
      idDocumentAAfficher = DocumentReponse.triDocumentsDelivrance(
        documentsDeDelivrance
      )[0].id;
    } else if (requeteDelivrance.documentsReponses.length > 0) {
      // Il y a peu de chance de passer dans ce code car touts les documents réponse sont des documents de délivrance (du point de vue Catégorie)
      idDocumentAAfficher = DocumentReponse.triDocumentsDelivrance(
        requeteDelivrance.documentsReponses
      )[0].id;
    }
  }
  return idDocumentAAfficher;
}

export function mappingRequetesTableau(
  resultatsRecherche: any,
  mappingSupplementaire: boolean
): TRequeteTableau[] {
  return resultatsRecherche?.map((requete: TRequeteTableau) => {
    if (requete.type === TypeRequete.DELIVRANCE.libelle) {
      return mappingUneRequeteTableauDelivrance(requete, mappingSupplementaire);
    } else if (requete.type === TypeRequete.INFORMATION.libelle) {
      return mappingUneRequeteTableauInformation(
        requete,
        mappingSupplementaire
      );
    } else {
      // TODO Mapping provisoire pour les autres Type Requete ( CREATION et MISE_A_JOUR )
      return mappingUneRequeteTableauDelivrance(requete, mappingSupplementaire);
    }
  });
}
