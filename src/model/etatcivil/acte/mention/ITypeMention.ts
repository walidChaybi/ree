import { ITypeMentionDto } from "@api/configurations/etatCivil/nomenclature/GetTypesMentionConfigApi";
import { Options } from "@util/Type";
import { ZERO } from "@util/Utils";
import { NatureActe } from "../../enum/NatureActe";
import { INatureMention, NATIONALITE, NatureMention } from "../../enum/NatureMention";

export interface ITypeMention {
  id: string;
  libelle: string;
  natureMention: INatureMention | null;
  natureActe?: NatureActe;
  sousTypes?: ITypeMention[];
  affecteAnalyseMarginale: boolean;
  estPresentListeDeroulante: boolean;
  estSousType: boolean;
  estSaisieAssistee: boolean;
}

export class TypeMention {
  private static liste: ITypeMention[] | null = null;

  private static depuisDto(typeMentionDto: ITypeMentionDto): ITypeMention {
    const natureMention = typeMentionDto.idNatureMention ? NatureMention.depuisId(typeMentionDto.idNatureMention) : null;
    const sousTypes = typeMentionDto.typeMentionEnfantList?.map(dtoEnfant => TypeMention.depuisDto(dtoEnfant)) ?? [];

    return {
      id: typeMentionDto.idTypeMention,
      libelle: typeMentionDto.libelleType,
      natureActe: NatureActe.getEnumFor(typeMentionDto.natureActe),
      ...{ natureMention: natureMention },
      ...(sousTypes.length ? { sousTypes: sousTypes } : {}),
      affecteAnalyseMarginale: typeMentionDto.affecteAnalyseMarginale,
      estPresentListeDeroulante: typeMentionDto.estPresentListeDeroulante,
      estSousType: typeMentionDto.estSousType,
      estSaisieAssistee: typeMentionDto.estSaisieAssistee
    };
  }

  public static init(typeMentionDtos: ITypeMentionDto[]) {
    if (TypeMention.liste !== null) {
      return;
    }

    TypeMention.liste = typeMentionDtos.map(typeMentionDto => TypeMention.depuisDto(typeMentionDto));
  }

  public static getTypesMention(formatListe = false) {
    return formatListe ? TypeMention.mapArborescenceVersListe(TypeMention.liste ?? []) : (TypeMention.liste ?? []);
  }

  public static getNatureMention(typesMention: ITypeMention[]): INatureMention[] {
    const natures = new Set<INatureMention>();
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
    const nature = NatureMention.depuisId(idNature);

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

    mapRecursifMention(this.liste ?? [], true);

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
      typeMention => typeMention.natureMention === NatureMention.depuisCode(NATIONALITE) && typeMention.estSousType
    )?.[ZERO].id;
  }
}
