import { SousTypeMiseAJour } from "@model/requete/enum/SousTypeMiseAJour";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class TypeMiseAJourMentions extends EnumWithLibelle {
  public static readonly MAJ_SUITE_AVIS = new TypeMiseAJourMentions(
    "Apposer mentions(s) suite à avis"
  );
  public static readonly MAJ_AUTRE = new TypeMiseAJourMentions(
    "Apposer mentions(s) autre"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeMiseAJourMentions);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      TypeMiseAJourMentions,
      false,
      false
    );
  }

  public static estMajSuiteAvisFromLibelle(str: string) {
    return (
      TypeMiseAJourMentions.getEnumFor(str) ===
      TypeMiseAJourMentions.MAJ_SUITE_AVIS
    );
  }

  public static estMajAutreFromLibelle(str: string) {
    return (
      TypeMiseAJourMentions.getEnumFor(str) === TypeMiseAJourMentions.MAJ_AUTRE
    );
  }

  public static getEnumFromLibelle(str?: string): TypeMiseAJourMentions {
    return str
      ? EnumWithLibelle.getEnumFromLibelle(TypeMiseAJourMentions, str)
      : undefined;
  }

  public static getKey(obj: TypeMiseAJourMentions) {
    return EnumWithLibelle.getKey(TypeMiseAJourMentions, obj);
  }

  public static getSousTypeRequeteFromTypeMiseAJourLibelle(str: string) {
    if (TypeMiseAJourMentions.estMajSuiteAvisFromLibelle(str)) {
      return SousTypeMiseAJour.RMAC;
    } else {
      return SousTypeMiseAJour.RMAR;
    }
  }
}
