/* istanbul ignore file */

import { peupleTypeAlerte } from "@api/nomenclature/NomenclatureEtatcivil";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

const CODE_COULEUR_ALERTE_ROUGE = "CodeCouleurAlerteRouge";
const CODE_COULEUR_ALERTE_ORANGE = "CodeCouleurAlerteOrange";
const CODE_COULEUR_ALERTE_VERT = "CodeCouleurAlerteVert";
const CODE_COULEUR_ALERTE_NOIR = "CodeCouleurAlerteNoir";

export type TypeCodeCouleur =
  | typeof CODE_COULEUR_ALERTE_ROUGE
  | typeof CODE_COULEUR_ALERTE_ORANGE
  | typeof CODE_COULEUR_ALERTE_VERT
  | typeof CODE_COULEUR_ALERTE_NOIR;

const A_NE_PAS_DELIVRER = "A ne pas délivrer";
const A_DELIVRER_SOUS_CONDITIONS = "A délivrer sous conditions";
const ACTE_NON_EXPLOITABLE = "Acte non exploitable";
const PROBLEME_FONCTIONNEL = "Problème fonctionnel";
export const DESCRIPTION_SAGA = "Description SAGA";

/**
 * types alerte associés à un code couleur rouge : types 'A ne pas délivrer' et 'Problème fonctionnel'
 * types alerte associés à un code couleur orange : type 'A délivrer sous conditions'
 * types alerte associés à un code couleur vert : type 'Acte non exploitable'
 * types alerte associés à un code couleur noir : type 'Description SAGA'
 */
const mapTypesAlerteCodeCouleur: any = {
  [A_NE_PAS_DELIVRER]: CODE_COULEUR_ALERTE_ROUGE,
  [A_DELIVRER_SOUS_CONDITIONS]: CODE_COULEUR_ALERTE_ORANGE,
  [ACTE_NON_EXPLOITABLE]: CODE_COULEUR_ALERTE_VERT,
  [PROBLEME_FONCTIONNEL]: CODE_COULEUR_ALERTE_ROUGE,
  [DESCRIPTION_SAGA]: CODE_COULEUR_ALERTE_NOIR
};

export class TypeAlerte extends EnumWithLibelle {
  constructor(
    private readonly _code: string,
    private readonly _type: string,
    private readonly _sousType: string,
    private readonly _description: string,
    libelle: string
  ) {
    super(libelle);
  }

  get code() {
    return this._code;
  }

  get description() {
    return this._description;
  }

  get type() {
    return this._type;
  }

  get sousType() {
    return this._sousType;
  }

  public static async init() {
    await peupleTypeAlerte();
  }

  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: TypeAlerte) {
    EnumWithLibelle.addEnum(key, obj, TypeAlerte);
  }

  public static clean() {
    return EnumWithLibelle.clean(TypeAlerte);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(TypeAlerte);
  }

  public static getEnumFor(str: string): TypeAlerte {
    return EnumWithLibelle.getEnumFor(str, TypeAlerte);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeAlerte);
  }

  public static getCodeCouleurAlerte(typeAlerte: string): string {
    return typeAlerte && mapTypesAlerteCodeCouleur[typeAlerte];
  }
}
