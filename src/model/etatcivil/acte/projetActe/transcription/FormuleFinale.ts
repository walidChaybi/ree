import { ELegalisationApostille } from "@model/etatcivil/enum/ELegalisationApostille";
import { EModeDepot } from "@model/etatcivil/enum/EModeDepot";
import { EPieceProduite } from "@model/etatcivil/enum/EPieceProduite";

export enum EIdentiteDemandeur {
  PARENT_1 = "Parent 1",
  PARENT_2 = "Parent 2",
  LES_PARENTS = "Les parents",
  TIERS = "Un tiers"
}

export enum EIdentiteTransmetteur {
  LE_REQUERANT = "Le requérant",
  LA_REQUERANTE = "La requérante",
  LES_REQUERANTS = "Les requérants",
  LES_REQUERANTES = "Les requérantes"
}

export interface IFormuleFinaleDto {
  identiteDemandeur: keyof typeof EIdentiteDemandeur;
  nomDemandeur?: string;
  prenomDemandeur?: string;
  qualiteDemandeur?: string;
  pieceProduite: keyof typeof EPieceProduite;
  legalisation?: keyof typeof ELegalisationApostille;
  autresPieces?: string;
  modeDepot: keyof typeof EModeDepot;
  identiteTransmetteur: keyof typeof EIdentiteTransmetteur;
  nomTransmetteur?: string;
}

export class FormuleFinale {
  private static readonly champsObligatoires: (keyof IFormuleFinaleDto)[] = [
    "identiteDemandeur",
    "pieceProduite",
    "modeDepot",
    "identiteTransmetteur"
  ];

  private constructor(
    public readonly pieceProduite: keyof typeof EPieceProduite,
    public readonly identiteDemandeur: keyof typeof EIdentiteDemandeur,
    public readonly identiteTransmetteur: keyof typeof EIdentiteTransmetteur,
    public readonly modeDepot: keyof typeof EModeDepot,
    public readonly nomDemandeur?: string,
    public readonly prenomDemandeur?: string,
    public readonly qualiteDemandeur?: string,
    public readonly legalisation?: keyof typeof ELegalisationApostille,
    public readonly autresPieces?: string,
    public readonly nomTransmetteur?: string
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
      formuleFinale.pieceProduite,
      formuleFinale.identiteDemandeur,
      formuleFinale.identiteTransmetteur,
      formuleFinale.modeDepot,
      formuleFinale.nomDemandeur,
      formuleFinale.prenomDemandeur,
      formuleFinale.qualiteDemandeur,
      formuleFinale.legalisation,
      formuleFinale.autresPieces,
      formuleFinale.nomTransmetteur
    );
  };
}
