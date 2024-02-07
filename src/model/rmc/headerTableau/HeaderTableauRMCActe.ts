import { EnumWithComplete } from "@util/enum/EnumWithComplete";

export class HeaderTableauRMCActe extends EnumWithComplete {
  public static readonly DATE_EVENEMENT = new HeaderTableauRMCActe(
    "dateEvenement",
    "Date d'événement"
  );

  public static readonly REGISTRE_ELECTRONIQUE = new HeaderTableauRMCActe(
    "referenceRece",
    "Réf. RECE"
  );
  public static readonly REGISTRE_PAPIER = new HeaderTableauRMCActe(
    "referenceRegistre",
    "Réf. registre"
  );
}
