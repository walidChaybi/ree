/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class Qualite extends EnumWithComplete {
  public static readonly UTILISATEUR_RECE = new Qualite(
    "UTILISATEUR_RECE",
    "Utilisateur RECE"
  );
  public static readonly PARTICULIER = new Qualite(
    "PARTICULIER",
    "Particulier"
  );
  public static readonly MANDATAIRE_HABILITE = new Qualite(
    "MANDATAIRE_HABILITE",
    "Mandataire habilité"
  );
  public static readonly AUTRE_PROFESSIONNEL = new Qualite(
    "AUTRE_PROFESSIONNEL",
    "Autre professionnel"
  );
  public static readonly INSTITUTIONNEL = new Qualite(
    "INSTITUTIONNEL",
    "Institutionnel"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Qualite);
  }
}
