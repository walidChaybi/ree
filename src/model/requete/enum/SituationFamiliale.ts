import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class SituationFamiliale extends EnumWithComplete {
  public static readonly CELIBATAIRE = new SituationFamiliale(
    "CELIBATAIRE",
    "Célibataire"
  );
  public static readonly MARIE = new SituationFamiliale("MARIE", "Marié(e)");
  public static readonly CONCUBINAGE = new SituationFamiliale(
    "CONCUBINAGE",
    "Concubinage"
  );
  public static readonly PACTE_CIVIL_SOLIDARITE = new SituationFamiliale(
    "PACTE_CIVIL_SOLIDARITE",
    "Pacte Civil de Solidarité"
  );
  public static readonly SEPARE_LEGALEMENT = new SituationFamiliale(
    "SEPARE_LEGALEMENT",
    "Séparé(e) légalement"
  );
  public static readonly DIVORCE = new SituationFamiliale(
    "DIVORCE",
    "Divorcé(e)"
  );
  public static readonly VEUF = new SituationFamiliale("VEUF", "Veuf(ve)");

  public static getEnumFor(str?: string) {
    return str
      ? EnumWithLibelle.getEnumFor(str, SituationFamiliale)
      : undefined;
  }

  public static getKey(obj: SituationFamiliale) {
    return EnumWithLibelle.getKey(SituationFamiliale, obj);
  }
}
