/* v8 ignore start */

import { ELegalisationApostille } from "@model/etatcivil/enum/ELegalisationApostille";
import { EModeDepot } from "@model/etatcivil/enum/EModeDepot";
import { EPieceProduite } from "@model/etatcivil/enum/EPieceProduite";
import { EIdentiteDemandeur, EIdentiteTransmetteur } from "@model/etatcivil/enum/Identite";

export interface IFormuleFinaleDto {
  identiteDemandeur: keyof typeof EIdentiteDemandeur;
  nomDemandeur: string | null;
  prenomDemandeur: string | null;
  qualiteDemandeur: string | null;
  pieceProduite: keyof typeof EPieceProduite;
  legalisation: keyof typeof ELegalisationApostille | null;
  autresPieces: string | null;
  modeDepot: keyof typeof EModeDepot;
  identiteTransmetteur: keyof typeof EIdentiteTransmetteur;
  nomTransmetteur: string | null;
}

export class FormuleFinale {
  private static readonly champsObligatoires: (keyof IFormuleFinaleDto)[] = [
    "identiteDemandeur",
    "pieceProduite",
    "modeDepot",
    "identiteTransmetteur"
  ];

  private constructor(
    public readonly identiteDemandeur: keyof typeof EIdentiteDemandeur,
    public readonly nomDemandeur: string | null,
    public readonly prenomDemandeur: string | null,
    public readonly qualiteDemandeur: string | null,
    public readonly pieceProduite: keyof typeof EPieceProduite,
    public readonly legalisation: keyof typeof ELegalisationApostille | null,
    public readonly autresPieces: string | null,
    public readonly modeDepot: keyof typeof EModeDepot,
    public readonly identiteTransmetteur: keyof typeof EIdentiteTransmetteur,
    public readonly nomTransmetteur: string | null
  ) {}

  public static readonly depuisDto = (formuleFinale: IFormuleFinaleDto): FormuleFinale | null => {
    switch (true) {
      case FormuleFinale.champsObligatoires.some(cle => formuleFinale[cle] === undefined):
        console.error("Un champ obligatoire d'une FormuleFinale n'est pas défini.");
        return null;
      case !Object.keys(EIdentiteDemandeur).includes(formuleFinale.identiteDemandeur):
        console.error(
          `L'identiteDemandeur de FormuleFinale a la valeur ${formuleFinale.identiteDemandeur} au lieu d'une des suivantes : ${Object.keys(EIdentiteDemandeur)}.`
        );
        return null;
      case !Object.keys(EIdentiteTransmetteur).includes(formuleFinale.identiteTransmetteur):
        console.error(
          `L'identiteTransmetteur de FormuleFinale a la valeur ${formuleFinale.identiteTransmetteur} au lieu d'une des suivantes : ${Object.keys(EIdentiteTransmetteur)}.`
        );
        return null;
      case !Object.keys(EModeDepot).includes(formuleFinale.modeDepot):
        console.error(
          `Le modeDepot de FormuleFinale a la valeur ${formuleFinale.modeDepot} au lieu d'une des suivantes : ${Object.keys(EModeDepot)}.`
        );
        return null;
      case !Object.keys(EPieceProduite).includes(formuleFinale.pieceProduite):
        console.error(
          `La pieceProduite de FormuleFinale a la valeur ${formuleFinale.pieceProduite} au lieu d'une des suivantes : ${Object.keys(EPieceProduite)}.`
        );
        return null;
    }

    return new FormuleFinale(
      formuleFinale.identiteDemandeur,
      formuleFinale.nomDemandeur,
      formuleFinale.prenomDemandeur,
      formuleFinale.qualiteDemandeur,
      formuleFinale.pieceProduite,
      formuleFinale.legalisation,
      formuleFinale.autresPieces,
      formuleFinale.modeDepot,
      formuleFinale.identiteTransmetteur,
      formuleFinale.nomTransmetteur
    );
  };
}
/* v8 ignore stop */
