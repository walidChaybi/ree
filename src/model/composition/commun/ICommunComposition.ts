import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import DateUtils from "@util/DateUtils";
import { getValeurOuVide } from "@util/Utils";

export interface ICommunComposition {
  objet_courrier?: string;
  titre?: string;
  numero_requete?: string;
  date_jour?: string;
  date_delivrance: string;
  titulaire?: ITitulaireRequete;
  prenom_titulaire?: string;
  nom_titulaire?: string;
}

export const CommunComposition = {
  ajoutParamCommuns(
    objJson: ICommunComposition,
    numero?: string,
    objet?: string,
    titre?: string,
    dateDujour = false,
    dateDelivrance = false
  ) {
    objJson = objJson || {};

    objJson.objet_courrier = objet;
    objJson.titre = titre;
    objJson.numero_requete = getValeurOuVide(numero);
    if (dateDujour) {
      objJson.date_jour = DateUtils.getDateDuJour();
    }
    if (dateDelivrance) {
      objJson.date_delivrance = DateUtils.getDateFormatJasper(new Date());
    }
    return objJson;
  },

  ajoutDateDeDelivrance(objJson: ICommunComposition) {
    return this.ajoutParamCommuns(objJson, undefined, undefined, undefined, false, true);
  },

  ajoutDateDujour(objJson: ICommunComposition) {
    return this.ajoutParamCommuns(objJson, undefined, undefined, undefined, true);
  }
};
