/* istanbul ignore file */
import { EnumWithComplete } from "../../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

export class BesoinUsager extends EnumWithComplete {
  public static readonly POSER_QUESTION_GENERALE = new BesoinUsager(
    "POSER_QUESTION_GENERALE",
    "Poser une question générale"
  );
  public static readonly POSER_QUESTION_DEMANDE_EN_COURS = new BesoinUsager(
    "POSER_QUESTION_DEMANDE_EN_COURS",
    "Poser une question sur une demande en cours"
  );
  public static readonly COMPLETER_DEMANDE = new BesoinUsager(
    "COMPLETER_DEMANDE",
    "Compléter une demande"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, BesoinUsager);
  }
}
