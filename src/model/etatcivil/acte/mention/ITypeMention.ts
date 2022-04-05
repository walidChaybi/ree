import { peupleTypeMention } from "../../../../api/nomenclature/NomenclatureEtatcivil";
import { NatureActe } from "../../enum/NatureActe";
import { NatureMention } from "../../enum/NatureMention";

export interface ITypeMention {
  codeType: string;

  libelleType: string;

  codeSousType: string;

  libelleSousType: string;

  estActif: boolean;

  modeInformatisation: string;

  nature: NatureMention;

  sousTypeParDefaut?: boolean;

  natureActe?: NatureActe;
}

export class TypeMention {
  private static typesMentions: ITypeMention[] = [];

  public static async init() {
    await peupleTypeMention();
  }

  public static clean() {
    this.typesMentions = [];
  }

  public static contientEnums() {
    return this.typesMentions.length > 0;
  }

  public static getTypesMention() {
    return this.typesMentions;
  }

  public static ajouteTypeMention(typeMention: ITypeMention) {
    this.typesMentions.push(typeMention);
  }

  public static getTypeMentionParDefault(natureActe: NatureActe) {
    return TypeMention.getTypesMention().find(
      el => el.natureActe === natureActe && el.sousTypeParDefaut
    );
  }

  public static getNaturesMentionPourActe(natureActe: NatureActe) {
    const natures = new Set<NatureMention>();

    // On élimine les natures en doublon
    TypeMention.getTypesMention()
      .filter(el => el.natureActe === natureActe)
      .forEach(el => natures.add(el.nature));
    return Array.from(natures);
  }
}
