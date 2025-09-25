Feature: Délivrance Extrait-Copie

@RRECE-4902
Scenario: [RRECE-4902] DELI_Req déli mon service_prendre en charge une requête à traiter
    Given Je suis connecté avec un compte utilisateur ayant le profil delivrance sur le site RECE
    When J'accède aux requêtes de délivrance de mon service
    Then La page "Les requêtes de délivrance de mon service" s'affiche
    Then L'onglet "Les requêtes de délivrance de mon service" est sélectionné
    When Je filtre les requêtes "Délivrance Extrait/Copie dématérialisée" au statut "À traiter"
    Then La restitution des requêtes de délivrance de mon service correspond aux filtres
    When Je clique sur la requête "89acf6d3-f836-4f09-83f9-5708c04c6eb9"
    Then La page "Aperçu requête de délivrance" s'affiche
    Then La page "Aperçu requête de délivrance" de la requête "Délivrance Extrait/Copie dématérialisé" au statut "À traiter" est conforme
    When Je prends en charge la requête
    Then La page "Aperçu requête de délivrance prise en charge" s'affiche
    Then La page "Aperçu requête de délivrance prise en charge" de la requête "Délivrance Extrait/Copie dématérialisé" au statut "Prise en charge" est conforme
    When Je retourne sur la page "Les requêtes de délivrance de mon service"
    Then La page "Les requêtes de délivrance de mon service" s'affiche
    Then La requête est au statut "Prise en charge"
