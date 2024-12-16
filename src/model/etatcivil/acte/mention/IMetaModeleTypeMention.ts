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

export interface IChamp {
  id: string;
  libelle: string;
  position: number;
  type: string;
  obligatoire: boolean | IExigence[];
  exigencesPourValorisation: IExigence[];
  options: string[];
}

export interface IExigence {
  idChampReference: string;
  operateur: string;
  valeurs: string[];
}
