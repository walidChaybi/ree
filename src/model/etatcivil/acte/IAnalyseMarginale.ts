import { estDateAtteinte } from "../../../views/common/util/DateUtils";
import {
  triListeObjetsSurDate,
  triListeObjetsSurPropriete
} from "../../../views/common/util/Utils";
import { ITitulaireActe } from "./ITitulaireActe";

export interface IAnalyseMarginale {
  dateDebut: Date;
  dateFin?: Date;
  nomOec: string;
  prenomOec: string;
  motifModification: string;
  titulaires: ITitulaireActe[];
}

export interface ITitulairesAM {
  titulaireAM1?: ITitulaireActe;
  titulaireAM2?: ITitulaireActe;
}

export const AnalyseMarginale = {
  getTitulairesDansLOrdre(am?: IAnalyseMarginale): ITitulairesAM {
    let resultatTitulairesAM: ITitulairesAM = {};
    if (am) {
      const titulaires = triListeObjetsSurPropriete(
        [...am.titulaires],
        "ordre"
      );
      resultatTitulairesAM = {
        titulaireAM1: titulaires[0],
        titulaireAM2: titulaires[1]
      };
    }

    return resultatTitulairesAM;
  },

  /**
   * Retourne l'AM la plus récente. ie: la ate de début est la plus récente et la date de fin est vide ou non atteinte
   */
  getAnalyseMarginaleLaPlusRecente(
    analyseMarginales?: IAnalyseMarginale[]
  ): IAnalyseMarginale | undefined {
    let analyseMarginaleLaPlusRecente: IAnalyseMarginale | undefined;

    if (analyseMarginales && analyseMarginales.length > 0) {
      const analyseMarginalesTries = triListeObjetsSurDate(
        [...analyseMarginales],
        "dateDebut"
      );

      let idx = analyseMarginalesTries.length - 1;
      analyseMarginaleLaPlusRecente = analyseMarginalesTries[idx];
      while (
        analyseMarginaleLaPlusRecente &&
        analyseMarginaleLaPlusRecente.dateFin &&
        estDateAtteinte(analyseMarginaleLaPlusRecente.dateFin)
      ) {
        idx--;
        analyseMarginaleLaPlusRecente = analyseMarginalesTries[idx];
      }

      // si toutes les analyses marginales ont une date de fin révolue alors on prend la plus récente
      if (!analyseMarginaleLaPlusRecente) {
        analyseMarginaleLaPlusRecente =
          analyseMarginalesTries[analyseMarginalesTries.length - 1];
      }
    }

    return analyseMarginaleLaPlusRecente;
  }
};
