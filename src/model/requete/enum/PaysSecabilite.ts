import { peuplePaysSecabilite } from "@api/nomenclature/NomenclatureRequete";
import { formatPremieresLettresMajusculesNomCompose } from "@util/Utils";
import { EnumNomemclature } from "@util/enum/EnumNomenclature";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class PaysSecabilite extends EnumNomemclature {
  public static async init() {
    await peuplePaysSecabilite();
  }

  public static clean(): void {
    EnumWithLibelle.clean(PaysSecabilite);
  }

  public static addEnum(key: string, obj: PaysSecabilite): void {
    EnumWithLibelle.addEnum(key, obj, PaysSecabilite);
  }

  public static contientEnums(): boolean {
    return EnumWithLibelle.contientEnums(PaysSecabilite);
  }

  public static estSecable(libelle: string): boolean {
    return (
      EnumWithLibelle.getEnumFromLibelle(
        PaysSecabilite,
        formatPremieresLettresMajusculesNomCompose(libelle)
      ) != null
    );
  }
}
