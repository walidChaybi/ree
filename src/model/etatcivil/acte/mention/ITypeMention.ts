import { peupleTypeMention } from "@api/nomenclature/NomenclatureEtatcivil";
import { Options } from "@util/Type";
import { ZERO } from "@util/Utils";
import { NatureActe } from "../../enum/NatureActe";
import { NATIONALITE, NatureMention } from "../../enum/NatureMention";

export interface ITypeMention {
  id: string;
  libelle: string;
  natureMention: NatureMention;
  natureActe?: NatureActe;
  affecteAnalyseMarginale: boolean;
  sousTypes?: ITypeMention[];
  estPresentListeDeroulante: boolean;
  estSousType: boolean;
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

  public static getTypesMention(formatListe = false) {
    return formatListe
      ? this.mapArborescenceVersListe(this.typesMentions)
      : this.typesMentions;
  }

  public static ajouteTypeMention(typeMention: ITypeMention) {
    this.typesMentions.push(typeMention);
  }

  public static getNatureMention(typeMention: ITypeMention[]): NatureMention[] {
    const natures = new Set<NatureMention>();

    // On élimine les natures en doublon
    typeMention.forEach(el => natures.add(el.natureMention));
    return Array.from(natures);
  }

  private static mapArborescenceVersListe(
    arborescenceTypesMention: ITypeMention[]
  ): ITypeMention[] {
    const liste: ITypeMention[] = [];
    for (const typeMention of arborescenceTypesMention) {
      if (typeMention.sousTypes && typeMention.sousTypes.length > ZERO) {
        liste.push(
          typeMention,
          ...this.mapArborescenceVersListe(typeMention.sousTypes)
        );
      } else {
        liste.push(typeMention);
      }
    }
    return liste;
  }

  public static getTypeMentionById(id: string) {
    return TypeMention.getTypesMention(true).find(mention => mention.id === id);
  }

  public static getTypeMentionAsOptions(mentions: ITypeMention[]): Options {
    return mentions
      .filter(mention => mention.estPresentListeDeroulante)
      .map(mention => ({
        cle: mention.id,
        libelle: mention.libelle
      }));
  }

  public static getTypeMentionParNatureActe(
    natureActe: NatureActe
  ): ITypeMention[] {
    return this.getTypesMention().filter(
      typeMention => typeMention.natureActe === natureActe
    );
  }

  public static getTypeMentionInconnue(): ITypeMention {
    return this.getTypesMention().find(typeMention =>
      NatureActe.estInconnue(typeMention.natureActe)
    ) as ITypeMention;
  }

  public static getIdTypeMentionNationalitePourAjoutMentionDelivrance() {
    return this.getTypesMention().filter(
      typeMention =>
        typeMention.natureMention ===
          NatureMention.getEnumFor(
            NatureMention.getKeyForCode(NatureMention, NATIONALITE)
          ) && typeMention.estSousType
    )?.[ZERO].id;
  }
}
