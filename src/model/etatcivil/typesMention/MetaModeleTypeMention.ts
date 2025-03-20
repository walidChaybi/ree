import { ConditionChamp, IConditionChampDto } from "@model/form/commun/ConditionChamp";
import { ObjetFormulaire, TObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import dayjs from "dayjs";
import SchemaValidation from "../../../utils/SchemaValidation";

export enum ETypeChamp {
  TEXT = "text",
  SELECT = "select",
  DATE_COMPLETE = "dateComplete",
  DATE_INCOMPLETE = "dateIncomplete",
  ANNEE = "annee",
  INT = "int",
  BOOLEAN = "boolean",
  SOUS_TITRE = "sousTitre",
  RADIO = "radioBouton",
  POCOPA = "pocopa",
  CRPCEN = "crpcen",
  NOM_SECABLE = "nomSecable"
}
interface IValeursConditionneesMetaModeleDto {
  valeurs: string[];
  conditions: IConditionChampDto[];
}
interface IChampMetaModeleDto {
  id: string;
  libelle: string;
  position: number;
  type: ETypeChamp;
  estObligatoire: IConditionChampDto[];
  estAffiche: IConditionChampDto[];
  estLectureSeule: IValeursConditionneesMetaModeleDto[];
  valeursPossibles: IValeursConditionneesMetaModeleDto[];
  valeurParDefaut?: string;
}
interface IBlocMetaModeleDto {
  id: string;
  titre: string;
  position: number;
  typeBloc: string;
  champs: IChampMetaModeleDto[];
}
export interface IMetaModeleTypeMentionDto {
  idTypeMention: string;
  estSaisieAssistee: boolean;
  metamodelsBlocs: IBlocMetaModeleDto[];
  modeleTexte?: string;
}

export class ValeursConditionneesMetaModele {
  private constructor(
    public readonly valeurs: string[],
    public readonly conditions: ConditionChamp[]
  ) {}

  public static depuisDto(dto: IValeursConditionneesMetaModeleDto): ValeursConditionneesMetaModele | null {
    const conditions = ConditionChamp.depuisTableau(dto.conditions ?? []);
    if (!dto.valeurs?.length || !conditions.length) {
      return null;
    }

    return new ValeursConditionneesMetaModele(dto.valeurs, conditions);
  }

  public static depuisTableau(dto: IValeursConditionneesMetaModeleDto[]): ValeursConditionneesMetaModele[] {
    return dto.reduce(
      (listeValeursPossibles: ValeursConditionneesMetaModele[], valeursPossiblesDto: IValeursConditionneesMetaModeleDto) => {
        const valeursPossibles = ValeursConditionneesMetaModele.depuisDto(valeursPossiblesDto);
        if (valeursPossibles) {
          listeValeursPossibles.push(valeursPossibles);
        }

        return listeValeursPossibles;
      },
      []
    );
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
    public readonly type: ETypeChamp,
    public readonly estObligatoire: ConditionChamp[],
    public readonly estAffiche: ConditionChamp[],
    public readonly estLectureSeule: ValeursConditionneesMetaModele[],
    public readonly valeursPossibles: ValeursConditionneesMetaModele[],
    public readonly valeurParDefaut?: string
  ) {}

  public static depuisDto(dto: IChampMetaModeleDto): ChampMetaModele | null {
    if (ChampMetaModele.champsObligatoires.some(cle => dto[cle] === undefined) && !Object.values(ETypeChamp).includes(dto.type)) {
      console.error(`Le champ ${dto.id} du metamodele n'est pas conforme`);
      return null;
    }

    return new ChampMetaModele(
      dto.id,
      dto.libelle,
      dto.position,
      dto.type,
      ConditionChamp.depuisTableau(dto.estObligatoire ?? []),
      ConditionChamp.depuisTableau(dto.estAffiche ?? []),
      ValeursConditionneesMetaModele.depuisTableau(dto.estLectureSeule ?? []),
      ValeursConditionneesMetaModele.depuisTableau(dto.valeursPossibles ?? []),
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

  public valeurLectureSeule(valeurs: TObjetFormulaire): string | null {
    if (this.estLectureSeule.length === 0) return null;
    return (
      this.estLectureSeule.find(condition => condition.conditions.some(condition => condition.estRespectee(valeurs)))?.valeurs[0] ?? ""
    );
  }
}

export class BlocMetaModele {
  private static readonly champsObligatoires: (keyof IBlocMetaModeleDto)[] = ["id", "titre", "position", "typeBloc"];

  private constructor(
    public readonly id: string,
    public readonly titre: string,
    public readonly position: number,
    public readonly typeBloc: string,
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

    return new BlocMetaModele(dto.id, dto.titre, dto.position, dto.typeBloc, champs);
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
    public readonly modeleTexte: string
  ) {}

  public static depuisDto(dto: IMetaModeleTypeMentionDto): MetaModeleTypeMention | null {
    if (MetaModeleTypeMention.champsObligatoires.some(cle => dto[cle] === undefined)) {
      return null;
    }
    return new MetaModeleTypeMention(
      dto.idTypeMention,
      dto.estSaisieAssistee,
      BlocMetaModele.depuisTableau(dto.metamodelsBlocs ?? []),
      dto.modeleTexte ?? ""
    );
  }

  public get schemaValidation() {
    return this.metamodelsBlocs.reduce((schemaValidationBlocs, bloc) => {
      const schemaValidationBloc = bloc.champs.reduce((champs, champ) => {
        const validationChamp = (() => {
          switch (champ.type) {
            case "text":
            case "radioBouton":
            case "pocopa":
              return SchemaValidation.texte({ obligatoire: champ.estObligatoire });
            case "crpcen":
              return SchemaValidation.texte({
                obligatoire: champ.estObligatoire,
                regexp: { valeur: new RegExp(/^\d{5}$/), message: "⚠ Saisir 5 caractères numériques" }
              });
            case "int":
              return SchemaValidation.entier({ obligatoire: champ.estObligatoire });
            case "annee":
              return SchemaValidation.entier({
                obligatoire: champ.estObligatoire,
                min: { valeur: 1000, message: "⚠ L'année doit être sur 4 chiffres" },
                max: { valeur: dayjs().get("year"), message: "⚠ L'année ne peut pas être supérieure à l'année actuelle" }
              });
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
            case "nomSecable":
              return SchemaValidation.nomSecable({ obligatoire: champ.estObligatoire });
            default:
              return SchemaValidation.inconnu();
          }
        })();

        return { ...champs, [champ.id]: validationChamp };
      }, {});

      return { ...schemaValidationBlocs, [bloc.id]: SchemaValidation.objet(schemaValidationBloc) };
    }, {});
  }

  public valeursInitiales(valeursMiseAJour?: TObjetFormulaire) {
    return this.metamodelsBlocs.reduce(
      (valeursInitialesBlocs, bloc) => ({
        ...valeursInitialesBlocs,
        [bloc.id]: bloc.champs.reduce((champs, champ) => {
          const valeurMiseAJour = ObjetFormulaire.recupererValeur({
            valeurs: valeursMiseAJour ?? {},
            cleAttribut: `${bloc.id}.${champ.id}`
          });

          return {
            ...champs,
            [champ.id]: ["string", "number", "boolean", "object"].includes(typeof valeurMiseAJour)
              ? valeurMiseAJour
              : (() => {
                  switch (champ.type) {
                    case "text":
                    case "int":
                    case "pocopa":
                    case "crpcen":
                      return champ.valeurParDefaut ?? "";
                    case "dateComplete":
                    case "dateIncomplete":
                      return {
                        jour: "",
                        mois: "",
                        annee: ""
                      };
                    case "nomSecable":
                      return {
                        nom: "",
                        secable: false,
                        nomPartie1: "",
                        nomPartie2: ""
                      };
                    case "boolean":
                      return champ.valeurParDefaut === "true";
                    case "radioBouton":
                      return champ.valeurParDefaut ?? "";
                    case "select":
                      return champ.valeurParDefaut ?? "";
                    default:
                      return champ.valeurParDefaut ?? "";
                  }
                })()
          };
        }, {})
      }),
      {}
    );
  }
}
