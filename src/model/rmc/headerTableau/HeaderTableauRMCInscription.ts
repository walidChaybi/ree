import { EnumWithComplete } from "@util/enum/EnumWithComplete";

export class HeaderTableauRMCInscription extends EnumWithComplete {
  public static readonly NUMERO_REF = new HeaderTableauRMCInscription(
    "numeroInscription",
    "N° Réf."
  );
  public static readonly TYPE = new HeaderTableauRMCInscription(
    "typeInscription",
    "Type"
  );
  public static readonly STATUT = new HeaderTableauRMCInscription(
    "statutInscription",
    "Statut fiche"
  );
}
