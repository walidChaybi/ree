import {
  appartientAMonServiceOuServicesMeresOuServicesFilles,
  mAppartient,
  mAppartientOuAppartientAPersonne,
  provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer
} from "@model/agent/IOfficier";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IActionOption } from "@model/requete/IActionOption";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "@model/requete/IRequeteDelivrance";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import {
  IRequeteTableauDelivrance,
  mappingUneRequeteTableauDelivrance
} from "@model/requete/IRequeteTableauDelivrance";
import {
  IRequeteTableauInformation,
  mappingUneRequeteTableauInformation
} from "@model/requete/IRequeteTableauInformation";
import { getLibelle } from "@util/Utils";
import classNames from "classnames";
import moment from "moment";
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

export const autorisePrendreEnChargeDelivrance = (
  requete: IRequeteDelivrance
) => {
  return (
    TypeRequete.estDelivrance(requete.type) &&
    StatutRequete.estATraiterOuTransferee(requete.statutCourant.statut) &&
    mAppartientOuAppartientAPersonne(requete.idUtilisateur) &&
    appartientAMonServiceOuServicesMeresOuServicesFilles(requete.idEntite) &&
    provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
      requete.provenanceRequete.provenance.libelle
    )
  );
};

export const autorisePrendreEnChargeReqTableauDelivrance = (
  requete: IRequeteTableauDelivrance
): boolean => {
  const type = TypeRequete.getEnumFromLibelle(requete.type);
  const sousType = SousTypeDelivrance.getEnumFromLibelleCourt(requete.sousType);
  const statut = StatutRequete.getEnumFromLibelle(requete.statut);

  return (
    TypeRequete.estDelivrance(type) &&
    SousTypeDelivrance.estPossibleAPrendreEnCharge(sousType) &&
    StatutRequete.estATraiterOuTransferee(statut) &&
    mAppartient(requete.idUtilisateur) &&
    appartientAMonServiceOuServicesMeresOuServicesFilles(
      requete.idEntiteRattachement
    ) &&
    provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
      requete.provenance
    )
  );
};

export const autorisePrendreEnChargeReqTableauInformation = (
  requete: IRequeteTableauInformation
) => {
  const type = TypeRequete.getEnumFromLibelle(requete.type);
  const statut = StatutRequete.getEnumFromLibelle(requete.statut);

  return (
    TypeRequete.estInformation(type) &&
    StatutRequete.estATraiterOuTransferee(statut) &&
    mAppartient(requete.idUtilisateur)
  );
};

export const estRequeteCreationAuStatutATraiter = (
  type: TypeRequete,
  sousType: SousTypeCreation,
  statut: StatutRequete
) => {
  return (
    TypeRequete.estCreation(type) &&
    SousTypeCreation.estRCEXROuRCTDOuRCTC(sousType) &&
    StatutRequete.estATraiter(statut)
  );
};

export const autorisePrendreEnChargeDepuisPageCreation = (
  requete?: IRequeteCreation
): boolean => {
  if (requete) {
    return (
      estRequeteCreationAuStatutATraiter(
        requete.type,
        requete.sousType,
        requete.statutCourant.statut
      ) &&
      appartientAMonServiceOuServicesMeresOuServicesFilles(requete.idEntite)
    );
  } else {
    return false;
  }
};

export const autorisePrendreEnChargeReqTableauCreation = (
  requete: IRequeteTableauCreation
): boolean => {
  const type = TypeRequete.getEnumFromLibelle(requete.type);
  const sousType = SousTypeCreation.getEnumFromLibelleCourt(requete.sousType);
  const statut = StatutRequete.getEnumFromLibelle(requete.statut);

  return (
    estRequeteCreationAuStatutATraiter(type, sousType, statut) &&
    mAppartient(requete.idUtilisateur)
  );
};

export const filtrerListeActionsParSousTypes = (
  requete: IRequeteDelivrance,
  listeOptions: IActionOption[]
): IActionOption[] => {
  return listeOptions?.filter(option => {
    return option.sousTypes
      ? option.sousTypes.find(sousType => sousType === requete?.sousType) !=
          null
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
