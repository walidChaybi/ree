/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { Options } from "@util/Type";

export class SousTypeDelivrance extends EnumWithComplete {
  public static readonly RDD = new SousTypeDelivrance("RDD", "Délivrance Extrait/Copie dématérialisée", "Délivrance E/C (d)");
  public static readonly RDC = new SousTypeDelivrance("RDC", "Délivrance Extrait/Copie courrier", "Délivrance E/C (c)");
  public static readonly RDCSD = new SousTypeDelivrance(
    "RDCSD",
    "Délivrance Certificat & Attestation RC/RCA/PACS dématérialisé",
    "Délivrance C&A (d)"
  );
  public static readonly RDCSC = new SousTypeDelivrance(
    "RDCSC",
    "Délivrance Certificat & Attestation RC/RCA/PACS courrier",
    "Délivrance C&A (c)"
  );
  public static readonly RDDP = new SousTypeDelivrance("RDDP", "Délivrance Planète", "Délivrance Planète");
  public static readonly RDDCO = new SousTypeDelivrance("RDDCO", "Délivrance Comedec", "Délivrance Comedec");
  public static readonly RDLFC = new SousTypeDelivrance("RDLFC", "Délivrance Livret de famille courrier", "Délivrance LF (c)");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, SousTypeDelivrance);
  }

  public static getEnumFromLibelleCourt(str: string) {
    return EnumWithComplete.getEnumFromLibelleCourt(SousTypeDelivrance, str);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(SousTypeDelivrance);
  }

  public static getAllNomsAsOptions(): Options {
    return EnumWithComplete.getAllNomsAsOptions(SousTypeDelivrance);
  }

  public static getAllLibellesCourtAsOptions(): Options {
    return EnumWithComplete.getAllLibellesCourtAsOptions(SousTypeDelivrance);
  }

  public static estRDD(sousType?: SousTypeDelivrance): boolean {
    return sousType === SousTypeDelivrance.RDD;
  }

  public static estRDC(sousType?: SousTypeDelivrance): boolean {
    return sousType === SousTypeDelivrance.RDC;
  }

  public static estRDCSC(sousType?: SousTypeDelivrance): boolean {
    return sousType === SousTypeDelivrance.RDCSC;
  }

  public static estRDDP(sousType?: SousTypeDelivrance): boolean {
    return sousType === SousTypeDelivrance.RDDP;
  }

  public static estPlanete(sousType?: SousTypeDelivrance): boolean {
    return SousTypeDelivrance.estRDDP(sousType);
  }

  public static estRDDouRDDP(sousType?: SousTypeDelivrance): boolean {
    return SousTypeDelivrance.estRDD(sousType) || SousTypeDelivrance.estRDDP(sousType);
  }

  public static estRDDouRDCouRDDP(sousType?: SousTypeDelivrance): boolean {
    return SousTypeDelivrance.estRDDouRDDP(sousType) || SousTypeDelivrance.estRDC(sousType);
  }

  public static estRDCSDouRDCSC(sousType?: SousTypeDelivrance): boolean {
    return sousType === SousTypeDelivrance.RDCSD || SousTypeDelivrance.estRDCSC(sousType);
  }

  public static estRDCouRDCSC(sousType?: SousTypeDelivrance): boolean {
    return SousTypeDelivrance.estRDC(sousType) || SousTypeDelivrance.estRDCSC(sousType);
  }

  public static estPossibleAPrendreEnCharge(sousType?: SousTypeDelivrance): boolean {
    return (
      (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES) && SousTypeDelivrance.estRDDouRDCouRDDP(sousType)) ||
      (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATION) && SousTypeDelivrance.estRDCSDouRDCSC(sousType))
    );
  }

  public static estSousTypeCreationCourrierAutomatique(type: SousTypeDelivrance): boolean {
    return SousTypeDelivrance.estRDDouRDDP(type);
  }

  public static estSousTypeSignable(type?: SousTypeDelivrance): boolean {
    return SousTypeDelivrance.estRDD(type);
  }
}
