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
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export type NavigationApercuReqCreationParams = {
  idRequete: string;
  sousType?: SousTypeCreation;
  statut?: StatutRequete;
  idUtilisateur?: string;
  handleTraitementTermine?: () => void;
};

export function useNavigationApercuCreation(
  params?: NavigationApercuReqCreationParams
) {
  const navigate = useNavigate();

  useEffect(() => {
    if (params) {
      if (SousTypeCreation.estRCEXR(params.sousType)) {
        redirectionEtablissement(
          navigate,
          params.idRequete,
          params.statut,
          params.idUtilisateur
        );
      } else if (SousTypeCreation.estSousTypeTranscription(params.sousType)) {
        redirectionTranscription(
          navigate,
          params.idRequete,
          params.statut,
          params.idUtilisateur
        );
      }

      if (params.handleTraitementTermine) {
        params.handleTraitementTermine();
      }
    }
  }, [params, navigate]);
}

function redirectionEtablissement(
  navigate: NavigateFunction,
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
  navigate(`${path}/${idRequete}`);
}

function redirectionTranscription(
  navigate: NavigateFunction,
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
  navigate(`${path}/${idRequete}`);
}