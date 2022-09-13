/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { Options } from "@util/Type";

export class StatutRequete extends EnumWithComplete {
  public static readonly BROUILLON = new StatutRequete(
    "BROUILLON",
    "Brouillon"
  );
  public static readonly DOUBLON = new StatutRequete("DOUBLON", "Doublon");
  public static readonly REJET = new StatutRequete("REJET", "Rejet");
  public static readonly A_TRAITER = new StatutRequete(
    "A_TRAITER",
    "À traiter"
  );
  public static readonly PRISE_EN_CHARGE = new StatutRequete(
    "PRISE_EN_CHARGE",
    "Prise en charge"
  );
  public static readonly TRANSFEREE = new StatutRequete(
    "TRANSFEREE",
    "Transférée"
  );
  public static readonly A_VALIDER = new StatutRequete(
    "A_VALIDER",
    "À valider"
  );
  public static readonly A_SIGNER = new StatutRequete("A_SIGNER", "À signer");
  public static readonly IGNOREE = new StatutRequete("IGNOREE", "Ignorée");
  public static readonly TRAITE_A_IMPRIMER = new StatutRequete(
    "TRAITE_A_IMPRIMER",
    "Traitée - A imprimer"
  );
  public static readonly TRAITE_A_DELIVRER_DEMAT = new StatutRequete(
    "TRAITE_A_DELIVRER_DEMAT",
    "Traitée - A délivrer Démat"
  );
  public static readonly TRAITE_IMPRIME = new StatutRequete(
    "TRAITE_IMPRIME",
    "Traitée - Imprimée"
  );
  public static readonly TRAITE_DELIVRE_DEMAT = new StatutRequete(
    "TRAITE_DELIVRE_DEMAT",
    "Traitée - Délivrée Démat"
  );
  public static readonly TRAITE_REPONDU = new StatutRequete(
    "TRAITE_REPONDU",
    "Traitée - Répondue"
  );
  public static readonly REJET_IMPRESSION = new StatutRequete(
    "REJET_IMPRESSION",
    "Traité - Rejet impression"
  );
  // Statut création
  public static readonly PROJET_VALIDE = new StatutRequete(
    "PROJET_VALIDE",
    "Projet validé"
  );
  public static readonly RETOUR_SDANF = new StatutRequete(
    "RETOUR_SDANF",
    "Retour SDANF"
  );
  public static readonly EN_ATTENTE = new StatutRequete(
    "EN_ATTENTE",
    "En attente"
  );
  public static readonly EN_ATTENTE_JURIDIQUE = new StatutRequete(
    "EN_ATTENTE_JURIDIQUE",
    "En attente - Juridique"
  );
  public static readonly EN_ATTENTE_POSTULANT = new StatutRequete(
    "EN_ATTENTE_POSTULANT",
    "En attente - Postulant"
  );
  public static readonly ALERTE_SDANF = new StatutRequete(
    "ALERTE_SDANF",
    "Alerte SDANF"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, StatutRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(StatutRequete);
  }

  public static getKey(obj: StatutRequete) {
    return EnumWithLibelle.getKey(StatutRequete, obj);
  }

  public static getEnumFromLibelle(libelle?: string) {
    return EnumWithLibelle.getEnumFromLibelle(StatutRequete, libelle);
  }

  public static estAuStatutTraiteADelivrerDematOuASigner(
    statut?: StatutRequete
  ) {
    return (
      statut === StatutRequete.TRAITE_A_DELIVRER_DEMAT ||
      statut === StatutRequete.A_SIGNER
    );
  }

  public static estAuStatutTraiteAImprimer(statut?: StatutRequete) {
    return statut === StatutRequete.TRAITE_A_IMPRIMER;
  }

  public static estAuStatutATraiterOuTransferee(statut?: StatutRequete) {
    return (
      statut === StatutRequete.A_TRAITER || statut === StatutRequete.TRANSFEREE
    );
  }

  public static getStatutsMesRequetes() {
    return [
      StatutRequete.BROUILLON.nom,
      StatutRequete.PRISE_EN_CHARGE.nom,
      StatutRequete.TRANSFEREE.nom,
      StatutRequete.A_SIGNER.nom,
      StatutRequete.A_VALIDER.nom,
      StatutRequete.TRAITE_REPONDU.nom
    ];
  }

  public static getStatutsRequetesService() {
    const statuts = StatutRequete.getStatutsMesRequetes();
    // A_TRAITER est ramené par le back si FF_DELIV_EC_PAC n'est pas positionné (étape 1)
    if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)) {
      statuts.push(StatutRequete.A_TRAITER.nom);
    }

    return statuts;
  }
}
