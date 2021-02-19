/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class NatureActe extends EnumWithLibelle {
  public static readonly NAISSANCE = new NatureActe("Naissance");
  public static readonly MARIAGE = new NatureActe("Mariage");
  public static readonly DECES = new NatureActe("Décès");
  public static readonly DIVORCE = new NatureActe("Divorce");
  public static readonly SEPARATION = new NatureActe("Séparation");
  public static readonly ADOPTION_SIMPLE = new NatureActe("Adoption simple");
  public static readonly ABSENCE = new NatureActe("Absence");
  public static readonly RECONNAISSANCE = new NatureActe("Reconnaissance");
  public static readonly PACS = new NatureActe("Pacs");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureActe);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllEnumsAsOptions(NatureActe);
  }
}
