import { TEnumAvecDeuxLibelles } from "@model/commun/EnumAvecDeuxLibelles";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export enum ESousTypeInformation {
  INFORMATION = "INFORMATION",
  COMPLETION_REQUETE_EN_COURS = "COMPLETION_REQUETE_EN_COURS"
}

export const ELibelleSousTypeInformation: TEnumAvecDeuxLibelles<ESousTypeInformation> = {
  INFORMATION: {
    court: "Information",
    long: "Information"
  },
  COMPLETION_REQUETE_EN_COURS: {
    court: "Complétion requête en cours",
    long: "Complétion requête en cours"
  }
};

export class SousTypeInformation extends EnumWithLibelle {
  public static readonly INFORMATION = new SousTypeInformation("Information");
  public static readonly COMPLETION_REQUETE_EN_COURS = new SousTypeInformation("Complétion requête en cours");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, SousTypeInformation);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(SousTypeInformation);
  }
}
