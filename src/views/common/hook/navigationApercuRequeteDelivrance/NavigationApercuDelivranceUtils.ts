import { redirectionVersRequetePriseEnCharge } from "@hook/rmcAuto/RMCAutoActesInscriptionsUtils";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { RequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { PATH_APERCU_REQ_DEL, PATH_APERCU_REQ_TRAITEMENT, PATH_EDITION, PATH_SAISIR_RDCSC } from "@router/ReceUrls";
import { autorisePrendreEnChargeReqTableauDelivrance } from "@util/RequetesUtils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { getUrlPrecedente } from "@util/route/UrlUtil";
import AfficherMessage from "../../../../utils/AfficherMessage";

// TODO : se débarrasser des type guard "idRequete" quand IRequeteTableauDelivrance sera supprimé

export const redirectionSelonStatutRequete = (
  utilisateurConnecte: UtilisateurConnecte,
  requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">,
  urlCourante: string
): string => {
  const idRequete: string = "idRequete" in requete ? requete.idRequete : requete.id;
  const statut: string | undefined = "idRequete" in requete ? requete.statut : EStatutRequete[requete.statut];
  switch (statut) {
    case StatutRequete.TRANSFEREE.libelle:
    case StatutRequete.A_TRAITER.libelle:
      return redirectionATraiterTransferee(utilisateurConnecte, requete, urlCourante);
    case StatutRequete.PRISE_EN_CHARGE.libelle:
      return redirectionVersRequetePriseEnCharge(requete, urlCourante);
    case StatutRequete.A_SIGNER.libelle:
    case StatutRequete.A_VALIDER.libelle:
    case StatutRequete.A_REVOIR.libelle:
    case StatutRequete.TRANSMISE_A_VALIDEUR.libelle:
      return redirectionAValider(urlCourante, requete);
    case StatutRequete.BROUILLON.libelle:
      return redirectionBrouillon(requete, urlCourante);
    case StatutRequete.DOUBLON.libelle:
      return redirectionRequeteDoublon(urlCourante, idRequete);
    default:
      return GestionnaireARetraiterDansSaga.estARetraiterSagaRequeteTableau(requete)
        ? getUrlApercuTraitement(urlCourante, idRequete)
        : getUrlApercuRequete(urlCourante, idRequete);
  }
};

const redirectionAValider = (urlCourante: string, requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">): string => {
  if (
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES) &&
    [
      SousTypeDelivrance.RDDP.libelleCourt,
      SousTypeDelivrance.RDD.libelleCourt,
      SousTypeDelivrance.RDC.libelleCourt,
      "RDDP",
      "RDD",
      "RDC"
    ].includes(requete.sousType)
  ) {
    return `${urlCourante}/${PATH_EDITION}/${"idRequete" in requete ? requete.idRequete : requete.id}`;
  } else {
    return getUrlApercuTraitement(urlCourante, "idRequete" in requete ? requete.idRequete : requete.id);
  }
};

const redirectionATraiterTransferee = (
  utilisateurConnecte: UtilisateurConnecte,

  requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">,

  urlCourante: string
): string =>
  autorisePrendreEnChargeReqTableauDelivrance(utilisateurConnecte, requete)
    ? redirectionVersRequetePriseEnCharge(requete, urlCourante)
    : getUrlApercuRequete(urlCourante, "idRequete" in requete ? requete.idRequete : requete.id);

const redirectionBrouillon = (requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">, urlCourante: string): string => {
  if ("idRequete" in requete) {
    return requete.sousType === SousTypeDelivrance.RDCSC.libelleCourt ? `${urlCourante}/${PATH_SAISIR_RDCSC}/${requete.idRequete}` : "";
  } else {
    return requete.sousType === "RDCSC" ? `${urlCourante}/${PATH_SAISIR_RDCSC}/${requete.id}` : "";
  }
};
const redirectionRequeteDoublon = (urlCourante: string, idRequete: string): string => {
  AfficherMessage.succes("La requête a bien été enregistrée", { fermetureAuto: true });
  return `${getUrlPrecedente(urlCourante)}/${PATH_APERCU_REQ_DEL}/${idRequete}`;
};

export const getUrlApercuRequete = (urlCourante: string, idRequete: string): string => `${urlCourante}/${PATH_APERCU_REQ_DEL}/${idRequete}`;

const getUrlApercuTraitement = (urlCourante: string, idRequete: string): string =>
  `${urlCourante}/${PATH_APERCU_REQ_TRAITEMENT}/${idRequete}`;
