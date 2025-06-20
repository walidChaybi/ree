import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ESousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { ESousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { ESousTypeMiseAJour } from "@model/requete/enum/SousTypeMiseAJour";
import { TSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import DateRECE from "../../../utils/DateRECE";
import { ITitulaireRmcAutoRequeteDto, TitulaireRmcAutoRequete } from "./TitulaireRmcAutoRequete";

export interface IRequeteRMCAutoDto<TTypeRequete extends keyof typeof ETypeRequete> {
  id: string;
  dateCreation: number;
  titulaires: ITitulaireRmcAutoRequeteDto[];
  type: TTypeRequete;
  sousType: TSousTypeRequete<TTypeRequete>;
  statut: keyof typeof EStatutRequete;
  numero: string;
}

export type TRequeteRMCAutoDto =
  | IRequeteRMCAutoDto<"CREATION">
  | IRequeteRMCAutoDto<"DELIVRANCE">
  | IRequeteRMCAutoDto<"INFORMATION">
  | IRequeteRMCAutoDto<"MISE_A_JOUR">;

export type TRequeteRMCAuto =
  | RequeteRMCAuto<"CREATION">
  | RequeteRMCAuto<"DELIVRANCE">
  | RequeteRMCAuto<"INFORMATION">
  | RequeteRMCAuto<"MISE_A_JOUR">;

export default class RequeteRMCAuto<TTypeRequete extends keyof typeof ETypeRequete> {
  private static readonly champsObligatoires = <
    TTypeRequete extends keyof typeof ETypeRequete
  >(): (keyof IRequeteRMCAutoDto<TTypeRequete>)[] => ["id", "dateCreation", "type", "sousType", "titulaires", "statut", "numero"];

  private constructor(
    public readonly idRequete: string,
    public readonly dateCreation: string,
    public readonly titulaires: TitulaireRmcAutoRequete[],
    public readonly type: TTypeRequete,
    public readonly sousType: TSousTypeRequete<TTypeRequete>,
    public readonly statut: string,
    public readonly numero: string
  ) {}

  public static readonly depuisDto = <TTypeRequete extends keyof typeof ETypeRequete>(
    requete: IRequeteRMCAutoDto<TTypeRequete>
  ): RequeteRMCAuto<TTypeRequete> | null => {
    switch (true) {
      case RequeteRMCAuto.champsObligatoires<TTypeRequete>().some(cle => requete[cle] === undefined):
        console.error(`Un champ obligatoire d'une RequeteRMCAuto n'est pas défini.`);
        return null;
      case !Object.keys(ETypeRequete).includes(requete.type):
        console.error(
          `Le type d'une RequeteRMCAuto a la valeur ${requete.type} au lieu d'une des suivantes : ${Object.keys(ETypeRequete)}.`
        );
        return null;
      case !Object.keys(EStatutRequete).includes(requete.statut):
        console.error(
          `Le statut d'une RequeteRMCAuto a la valeur ${requete.statut} au lieu d'une des suivantes : ${Object.keys(EStatutRequete)}.`
        );
        return null;
      case requete.type === "CREATION" && !Object.keys(ESousTypeCreation).includes(requete.sousType):
        console.error(
          `Le sous-type d'une RequeteRMCAuto a la valeur ${requete.sousType} au lieu d'une des suivantes : ${Object.keys(ESousTypeCreation)}.`
        );
        return null;
      case requete.type === "DELIVRANCE" && !Object.keys(ESousTypeDelivrance).includes(requete.sousType):
        console.error(
          `Le sous-type d'une RequeteRMCAuto a la valeur ${requete.sousType} au lieu d'une des suivantes : ${Object.keys(ESousTypeDelivrance)}.`
        );
        return null;
      case requete.type === "MISE_A_JOUR" && !Object.keys(ESousTypeMiseAJour).includes(requete.sousType):
        console.error(
          `Le sous-type d'une RequeteRMCAuto a la valeur ${requete.sousType} au lieu d'une des suivantes : ${Object.keys(ESousTypeMiseAJour)}.`
        );
        return null;
      case requete.type === "INFORMATION" && !Object.keys(ESousTypeInformation).includes(requete.sousType):
        console.error(
          `Le sous-type d'une RequeteRMCAuto a la valeur ${requete.sousType} au lieu d'une des suivantes : ${Object.keys(ESousTypeInformation)}.`
        );
        return null;
    }

    return new RequeteRMCAuto<TTypeRequete>(
      requete.id,
      DateRECE.depuisTimestamp(requete.dateCreation).format("JJ/MM/AAAA"),
      requete.titulaires
        .map(TitulaireRmcAutoRequete.depuisDto)
        .filter((titulaire): titulaire is TitulaireRmcAutoRequete => titulaire !== null),
      requete.type,
      requete.sousType,
      EStatutRequete[requete.statut],
      requete.numero
    );
  };
}
