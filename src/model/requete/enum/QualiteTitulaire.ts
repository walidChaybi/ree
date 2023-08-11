/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class QualiteTitulaire extends EnumWithComplete {
  public static readonly POSTULANT = new QualiteTitulaire(
    "POSTULANT",
    "Postulant"
  );
  public static readonly PARENT = new QualiteTitulaire("PARENT", "Parent");
  public static readonly ANCIEN_CONJOINT = new QualiteTitulaire(
    "POSTULANT",
    "Postulant"
  );
  public static readonly CONJOINT_ACTUEL = new QualiteTitulaire(
    "CONJOINT_ACTUEL",
    "Conjoint actuel"
  );
  public static readonly ENFANT_MAJEUR = new QualiteTitulaire(
    "ENFANT_MAJEUR",
    "Enfant majeur"
  );
  public static readonly ENFANT_MINEUR = new QualiteTitulaire(
    "ENFANT_MINEUR",
    "Enfant mineur"
  );
  public static readonly PARENT2ENFANT = new QualiteTitulaire(
    "PARENT2ENFANT",
    "Parent 2 enfant"
  );
  public static readonly FRATRIE = new QualiteTitulaire("FRATRIE", "Fratrie");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, QualiteTitulaire);
  }
}
