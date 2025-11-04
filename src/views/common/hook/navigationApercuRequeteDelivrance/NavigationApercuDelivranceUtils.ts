import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { RequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { autorisePrendreEnChargeReqTableauDelivrance } from "@util/RequetesUtils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import LiensRECE from "../../../../router/LiensRECE";
import {
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT,
  INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER
} from "../../../../router/infoPages/InfoPagesEspaceDelivrance";
import AfficherMessage from "../../../../utils/AfficherMessage";

// TODO : se débarrasser des type guard "idRequete" quand IRequeteTableauDelivrance sera supprimé

export const redirectionSelonStatutRequete = (
  utilisateurConnecte: UtilisateurConnecte,
  requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">
): string => {
  const idRequete: string = "idRequete" in requete ? requete.idRequete : requete.id;
  const statut: string | undefined = "idRequete" in requete ? requete.statut : EStatutRequete[requete.statut];
  switch (statut) {
    case StatutRequete.TRANSFEREE.libelle:
    case StatutRequete.A_TRAITER.libelle:
      return redirectionATraiterTransferee(utilisateurConnecte, requete);
    case StatutRequete.PRISE_EN_CHARGE.libelle:
      return LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.url, {
        idRequeteParam: "idRequete" in requete ? requete.idRequete : requete.id
      });
    case StatutRequete.A_SIGNER.libelle:
    case StatutRequete.A_VALIDER.libelle:
    case StatutRequete.A_REVOIR.libelle:
    case StatutRequete.TRANSMISE_A_VALIDEUR.libelle:
      return redirectionAValider(requete);
    case StatutRequete.BROUILLON.libelle:
      return redirectionBrouillon(requete);
    case StatutRequete.DOUBLON.libelle:
      return redirectionRequeteDoublon(idRequete);
    default:
      return GestionnaireARetraiterDansSaga.estARetraiterSagaRequeteTableau(requete)
        ? getUrlApercuTraitement(idRequete)
        : getUrlApercuRequete(idRequete);
  }
};

const redirectionAValider = (requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">): string => {
  if (
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CIBLE_EXTRAITS_COPIES) &&
    [
      SousTypeDelivrance.RDDP.libelleCourt,
      SousTypeDelivrance.RDD.libelleCourt,
      SousTypeDelivrance.RDC.libelleCourt,
      "RDDP",
      "RDD",
      "RDC"
    ].includes(requete.sousType)
  ) {
    return LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url, {
      idRequeteParam: "idRequete" in requete ? requete.idRequete : requete.id
    });
  } else {
    return getUrlApercuTraitement("idRequete" in requete ? requete.idRequete : requete.id);
  }
};

const redirectionATraiterTransferee = (
  utilisateurConnecte: UtilisateurConnecte,
  requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">
): string =>
  autorisePrendreEnChargeReqTableauDelivrance(utilisateurConnecte, requete)
    ? LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.url, {
        idRequeteParam: "idRequete" in requete ? requete.idRequete : requete.id
      })
    : getUrlApercuRequete("idRequete" in requete ? requete.idRequete : requete.id);

const redirectionBrouillon = (requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">): string => {
  if ("idRequete" in requete) {
    return requete.sousType === SousTypeDelivrance.RDCSC.libelleCourt
      ? LiensRECE.genererLien(INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url, {
          idRequeteParam: requete.idRequete
        })
      : "";
  } else {
    return requete.sousType === "RDCSC"
      ? LiensRECE.genererLien(INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url, {
          idRequeteParam: requete.id
        })
      : "";
  }
};
const redirectionRequeteDoublon = (idRequete: string): string => {
  AfficherMessage.succes("La requête a bien été enregistrée", { fermetureAuto: true });
  return LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url, { idRequeteParam: idRequete });
};

export const getUrlApercuRequete = (idRequete: string): string =>
  LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.url, { idRequeteParam: idRequete });

const getUrlApercuTraitement = (idRequete: string): string =>
  LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT.url, { idRequeteParam: idRequete });
