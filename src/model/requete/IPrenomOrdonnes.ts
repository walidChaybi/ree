import { IPrenomsNumerotes, TPrenomNumerote } from "@model/form/commun/PrenomsForm";
import { UN } from "@util/Utils";

export interface IPrenomOrdonnes {
  prenom: string;
  numeroOrdre: number;
  estPrenomFrRetenuSdanf?: boolean;
}

export const PrenomsOrdonnes = {
  listeDepuisTableau: (prenoms: string[]): IPrenomOrdonnes[] =>
    prenoms.map((prenom: string, position: number) => ({
      prenom: prenom,
      numeroOrdre: position + UN
    })),
  listeDepuisObjet: (prenoms: IPrenomsNumerotes): IPrenomOrdonnes[] => {
    console.log("prenoms", prenoms);
    return (Object.keys(prenoms) as TPrenomNumerote[]).map((cle, position) => {
      console.log("element : ", prenoms[cle], typeof prenoms[cle]);
      return {
        prenom: prenoms[cle],
        numeroOrdre: position + 1
      };
    });
  }
};
