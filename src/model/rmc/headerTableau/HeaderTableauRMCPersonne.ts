import { EnumWithComplete } from "@util/enum/EnumWithComplete";

export class HeaderTableauRMCPersonne extends EnumWithComplete {
  public static readonly SEXE = new HeaderTableauRMCPersonne("sexe", "Sexe");
  public static readonly LIEU_NAISSANCE = new HeaderTableauRMCPersonne(
    "lieuNaissance",
    "Lieu de naissance"
  );
  public static readonly REFERENCE = new HeaderTableauRMCPersonne(
    "reference",
    "Référence"
  );
  public static readonly STATUT_OU_TYPE = new HeaderTableauRMCPersonne(
    "statutOuType",
    "Statut / Type"
  );
  public static readonly ROLE = new HeaderTableauRMCPersonne("role", "Rôle");
}
