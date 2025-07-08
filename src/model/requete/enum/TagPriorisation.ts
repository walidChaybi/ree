import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export enum ETagPriorisation {
  SCEC = "SCEC",
  SDANF = "SDANF",
  PIPE_COMMUN = "PREFECTURE"
}

export class TagPriorisation extends EnumWithLibelle {
  public static readonly SCEC = new TagPriorisation("SCEC");
  public static readonly SDANF = new TagPriorisation("SDANF");
  public static readonly PIPE_COMMUN = new TagPriorisation("PREFECTURE");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TagPriorisation);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TagPriorisation);
  }
}
