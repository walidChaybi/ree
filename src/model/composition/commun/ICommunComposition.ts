import { getValeurOuVide } from "../../../views/common/util/Utils";

export interface ICommunComposition {
  objet_courrier?: string;
  titre?: string;
  numero_requete?: string;
}

export const CommunComposition = {
  ajoutParamCommuns(
    objJson: ICommunComposition,
    numero?: string,
    objet?: string,
    titre?: string
  ) {
    objJson = objJson || {};

    objJson.objet_courrier = objet;
    objJson.titre = titre;
    objJson.numero_requete = getValeurOuVide(numero);
    return objJson;
  }
};
