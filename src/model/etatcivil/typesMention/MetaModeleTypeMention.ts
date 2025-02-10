// A tester Alex 5/02/25
/* v8 ignore start */
import { ConditionChamp, IConditionChampDto } from "@model/form/commun/ConditionChamp";
import { TObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import SchemaValidation from "../../../utils/SchemaValidation";

interface IValeursPossiblesMetaModeleDto {
  valeurs: string[];
  conditions: IConditionChampDto[];
}

interface IChampMetaModeleDto {
  id: string;
  libelle: string;
  position: number;
  type: string;
  estObligatoire: IConditionChampDto[];
  estAffiche: IConditionChampDto[];
  valeursPossibles: IValeursPossiblesMetaModeleDto[];
  valeurParDefaut?: string;
}

interface IBlocMetaModeleDto {
  id: string;
  titre: string;
  position: number;
  champs: IChampMetaModeleDto[];
}

export interface IMetaModeleTypeMentionDto {
  idTypeMention: string;
  estSaisieAssistee: boolean;
  metamodelsBlocs: IBlocMetaModeleDto[];
  modeleHandleBars?: string;
}

export class ValeursPossiblesMetaModele {
  private constructor(
    public readonly valeurs: string[],
    public readonly conditions: ConditionChamp[]
  ) {}

  public static depuisDto(dto: IValeursPossiblesMetaModeleDto): ValeursPossiblesMetaModele | null {
    const conditions = ConditionChamp.depuisTableau(dto.conditions ?? []);
    if (!dto.valeurs?.length || !conditions.length) {
      return null;
    }

    return new ValeursPossiblesMetaModele(dto.valeurs, conditions);
  }

  public static depuisTableau(dto: IValeursPossiblesMetaModeleDto[]): ValeursPossiblesMetaModele[] {
    return dto.reduce((listeValeursPossibles: ValeursPossiblesMetaModele[], valeursPossiblesDto: IValeursPossiblesMetaModeleDto) => {
      const valeursPossibles = ValeursPossiblesMetaModele.depuisDto(valeursPossiblesDto);
      if (valeursPossibles) {
        listeValeursPossibles.push(valeursPossibles);
      }

      return listeValeursPossibles;
    }, []);
  }

  public sontUtilisables(valeurs: TObjetFormulaire): boolean {
    return this.conditions.every(condition => condition.estRespectee(valeurs));
  }
}

export class ChampMetaModele {
  private static readonly champsObligatoires: (keyof IChampMetaModeleDto)[] = ["id", "libelle", "position", "type"];

  private constructor(
    public readonly id: string,
    public readonly libelle: string,
    public readonly position: number,
    public readonly type: string,
    public readonly estObligatoire: ConditionChamp[],
    public readonly estAffiche: ConditionChamp[],
    public readonly valeursPossibles: ValeursPossiblesMetaModele[],
    public readonly valeurParDefaut?: string
  ) {}

  public static depuisDto(dto: IChampMetaModeleDto): ChampMetaModele | null {
    if (ChampMetaModele.champsObligatoires.some(cle => dto[cle] === undefined)) {
      return null;
    }

    return new ChampMetaModele(
      dto.id,
      dto.libelle,
      dto.position,
      dto.type,
      ConditionChamp.depuisTableau(dto.estObligatoire ?? []),
      ConditionChamp.depuisTableau(dto.estAffiche ?? []),
      ValeursPossiblesMetaModele.depuisTableau(dto.valeursPossibles ?? []),
      dto.valeurParDefaut
    );
  }

  public static depuisTableau(dtos: IChampMetaModeleDto[]): ChampMetaModele[] {
    return dtos
      .reduce((listeChamps: ChampMetaModele[], champDto: IChampMetaModeleDto) => {
        const champ = ChampMetaModele.depuisDto(champDto);
        if (champ) {
          listeChamps.push(champ);
        }

        return listeChamps;
      }, [])
      .sort((champA, champB) => champA.position - champB.position);
  }

  public estAffichable(valeurs: TObjetFormulaire): boolean {
    return this.estAffiche.every(condition => condition.estRespectee(valeurs));
  }
}

export class BlocMetaModele {
  private static readonly champsObligatoires: (keyof IBlocMetaModeleDto)[] = ["id", "titre", "position"];

  private constructor(
    public readonly id: string,
    public readonly titre: string,
    public readonly position: number,
    public readonly champs: ChampMetaModele[]
  ) {}

  public static depuisDto(dto: IBlocMetaModeleDto) {
    if (BlocMetaModele.champsObligatoires.some(cle => dto[cle] === undefined)) {
      return null;
    }

    const champs = ChampMetaModele.depuisTableau(dto.champs ?? []);
    if (!champs.length) {
      return null;
    }

    return new BlocMetaModele(dto.id, dto.titre, dto.position, champs);
  }

  public static depuisTableau(dtos: IBlocMetaModeleDto[]): BlocMetaModele[] {
    return dtos
      .reduce((listeBlocs: BlocMetaModele[], blocDto: IBlocMetaModeleDto) => {
        const bloc = BlocMetaModele.depuisDto(blocDto);
        if (bloc) {
          listeBlocs.push(bloc);
        }

        return listeBlocs;
      }, [])
      .sort((blocA, blocB) => blocA.position - blocB.position);
  }
}

export class MetaModeleTypeMention {
  private static readonly champsObligatoires: (keyof IMetaModeleTypeMentionDto)[] = ["idTypeMention", "estSaisieAssistee"];

  private constructor(
    public readonly idTypeMention: string,
    public readonly estSaisieAssistee: boolean,
    public readonly metamodelsBlocs: BlocMetaModele[],
    public readonly modeleHandleBars: string
  ) {}

  public static depuisDto(dto: IMetaModeleTypeMentionDto): MetaModeleTypeMention | null {
    if (MetaModeleTypeMention.champsObligatoires.some(cle => dto[cle] === undefined)) {
      return null;
    }

    return new MetaModeleTypeMention(
      dto.idTypeMention,
      dto.estSaisieAssistee,
      BlocMetaModele.depuisTableau(dto.metamodelsBlocs ?? []),
      dto.modeleHandleBars ?? ""
    );
  }

  public get schemaValidation() {
    return this.metamodelsBlocs.reduce((schemaValidationBlocs, bloc) => {
      const schemaValidationBloc = bloc.champs.reduce((champs, champ) => {
        const validationChamp = (() => {
          switch (champ.type) {
            case "text":
              return SchemaValidation.texte({ obligatoire: champ.estObligatoire });
            case "int":
              return SchemaValidation.entier({ obligatoire: champ.estObligatoire });
            case "annee":
              return SchemaValidation.entier({ obligatoire: champ.estObligatoire, estAnnee: true });
            case "boolean":
              return SchemaValidation.booleen({ obligatoire: champ.estObligatoire });
            case "select":
              return SchemaValidation.listeDeroulante({
                valeursPossibles: champ.valeursPossibles,
                obligatoire: champ.estObligatoire
              });
            case "dateComplete":
              return SchemaValidation.dateComplete({ obligatoire: champ.estObligatoire, bloquerDateFutur: true });
            case "dateIncomplete":
              return SchemaValidation.dateIncomplete({ obligatoire: champ.estObligatoire, bloquerDateFutur: true });
            default:
              return SchemaValidation.inconnu();
          }
        })();

        return { ...champs, [champ.id]: validationChamp };
      }, {});

      return { ...schemaValidationBlocs, [bloc.id]: SchemaValidation.objet(schemaValidationBloc) };
    }, {});
  }

  public valeursInitiales() {
    return this.metamodelsBlocs.reduce((valeursInitialesBlocs, bloc) => {
      const valeursInitialesBloc = bloc.champs.reduce((champs, champ) => {
        const valeurInitaleChamp = (() => {
          switch (champ.type) {
            case "text":
            case "int":
              return "";
            case "dateComplete":
            case "dateIncomplete":
              return {
                jour: "",
                mois: "",
                annee: ""
              };
            case "boolean":
              return champ.valeurParDefaut === "true";
            case "select":
              return champ.valeurParDefaut ?? "";
            default:
              return "";
          }
        })();

        return { ...champs, [champ.id]: valeurInitaleChamp };
      }, {});

      return { ...valeursInitialesBlocs, [bloc.id]: valeursInitialesBloc };
    }, {});
  }
}
/* v8 ignore end */
