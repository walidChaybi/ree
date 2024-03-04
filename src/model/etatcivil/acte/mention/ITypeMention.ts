import { peupleTypeMention } from "@api/nomenclature/NomenclatureEtatcivil";
import { Options } from "@util/Type";
import { ZERO } from "@util/Utils";
import { NatureActe } from "../../enum/NatureActe";
import { NatureMention } from "../../enum/NatureMention";

export interface ITypeMention {
  id: string;
  libelle: string;
  natureMention: NatureMention;
  natureActe?: NatureActe;
  affecteAnalyseMarginale: boolean;
  sousTypes?: ITypeMention[];
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

  public static getTypesMention(formatListe = false, mapSousType = false) {
    return formatListe
      ? this.mapArborescenceVersListe(this.typesMentions, mapSousType)
      : this.typesMentions;
  }

  public static ajouteTypeMention(typeMention: ITypeMention) {
    this.typesMentions.push(typeMention);
  }

  public static getNaturesMentionPourActe(natureActe: NatureActe) {
    const natures = new Set<NatureMention>();

    // On élimine les natures en doublon
    TypeMention.getTypesMention(true)
      .filter(el => el.natureActe === natureActe)
      .forEach(el => natures.add(el.natureMention));
    return Array.from(natures);
  }

  private static mapArborescenceVersListe(
    arborescenceTypesMention: ITypeMention[],
    mapSousType = false
  ): ITypeMention[] {
    const liste: ITypeMention[] = [];
    for (const typeMention of arborescenceTypesMention) {
      const tempTypeMention: ITypeMention = {
        ...typeMention,
        sousTypes: mapSousType ? typeMention.sousTypes : undefined
      };
      if (typeMention.sousTypes && typeMention.sousTypes.length > ZERO) {
        liste.push(
          tempTypeMention,
          ...this.mapArborescenceVersListe(typeMention.sousTypes, mapSousType)
        );
      } else {
        liste.push(tempTypeMention);
      }
    }
    return liste;
  }

  public static getMentionsById(id: string, mapSousType = false) {
    return TypeMention.getTypesMention(true, mapSousType).find(
      mention => mention.id === id
    );
  }

  public static getMentionsAsOptions(mentions?: ITypeMention[]): Options {
    if (mentions && mentions.length > 0) {
      return mentions.map(mention => {
        return {
          cle: mention.id,
          libelle: mention.libelle
        };
      });
    }
    return TypeMention.getTypesMention().map(mention => {
      return {
        cle: mention.id,
        libelle: mention.libelle
      };
    });
  }

  public static getIdsMentionsChangementAnalyseMarginal() {
    return TypeMention.getTypesMention(true)
      .filter(mention => {
        return mention.affecteAnalyseMarginale;
      })
      .map(mention => {
        return mention.id;
      });
  }
}
