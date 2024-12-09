export interface IMetamodeleTypeMention {
  idTypeMention: string;
  estSaisieAssistee: boolean;
  metamodelsBlocs: IMetaModelBloc[];
  modeleHandleBars?: string;
}

export interface IMetaModelBloc {
  id: string;
  titre: string;
  // Sera décommenté dans la STRECE 5957, sinon sonar demande de tester l'enum qui n'est pas encore utilisé dans le code
  //typeBloc: ETypeBloc;
  position: number;
  champs: IChamp[];
}

//export enum ETypeBloc {}
// BLOC_EVENEMENT_ETRANGER = "BLOC_EVENEMENT_ETRANGER",
// BLOC_LIEN_MENTION_CONJOINT = "BLOC_LIEN_MENTION_CONJOINT",
// BLOC_AUTORITE_VALIDATION_REGISTRE = "BLOC_AUTORITE_VALIDATION_REGISTRE",
// BLOC_DECISION_VALIDATION_ENREGISTREMENT = "BLOC_DECISION_VALIDATION_ENREGISTREMENT"

export interface IChamp {
  id: string;
  libelle: string;
  position: number;
  type: string;
  obligatoire: boolean;
  exigencesPourValorisation: IExigence[];
}

export interface IExigence {
  idChampReference: string;
  operateur: string;
  valeurs: string[];
}
