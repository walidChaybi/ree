/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export const LISTE_DES_REQUETES_COURRIER = ["RDCSC", "RDC", "RDLFC"];

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
}
