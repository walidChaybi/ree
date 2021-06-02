/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

export class MotifDelivrance extends EnumWithLibelle {
  public static readonly AUTRE = new MotifDelivrance("Autre");
  public static readonly CERTIFICAT_DE_NATIONALITE_FRANCAISE = new MotifDelivrance(
    "Certificat de nationalité française"
  );
  public static readonly DECLARATION_ACQUISITION_DE_NATIONALITE_FRANCAISE = new MotifDelivrance(
    "Déclaration d'acquisiton de nationalité française"
  );
  public static readonly DIVORCE_CONTENTIEUX = new MotifDelivrance(
    "Divorce / contentieux"
  );
  public static readonly GENEALOGIE = new MotifDelivrance("Généalogie");
  public static readonly MARIAGE_PACS = new MotifDelivrance("Mariage / PACS");
  public static readonly PENSION_REVERSION = new MotifDelivrance(
    "Pension de reversion"
  );
  public static readonly PRESTATIONS_SOCIALES_OU_FAMILIALES = new MotifDelivrance(
    "Prestations sociales ou familiales"
  );
  public static readonly RETRAITE = new MotifDelivrance("Retraite");
  public static readonly TITRE_DE_SEJOUR_VISA_ETRANGER = new MotifDelivrance(
    "Titre de séjour / Visa étranger"
  );
  public static readonly SUCCESSION = new MotifDelivrance("Succession");
  public static readonly DEMANDE_NOTAIRE = new MotifDelivrance(
    "Demande notaire (Planète)"
  );
  public static readonly PAPIER_IDENTITE_PASSEPORT = new MotifDelivrance(
    "Papier d'identité / Passeport"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, MotifDelivrance);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      MotifDelivrance,
      false,
      false
    );
  }
}
