/* istanbul ignore file */
// Tous les cas ne sont pas testables

import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IRequeteTableau } from "../../../../model/requete/v2/IRequeteTableau";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { storeRece } from "../../../common/util/storeRece";

export interface INavigationApercu {
  isRmcAuto?: boolean;
  url?: string;
}

export interface IdRequeteParams {
  idRequete: string;
}

// Si redirection directe alors on renvoie l'URL
// Si on doit passer par la RMC Auto alors on renvoie le code RMC_AUTO
export function navigationApercu(
  urlWithParam: string,
  dataRequetes: IRequeteTableau[],
  idx: number
): INavigationApercu {
  const officier = storeRece.utilisateurCourant;
  const requete = dataRequetes[idx];
  const redirection = {} as INavigationApercu;

  // Si la requete est dans sa corbeille
  if (
    officier &&
    officier?.idUtilisateur === requete.idUtilisateur &&
    requete.type &&
    requete.statut
  ) {
    // US 207 et au statut "A signer" ou "A valider", redirection vers "Aperçu du traitement"
    // OU et de type RDC au statut "Traité - A imprimer" (jusqu'à Et2 R2), redirection vers "Aperçu du traitement"
    // OU et de type RDD au statut "Traiter - A Délivrer démat" (jusqu'à Et2 R2), redirection vers "Aperçu du traitement"
    // US 210  et au statut "A traiter" ou "Transférée", on lance la "RMC Auto"  et redirection suivant le résultat
    // US 316  et au statut "Brouillon", redirection vers "Saisir une requête"
    console.log(
      "Attention les redirections des US 207 / 210 / 316 ne sont pas encore développées"
    );

    if (
      requete.type === TypeRequete.DELIVRANCE.libelle &&
      requete.statut === StatutRequete.PRISE_EN_CHARGE.libelle
    ) {
      // US 211 ... et au statut "Prise en charge", on lance la "RMC Auto" et redirection suivant le résultat
      redirection.isRmcAuto = true;
    } else {
      redirection.url = getUrlWithParam(
        `${urlWithParam}/apercurequete/:idRequete`,
        requete.idRequete
      );
    }
  } else if (requete.idUtilisateur == null) {
    // US 221 Si je "Prendre en charge une requête" depuis l'espace délivrance
    console.log("Futures US 221");
    redirection.isRmcAuto = true;
  } else {
    // Si la requête N'EST PAS dans sa corbeille agent-> redirection vers "Aperçu de requête"
    redirection.url = getUrlWithParam(
      `${urlWithParam}/apercurequete/:idRequete`,
      requete.idRequete
    );
  }
  return redirection;
}
