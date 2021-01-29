// ID          | Fonction                                |  Statut | Date peremption
// ------------|-----------------------------------------|---------|-------------------
// ETAPE2      | Conditionne les features de l'étape2    | INACTIF | Lorsque l'étape 1 sera terminée
// LOG_SERVEUR | Conditionne l'envoi des logs au serveur | INACTIF | Lorsque l'étape 1 sera terminée

export enum FeatureFlag {
  ETAPE2 = "ETAPE2",
  LOG_SERVEUR = "LOG_SERVEUR"
}
