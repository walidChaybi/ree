import { useEffect, useState } from "react";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import {
  PATH_APERCU_REQ_DEL,
  PATH_APERCU_REQ_TRAITEMENT,
  PATH_EDITION
} from "../../../router/ReceUrls";
import { FeatureFlag } from "../../util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../util/featureFlag/gestionnaireFeatureFlag";
import messageManager from "../../util/messageManager";
import { GestionnaireARetraiterDansSaga } from "../../util/migration/GestionnaireARetraiterDansSaga";
import {
  autorisePrendreEnChargeReqTableauDelivrance,
  typeEstDelivrance
} from "../../util/RequetesUtils";
import { getUrlPrecedente, getUrlWithParam } from "../../util/route/routeUtil";
import { storeRece } from "../../util/storeRece";
import { getLibelle } from "../../util/Utils";

export interface INavigationApercuDelivrance {
  isRmcAuto?: boolean;
  url?: string;
}

export function useNavigationApercuDelivrance(
  urlWithoutParam?: string,
  requete?: IRequeteTableauDelivrance
): INavigationApercuDelivrance | undefined {
  const [redirection, setRedirection] = useState<
    INavigationApercuDelivrance | undefined
  >();

  useEffect(() => {
    if (requete && urlWithoutParam) {
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
        redirectionEnFonctionMaRequete(
          requete,
          setRedirection,
          urlWithoutParam
        );
      } else if (
        !requete.idUtilisateur &&
        requete.statut === StatutRequete.PRISE_EN_CHARGE.libelle
      ) {
        // Lors de la prise en charge aléatoire, on doit lancer la RMC
        setRedirection({ isRmcAuto: true });
      } else {
        // Si la requête N'EST PAS dans sa corbeille agent-> redirection vers "Aperçu de requête"
        redirectionApercuRequete(setRedirection, urlWithoutParam, requete);
      }
    }
  }, [urlWithoutParam, requete]);

  return redirection;
}

const redirectionEnFonctionMaRequete = (
  requete: IRequeteTableauDelivrance,
  setRedirection: (
    value: React.SetStateAction<INavigationApercuDelivrance | undefined>
  ) => void,
  urlWithoutParam: string
) => {
  if (estUneRequeteDeDelivranceAvecUnStatut(requete)) {
    switch (requete.statut) {
      case StatutRequete.TRANSFEREE.libelle:
      case StatutRequete.A_TRAITER.libelle:
        // US 210 et au statut "À traiter" ou "Transférée", on lance la "RMC Auto" et redirection suivant le résultat
        redirectionATraiterTransferee(requete, setRedirection, urlWithoutParam);
        break;
      case StatutRequete.PRISE_EN_CHARGE.libelle:
        // US 211 ... et au statut "Prise en charge", on lance la "RMC Auto" et redirection suivant le résultat
        setRedirection({ isRmcAuto: true });
        break;
      case StatutRequete.A_SIGNER.libelle:
      case StatutRequete.A_VALIDER.libelle:
        // US 207 et au statut "À signer" ou "À valider", redirection vers "Aperçu du traitement"
        redirectionAValider(setRedirection, urlWithoutParam, requete);
        break;
      case StatutRequete.BROUILLON.libelle:
        redirectionBrouillon(requete, setRedirection, urlWithoutParam);
        break;
      case StatutRequete.DOUBLON.libelle:
        redirectionRequeteDoublon(setRedirection, urlWithoutParam, requete);
        break;
      default:
        if (
          GestionnaireARetraiterDansSaga.estARetraiterSagaRequeteTableau(
            requete
          )
        ) {
          redirectionVersApercuTraitement(
            setRedirection,
            urlWithoutParam,
            requete
          );
        } else {
          redirectionApercuRequete(setRedirection, urlWithoutParam, requete);
        }
        break;
    }
  }
};

function estUneRequeteDeDelivranceAvecUnStatut(
  requete: IRequeteTableauDelivrance
) {
  return requete.statut && requete.type && typeEstDelivrance(requete.type);
}

function redirectionVersApercuTraitement(
  setRedirection: (
    value: React.SetStateAction<INavigationApercuDelivrance | undefined>
  ) => void,
  urlWithoutParam: string,
  requete: IRequeteTableauDelivrance
) {
  setRedirection({
    url: getUrlWithParam(
      `${urlWithoutParam}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`,
      requete.idRequete
    )
  });
}

function redirectionAValider(
  setRedirection: (
    value: React.SetStateAction<INavigationApercuDelivrance | undefined>
  ) => void,
  urlWithoutParam: string,
  requete: IRequeteTableauDelivrance
) {
  const sousType = requete.sousType;
  if (
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) &&
    (sousType === SousTypeDelivrance.RDDP.libelleCourt ||
      sousType === SousTypeDelivrance.RDD.libelleCourt ||
      sousType === SousTypeDelivrance.RDC.libelleCourt)
  ) {
    setRedirection({
      url: getUrlWithParam(
        `${urlWithoutParam}/${PATH_EDITION}/:idRequete`,
        requete.idRequete
      )
    });
  } else {
    redirectionVersApercuTraitement(setRedirection, urlWithoutParam, requete);
  }
}

function redirectionApercuRequete(
  setRedirection: (
    value: React.SetStateAction<INavigationApercuDelivrance | undefined>
  ) => void,
  urlWithoutParam: string,
  requete: IRequeteTableauDelivrance
) {
  setRedirection({
    url: getUrlWithParam(
      `${urlWithoutParam}/${PATH_APERCU_REQ_DEL}/:idRequete`,
      requete.idRequete
    )
  });
}

function redirectionATraiterTransferee(
  requete: IRequeteTableauDelivrance,
  setRedirection: (
    value: React.SetStateAction<INavigationApercuDelivrance | undefined>
  ) => void,
  urlWithoutParam: string
) {
  if (autorisePrendreEnChargeReqTableauDelivrance(requete)) {
    setRedirection({ isRmcAuto: true });
  } else {
    redirectionApercuRequete(setRedirection, urlWithoutParam, requete);
  }
}

function redirectionBrouillon(
  requete: IRequeteTableauDelivrance,
  setRedirection: (
    value: React.SetStateAction<INavigationApercuDelivrance | undefined>
  ) => void,
  urlWithoutParam: string
) {
  if (
    requete.sousType &&
    requete.sousType === SousTypeDelivrance.RDCSC.libelleCourt
  ) {
    setRedirection({
      url: getUrlWithParam(
        `${urlWithoutParam}/saisircertificatsituation/:idRequete`,
        requete.idRequete
      )
    });
  }
}

function redirectionRequeteDoublon(
  setRedirection: (
    value: React.SetStateAction<INavigationApercuDelivrance | undefined>
  ) => void,
  urlWithoutParam: string,
  requete: IRequeteTableauDelivrance
) {
  setRedirection({
    url: getUrlWithParam(
      `${getUrlPrecedente(urlWithoutParam)}/${PATH_APERCU_REQ_DEL}/:idRequete`,
      requete.idRequete
    )
  });
  messageManager.showSuccessAndClose(
    getLibelle("La requête a bien été enregistrée")
  );
}
