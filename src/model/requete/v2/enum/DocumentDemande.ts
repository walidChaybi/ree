/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Option, Options } from "../../../../views/common/util/Type";

export const LISTE_DOCUMENT_DEMANDE_DECES = [
  "COPIE_INTEGRALE",
  "EXTRAIT_PLURILINGUE",
  "MULTILIGNE_EUROPEEN"
];

export class DocumentDemande extends EnumWithLibelle {
  public static readonly COPIE_INTEGRALE = new DocumentDemande(
    "Copie intégrale"
  );
  public static readonly EXTRAIT_AVEC_FILIATION = new DocumentDemande(
    "Extrait avec filiation"
  );
  public static readonly EXTRAIT_SANS_FILIATION = new DocumentDemande(
    "Extrait sans filiation"
  );
  public static readonly EXTRAIT_PLURILINGUE = new DocumentDemande(
    "Extrait plurilingue"
  );
  public static readonly MULTILIGNE_EUROPEEN = new DocumentDemande(
    "Multilingue européen"
  );
  public static readonly COPIE_ARCHIVE = new DocumentDemande("Copie archive");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, DocumentDemande);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(
      DocumentDemande,
      false,
      false
    );
  }

  public static getListEnumsAsOptions(keys: string[]): Options {
    return this.getAllEnumsAsOptions().filter((el: Option) => {
      return keys.includes(el.value) ? el : undefined;
    });
  }
}
