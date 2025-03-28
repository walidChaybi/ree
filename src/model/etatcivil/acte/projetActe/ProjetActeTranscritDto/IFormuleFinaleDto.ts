export interface IFormuleFinaleDto {
  identiteDemandeur: string | null;
  nomDemandeur: string | null;
  prenomDemandeur: string | null;
  qualiteDemandeur: string | null;
  piecesProduites: string | null;
  legalisation: string | null;
  autresPieces: string | null;
  modeDepot: string | null;
  identiteTransmetteur: string | null;
  nomTransmetteur: string | null;
  idFormuleFinale?: string | null;
}
