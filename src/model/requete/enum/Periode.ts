/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class Periode extends EnumWithComplete {
  public static readonly LE = new Periode("LE", "Le");
  public static readonly EN = new Periode("EN", "En");
  public static readonly VERS_LE = new Periode("VERS_LE", "Vers le");
  public static readonly A = new Periode("A", "À");
  public static readonly VERS = new Periode("VERS", "Vers");
  public static readonly AVANT = new Periode("AVANT", "Avant");
  public static readonly ENTRE_LE = new Periode("ENTRE_LE", "Entre le");
  public static readonly ENTRE = new Periode("ENTRE", "Entre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Periode);
  }

  public static getEnumFromLibelle(str: string) {
    return EnumWithLibelle.getEnumFromLibelle(Periode, str);
  }

  public static getDateEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      Periode,
      false,
      true,
      false,
      [Periode.A, Periode.VERS, Periode.AVANT]
    );
  }

  public static getHeureEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      Periode,
      false,
      true,
      false,
      [Periode.LE, Periode.EN, Periode.VERS_LE, Periode.ENTRE_LE]
    );
  }

  public static getKey(obj: Periode) {
    return EnumWithLibelle.getKey(Periode, obj);
  }

  public static estIntervalle(periode?: Periode): boolean {
    return periode === Periode.ENTRE || periode === Periode.ENTRE_LE;
  }
}
