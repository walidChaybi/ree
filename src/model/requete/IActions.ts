/* istanbul ignore file */
import DateUtils from "@util/DateUtils";
import { chainesEgalesIgnoreCasseEtAccent, premiereLettreEnMajuscule } from "@util/Utils";

export interface IAction {
  id: string;
  numeroOrdre: number;
  libelle: string;
  dateAction: number;
  idUtilisateur: string;
  trigramme: string;
  nomUtilisateur?: string;
  prenomUtilisateur?: string;
}

const A_SIGNER = "a signer";
const A_REVOIR = "a revoir";

export const Action = {
  getLibelle(action?: IAction): string {
    return action ? premiereLettreEnMajuscule(action.libelle) : "";
  },
  getDateAction(action?: IAction): string {
    return action ? DateUtils.getFormatDateFromTimestamp(action.dateAction) : "";
  },
  estASigner(action?: IAction): boolean {
    return chainesEgalesIgnoreCasseEtAccent(action?.libelle, A_SIGNER);
  },
  estARevoir(action?: IAction): boolean {
    return chainesEgalesIgnoreCasseEtAccent(action?.libelle, A_REVOIR);
  },
  getActionAvantActionsASigner(actions?: IAction[]): IAction | undefined {
    const actionsDansLOrdre: IAction[] = this.getActionsDansLOrdre(actions);
    let actionCourante = actionsDansLOrdre.pop();
    while (actionsDansLOrdre.length > 0 && Action.estASigner(actionCourante)) {
      actionCourante = actionsDansLOrdre.pop();
    }
    return actionCourante;
  },
  getActionsDansLOrdre(actions?: IAction[]) {
    return actions ? [...actions].sort((action1, action2) => action1.numeroOrdre - action2.numeroOrdre) : [];
  }
};
