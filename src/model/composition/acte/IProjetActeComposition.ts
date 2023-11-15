import { ITitulaireComposition } from "../commun/ITitulaireComposition";
import { IMentionComposition } from "../IMentionComposition";

export interface IProjetActeComposition {
  nature_acte: string;
  titulaires_AM: ITitulaireComposition[];
  texte_corps_acte?: string;
  mentions?: IMentionComposition[];
}
