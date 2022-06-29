// ID          | Fonction                                                 |  Statut | Date peremption
// ------------|----------------------------------------------------------|---------|-------------------------------------------------
// ETAPE2_BIS  | Conditionne les features de l'étape2 Release 3, 4,5 et 6 | ACTIF   | Lorsque les Release 3, 4, 5 et 6 de l'étape 2 seront terminées
// LOG_SERVEUR | Conditionne l'envoi des logs au serveur                  | ACTIF   | Après MES
// FF_CONSULT_ACTE_RQT | Conditionne RMC Acte/Inscription et requete      | ACTIF   | Après MES RMC dans RECE
// FF_DELIV_CS | Conditionne Certificat situation                         | ACTIF   | Après MES Délivrance CS dans RECE
// FF_RQT_INFORMATION | Conditionne information usager                    | ACTIF   | Après MES Espace info usager dans RECE
// FF_DELIV_EC_PAC | Conditionne la délivrance E/C et Attestation PACS    | ACTIF   | Après MES Délivrance E/C et PACS dans RECE
// FF_NATALI | Conditionne l'espace creation                              | ACTIF   | Après MES Espace créaton dans RECE

export enum FeatureFlag {
  LOG_SERVEUR = "LOG_SERVEUR",
  FF_CONSULT_ACTE_RQT = "FF_CONSULT_ACTE_RQT",
  FF_DELIV_CS = "FF_DELIV_CS",
  FF_RQT_INFORMATION = "FF_RQT_INFORMATION",
  FF_DELIV_EC_PAC = "FF_DELIV_EC_PAC",
  FF_NATALI = "FF_NATALI"
}
