/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { Options } from "@util/Type";

export enum ENatureActeRequete {
  NAISSANCE = "Naissance",
  MARIAGE = "Mariage",
  DECES = "Décès"
}

export class NatureActeRequete extends EnumWithComplete {
  public static readonly NAISSANCE = new NatureActeRequete("NAISSANCE", "Naissance");
  public static readonly MARIAGE = new NatureActeRequete("MARIAGE", "Mariage");
  public static readonly DECES = new NatureActeRequete("DECES", "Décès");

  public static getEnumFor(str?: string) {
    return EnumWithComplete.getEnumFor(str, NatureActeRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithComplete.getAllLibellesAsOptions(NatureActeRequete);
  }

  public static getEnumFromLibelle(str: string) {
    return EnumWithComplete.getEnumFromLibelle(NatureActeRequete, str);
  }

  public static getKey(natureActeRequete?: NatureActeRequete): string {
    return EnumWithComplete.getKey(NatureActeRequete, natureActeRequete);
  }

  public static estNaissance(natureActe?: NatureActeRequete): boolean {
    return natureActe === NatureActeRequete.NAISSANCE;
  }

  public static estMariage(natureActe?: NatureActeRequete): boolean {
    return natureActe === NatureActeRequete.MARIAGE;
  }
}
