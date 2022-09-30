/* istanbul ignore file */
import { peupleNatureMention } from "@api/nomenclature/NomenclatureEtatcivil";
import { EnumNomemclature } from "@util/enum/EnumNomenclature";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";
import { DocumentDelivrance } from "../../requete/enum/DocumentDelivrance";
import {
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_SANS_FILIATION
} from "../../requete/enum/DocumentDelivranceConstante";
import { NatureActe } from "./NatureActe";

export const CODE_RC = "21";
export const CODE_RC_RADIE = "22";
export const DISSOLUTION_PACS = "28";
export const MODIFICATION_PACS = "29";
export const REGIME_MATRIMONIAL = "6";
export const MARIAGE = "27";
export const PACS = "2";
export const LIEN_FILIATION_HORS_ADOPTION = "12";
export const PUPILLE = "14";
export const ANNULATION_MARIAGE = "15";
export const ANNULATION_PACS = "16";
export const ANNULATION_ACTE = "23";
export const CONTRAT_MARIAGE = "7";
export const DECES = "1";
export const REPRISE_VIE_COMMUNE = "4";
export const NATIONALITE = "8";
export const EXTRANEITE = "9";
export const CHANGEMENT_SEXE = "11";
export const CHANGEMENT_NOM = "10";
export const ADOPTION = "13";
export const SEPARATION_CORPS = "3";
export const ANNULATION_DECISION = "17";
export const ANNULATION_EVENEMENT = "18";
export const MORT_POUR_LA_FRANCE = "25";
export const ACTE_HERITIER = "26";
export const AUTRES = "99";
export const ANNULATION_MENTION = "19";
export const DIVORCE = "5";
export const DECISION_ACTE = "24";
export const RECTIFICATION = "20";

export const natureRetireesMariageAvecFilliation = [
  ANNULATION_EVENEMENT,
  ANNULATION_MENTION,
  RECTIFICATION,
  CHANGEMENT_NOM,
  LIEN_FILIATION_HORS_ADOPTION
];

export const natureRetireesMariageSansFilliation = [
  ...natureRetireesMariageAvecFilliation,
  ADOPTION
];

export const natureMentionExtraitPlurilingueMariage = [
  SEPARATION_CORPS,
  DIVORCE,
  ANNULATION_MARIAGE,
  ANNULATION_ACTE
];

export const natureMentionExtraitPlurilingueNaissance = [
  MARIAGE,
  SEPARATION_CORPS,
  DIVORCE,
  DECES,
  ANNULATION_ACTE
];

export const natureRetireesNaissanceAvecFillation = [
  REPRISE_VIE_COMMUNE,
  ANNULATION_MARIAGE,
  ANNULATION_PACS,
  ANNULATION_DECISION,
  ANNULATION_EVENEMENT,
  ANNULATION_MENTION,
  CODE_RC_RADIE,
  CHANGEMENT_NOM,
  CHANGEMENT_SEXE,
  LIEN_FILIATION_HORS_ADOPTION,
  RECTIFICATION
];

export const natureRetireesMariagePlurilingue = [
  REPRISE_VIE_COMMUNE,
  REGIME_MATRIMONIAL,
  CHANGEMENT_NOM,
  LIEN_FILIATION_HORS_ADOPTION,
  ADOPTION,
  ANNULATION_EVENEMENT,
  ANNULATION_MENTION,
  RECTIFICATION,
  AUTRES
];

export const natureRetireesNaissancePlurilingue = [
  PACS,
  ANNULATION_PACS,
  DISSOLUTION_PACS,
  MODIFICATION_PACS,
  REPRISE_VIE_COMMUNE,
  NATIONALITE,
  EXTRANEITE,
  CHANGEMENT_NOM,
  CHANGEMENT_SEXE,
  LIEN_FILIATION_HORS_ADOPTION,
  ADOPTION,
  PUPILLE,
  ANNULATION_MARIAGE,
  ANNULATION_DECISION,
  ANNULATION_EVENEMENT,
  ANNULATION_MENTION,
  RECTIFICATION,
  CODE_RC_RADIE,
  CODE_RC,
  AUTRES
];

export const natureRetireesNaissanceSansFillation = [
  ...natureRetireesNaissanceAvecFillation,
  NATIONALITE,
  ADOPTION
];

const natureNaissanceInterditePourExtraitAvecFiliation = [
  REPRISE_VIE_COMMUNE,
  ANNULATION_MARIAGE,
  ANNULATION_PACS,
  ANNULATION_DECISION,
  ANNULATION_EVENEMENT,
  ANNULATION_MENTION,
  CODE_RC_RADIE,
  CHANGEMENT_NOM,
  CHANGEMENT_SEXE,
  LIEN_FILIATION_HORS_ADOPTION,
  RECTIFICATION,
  ANNULATION_ACTE
];

const natureMariageInterdites = [
  CHANGEMENT_NOM,
  LIEN_FILIATION_HORS_ADOPTION,
  ANNULATION_EVENEMENT,
  ANNULATION_MENTION,
  RECTIFICATION,
  ANNULATION_ACTE,
  ANNULATION_MARIAGE
];

const naturesInterdites = {
  Naissance: {
    [CODE_EXTRAIT_AVEC_FILIATION]:
      natureNaissanceInterditePourExtraitAvecFiliation,
    [CODE_EXTRAIT_SANS_FILIATION]: [
      ...natureNaissanceInterditePourExtraitAvecFiliation,
      NATIONALITE,
      ADOPTION
    ]
  },
  Mariage: {
    [CODE_EXTRAIT_SANS_FILIATION]: [...natureMariageInterdites, ADOPTION],
    [CODE_EXTRAIT_AVEC_FILIATION]: natureMariageInterdites
  }
};

export class NatureMention extends EnumNomemclature {
  constructor(
    code: string,
    libelle: string,
    categorie: string,
    private readonly _estActif: boolean,
    private readonly _opposableAuTiers: boolean
  ) {
    super(code, libelle, categorie);
  }

  get estActif() {
    return this._estActif;
  }

  get opposableAuTiers() {
    return this._opposableAuTiers;
  }

  public static async init() {
    await peupleNatureMention();
  }

  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: NatureMention) {
    EnumWithLibelle.addEnum(key, obj, NatureMention);
  }

  public static clean() {
    return EnumWithLibelle.clean(NatureMention);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(NatureMention);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, NatureMention);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(NatureMention);
  }

  public static getEnumsAsOptions(natureMention: NatureMention[]) {
    const options: Options = [];
    natureMention.forEach(nature => {
      options.push({
        value: NatureMention.getUuidFromNature(nature),
        str: nature.libelle
      });
    });
    return options;
  }

  public static getKey(nature?: NatureMention) {
    if (nature) {
      return EnumWithLibelle.getKey(NatureMention, nature);
    } else {
      return "";
    }
  }

  public static getEnumOrEmpty(nature?: NatureMention) {
    if (nature) {
      return nature;
    } else {
      return NatureMention.getEnumFor("");
    }
  }

  public static estOpposableAuTiers(natureMention: NatureMention) {
    return natureMention.opposableAuTiers;
  }

  public static getUuidFromNature(nature?: NatureMention): string {
    let uuid = "";
    if (nature) {
      uuid = EnumNomemclature.getKeyForCode(NatureMention, nature.code);
    }
    return uuid ? uuid : "";
  }

  public static ilExisteUneMentionInterdite(
    naturesMentions: NatureMention[],
    natureActe?: NatureActe,
    document?: DocumentDelivrance
  ): boolean {
    return (
      //@ts-ignore
      naturesInterdites[`${natureActe?.libelle}`]?.[document?.code]?.find(
        (codeMention: string) =>
          naturesMentions.find(
            natureMention => natureMention.code === codeMention
          )
      ) != null
    );
  }

  public static getCodePourNature(codeNature?: string) {
    switch (codeNature) {
      case SEPARATION_CORPS:
        return "Sc";
      case MARIAGE:
        return "Mar";
      case DIVORCE:
        return "Div";
      case DECES:
        return "D";
      case ANNULATION_ACTE:
      case ANNULATION_MARIAGE:
        return "A";
      default:
        return "";
    }
  }
}
