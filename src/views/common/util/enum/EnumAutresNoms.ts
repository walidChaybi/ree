import { EnumWithLibelle } from "./EnumWithLibelle";

export class EnumTypeAutresNoms extends EnumWithLibelle {
  public static readonly USAGE = new EnumTypeAutresNoms("Usage");
  public static readonly ANCIEN_NOM = new EnumTypeAutresNoms("Ancien nom");
  public static readonly PSEUDONYME = new EnumTypeAutresNoms("Pseudonyme");
  public static readonly AUTRE = new EnumTypeAutresNoms("Autre");

  /* istanbul ignore next
   * Inutile de tester
   */
  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, EnumTypeAutresNoms);
  }

  public static isAutre(typeAutresNoms: EnumTypeAutresNoms): boolean {
    return typeAutresNoms === this.AUTRE;
  }
}
