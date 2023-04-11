import { EnumWithComplete } from "@util/enum/EnumWithComplete";

export class HeaderTableauRMCActe extends EnumWithComplete {
  public static readonly DATE_EVENEMENT = new HeaderTableauRMCActe(
    "dateEvenement",
    "Date d'événement"
  );
  public static readonly REGISTRE = new HeaderTableauRMCActe(
    "registre",
    "Réf. acte"
  );
}
