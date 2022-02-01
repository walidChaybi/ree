import { estDateAtteinte } from "../../../views/common/util/DateUtils";
import { triListeObjetsSurPropriete } from "../../../views/common/util/Utils";
import { ITitulaireActe } from "./ITitulaireActe";

export interface IAnalyseMarginale {
  dateDebut: Date;
  dateFin?: Date;
  nomOec: string;
  prenomOec: string;
  motifModification: string;
  titulaires: ITitulaireActe[];
}

interface ITitulairesAM {
  titulaireAM1?: ITitulaireActe;
  titulaireAM2?: ITitulaireActe;
}

export const AnalyseMarginale = {
  getTitulairesDansLeBonOrdre(am?: IAnalyseMarginale): ITitulairesAM {
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
  getLaBonneAnalyseMarginale(
    analyseMarginales: IAnalyseMarginale[]
  ): IAnalyseMarginale | undefined {
    let analyseMarginaleLaPlusRecente: IAnalyseMarginale;

    const analyseMarginalesTries = triListeObjetsSurPropriete(
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
      analyseMarginaleLaPlusRecente =
        analyseMarginalesTries[analyseMarginalesTries.length - idx];
    }

    return analyseMarginaleLaPlusRecente;
  }
};
