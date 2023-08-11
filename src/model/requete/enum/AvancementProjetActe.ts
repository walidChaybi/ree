/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class AvancementProjetActe extends EnumWithComplete {
  public static readonly A_SAISIR = new AvancementProjetActe(
    "A_SAISIR",
    "A saisir"
  );
  public static readonly A_VERIFIER = new AvancementProjetActe(
    "A_VERIFIER",
    "A vérifier"
  );
  public static readonly VERIFIE = new AvancementProjetActe(
    "VERIFIE",
    "Vérifié"
  );
  public static readonly EN_COURS = new AvancementProjetActe(
    "EN_COURS",
    "En cours"
  );
  public static readonly VALIDE = new AvancementProjetActe("VALIDE", "Validé");
  public static readonly INVALIDE = new AvancementProjetActe(
    "INVALIDE",
    "Invalidé"
  );

  public static getEnumFor(str?: string) {
    return EnumWithLibelle.getEnumFor(str, AvancementProjetActe);
  }
}
