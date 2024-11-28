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
  estSaisieAssistee: boolean;
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
    return formatListe ? this.mapArborescenceVersListe(this.typesMentions) : this.typesMentions;
  }

  public static ajouteTypeMention(typeMention: ITypeMention) {
    this.typesMentions.push(typeMention);
  }

  public static getNatureMention(typesMention: ITypeMention[]): NatureMention[] {
    const natures = new Set<NatureMention>();
    const mapRecursifMentions = (mentions: ITypeMention[]) =>
      mentions.forEach(mention => {
        if (mention.natureMention) {
          natures.add(mention.natureMention);
          return;
        }

        if (!mention.sousTypes?.length) {
          return;
        }

        mapRecursifMentions(mention.sousTypes);
      });

    mapRecursifMentions(typesMention);

    return Array.from(natures);
  }

  public static getIdTypeMentionDepuisIdNature(idNature: string): string | undefined {
    const nature = NatureMention.getEnumFor(idNature);

    let idMention: string;
    let idMentionTrouve: string | undefined;
    const mapRecursifMention = (typesMention: ITypeMention[], premierNiveau: boolean = false) => {
      typesMention.forEach(typeMention => {
        if (idMention && idMentionTrouve === idMention) {
          return;
        }

        if (premierNiveau) {
          idMention = typeMention.id;
        }

        if (typeMention.natureMention === nature) {
          idMentionTrouve = idMention;

          return;
        }

        if (!typeMention.sousTypes?.length) {
          return;
        }

        mapRecursifMention(typeMention.sousTypes);
      });
    };

    mapRecursifMention(this.typesMentions, true);

    return idMentionTrouve;
  }

  private static mapArborescenceVersListe(arborescenceTypesMention: ITypeMention[]): ITypeMention[] {
    const liste: ITypeMention[] = [];
    for (const typeMention of arborescenceTypesMention) {
      if (typeMention.sousTypes && typeMention.sousTypes.length > ZERO) {
        liste.push(typeMention, ...this.mapArborescenceVersListe(typeMention.sousTypes));
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

  public static getTypeMentionParNatureActe(natureActe: NatureActe): ITypeMention[] {
    const typesMention = this.getTypesMention().filter(typeMention => typeMention.natureActe === natureActe);

    if ([NatureActe.NAISSANCE, NatureActe.MARIAGE].includes(natureActe)) {
      typesMention.push(this.getTypeMentionInconnue());
    }

    return typesMention;
  }

  public static getTypeMentionInconnue(): ITypeMention {
    return this.getTypesMention().find(typeMention => NatureActe.estInconnue(typeMention.natureActe)) as ITypeMention;
  }

  public static getIdTypeMentionNationalitePourAjoutMentionDelivrance() {
    return this.getTypesMention().filter(
      typeMention =>
        typeMention.natureMention === NatureMention.getEnumFor(NatureMention.getKeyForCode(NatureMention, NATIONALITE)) &&
        typeMention.estSousType
    )?.[ZERO].id;
  }
}
