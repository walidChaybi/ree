// ID                                 | Fonction                                          | Statut  | Date peremption
// -----------------------------------|---------------------------------------------------|---------|-------------------------------------------------
// FF_LOG_SERVEUR                     | Conditionne l'envoi des logs au serveur           | ACTIF   | Après MES
// FF_CONSULT_ACTE_RQT                | Conditionne RMC Acte/Inscription et requete       | ACTIF   | Après MES RMC dans RECE
// FF_DELIV_CS                        | Conditionne Certificat situation                  | ACTIF   | Après MES Délivrance CS dans RECE
// FF_RQT_INFORMATION                 | Conditionne information usager                    | ACTIF   | Après MES Espace info usager dans RECE
// FF_DELIVRANCE_EXTRAITS_COPIES      | Conditionne la délivrance E/C et Attestation PACS | ACTIF   | Après MES Délivrance E/C et PACS dans RECE
// FF_RETOUR_SDANF                    | Conditionne l'affichage des actions retour SDANF  | ACTIF   | Après reprise des retours SDANF

export enum FeatureFlag {
  FF_LOG_SERVEUR = "FF_LOG_SERVEUR",
  FF_CONSULT_ACTE_RQT = "FF_CONSULT_ACTE_RQT",
  FF_DELIV_CS = "FF_DELIV_CS",
  FF_RQT_INFORMATION = "FF_RQT_INFORMATION",
  FF_DELIVRANCE_EXTRAITS_COPIES = "FF_DELIVRANCE_EXTRAITS_COPIES",
  FF_RETOUR_SDANF = "FF_RETOUR_SDANF",
  FF_INTEGRATION_CIBLE_REQUETE_NATURALISATION = "FF_INTEGRATION_CIBLE_REQUETE_NATURALISATION",
  FF_SIGNER_ACTE_ETABLISSEMENT = "FF_SIGNER_ACTE_ETABLISSEMENT",
  FF_AFFICHAGE_NOUVELLE_PAGE_DELIVRANCE = "FF_AFFICHAGE_NOUVELLE_PAGE_DELIVRANCE",
  FF_AIDE_A_LA_SAISIE_MENTION = "FF_AIDE_A_LA_SAISIE_MENTION"
}
