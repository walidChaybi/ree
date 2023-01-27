import { mAppartient } from "@model/agent/IOfficier";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  PATH_APERCU_REQ_CREATION_ETABLISSEMENT,
  PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE,
  PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET,
  PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE,
  receUrl
} from "@router/ReceUrls";
import { getUrlWithParam } from "@util/route/routeUtil";
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
        redirectionEtablissement(history, props.idRequete);
      } else {
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

function redirectionEtablissement(history: any, idRequete: string) {
  history.push(
    getUrlWithParam(
      `${receUrl.getUrlCourante(
        history
      )}/${PATH_APERCU_REQ_CREATION_ETABLISSEMENT}/:idRequete`,
      idRequete
    )
  );
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
    getUrlWithParam(
      `${receUrl.getUrlCourante(history)}/${path}/:idRequete`,
      idRequete
    )
  );
}
