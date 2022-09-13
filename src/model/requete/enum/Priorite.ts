/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class Priorite extends EnumWithLibelle {
  public static readonly BASSE = new Priorite("Priorité basse");
  public static readonly MOYENNE = new Priorite("Priorité moyenne");
  public static readonly HAUTE = new Priorite("Priorité haute");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Priorite);
  }
}
