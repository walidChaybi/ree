import { EnumWithComplete } from "@util/enum/EnumWithComplete";

export class HeaderTableauRMC extends EnumWithComplete {
  public static readonly NOM = new HeaderTableauRMC("nom", "Nom");
  public static readonly AUTRES_NOMS = new HeaderTableauRMC(
    "autresNoms",
    "Autres noms"
  );
  public static readonly PRENOMS = new HeaderTableauRMC("prenoms", "Prénoms");
  public static readonly DATE_NAISSANCE = new HeaderTableauRMC(
    "dateNaissance",
    "Date de naissance"
  );
  public static readonly PAYS_NAISSANCE = new HeaderTableauRMC(
    "paysNaissance",
    "Pays de naissance"
  );
  public static readonly NATURE = new HeaderTableauRMC("nature", "Nature");
}
