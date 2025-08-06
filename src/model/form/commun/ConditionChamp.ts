// A tester Alex 5/02/25
/* v8 ignore start */
import Texte from "../../../utils/Texte";
import { ObjetFormulaire, TObjetFormulaire, TValeurFormulaire } from "./ObjetFormulaire";

export enum EOperateurCondition {
  TOUJOURS_VRAI = "AlwaysTrue",
  TOUJOURS_FAUX = "AlwaysFalse",
  EGAL = "==",
  DIFF = "!="
}

export interface IConditionChampDto {
  idChampReference: string | null;
  operateur: EOperateurCondition;
  valeurs: string[] | null;
}

export class ConditionChamp {
  private constructor(
    public readonly idChampReference: string,
    public readonly operateur: EOperateurCondition,
    public readonly valeurs: string[]
  ) {}

  public static depuisDto(conditionDto: IConditionChampDto): ConditionChamp | null {
    if (!conditionDto.operateur || !Object.values(EOperateurCondition).includes(conditionDto.operateur)) {
      console.error(`La condition du champ ${conditionDto.idChampReference} n'est pas conforme`);

      return null;
    }

    return new ConditionChamp(conditionDto.idChampReference ?? "", conditionDto.operateur, conditionDto.valeurs ?? []);
  }

  public static depuisTableau(conditionDtos: IConditionChampDto[]): ConditionChamp[] {
    return conditionDtos.reduce((listeConditions: ConditionChamp[], conditionDto: IConditionChampDto) => {
      const exigence = ConditionChamp.depuisDto(conditionDto);

      if (exigence) {
        listeConditions.push(exigence);
      }

      return listeConditions;
    }, []);
  }

  public static depuisTableauConditionComplexe(
    conditionDtos: (IConditionChampDto | IConditionChampDto[])[]
  ): (ConditionChamp | ConditionChamp[])[] {
    return conditionDtos.reduce(
      (listeConditions: (ConditionChamp | ConditionChamp[])[], conditionDto: IConditionChampDto | IConditionChampDto[]) => {
        const exigence = Array.isArray(conditionDto)
          ? conditionDto
              .map(condition => ConditionChamp.depuisDto(condition))
              .reduce<ConditionChamp[]>((conditions, valeur) => {
                if (valeur !== null) {
                  conditions.push(valeur);
                }
                return conditions;
              }, [])
          : ConditionChamp.depuisDto(conditionDto);

        if (exigence) {
          listeConditions.push(exigence);
        }

        return listeConditions;
      },
      []
    );
  }

  public estRespecteePourValeur(valeur: TValeurFormulaire) {
    switch (this.operateur) {
      case EOperateurCondition.TOUJOURS_VRAI:
        return true;
      case EOperateurCondition.TOUJOURS_FAUX:
        return false;
      default:
        return ((): boolean => {
          const valeurSaisie = Texte.normalise(ObjetFormulaire.recupererValeurTexte({ valeurs: { cle: valeur }, cleAttribut: "cle" }));
          const conditionRespectee = this.valeurs.some(valeur => Texte.normalise(valeur) === valeurSaisie);

          return this.operateur === EOperateurCondition.EGAL ? conditionRespectee : !conditionRespectee;
        })();
    }
  }

  public estRespectee(valeurs: TObjetFormulaire): boolean {
    switch (this.operateur) {
      case EOperateurCondition.TOUJOURS_VRAI:
        return true;
      case EOperateurCondition.TOUJOURS_FAUX:
        return false;
      default:
        return ((): boolean => {
          const valeurSaisie = Texte.normalise(
            ObjetFormulaire.recupererValeurTexte({ valeurs: valeurs, cleAttribut: this.idChampReference })
          );
          const conditionRespectee = this.valeurs.some(valeur => Texte.normalise(valeur) === valeurSaisie);

          return this.operateur === EOperateurCondition.EGAL ? conditionRespectee : !conditionRespectee;
        })();
    }
  }
}
/* v8 ignore end */
