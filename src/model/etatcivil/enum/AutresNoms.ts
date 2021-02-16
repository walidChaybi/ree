/* istanbul ignore file */
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class AutresNoms extends EnumWithLibelle {
  public static readonly USAGE = new AutresNoms("Usage");
  public static readonly ANCIEN_NOM = new AutresNoms("Ancien nom");
  public static readonly PSEUDONYME = new AutresNoms("Pseudonyme");
  public static readonly AUTRE = new AutresNoms("Autre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, AutresNoms);
  }

  public static isAutre(typeAutresNoms: AutresNoms): boolean {
    return typeAutresNoms === this.AUTRE;
  }
}
