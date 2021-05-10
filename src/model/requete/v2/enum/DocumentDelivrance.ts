/* istanbul ignore file */
import { peupleDocumentDelivrance } from "../../../../api/nomenclature/NomenclatureRequete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Option, Options } from "../../../../views/common/util/Type";

export class DocumentDelivrance extends EnumWithLibelle {
  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: DocumentDelivrance) {
    (DocumentDelivrance as any)[key] = obj;
  }

  public static clean() {
    EnumWithLibelle.clean(DocumentDelivrance);
  }
  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, DocumentDelivrance);
  }

  public static async getAllEnumsAsOptions(): Promise<Options> {
    await peupleDocumentDelivrance();
    return EnumWithLibelle.getAllLibellesAsOptions(DocumentDelivrance);
  }

  public static async getAllCertificatSituation(): Promise<Options> {
    const options = await DocumentDelivrance.getAllEnumsAsOptions();
    const certificatsSituation = [] as Options;
    options.forEach((opt: Option) => {
      if (opt.str.includes("Certificat de situation")) {
        certificatsSituation.push(opt);
      }
    });

    return certificatsSituation;
  }
}
