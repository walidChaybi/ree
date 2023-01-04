import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class TagPriorisation extends EnumWithLibelle {
  public static readonly SCEC = new TagPriorisation("SCEC");
  public static readonly SDANF = new TagPriorisation("SDANF");
  public static readonly PIPE_COMMUN = new TagPriorisation("PREFECTURE");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TagPriorisation);
  }
}
