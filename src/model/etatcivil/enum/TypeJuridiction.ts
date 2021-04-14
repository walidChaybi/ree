/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class TypeJuridiction extends EnumWithLibelle {
  public static readonly TRIBUNAL_JUDICIAIRE = new TypeJuridiction(
    "Tribunal judiciaire"
  );
  public static readonly TRIBUNAL_INSTANCE = new TypeJuridiction(
    "Tribunal d'instance"
  );
  public static readonly TRIBUNAL_GRANDE_INSTANCE = new TypeJuridiction(
    "Tribunal de grande instance"
  );
  public static readonly TRIBUNAL_PROXIMITE = new TypeJuridiction(
    "Tribunal de proximité"
  );
  public static readonly TRIBUNAL_JUDICIAIRE_REFERENCE = new TypeJuridiction(
    "Tribunal judiciaire de référence"
  );
  public static readonly TRIBUNAL_PREMIERE_INSTANCE = new TypeJuridiction(
    "Tribunal de première instance"
  );
  public static readonly TRIBUNAL_SUPERIEUR_APPEL = new TypeJuridiction(
    "Tribunal supérieur d'appel"
  );
  public static readonly GREFFE_TRIBUNAL = new TypeJuridiction(
    "Greffe du tribunal"
  );
  public static readonly COUR_APPEL = new TypeJuridiction("Cour d'appel");
  public static readonly JURIDICTION_ETRANGERE = new TypeJuridiction(
    "Juridiction étrangère"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeJuridiction);
  }
}
