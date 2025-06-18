import { Option } from "@util/Type";
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { TypeRequete } from "./TypeRequete";

export enum EStatutRequete {
  BROUILLON = "Brouillon",
  DOUBLON = "Doublon",
  REJET = "Rejet",
  TRAITEE_AUTO = "Traitée - auto",
  A_TRAITER = "À traiter",
  PRISE_EN_CHARGE = "Prise en charge",
  TRANSFEREE = "Transférée",
  A_VALIDER = "À valider",
  A_SIGNER = "À signer",
  IGNOREE = "Ignorée",
  TRAITE_A_IMPRIMER = "Traitée - A imprimer",
  TRAITE_IMPRIME_LOCAL = "Traitée - Imprimée en local",
  TRAITE_A_DELIVRER_DEMAT = "Traitée - A délivrer Démat",
  TRAITE_IMPRIME = "Traitée - Imprimée",
  TRAITE_DELIVRE_DEMAT = "Traitée - Délivrée Démat",
  TRAITE_A_TRANSMETTRE = "Traitée - A Transmettre",
  TRAITE_TRANSMIS = "Traitée - Transmis",
  TRAITE_REPONDU = "Traitée - Répondue",
  REJET_IMPRESSION = "Traité - Rejet impression",
  TRAITEE_MIS_A_JOUR = "Traitée - Mis à jour",
  PROJET_VALIDE = "Projet validé",
  RETOUR_SDANF = "Retour SDANF",
  EN_ATTENTE = "En attente",
  EN_ATTENTE_JURIDIQUE = "En attente - Juridique",
  EN_ATTENTE_POSTULANT = "En attente - Postulant",
  ALERTE_SDANF = "Alerte SDANF",
  TRANSMISE_A_VALIDEUR = "Transmise à valideur",
  EN_TRAITEMENT = "En traitement",
  A_REVOIR = "À revoir",
  TRAITE = "Traité",
  BI_VALIDE = "BI validé",
  BI_A_ENVOYER = "BI à envoyer",
  ABANDONNEE = "Abandonnée"
}

export class StatutRequete extends EnumWithComplete {
  public static readonly BROUILLON = new StatutRequete("BROUILLON", "Brouillon");
  public static readonly DOUBLON = new StatutRequete("DOUBLON", "Doublon");
  public static readonly REJET = new StatutRequete("REJET", "Rejet");
  public static readonly TRAITEE_AUTO = new StatutRequete("TRAITEE_AUTO", "Traitée - auto");
  public static readonly A_TRAITER = new StatutRequete("A_TRAITER", "À traiter");
  public static readonly PRISE_EN_CHARGE = new StatutRequete("PRISE_EN_CHARGE", "Prise en charge");
  public static readonly TRANSFEREE = new StatutRequete("TRANSFEREE", "Transférée");
  public static readonly A_VALIDER = new StatutRequete("A_VALIDER", "À valider");
  public static readonly A_SIGNER = new StatutRequete("A_SIGNER", "À signer");
  public static readonly IGNOREE = new StatutRequete("IGNOREE", "Ignorée");
  public static readonly TRAITE_A_IMPRIMER = new StatutRequete("TRAITE_A_IMPRIMER", "Traitée - A imprimer");
  public static readonly TRAITE_IMPRIME_LOCAL = new StatutRequete("TRAITE_IMPRIME_LOCAL", "Traitée - Imprimée en local");
  public static readonly TRAITE_A_DELIVRER_DEMAT = new StatutRequete("TRAITE_A_DELIVRER_DEMAT", "Traitée - A délivrer Démat");
  public static readonly TRAITE_IMPRIME = new StatutRequete("TRAITE_IMPRIME", "Traitée - Imprimée");
  public static readonly TRAITE_DELIVRE_DEMAT = new StatutRequete("TRAITE_DELIVRE_DEMAT", "Traitée - Délivrée Démat");
  public static readonly TRAITE_A_TRANSMETTRE = new StatutRequete("TRAITE_A_TRANSMETTRE", "Traitée - A Transmettre");
  public static readonly TRAITE_TRANSMIS = new StatutRequete("TRAITE_TRANSMIS", "Traitée - Transmis");
  public static readonly TRAITE_REPONDU = new StatutRequete("TRAITE_REPONDU", "Traitée - Répondue");
  public static readonly REJET_IMPRESSION = new StatutRequete("REJET_IMPRESSION", "Traité - Rejet impression");
  public static readonly TRAITEE_MIS_A_JOUR = new StatutRequete("TRAITEE_MIS_A_JOUR", "Traitée - Mis à jour");
  public static readonly PROJET_VALIDE = new StatutRequete("PROJET_VALIDE", "Projet validé");
  public static readonly RETOUR_SDANF = new StatutRequete("RETOUR_SDANF", "Retour SDANF");
  public static readonly EN_ATTENTE = new StatutRequete("EN_ATTENTE", "En attente");
  public static readonly EN_ATTENTE_JURIDIQUE = new StatutRequete("EN_ATTENTE_JURIDIQUE", "En attente - Juridique");
  public static readonly EN_ATTENTE_POSTULANT = new StatutRequete("EN_ATTENTE_POSTULANT", "En attente - Postulant");
  public static readonly ALERTE_SDANF = new StatutRequete("ALERTE_SDANF", "Alerte SDANF");
  public static readonly TRANSMISE_A_VALIDEUR = new StatutRequete("TRANSMISE_A_VALIDEUR", "Transmise à valideur");
  public static readonly EN_TRAITEMENT = new StatutRequete("EN_TRAITEMENT", "En traitement");
  public static readonly A_REVOIR = new StatutRequete("A_REVOIR", "À revoir");
  public static readonly TRAITE = new StatutRequete("TRAITE", "Traité");
  public static readonly BI_VALIDE = new StatutRequete("BI_VALIDE", "BI validé");
  public static readonly BI_A_ENVOYER = new StatutRequete("BI_A_ENVOYER", "BI à envoyer");
  public static readonly ABANDONNEE = new StatutRequete("ABANDONNEE", "Abandonnée");

  private static readonly StatutsPourTypeRequeteDelivrance = [
    StatutRequete.BROUILLON,
    StatutRequete.DOUBLON,
    StatutRequete.A_TRAITER,
    StatutRequete.PRISE_EN_CHARGE,
    StatutRequete.TRANSFEREE,
    StatutRequete.A_VALIDER,
    StatutRequete.IGNOREE,
    StatutRequete.A_SIGNER,
    StatutRequete.TRAITE_A_IMPRIMER,
    StatutRequete.TRAITE_IMPRIME,
    StatutRequete.TRAITE_A_DELIVRER_DEMAT,
    StatutRequete.TRAITE_DELIVRE_DEMAT,
    StatutRequete.TRAITE_REPONDU,
    StatutRequete.REJET_IMPRESSION,
    StatutRequete.TRAITE_IMPRIME_LOCAL,
    StatutRequete.REJET,
    StatutRequete.TRANSMISE_A_VALIDEUR,
    StatutRequete.A_REVOIR
  ];
  private static readonly StatutsPourTypeRequeteInformation = [
    StatutRequete.TRAITEE_AUTO,
    StatutRequete.A_TRAITER,
    StatutRequete.PRISE_EN_CHARGE,
    StatutRequete.TRANSFEREE,
    StatutRequete.TRAITE_REPONDU
  ];
  private static readonly StatutsPourTypeRequeteMiseAJour = StatutRequete.StatutsPourTypeRequeteDelivrance;
  private static readonly StatutsPourTypeRequeteCreation = [
    StatutRequete.A_TRAITER,
    StatutRequete.PRISE_EN_CHARGE,
    StatutRequete.RETOUR_SDANF,
    StatutRequete.PROJET_VALIDE,
    StatutRequete.A_SIGNER,
    StatutRequete.TRAITE,
    StatutRequete.EN_TRAITEMENT,
    StatutRequete.BI_A_ENVOYER,
    StatutRequete.BI_VALIDE
  ];

  private static readonly StatutsParTypeRequete = {
    [TypeRequete.getKey(TypeRequete.DELIVRANCE)]: StatutRequete.StatutsPourTypeRequeteDelivrance,
    [TypeRequete.getKey(TypeRequete.INFORMATION)]: StatutRequete.StatutsPourTypeRequeteInformation,
    [TypeRequete.getKey(TypeRequete.MISE_A_JOUR)]: StatutRequete.StatutsPourTypeRequeteMiseAJour,
    [TypeRequete.getKey(TypeRequete.CREATION)]: StatutRequete.StatutsPourTypeRequeteCreation
  };

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, StatutRequete);
  }

  public static getAllEnumsAsOptions(): Option[] {
    return EnumWithLibelle.getAllLibellesAsOptions(StatutRequete);
  }

  public static getKey(obj: StatutRequete) {
    return EnumWithLibelle.getKey(StatutRequete, obj);
  }

  public static getEnumFromLibelle(libelle?: string) {
    return EnumWithLibelle.getEnumFromLibelle(StatutRequete, libelle);
  }

  public static estATraiter(statut?: StatutRequete): boolean {
    return statut === StatutRequete.A_TRAITER;
  }

  public static estATransferer(statut?: StatutRequete): boolean {
    return statut === StatutRequete.TRANSFEREE;
  }

  public static estATraiterOuTransferee(statut?: StatutRequete): boolean {
    return StatutRequete.estATraiter(statut) || StatutRequete.estATransferer(statut);
  }

  public static estPriseEnCharge(statut?: StatutRequete): boolean {
    return statut === StatutRequete.PRISE_EN_CHARGE;
  }

  public static estBrouillon(statut?: StatutRequete): boolean {
    return statut === StatutRequete.BROUILLON;
  }

  public static estAValider(statut?: StatutRequete): boolean {
    return statut === StatutRequete.A_VALIDER;
  }

  public static estEnTraitement(statut?: StatutRequete): boolean {
    return statut === StatutRequete.EN_TRAITEMENT;
  }

  public static estTransmiseAValideur(statut?: StatutRequete): boolean {
    return statut === StatutRequete.TRANSMISE_A_VALIDEUR;
  }

  public static estASigner(statut?: StatutRequete): boolean {
    return statut === StatutRequete.A_SIGNER;
  }

  public static estASignerOuAValider(statut?: StatutRequete): boolean {
    return StatutRequete.estASigner(statut) || StatutRequete.estAValider(statut);
  }

  public static estATraiteADelivrerDemat(statut?: StatutRequete): boolean {
    return statut === StatutRequete.TRAITE_A_DELIVRER_DEMAT;
  }

  public static estAuStatutTraiteADelivrerDematOuASigner(statut?: StatutRequete) {
    return StatutRequete.estATraiteADelivrerDemat(statut) || StatutRequete.estASigner(statut);
  }

  public static estAuStatutTraiteAImprimer(statut?: StatutRequete) {
    return statut === StatutRequete.TRAITE_A_IMPRIMER;
  }

  public static getStatutsMesRequetes() {
    return [
      StatutRequete.BROUILLON.nom,
      StatutRequete.PRISE_EN_CHARGE.nom,
      StatutRequete.TRANSFEREE.nom,
      StatutRequete.A_SIGNER.nom,
      StatutRequete.A_VALIDER.nom,
      StatutRequete.TRAITE_REPONDU.nom,
      StatutRequete.A_REVOIR.nom,
      StatutRequete.TRANSMISE_A_VALIDEUR.nom
    ];
  }

  public static getStatutsRequetesService() {
    const statuts = StatutRequete.getStatutsMesRequetes();
    // A_TRAITER est ramené par le back si FF_DELIVRANCE_EXTRAITS_COPIES n'est pas positionné (étape 1)
    if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)) {
      statuts.push(StatutRequete.A_TRAITER.nom);
    }

    return statuts;
  }

  public static getOptionsAPartirTypeRequete(typeRequete: TypeRequete): Option[] {
    return StatutRequete.StatutsParTypeRequete[TypeRequete.getKey(typeRequete)]
      .map(
        statut =>
          ({
            cle: StatutRequete.getKey(statut),
            libelle: statut.libelle
          }) as Option
      )
      .sort((option1, option2) => option1.libelle.localeCompare(option2.libelle));
  }
}
