import { IMentionComposition } from "../IMentionComposition";
import { ITitulaireComposition } from "../commun/ITitulaireComposition";

export interface IProjetActeComposition {
  nature_acte: string;
  titulaires_AM: ITitulaireComposition[];
  texte_corps_acte?: string;
  mentions?: IMentionComposition[];
}
