import { getValeurOuVide } from "../../../views/common/util/Utils";
import { LieuxUtils } from "../../LieuxUtils";
import { TypeCanal } from "../../requete/v2/enum/TypeCanal";
import { IRequerant, Requerant } from "../../requete/v2/IRequerant";

export interface IRequerantComposition {
  identite_requerant: {
    ligne1: string;
    ligne2?: string;
  };
  adresse_requerant: {
    ligne2: string;
    ligne3: string;
    ligne4: string;
    ligne5: string;
    ligne6: string;
    ligne7: string;
  };
}

function isNotEmpty(str: any) {
  return str && str.length !== 0;
}

function isAdresseToutesLignes(
  obj: IRequerantComposition
): obj is IRequerantComposition {
  return (
    isNotEmpty(obj.identite_requerant.ligne2) &&
    isNotEmpty(obj.adresse_requerant.ligne2) &&
    isNotEmpty(obj.adresse_requerant.ligne3) &&
    isNotEmpty(obj.adresse_requerant.ligne5) &&
    isNotEmpty(obj.adresse_requerant.ligne7)
  );
}

export const RequerantComposition = {
  ajoutInfosRequerant(
    obj: IRequerantComposition,
    canal?: TypeCanal,
    requerant?: IRequerant
  ) {
    if (requerant) {
      obj.identite_requerant = {
        ligne1: ""
      };
      // Affichage de l'identité du requérant sur 1 ou 2 lignes selon le type
      const identiteRequerant = Requerant.organiserIdentite(requerant);
      obj.identite_requerant.ligne1 = identiteRequerant.premiereLigne;
      if (identiteRequerant.deuxiemeLigne !== "") {
        obj.identite_requerant.ligne2 = identiteRequerant.deuxiemeLigne;
      }

      if (canal === TypeCanal.COURRIER && requerant.adresse) {
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

        if (isAdresseToutesLignes(obj)) {
          obj.adresse_requerant.ligne2 = `${obj.adresse_requerant.ligne2} ${obj.adresse_requerant.ligne3}`;
          obj.adresse_requerant.ligne3 = obj.adresse_requerant.ligne4;
          obj.adresse_requerant.ligne4 = obj.adresse_requerant.ligne5;
          obj.adresse_requerant.ligne5 = obj.adresse_requerant.ligne6;
          obj.adresse_requerant.ligne6 = obj.adresse_requerant.ligne7;
          obj.adresse_requerant.ligne7 = "";
        }
      }
    }
  }
};
