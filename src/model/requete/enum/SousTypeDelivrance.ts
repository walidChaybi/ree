/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export const LISTE_DES_REQUETES_COURRIER = ["RDAPC", "RDCSC", "RDC", "RDLFC"];

export class SousTypeDelivrance extends EnumWithComplete {
  public static readonly RDD = new SousTypeDelivrance(
    "RDD",
    "Requête de Délivrance Extrait/Copie Dématérialisée",
    "Délivrance E/C (d)"
  );
  public static readonly RDC = new SousTypeDelivrance(
    "RDC",
    "Requête de Délivrance Extrait/Copie Courrier",
    "Délivrance E/C (c)"
  );
  public static readonly RDAPD = new SousTypeDelivrance(
    "RDAPD",
    "Requête de Délivrance Attestation de PACS Démat",
    "Délivrance AP (d)"
  );
  public static readonly RDAPC = new SousTypeDelivrance(
    "RDAPC",
    "Requête de Délivrance d'attestation de Pacte Civil de Solidarité",
    "Délivrance AP (c)"
  );
  public static readonly RDCSD = new SousTypeDelivrance(
    "RDCSD",
    "Requête de Délivrance Certificat de Situation Démat",
    "Délivrance CS (d)"
  );
  public static readonly RDCSC = new SousTypeDelivrance(
    "RDCSC",
    "Requête de Délivrance Certificat de Situation Courrier",
    "Délivrance CS (c)"
  );
  public static readonly RDDP = new SousTypeDelivrance(
    "RDDP",
    "Requête de Délivrance Démat Planète",
    "Délivrance Planète"
  );
  public static readonly RDDCO = new SousTypeDelivrance(
    "RDDCO",
    "Requête de Délivrance Démat Comedec",
    "Délivrance Comedec"
  );
  public static readonly RDLFC = new SousTypeDelivrance(
    "RDLFC",
    "Requête de Délivrance Livret de Famille Courrier",
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
}
