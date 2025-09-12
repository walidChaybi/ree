/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export enum EMotifDelivrance {
  AUTRE = "Autre",
  CERTIFICAT_NATIONALITE_FRANCAISE = "Certificat de nationalité française",
  DECLARATION_ACQUISITION_NATIONALITE_FRANCAISE = "Déclaration d'acquisiton de nationalité française",
  DIVORCE_CONTENTIEUX = "Divorce / contentieux",
  GENEALOGIE = "Généalogie",
  MARIAGE_PACS = "Mariage / PACS",
  PENSION_REVERSION = "Pension de reversion",
  PRESTATIONS_SOCIALES_OU_FAMILIALES = "Prestations sociales ou familiales",
  RETRAITE = "Retraite",
  TITRE_SEJOUR_VISA_ETRANGER = "Titre de séjour / Visa étranger",
  SUCCESSION = "Succession",
  PAPIER_IDENTITE_PASSEPORT = "Papier d'identité / Passeport",
  NON_PRECISE_PAR_REQUERANT = "Non précisé par le requérant"
}

/** @deprecated supprimer la classe une fois le typage de la requête de délivrance faite */
export class MotifDelivrance extends EnumWithLibelle {
  public static readonly AUTRE = new MotifDelivrance("Autre");
  public static readonly CERTIFICAT_NATIONALITE_FRANCAISE = new MotifDelivrance("Certificat de nationalité française");
  public static readonly DECLARATION_ACQUISITION_NATIONALITE_FRANCAISE = new MotifDelivrance(
    "Déclaration d'acquisiton de nationalité française"
  );
  public static readonly DIVORCE_CONTENTIEUX = new MotifDelivrance("Divorce / contentieux");
  public static readonly GENEALOGIE = new MotifDelivrance("Généalogie");
  public static readonly MARIAGE_PACS = new MotifDelivrance("Mariage / PACS");
  public static readonly PENSION_REVERSION = new MotifDelivrance("Pension de reversion");
  public static readonly PRESTATIONS_SOCIALES_OU_FAMILIALES = new MotifDelivrance("Prestations sociales ou familiales");
  public static readonly RETRAITE = new MotifDelivrance("Retraite");
  public static readonly TITRE_SEJOUR_VISA_ETRANGER = new MotifDelivrance("Titre de séjour / Visa étranger");
  public static readonly SUCCESSION = new MotifDelivrance("Succession");
  public static readonly PAPIER_IDENTITE_PASSEPORT = new MotifDelivrance("Papier d'identité / Passeport");

  public static readonly NON_PRECISE_PAR_REQUERANT = new MotifDelivrance("Non précisé par le requérant");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, MotifDelivrance);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(MotifDelivrance);
  }

  public static getKey(motif?: MotifDelivrance): string {
    return EnumWithLibelle.getKey(MotifDelivrance, motif);
  }
}
