import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class TypeMiseAJourMentions extends EnumWithLibelle {
  public static readonly MAJ_SUITE_AVIS = new TypeMiseAJourMentions(
    "Apposer mention(s) suite à avis"
  );
  public static readonly MAJ_AUTRE = new TypeMiseAJourMentions(
    "Apposer mention(s) autre"
  );
}
