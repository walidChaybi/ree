/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class NatureActeTranscrit extends EnumWithLibelle {
  public static readonly ACTE_NAISSANCE_PERSONNE_MINEURE =
    new NatureActeTranscrit("Acte de naissance d'une personne mineure");

  public static readonly ACTE_NAISSANCE_PERSONNE_MAJEURE =
    new NatureActeTranscrit("Acte de naissance d'une personne majeure");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureActeTranscrit);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(NatureActeTranscrit);
  }

  public static getKey(motif?: NatureActeTranscrit): string {
    return EnumWithLibelle.getKey(NatureActeTranscrit, motif);
  }
}
