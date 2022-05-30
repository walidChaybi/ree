// ID          | Fonction                                                 |  Statut | Date peremption
// ------------|----------------------------------------------------------|---------|-------------------------------------------------
// ETAPE2_BIS  | Conditionne les features de l'étape2 Release 3, 4,5 et 6 | ACTIF   | Lorsque les Release 3, 4, 5 et 6 de l'étape 2 seront terminées
// LOG_SERVEUR | Conditionne l'envoi des logs au serveur                  | INACTIF | Lorsque l'étape 1 sera terminée

export enum FeatureFlag {
  ETAPE2_BIS = "ETAPE2_BIS",
  LOG_SERVEUR = "LOG_SERVEUR"
}
