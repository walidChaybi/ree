import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class OrigineActe extends EnumWithLibelle {
  public static readonly SCEC_DOCS = new OrigineActe("SCEC_DOCS");
  public static readonly RECE = new OrigineActe("RECE");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, OrigineActe);
  }

  public static getKey(origineActe?: OrigineActe): string {
    return EnumWithLibelle.getKey(OrigineActe, origineActe);
  }

  public static estScecDocs(origineActe: OrigineActe) {
    return origineActe === OrigineActe.SCEC_DOCS;
  }
  public static estRece(origineActe: OrigineActe) {
    return origineActe === OrigineActe.RECE;
  }

  public static getEnumFromLibelle(libelle?: string) {
    return EnumWithLibelle.getEnumFromLibelle(OrigineActe, libelle);
  }
}
