import { RECEContextData } from "@core/contexts/RECEContext";
import { IOfficier, appartientAUtilisateurConnecte } from "@model/agent/IOfficier";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE,
  PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER,
  PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE,
  PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET,
  PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE,
  URL_MES_REQUETES_CONSULAIRE
} from "@router/ReceUrls";
import { useContext, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router";

export type NavigationApercuReqCreationParams = {
  idRequete: string;
  sousType?: SousTypeCreation;
  statut: StatutRequete;
  idUtilisateur?: string;
  handleTraitementTermine?: () => void;
};

export function useNavigationApercuCreation(params?: NavigationApercuReqCreationParams) {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  useEffect(() => {
    if (params) {
      if (SousTypeCreation.estRCEXR(params.sousType)) {
        redirectionEtablissement(navigate, utilisateurConnecte, params.idRequete, params.statut, params.idUtilisateur);
      } else if (SousTypeCreation.estSousTypeTranscription(params.sousType)) {
        redirectionTranscription(navigate, utilisateurConnecte, params.idRequete, params.statut, params.idUtilisateur);
      }

      if (params.handleTraitementTermine) {
        params.handleTraitementTermine();
      }
    }
  }, [params, navigate]);
}

function redirectionEtablissement(
  navigate: NavigateFunction,
  utilisateurConnecte: IOfficier,
  idRequete: string,
  statut: StatutRequete,
  idUtilisateur?: string
) {
  let path: string;
  const statutsQuiRedirigentVersLeSuiviDossier = [
    StatutRequete.A_TRAITER,
    StatutRequete.PRISE_EN_CHARGE,
    StatutRequete.RETOUR_SDANF,
    StatutRequete.BI_VALIDE,
    StatutRequete.PROJET_VALIDE,
    StatutRequete.A_SIGNER
  ];
  if (appartientAUtilisateurConnecte(utilisateurConnecte, idUtilisateur) && statutsQuiRedirigentVersLeSuiviDossier.includes(statut)) {
    path = PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER;
  } else {
    path = PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE;
  }
  navigate(`${path}/${idRequete}`);
}

function redirectionTranscription(
  navigate: NavigateFunction,
  utilisateurConnecte: IOfficier,
  idRequete: string,
  statut?: StatutRequete,
  idUtilisateur?: string
) {
  let path: string;
  if (!appartientAUtilisateurConnecte(utilisateurConnecte, idUtilisateur) && StatutRequete.estATraiter(statut)) {
    path = PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE;
  } else if (appartientAUtilisateurConnecte(utilisateurConnecte, idUtilisateur) && StatutRequete.estPriseEnCharge(statut)) {
    path = PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE;
  } else if (appartientAUtilisateurConnecte(utilisateurConnecte, idUtilisateur) && StatutRequete.estEnTraitement(statut)) {
    path = PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET;
  } else {
    path = PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE;
  }
  navigate(`${URL_MES_REQUETES_CONSULAIRE}/${path}/${idRequete}`);
}
