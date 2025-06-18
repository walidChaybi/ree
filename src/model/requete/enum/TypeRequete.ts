import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export enum ETypeRequete {
  DELIVRANCE = "Délivrance",
  CREATION = "Création",
  MISE_A_JOUR = "Mise à jour",
  INFORMATION = "Information"
}

export class TypeRequete extends EnumWithComplete {
  public static readonly DELIVRANCE = new TypeRequete("DELIVRANCE", "Délivrance");
  public static readonly CREATION = new TypeRequete("CREATION", "Création");
  public static readonly MISE_A_JOUR = new TypeRequete("MISE_A_JOUR", "Mise à jour");
  public static readonly INFORMATION = new TypeRequete("INFORMATION", "Information");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeRequete);
  }

  public static getEnumFromLibelle(str: string) {
    return EnumWithLibelle.getEnumFromLibelle(TypeRequete, str);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeRequete);
  }

  public static getKey(obj: TypeRequete) {
    return EnumWithLibelle.getKey(TypeRequete, obj);
  }

  public static estDelivrance(typeRequete?: TypeRequete): boolean {
    return typeRequete === TypeRequete.DELIVRANCE;
  }

  public static estInformation(typeRequete?: TypeRequete): boolean {
    return typeRequete === TypeRequete.INFORMATION;
  }

  public static estCreation(typeRequete?: TypeRequete): boolean {
    return typeRequete === TypeRequete.CREATION;
  }
}
