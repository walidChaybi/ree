import { getDateDuJour } from "../../../views/common/util/DateUtils";
import { getValeurOuVide } from "../../../views/common/util/Utils";

export interface ICommunComposition {
  objet_courrier?: string;
  titre?: string;
  numero_requete?: string;
  date_jour?: string;
}

export const CommunComposition = {
  ajoutParamCommuns(
    objJson: ICommunComposition,
    numero?: string,
    objet?: string,
    titre?: string,
    dateDujour = false
  ) {
    objJson = objJson || {};

    objJson.objet_courrier = objet;
    objJson.titre = titre;
    objJson.numero_requete = getValeurOuVide(numero);
    if (dateDujour) {
      objJson.date_jour = getDateDuJour();
    }
    return objJson;
  },

  ajoutDateDujour(objJson: ICommunComposition) {
    return this.ajoutParamCommuns(
      objJson,
      undefined,
      undefined,
      undefined,
      true
    );
  }
};
