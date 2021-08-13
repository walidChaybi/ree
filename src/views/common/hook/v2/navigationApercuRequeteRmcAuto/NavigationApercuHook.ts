import { useEffect, useState } from "react";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { PATH_APERCU_REQ_TRAITEMENT } from "../../../../router/ReceUrls";
import { logError } from "../../../util/LogManager";
import {
  autorisePrendreEnChargeTableau,
  statutEstASignerAValider,
  statutEstATraiterOuATransferee,
  statutEstBrouillon,
  statutEstPrendreEnCharge,
  typeEstDelivrance
} from "../../../util/RequetesUtils";
import { getUrlWithParam } from "../../../util/route/routeUtil";
import { storeRece } from "../../../util/storeRece";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../requete/ActionHook";

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

  const [params, setParams] =
    useState<CreationActionEtMiseAjourStatutParams | undefined>();

  usePostCreationActionEtMiseAjourStatutApi(params);

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
        console.log(
          "Attention la redirections de US 316 n'est pas encore développée"
        );
        redirectionEnFonctionMaRequete(
          requete,
          setParams,
          setRedirection,
          urlWithParam
        );
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

const redirectionEnFonctionMaRequete = (
  requete: IRequeteTableau,
  setParams: (
    value: React.SetStateAction<
      CreationActionEtMiseAjourStatutParams | undefined
    >
  ) => void,
  setRedirection: (
    value: React.SetStateAction<INavigationApercu | undefined>
  ) => void,
  urlWithParam: string
) => {
  if (requete.statut && requete.type) {
    if (
      statutEstATraiterOuATransferee(requete.statut) &&
      typeEstDelivrance(requete.type)
    ) {
      // US 210 et au statut "A traiter" ou "Transférée", on lance la "RMC Auto" et redirection suivant le résultat
      if (autorisePrendreEnChargeTableau(requete)) {
        setParams({
          libelleAction: "Prendre en charge",
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          requeteId: requete.idRequete
        });
        setRedirection({ isRmcAuto: true });
      } else {
        logError({
          messageUtilisateur:
            "Vous n'avez pas le droit de prendre en charge cette requête"
        });
        setRedirection({
          url: getUrlWithParam(
            `${urlWithParam}/apercurequete/:idRequete`,
            requete.idRequete
          )
        });
      }
    } else if (
      statutEstPrendreEnCharge(requete.statut) &&
      typeEstDelivrance(requete.type)
    ) {
      // US 211 ... et au statut "Prise en charge", on lance la "RMC Auto" et redirection suivant le résultat
      setRedirection({ isRmcAuto: true });
    } else if (
      statutEstASignerAValider(requete.statut) &&
      typeEstDelivrance(requete.type)
    ) {
      // US 207 et au statut "A signer" ou "A valider", redirection vers "Aperçu du traitement"
      setRedirection({
        url: getUrlWithParam(
          `${urlWithParam}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`,
          requete.idRequete
        )
      });
    } else if (statutEstBrouillon(requete.statut)) {
      // US 316  et au statut "Brouillon", redirection vers "Saisir une requête"
      setRedirection({
        url: getUrlWithParam(
          `${urlWithParam}/saisircertificatsituation/:idRequete`,
          requete.idRequete
        )
      });
    } else {
      setRedirection({
        url: getUrlWithParam(
          `${urlWithParam}/apercurequete/:idRequete`,
          requete.idRequete
        )
      });
    }
  }
};
