import { BesoinUsager } from "./enum/BesoinUsager";
import { ComplementObjetRequete } from "./enum/ComplementObjetRequete";
import { ObjetRequete } from "./enum/ObjetRequete";
import { Provenance } from "./enum/Provenance";
import { SousTypeInformation } from "./enum/SousTypeInformation";
import { IPieceComplementInformation } from "./IPieceComplementInformation";
import { IReponseRequeteInfo } from "./IReponseRequeteInfo";
import { IRequete } from "./IRequete";

export interface IRequeteInformation extends IRequete {
  sousType: SousTypeInformation;
  objet: ObjetRequete;
  complementObjet: ComplementObjetRequete;
  commentaire: string;
  reponse: IReponseRequeteInfo;
  provenanceRequete: Provenance;
  numeroRequeteLiee: string;
  piecesComplementInformation: IPieceComplementInformation;
  besoinUsager: BesoinUsager;
}
