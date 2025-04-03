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
    }))
};
