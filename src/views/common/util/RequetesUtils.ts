import classNames from "classnames";
import moment from "moment";
import {
  appartientAMonServiceOuServicesMeresOuServicesFilles,
  mAppartient,
  mAppartientOuAppartientAPersonne,
  provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer
} from "../../../model/agent/IOfficier";
import { SousTypeDelivrance } from "../../../model/requete/enum/SousTypeDelivrance";
import { SousTypeRequete } from "../../../model/requete/enum/SousTypeRequete";
import { StatutRequete } from "../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../model/requete/enum/TypeRequete";
import { IActionOption } from "../../../model/requete/IActionOption";
import { DocumentReponse } from "../../../model/requete/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "../../../model/requete/IRequeteTableauDelivrance";
import { getLibelle } from "../../common/util/Utils";
import { FormatDate } from "./DateUtils";
import { MigratorV1V2 } from "./migration/MigratorV1V2";

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

export const typeEstDelivrance = (type: string) =>
  type === TypeRequete.DELIVRANCE.libelle;

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

export const autorisePrendreEnChargeTableau = (
  requete: IRequeteTableauDelivrance
) =>
  !MigratorV1V2.estSousTypeRDDouRDC(requete.sousType) &&
  autorisePrendreEnChargeTableau2(requete);

const autorisePrendreEnChargeTableau2 = (requete: IRequeteTableauDelivrance) =>
  typeEstDelivrance(requete.type ? requete.type : "") &&
  statutEstATraiterOuTransferee(requete.statut ? requete.statut : "") &&
  mAppartient(requete.idUtilisateur ? requete.idUtilisateur : "") &&
  provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
    requete.provenance ? requete.provenance : ""
  ) &&
  appartientAMonServiceOuServicesMeresOuServicesFilles(
    requete.idEntiteRattachement ? requete.idEntiteRattachement : ""
  );

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

    const documentsDeDelivrance = RequeteDelivrance.getDocumentsDeDelivrance(
      requeteDelivrance
    );
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

export function soustypeRDDouRDC(sousType: SousTypeRequete): boolean {
  return (
    sousType === SousTypeDelivrance.RDD || sousType === SousTypeDelivrance.RDC
  );
}

export function soustypeRDCSDouRDCSC(sousType: SousTypeRequete): boolean {
  return (
    sousType === SousTypeDelivrance.RDCSD ||
    sousType === SousTypeDelivrance.RDCSC
  );
}
