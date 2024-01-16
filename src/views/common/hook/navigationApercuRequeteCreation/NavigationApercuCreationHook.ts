import { mAppartient } from "@model/agent/IOfficier";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE,
  PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER,
  PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE,
  PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET,
  PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE
} from "@router/ReceUrls";
import {
  getUrlCourante,
  getUrlPrecedente,
  getUrlWithParam,
  isLastPathElemIsId
} from "@util/route/UrlUtil";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export type NavigationApercuReqCreationParams = {
  idRequete: string;
  sousType?: SousTypeCreation;
  statut?: StatutRequete;
  idUtilisateur?: string;
  handleTraitementTermine?: () => void;
};

export function useNavigationApercuCreation(
  props?: NavigationApercuReqCreationParams
) {
  const history = useHistory();

  useEffect(() => {
    if (props) {
      if (SousTypeCreation.estRCEXR(props.sousType)) {
        redirectionEtablissement(
          history,
          props.idRequete,
          props.statut,
          props.idUtilisateur
        );
      } else if (SousTypeCreation.estSousTypeTranscription(props.sousType)) {
        redirectionTranscription(
          history,
          props.idRequete,
          props.statut,
          props.idUtilisateur
        );
      }

      if (props.handleTraitementTermine) {
        props.handleTraitementTermine();
      }
    }
  }, [props, history]);
}

function redirectionEtablissement(
  history: any,
  idRequete: string,
  statut?: StatutRequete,
  idUtilisateur?: string
) {
  let path: string;
  if (
    mAppartient(idUtilisateur) &&
    (StatutRequete.estATraiter(statut) ||
      StatutRequete.estPriseEnCharge(statut))
  ) {
    path = PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER;
  } else {
    path = PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE;
  }
  history.push(getUrlEtablissement(history, path, idRequete));
}

function redirectionTranscription(
  history: any,
  idRequete: string,
  statut?: StatutRequete,
  idUtilisateur?: string
) {
  let path: string;
  if (!mAppartient(idUtilisateur) && StatutRequete.estATraiter(statut)) {
    path = PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE;
  } else if (
    mAppartient(idUtilisateur) &&
    StatutRequete.estPriseEnCharge(statut)
  ) {
    path = PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE;
  } else if (
    mAppartient(idUtilisateur) &&
    StatutRequete.estEnTraitement(statut)
  ) {
    path = PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET;
  } else {
    path = PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE;
  }

  history.push(
    getUrlWithParam(`${getUrlCourante(history)}/${path}/:idRequete`, idRequete)
  );
}

function getUrlEtablissement(history: any, path: string, idRequete: string) {
  let baseUrl;
  const urlCourante = getUrlCourante(history);
  if (isLastPathElemIsId(urlCourante)) {
    baseUrl = getUrlPrecedente(urlCourante);
  } else {
    baseUrl = urlCourante;
  }
  return getUrlWithParam(`${baseUrl}/${path}/:idRequete`, idRequete);
}