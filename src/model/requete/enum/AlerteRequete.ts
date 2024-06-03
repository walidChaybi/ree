import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class AlerteRequete extends EnumWithLibelle {
  public static readonly RECEPTION_MISE_A_JOUR_SDANF = new AlerteRequete(
    "Réception mise à jour SDANF"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, AlerteRequete);
  }
}
