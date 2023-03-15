/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class NatureActeTranscrit extends EnumWithLibelle {
  public static readonly NAISSANCE_MINEUR = new NatureActeTranscrit(
    "Acte de naissance d'une personne mineure"
  );

  public static readonly NAISSANCE_MAJEUR = new NatureActeTranscrit(
    "Acte de naissance d'une personne majeure"
  );

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
