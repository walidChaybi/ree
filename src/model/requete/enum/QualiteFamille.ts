import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class QualiteFamille extends EnumWithLibelle {
  public static readonly PARENT = new QualiteFamille("Parent");
  public static readonly FRATRIE = new QualiteFamille("Fratrie");
  public static readonly ANCIEN_CONJOINT = new QualiteFamille(
    "Ancien conjoint"
  );
  public static readonly CONJOINT_ACTUEL = new QualiteFamille(
    "Conjoint actuel"
  );
  public static readonly ENFANT_MINEUR = new QualiteFamille("Enfant mineur");
  public static readonly ENFANT_MAJEUR = new QualiteFamille("Enfant majeur");
  public static readonly PARENT2ENFANT = new QualiteFamille("Parent 2 Enfant");

  public static getEnumFor(str: string): QualiteFamille {
    return EnumWithLibelle.getEnumFor(str, QualiteFamille);
  }

  public static estParent(qualiteFamille?: QualiteFamille): boolean {
    return qualiteFamille === QualiteFamille.PARENT;
  }
}
