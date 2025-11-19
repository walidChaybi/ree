import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class Residence extends EnumWithComplete {
  public static readonly IDENTIQUE_TITULAIRE_REQUETE = new Residence("IDENTIQUE_TITULAIRE_REQUETE", "Identique au titulaire requête");
  public static readonly AUTRE_ADRESSE = new Residence("AUTRE_ADRESSE", "Autre adresse");
  public static readonly RESIDENCE_ALTERNEE = new Residence("RESIDENCE_ALTERNEE", "Résidence alternée");
  public static readonly ETRANGER = new Residence("ETRANGER", "A l'étranger");

  public static getEnumFor(str?: string) {
    return str ? EnumWithLibelle.getEnumFor(str, Residence) : undefined;
  }
}
