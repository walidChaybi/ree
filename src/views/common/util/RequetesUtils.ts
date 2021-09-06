import classNames from "classnames";
import moment from "moment";
import {
  appartientAMonServiceMereServiceOuFillesServices,
  mAppartientOuAppartientAPersonne,
  provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer
} from "../../../model/IOfficierSSOApi";
import { StatutRequete } from "../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../model/requete/v2/enum/TypeRequete";
import { TRequete } from "../../../model/requete/v2/IRequete";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../model/requete/v2/IRequeteDelivrance";
import { IRequeteTableau } from "../../../model/requete/v2/IRequeteTableau";
import { getText } from "../../common/widget/Text";
import { IActionOption } from "../widget/menu/MenuAction";
import { FormatDate } from "./DateUtils";
import { storeRece } from "./storeRece";

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
    return getText("pages.delivrance.mesRequetes.tableau.body.priorite.basse");
  } else if (ecartEnJours > limiteBasse && ecartEnJours <= limiteHaute) {
    return getText(
      "pages.delivrance.mesRequetes.tableau.body.priorite.moyenne"
    );
  } else {
    return getText("pages.delivrance.mesRequetes.tableau.body.priorite.haute");
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
    appartientAMonServiceMereServiceOuFillesServices(requete.idEntite)
  );
};

export const autorisePrendreEnChargeTableau = (requete: IRequeteTableau) =>
  typeEstDelivrance(requete.type ? requete.type : "") &&
  statutEstATraiterOuTransferee(requete.statut ? requete.statut : "") &&
  mAppartientOuAppartientAPersonne(
    requete.idUtilisateur ? requete.idUtilisateur : ""
  ) &&
  provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
    requete.provenance ? requete.provenance : ""
  ) &&
  appartientAMonServiceMereServiceOuFillesServices(
    requete.idEntiteRattachement ? requete.idEntiteRattachement : ""
  );

export const autorisePrendreEnChargeTableauService = (
  requete: IRequeteTableau
) =>
  typeEstDelivrance(requete.type ? requete.type : "") &&
  statutEstATraiterOuTransferee(requete.statut ? requete.statut : "") &&
  requete.idCorbeilleAgent === storeRece.utilisateurCourant?.idUtilisateur &&
  provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
    requete.provenance ? requete.provenance : ""
  ) &&
  appartientAMonServiceMereServiceOuFillesServices(
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

export function getIdDocumentReponseAAfficher(requete?: TRequete): string {
  let idDocumentAAfficher = "";
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const requeteDelivrance = requete as IRequeteDelivrance;

    const documentsDeDelivrance =
      RequeteDelivrance.getDocumentsDeDelivrance(requeteDelivrance);
    if (documentsDeDelivrance.length > 0) {
      idDocumentAAfficher = documentsDeDelivrance[0].id;
    } else if (requeteDelivrance.documentsReponses.length > 0) {
      idDocumentAAfficher = requeteDelivrance.documentsReponses[0].id;
    }
  }
  return idDocumentAAfficher;
}
