/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class ProvenancePiece extends EnumWithComplete {
  public static readonly USAGER = new ProvenancePiece("USAGER", "Usager");
  public static readonly OEC = new ProvenancePiece("OEC", "OEC");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ProvenancePiece);
  }
}
