import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class StatutActe extends EnumWithLibelle {
  public static readonly BROUILLON = new StatutActe("Brouillon");
  public static readonly VALIDE = new StatutActe("Validé");
  public static readonly ANNULE = new StatutActe("Annulé");
  public static readonly SIGNE = new StatutActe("Signé");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, StatutActe);
  }
}
