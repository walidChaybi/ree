import { RECEContextData } from "@core/contexts/RECEContext";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
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
  sousType?: keyof typeof ESousTypeCreation;
  statut: keyof typeof EStatutRequete;
  idUtilisateur?: string;
  handleTraitementTermine?: () => void;
};

export function useNavigationApercuCreation(params?: NavigationApercuReqCreationParams) {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  useEffect(() => {
    if (params) {
      if (params.sousType === "RCEXR") {
        redirectionEtablissement(navigate, utilisateurConnecte, params.idRequete, params.statut, params.idUtilisateur);
      } else if (params.sousType && ["RCTD", "RCTC"].includes(params.sousType)) {
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
  utilisateurConnecte: UtilisateurConnecte,
  idRequete: string,
  statut: keyof typeof EStatutRequete,
  idUtilisateur?: string
) {
  let path: string;
  const statutsQuiRedirigentVersLeSuiviDossier: (keyof typeof EStatutRequete)[] = [
    "A_TRAITER",
    "PRISE_EN_CHARGE",
    "RETOUR_SDANF",
    "BI_VALIDE",
    "PROJET_VALIDE",
    "A_SIGNER"
  ];
  if (utilisateurConnecte.id === idUtilisateur && statutsQuiRedirigentVersLeSuiviDossier.includes(statut)) {
    path = PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER;
  } else {
    path = PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE;
  }
  navigate(`${path}/${idRequete}`);
}

function redirectionTranscription(
  navigate: NavigateFunction,
  utilisateurConnecte: UtilisateurConnecte,
  idRequete: string,
  statut?: keyof typeof EStatutRequete,
  idUtilisateur?: string
) {
  let path: string;
  const appartientAUtilisateurConnecte = utilisateurConnecte.id === idUtilisateur;
  if (!appartientAUtilisateurConnecte && statut === "A_TRAITER") {
    path = PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE;
  } else if (appartientAUtilisateurConnecte && statut === "PRISE_EN_CHARGE") {
    path = PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE;
  } else if (appartientAUtilisateurConnecte && statut === "EN_TRAITEMENT") {
    path = PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET;
  } else {
    path = PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE;
  }
  navigate(`${URL_MES_REQUETES_CONSULAIRE}/${path}/${idRequete}`);
}
