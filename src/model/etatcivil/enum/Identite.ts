import { Option } from "@model/requete/NatureActeTranscription";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export enum EIdentite {
  PERE = "Le père",
  MERE = "La mère",
  PERE_ET_MERE = "Le père et la mère",
  TIERS = "Un tiers"
}

export class Identite extends EnumWithLibelle {
  public static readonly PERE = new Identite("Le père");
  public static readonly MERE = new Identite("La mère");
  public static readonly PERE_ET_MERE = new Identite("Le père et la mère");
  public static readonly TIERS = new Identite("Un tiers");

  public static getKey(obj: Identite): string {
    return EnumWithLibelle.getKey(Identite, obj);
  }
  public static getAllEnumsAsOptions(): Option[] {
    return EnumWithLibelle.getAllLibellesAsOptions(Identite, false, false);
  }
}
