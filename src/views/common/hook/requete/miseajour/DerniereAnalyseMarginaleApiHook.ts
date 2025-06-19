import { IPrenomOrdonnes } from "./../../../../../model/requete/IPrenomOrdonnes";

export interface IDerniereAnalyseMarginalResultat {
  id: string;
  dateDebut: number;
  estValide: boolean;
  motif: string;
  titulaire: {
    nom: string;
    prenoms: IPrenomOrdonnes[];
    ordre: number;
    nomPartie1: string;
    nomPartie2: string;
  };
}
