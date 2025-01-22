export interface IMetamodeleTypeMention {
  idTypeMention: string;
  estSaisieAssistee: boolean;
  metamodelsBlocs: IMetaModelBloc[];
  modeleHandleBars?: string;
}

export interface IMetaModelBloc {
  id: string;
  titre: string;
  position: number;
  champs: IChamp[];
}

export interface IValeursPossibles {
  valeurs: string[];
  conditions: IExigence[];
}

export interface IChamp {
  id: string;
  libelle: string;
  position: number;
  type: string;
  estObligatoire: IExigence[];
  estAffiche: IExigence[];
  valeursPossibles: IValeursPossibles[];
  valeurParDefaut?: string;
}

export interface IExigence {
  idChampReference: string;
  operateur: string;
  valeurs: string[];
}
