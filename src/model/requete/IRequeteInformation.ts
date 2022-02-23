import { BesoinUsager } from "./enum/BesoinUsager";
import { ComplementObjetRequete } from "./enum/ComplementObjetRequete";
import { ObjetRequete } from "./enum/ObjetRequete";
import { Provenance } from "./enum/Provenance";
import { SousTypeInformation } from "./enum/SousTypeInformation";
import { TypeRequete } from "./enum/TypeRequete";
import { IReponseRequeteInfo } from "./IReponseRequeteInfo";
import { IRequete } from "./IRequete";
import { IPieceComplementInformation } from "./pieceJointe/IPieceComplementInformation";

export interface IRequeteInformation extends IRequete {
  sousType: SousTypeInformation;
  objet: ObjetRequete;
  complementObjet: ComplementObjetRequete;
  commentaire: string;
  reponseChoisie?: IReponseRequeteInfo;
  provenanceRequete: Provenance;
  numeroRequeteLiee?: string;
  idRequeteLiee?: string;
  typeRequeteLiee?: TypeRequete;
  piecesComplementInformation?: IPieceComplementInformation[];
  besoinUsager: BesoinUsager;
}
