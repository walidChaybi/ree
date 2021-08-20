import { getValeurOuVide } from "../../../views/common/util/Utils";

export interface ICommunComposition {
  objet_courrier?: string;
  titre?: string;
  numero_requete?: string;
}

export const CommunComposition = {
  ajoutParametres(
    obj: ICommunComposition,
    numero?: string,
    objet?: string,
    titre?: string
  ) {
    obj = obj || {};

    obj.objet_courrier = objet;
    obj.titre = titre;
    obj.numero_requete = getValeurOuVide(numero);
    return obj;
  }
};
