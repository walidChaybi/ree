/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class SousTypeDelivrance extends EnumWithComplete {
  public static readonly RDD = new SousTypeDelivrance(
    "RDD",
    "Délivrance E/C (d)",
    "Requête Délivrance Extrait/Copie Dématérialisée"
  );
  public static readonly RDC = new SousTypeDelivrance(
    "RDC",
    "Délivrance E/C (c)",
    "Requête Délivrance Extrait/Copie Courrier"
  );
  public static readonly RDAPD = new SousTypeDelivrance(
    "RDAPD",
    "Délivrance AP (d)",
    "Requête de Délivrance Attestation de PACS Démat"
  );
  public static readonly RDAPC = new SousTypeDelivrance(
    "RDAPC",
    "Délivrance AP (c)",
    "Requête de Délivrance Attestation de PACS Courrier"
  );
  public static readonly RDCSD = new SousTypeDelivrance(
    "RDCSD",
    "Délivrance CS (d)",
    "Requête de Délivrance de Certificat de Situation Démat"
  );
  public static readonly RDCSC = new SousTypeDelivrance(
    "RDCSC",
    "Délivrance CS (c)",
    "Requête de Délivrance de Certificat de Situation Courrier"
  );
  public static readonly RDDP = new SousTypeDelivrance(
    "RDDP",
    "Délivrance",
    "Requête de Délivrance Démat COMEDEC"
  );
  public static readonly RDDCO = new SousTypeDelivrance(
    "RDDCO",
    "Délivrance",
    "Requête de Délivrance Démat PLANETE"
  );
  public static readonly RDCCAMR = new SousTypeDelivrance(
    "RDCCAMR",
    "Délivrance CCAM",
    "Requête de Délivrance Certificat de Capacité A Mariage RECE"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, SousTypeDelivrance);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(SousTypeDelivrance);
  }

  public static getAllNomsAsOptions(): Options {
    return EnumWithComplete.getAllNomsAsOptions(SousTypeDelivrance);
  }
}
