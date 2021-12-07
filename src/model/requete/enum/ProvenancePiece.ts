/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class ProvenancePiece extends EnumWithComplete {
  public static readonly USAGER = new ProvenancePiece("USAGER", "Usager");
  public static readonly OEC = new ProvenancePiece("OEC", "OEC");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ProvenancePiece);
  }
}
