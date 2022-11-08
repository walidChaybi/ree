/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class NatureActeRequete extends EnumWithLibelle {
  public static readonly NAISSANCE = new NatureActeRequete("Naissance");
  public static readonly MARIAGE = new NatureActeRequete("Mariage");
  public static readonly DECES = new NatureActeRequete("Décès");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureActeRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      NatureActeRequete,
      false,
      false
    );
  }

  public static estNaissance(natureActe?: NatureActeRequete): boolean {
    return natureActe === NatureActeRequete.NAISSANCE;
  }
}
