import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { IRequerant, Requerant } from "../../requete/IRequerant";
import { TypeCanal } from "../../requete/enum/TypeCanal";

export interface IRequerantComposition {
  identite_requerant: ICompositionIdentiteRequerant;
  adresse_requerant: ICompositionAdresseRequerant;
}

export interface ICompositionIdentiteRequerant {
  ligne1: string;
  ligne2?: string;
}

interface ICompositionAdresseRequerant {
  ligne2: string;
  ligne3: string;
  ligne4: string;
  ligne5: string;
  ligne6: string;
  ligne7: string;
}

const isNotEmpty = (str: any) => {
  return str && str.length !== 0;
};

const isAdresseToutesLignes = (obj: IRequerantComposition): obj is IRequerantComposition => {
  return (
    isNotEmpty(obj.identite_requerant.ligne2) &&
    isNotEmpty(obj.adresse_requerant.ligne2) &&
    isNotEmpty(obj.adresse_requerant.ligne3) &&
    isNotEmpty(obj.adresse_requerant.ligne5) &&
    isNotEmpty(obj.adresse_requerant.ligne7)
  );
};

export const RequerantComposition = {
  ajoutInfosRequerant(obj: IRequerantComposition, canal?: TypeCanal, requerant?: IRequerant) {
    if (requerant) {
      obj.identite_requerant = Requerant.composerIdentite(requerant);

      if (canal === TypeCanal.COURRIER && requerant.adresse) {
        obj.adresse_requerant = {
          ligne2: requerant.adresse.ligne2,
          ligne3: requerant.adresse.ligne3,
          ligne4: requerant.adresse.ligne4,
          ligne5: requerant.adresse.ligne5,
          ligne6: `${requerant.adresse.codePostal} ${requerant.adresse.ville}`,
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
