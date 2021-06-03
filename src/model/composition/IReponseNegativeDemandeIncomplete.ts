import { IParametresComposition } from "./IParametresComposition";

export const NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE = "CARN_CSPAC_01.pdf";
export interface IReponseNegativeDemandeIncomplete
  extends IParametresComposition {
  objet_courrier: string;
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
