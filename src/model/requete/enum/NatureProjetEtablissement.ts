/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { Options } from "@util/Type";

export class NatureProjetEtablissement extends EnumWithComplete {
  public static readonly NAISSANCE = new NatureProjetEtablissement(
    "NAISSANCE",
    "Naissance"
  );
  public static readonly NAISSANCE_EN_FRANCE = new NatureProjetEtablissement(
    "NAISSANCE_EN_FRANCE",
    "Naissance en France"
  );

  public static readonly MARIAGE = new NatureProjetEtablissement(
    "MARIAGE",
    "Mariage"
  );
  public static readonly MARIAGE_FRANCAIS = new NatureProjetEtablissement(
    "MARIAGE_FRANCAIS",
    "Mariage francais"
  );
  public static readonly DECES = new NatureProjetEtablissement(
    "DECES",
    "Décès"
  );

  public static getEnumFor(str?: string) {
    return EnumWithComplete.getEnumFor(str, NatureProjetEtablissement);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithComplete.getAllLibellesAsOptions(NatureProjetEtablissement);
  }

  public static getEnumFromLibelle(str: string) {
    return EnumWithComplete.getEnumFromLibelle(NatureProjetEtablissement, str);
  }

  public static getKey(nature?: NatureProjetEtablissement): string {
    return EnumWithComplete.getKey(NatureProjetEtablissement, nature);
  }

  public static estNaissance(natureActe?: NatureProjetEtablissement): boolean {
    return (
      natureActe === NatureProjetEtablissement.NAISSANCE ||
      natureActe === NatureProjetEtablissement.NAISSANCE_EN_FRANCE
    );
  }

  public static estMariage(natureActe?: NatureProjetEtablissement): boolean {
    return natureActe === NatureProjetEtablissement.MARIAGE;
  }
}
