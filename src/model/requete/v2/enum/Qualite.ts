/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

export class Qualite extends EnumWithLibelle {
  public static readonly UTILISATEUR_RECE = new Qualite("Utilisateur RECE");
  public static readonly PARTICULIER = new Qualite("Particulier");
  public static readonly MANDATAIRE_HABILITE = new Qualite(
    "Mandataire habilité"
  );
  public static readonly AUTRE_PROFESSIONNEL = new Qualite(
    "Autre professionnel"
  );
  public static readonly INSTITUTIONNEL = new Qualite("Institutionnel");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Qualite);
  }
}
