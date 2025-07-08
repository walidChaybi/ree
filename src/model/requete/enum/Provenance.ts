import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export enum EProvenance {
  INTERNET = "Internet",
  COURRIER = "Courrier",
  RECE = "RECE",
  SERVICE_PUBLIC = "Service Public",
  COMEDEC = "Comedec",
  PLANETE = "Planète",
  NATALI = "Natali"
}

export class Provenance extends EnumWithComplete {
  public static readonly INTERNET = new Provenance("INTERNET", "Internet");
  public static readonly COURRIER = new Provenance("COURRIER", "Courrier");
  public static readonly RECE = new Provenance("RECE", "RECE");
  public static readonly SERVICE_PUBLIC = new Provenance("SERVICE_PUBLIC", "Service Public");
  public static readonly COMEDEC = new Provenance("COMEDEC", "Comedec");
  public static readonly PLANETE = new Provenance("PLANETE", "Planète");
  public static readonly NATALI = new Provenance("NATALI", "Natali");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Provenance);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(Provenance);
  }
}
