import { IRMCEvenement, IRMCEvenementDto } from "@model/rmc/acteInscription/rechercheForm/IRMCEvenement";
import { IRMCTitulaire, IRMCTitulaireDto } from "@model/rmc/acteInscription/rechercheForm/IRMCTitulaire";
import { IRMCActe, IRMCActeDto } from "../acteInscription/rechercheForm/IRMCActe";
import { IRMCInscription, IRMCInscriptionDto } from "../acteInscription/rechercheForm/IRMCInscription";

export interface ICriteresRMC {
  titulaire?: IRMCTitulaire;
  acte?: IRMCActe;
  inscription?: IRMCInscription;
  evenement?: IRMCEvenement;
}

export interface ICriteresRMCDto {
  titulaire?: IRMCTitulaireDto;
  acte?: IRMCActeDto;
  inscription?: IRMCInscriptionDto;
  evenement?: IRMCEvenementDto;
}
