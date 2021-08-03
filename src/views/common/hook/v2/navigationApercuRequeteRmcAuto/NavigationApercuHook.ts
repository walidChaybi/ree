import { useEffect, useState } from "react";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../../model/requete/v2/enum/TypeRequete";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { PATH_APERCU_REQ_TRAITEMENT } from "../../../../router/ReceUrls";
import { getUrlWithParam } from "../../../util/route/routeUtil";
import { storeRece } from "../../../util/storeRece";

export interface INavigationApercu {
  isRmcAuto?: boolean;
  url?: string;
}

export function useNavigationApercu(
  urlWithParam?: string,
  requete?: IRequeteTableau
): INavigationApercu | undefined {
  const [redirection, setRedirection] =
    useState<INavigationApercu | undefined>();

  useEffect(() => {
    if (requete && urlWithParam) {
      const officier = storeRece.utilisateurCourant;

      // Si la requete est dans sa corbeille
      if (
        officier &&
        officier?.idUtilisateur === requete.idUtilisateur &&
        requete.type &&
        requete.statut
      ) {
        // OU et de type RDC au statut "Traité - A imprimer" (jusqu'à Et2 R2), redirection vers "Aperçu du traitement"
        // OU et de type RDD au statut "Traiter - A Délivrer démat" (jusqu'à Et2 R2), redirection vers "Aperçu du traitement"
        // US 210  et au statut "A traiter" ou "Transférée", on lance la "RMC Auto"  et redirection suivant le résultat
        // US 316  et au statut "Brouillon", redirection vers "Saisir une requête"
        console.log(
          "Attention les redirections des 210 / 316 ne sont pas encore développées"
        );
        if (
          requete.type === TypeRequete.DELIVRANCE.libelle &&
          (requete.statut === StatutRequete.A_VALIDER.libelle ||
            requete.statut === StatutRequete.A_SIGNER.libelle)
        ) {
          // US 207 et au statut "A signer" ou "A valider", redirection vers "Aperçu du traitement"
          setRedirection({
            url: getUrlWithParam(
              `${urlWithParam}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`,
              requete.idRequete
            )
          });
        } else if (
          requete.type === TypeRequete.DELIVRANCE.libelle &&
          requete.statut === StatutRequete.PRISE_EN_CHARGE.libelle
        ) {
          // US 211 ... et au statut "Prise en charge", on lance la "RMC Auto" et redirection suivant le résultat
          setRedirection({ isRmcAuto: true });
        } else {
          setRedirection({
            url: getUrlWithParam(
              `${urlWithParam}/apercurequete/:idRequete`,
              requete.idRequete
            )
          });
        }
      } else if (!requete.idUtilisateur) {
        setRedirection({ isRmcAuto: true });
      } else {
        // Si la requête N'EST PAS dans sa corbeille agent-> redirection vers "Aperçu de requête"
        setRedirection({
          url: getUrlWithParam(
            `${urlWithParam}/apercurequete/:idRequete`,
            requete.idRequete
          )
        });
      }
    }
  }, [urlWithParam, requete]);

  return redirection;
}
