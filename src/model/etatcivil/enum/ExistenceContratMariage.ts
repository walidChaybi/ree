import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Option } from "@util/Type";

export class ExistenceContratMariage extends EnumWithLibelle {
  public static readonly NON_CONNU = new ExistenceContratMariage("Non connu");
  public static readonly NON = new ExistenceContratMariage(
    "Sans contrat préalable"
  );
  public static readonly OUI = new ExistenceContratMariage("Avec contrat");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ExistenceContratMariage);
  }

  public static getKey(existenceContratMariage?: ExistenceContratMariage) {
    return EnumWithLibelle.getKey(
      ExistenceContratMariage,
      existenceContratMariage
    );
  }

  public static getAllEnumsAsOptions(): Option[] {
    return EnumWithLibelle.getAllLibellesAsOptions(
      ExistenceContratMariage,
      false,
      false
    );
  }
}
