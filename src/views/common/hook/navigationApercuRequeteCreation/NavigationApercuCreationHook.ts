import { RECEContextData } from "@core/contexts/RECEContext";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { useContext, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import LiensRECE from "../../../../router/LiensRECE";
import {
  INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE,
  INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET
} from "../../../../router/infoPages/InfoPagesEspaceConsulaire";
import {
  INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_CONSULTATION,
  INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER
} from "../../../../router/infoPages/InfoPagesEspaceEtablissement";

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
    path = LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER.url, { idRequeteParam: idRequete });
  } else {
    path = LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_CONSULTATION.url, { idRequeteParam: idRequete });
  }
  navigate(path);
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
  if (appartientAUtilisateurConnecte && (statut === "EN_TRAITEMENT" || statut === "A_SIGNER")) {
    path = LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET.url, { idRequeteParam: idRequete });
  } else {
    path = LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE.url, { idRequeteParam: idRequete });
  }
  navigate(path);
}
