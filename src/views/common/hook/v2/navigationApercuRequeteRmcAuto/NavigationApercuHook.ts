import { useEffect, useState } from "react";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/v2/IRequeteTableauDelivrance";
import { PATH_APERCU_REQ_TRAITEMENT } from "../../../../router/ReceUrls";
import {
  autorisePrendreEnChargeTableau,
  typeEstDelivrance
} from "../../../util/RequetesUtils";
import { getUrlWithParam } from "../../../util/route/routeUtil";
import { storeRece } from "../../../util/storeRece";

export interface INavigationApercu {
  isRmcAuto?: boolean;
  url?: string;
}

export function useNavigationApercu(
  urlWithParam?: string,
  requete?: IRequeteTableauDelivrance
): INavigationApercu | undefined {
  const [redirection, setRedirection] = useState<
    INavigationApercu | undefined
  >();

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
        // US 207 et de type RDC au statut "Traité - A imprimer" (jusqu'à Et2 R2), redirection vers "Aperçu du traitement"
        // US 207 et de type RDD au statut "Traiter - A Délivrer démat" (jusqu'à Et2 R2), redirection vers "Aperçu du traitement"
        redirectionEnFonctionMaRequete(requete, setRedirection, urlWithParam);
      } else if (
        !requete.idUtilisateur &&
        requete.statut === StatutRequete.PRISE_EN_CHARGE.libelle
      ) {
        // Lors de la prise en charge aléatoire, on doit lancer la RMC
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

const redirectionEnFonctionMaRequete = (
  requete: IRequeteTableauDelivrance,
  setRedirection: (
    value: React.SetStateAction<INavigationApercu | undefined>
  ) => void,
  urlWithParam: string
) => {
  if (requete.statut && requete.type && typeEstDelivrance(requete.type)) {
    switch (requete.statut) {
      case StatutRequete.TRANSFEREE.libelle:
      case StatutRequete.A_TRAITER.libelle:
        // US 210 et au statut "A traiter" ou "Transférée", on lance la "RMC Auto" et redirection suivant le résultat
        redirectionATraiterTransferee(requete, setRedirection, urlWithParam);
        break;
      case StatutRequete.PRISE_EN_CHARGE.libelle:
        // US 211 ... et au statut "Prise en charge", on lance la "RMC Auto" et redirection suivant le résultat
        setRedirection({ isRmcAuto: true });
        break;
      case StatutRequete.A_SIGNER.libelle:
      case StatutRequete.A_VALIDER.libelle:
        // US 207 et au statut "A signer" ou "A valider", redirection vers "Aperçu du traitement"
        setRedirection({
          url: getUrlWithParam(
            `${urlWithParam}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`,
            requete.idRequete
          )
        });
        break;
      case StatutRequete.BROUILLON.libelle:
        redirectionBrouillon(requete, setRedirection, urlWithParam);
        break;
      default:
        setRedirection({
          url: getUrlWithParam(
            `${urlWithParam}/apercurequete/:idRequete`,
            requete.idRequete
          )
        });
        break;
    }
  }
};

function redirectionATraiterTransferee(
  requete: IRequeteTableauDelivrance,
  setRedirection: (
    value: React.SetStateAction<INavigationApercu | undefined>
  ) => void,
  urlWithParam: string
) {
  if (autorisePrendreEnChargeTableau(requete)) {
    setRedirection({ isRmcAuto: true });
  } else {
    setRedirection({
      url: getUrlWithParam(
        `${urlWithParam}/apercurequete/:idRequete`,
        requete.idRequete
      )
    });
  }
}

function redirectionBrouillon(
  requete: IRequeteTableauDelivrance,
  setRedirection: (
    value: React.SetStateAction<INavigationApercu | undefined>
  ) => void,
  urlWithParam: string
) {
  if (
    requete.sousType &&
    requete.sousType === SousTypeDelivrance.RDCSC.libelleCourt
  ) {
    setRedirection({
      url: getUrlWithParam(
        `${urlWithParam}/saisircertificatsituation/:idRequete`,
        requete.idRequete
      )
    });
  }
}
