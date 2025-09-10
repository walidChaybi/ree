import { IRMCActe } from "./IRMCActe";
import { IRMCEvenement } from "./IRMCEvenement";
import { IRMCInscriptionDto } from "./IRMCInscription";

export interface IRMCRegistreRepertoire {
  registre?: IRMCActe;
  repertoire?: IRMCInscriptionDto;
  evenement?: IRMCEvenement;
}
