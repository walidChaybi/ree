import { redirectionVersRequetePriseEnCharge } from "@hook/rmcAuto/RMCAutoActesInscriptionsUtils";
import { IOfficier } from "@model/agent/IOfficier";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { PATH_APERCU_REQ_DEL, PATH_APERCU_REQ_TRAITEMENT, PATH_EDITION, PATH_SAISIR_RDCSC } from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import messageManager from "@util/messageManager";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { autorisePrendreEnChargeReqTableauDelivrance } from "@util/RequetesUtils";
import { getUrlPrecedente } from "@util/route/UrlUtil";

export const redirectionSelonStatutRequete = (
  utilisateurConnecte: IOfficier,
  requete: IRequeteTableauDelivrance,
  urlCourante: string
): string => {
  switch (requete.statut) {
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
      return redirectionRequeteDoublon(urlCourante, requete.idRequete);
    default:
      return GestionnaireARetraiterDansSaga.estARetraiterSagaRequeteTableau(requete)
        ? getUrlApercuTraitement(urlCourante, requete.idRequete)
        : getUrlApercuRequete(urlCourante, requete.idRequete);
  }
};

const redirectionAValider = (urlCourante: string, requete: IRequeteTableauDelivrance): string => {
  if (
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES) &&
    (requete.sousType === SousTypeDelivrance.RDDP.libelleCourt ||
      requete.sousType === SousTypeDelivrance.RDD.libelleCourt ||
      requete.sousType === SousTypeDelivrance.RDC.libelleCourt)
  ) {
    return `${urlCourante}/${PATH_EDITION}/${requete.idRequete}`;
  } else {
    return getUrlApercuTraitement(urlCourante, requete.idRequete);
  }
};

const redirectionATraiterTransferee = (utilisateurConnecte: IOfficier, requete: IRequeteTableauDelivrance, urlCourante: string): string =>
  autorisePrendreEnChargeReqTableauDelivrance(utilisateurConnecte, requete)
    ? redirectionVersRequetePriseEnCharge(requete, urlCourante)
    : getUrlApercuRequete(urlCourante, requete.idRequete);

const redirectionBrouillon = (requete: IRequeteTableauDelivrance, urlCourante: string): string =>
  requete.sousType === SousTypeDelivrance.RDCSC.libelleCourt ? `${urlCourante}/${PATH_SAISIR_RDCSC}/${requete.idRequete}` : "";

const redirectionRequeteDoublon = (urlCourante: string, idRequete: string): string => {
  messageManager.showSuccessAndClose("La requête a bien été enregistrée");
  return `${getUrlPrecedente(urlCourante)}/${PATH_APERCU_REQ_DEL}/${idRequete}`;
};

export const getUrlApercuRequete = (urlCourante: string, idRequete: string): string => `${urlCourante}/${PATH_APERCU_REQ_DEL}/${idRequete}`;

const getUrlApercuTraitement = (urlCourante: string, idRequete: string): string =>
  `${urlCourante}/${PATH_APERCU_REQ_TRAITEMENT}/${idRequete}`;
