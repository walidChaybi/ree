/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { FeatureFlag } from "../../../views/common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../views/common/util/featureFlag/gestionnaireFeatureFlag";
import { Options } from "../../../views/common/util/Type";

export class SousTypeDelivrance extends EnumWithComplete {
  public static readonly RDD = new SousTypeDelivrance(
    "RDD",
    "Délivrance Extrait/Copie dématérialisée",
    "Délivrance E/C (d)"
  );
  public static readonly RDC = new SousTypeDelivrance(
    "RDC",
    "Délivrance Extrait/Copie courrier",
    "Délivrance E/C (c)"
  );
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
  public static readonly RDDP = new SousTypeDelivrance(
    "RDDP",
    "Délivrance Planète",
    "Délivrance Planète"
  );
  public static readonly RDDCO = new SousTypeDelivrance(
    "RDDCO",
    "Délivrance Comedec",
    "Délivrance Comedec"
  );
  public static readonly RDLFC = new SousTypeDelivrance(
    "RDLFC",
    "Délivrance Livret de famille courrier",
    "Délivrance LF (c)"
  );

  public static estSousTypeCertificatSituation(sousType: SousTypeDelivrance) {
    return (
      sousType === SousTypeDelivrance.RDCSC ||
      sousType === SousTypeDelivrance.RDCSD
    );
  }

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

  public static estPlanete(sousType?: SousTypeDelivrance): boolean {
    return sousType === SousTypeDelivrance.RDDP;
  }

  public static soustypeRDD(sousType?: SousTypeDelivrance): boolean {
    return sousType === SousTypeDelivrance.RDD;
  }

  public static estRDC(sousType?: SousTypeDelivrance): boolean {
    return sousType === SousTypeDelivrance.RDC;
  }

  public static estRDDP(sousType?: SousTypeDelivrance): boolean {
    return sousType === SousTypeDelivrance.RDDP;
  }

  public static estRDDouRDC(sousType?: SousTypeDelivrance): boolean {
    return (
      SousTypeDelivrance.soustypeRDD(sousType) ||
      SousTypeDelivrance.estRDC(sousType)
    );
  }

  public static estRDDouRDCouRDDP(sousType?: SousTypeDelivrance): boolean {
    return (
      SousTypeDelivrance.soustypeRDD(sousType) ||
      SousTypeDelivrance.estRDC(sousType) ||
      SousTypeDelivrance.estRDDP(sousType)
    );
  }

  public static estRDCSDouRDCSC(sousType?: SousTypeDelivrance): boolean {
    return (
      sousType === SousTypeDelivrance.RDCSD ||
      sousType === SousTypeDelivrance.RDCSC
    );
  }

  public static possibleAPrendreEnCharge(
    sousType?: SousTypeDelivrance
  ): boolean {
    return (
      (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) &&
        SousTypeDelivrance.estRDDouRDCouRDDP(sousType)) ||
      (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS) &&
        SousTypeDelivrance.estRDCSDouRDCSC(sousType))
    );
  }
}
