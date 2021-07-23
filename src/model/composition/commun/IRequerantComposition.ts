import { getValeurOuVide } from "../../../views/common/util/Utils";
import { LieuxUtils } from "../../LieuxUtils";
import { IRequerant } from "../../requete/v2/IRequerant";

export interface IRequerantComposition {
  identite_requerant: string;
  adresse_requerant: {
    ligne2: string;
    ligne3: string;
    ligne4: string;
    ligne5: string;
    ligne6: string;
    ligne7: string;
  };
}

export const RequerantComposition = {
  ajoutInfosRequerant(obj: IRequerantComposition, requerant?: IRequerant) {
    if (requerant) {
      obj.identite_requerant = `${requerant.nomFamille} ${requerant.prenom}`;

      if (requerant.adresse) {
        obj.adresse_requerant = {
          ligne2: getValeurOuVide(requerant.adresse.ligne2),
          ligne3: getValeurOuVide(requerant.adresse.ligne3),
          ligne4: getValeurOuVide(requerant.adresse.ligne4),
          ligne5: getValeurOuVide(requerant.adresse.ligne5),
          ligne6: `${getValeurOuVide(
            requerant.adresse.codePostal
          )} ${getValeurOuVide(requerant.adresse.ville)}`,
          ligne7: LieuxUtils.affichagePaysCourrier(requerant.adresse.pays)
        };
      }
    }
  }
};
