import { IRequeteRMCAutoDto } from "@api/configurations/requete/rmc/PostRMCAutoRequeteConfigApi";
import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ESousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { ESousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { ESousTypeMiseAJour } from "@model/requete/enum/SousTypeMiseAJour";
import { TSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import DateRECE from "../../../utils/DateRECE";
import { valeurDtoAbsenteDansEnum } from "../../commun/dtoUtils";
import { TitulaireRequeteAssociee } from "./TitulaireRequeteAssociee";

export type TRequeteAssociee =
  | RequeteAssociee<"CREATION">
  | RequeteAssociee<"DELIVRANCE">
  | RequeteAssociee<"INFORMATION">
  | RequeteAssociee<"MISE_A_JOUR">;

export default class RequeteAssociee<TTypeRequete extends keyof typeof ETypeRequete> {
  private static readonly champsObligatoires = <
    TTypeRequete extends keyof typeof ETypeRequete
  >(): (keyof IRequeteRMCAutoDto<TTypeRequete>)[] => ["id", "dateCreation", "type", "sousType", "titulaires", "statut", "numero"];

  private constructor(
    public readonly id: string,
    public readonly dateCreation: string,
    public readonly titulaires: TitulaireRequeteAssociee[],
    public readonly type: TTypeRequete,
    public readonly sousType: TSousTypeRequete<TTypeRequete>,
    public readonly statut: string,
    public readonly numero: string
  ) {}

  public static readonly depuisDto = <TTypeRequete extends keyof typeof ETypeRequete>(
    requete: IRequeteRMCAutoDto<TTypeRequete>
  ): RequeteAssociee<TTypeRequete> | null => {
    switch (true) {
      case RequeteAssociee.champsObligatoires<TTypeRequete>().some(cle => requete[cle] === undefined):
        console.error(`Un champ obligatoire d'une RequeteAssociee n'est pas défini.`);
        return null;
      case valeurDtoAbsenteDansEnum("RequeteAssociee", requete, "type", ETypeRequete):
      case valeurDtoAbsenteDansEnum("RequeteAssociee", requete, "statut", EStatutRequete):
      case requete.type === "CREATION" && valeurDtoAbsenteDansEnum("RequeteAssociee", requete, "sousType", ESousTypeCreation):
      case requete.type === "DELIVRANCE" && valeurDtoAbsenteDansEnum("RequeteAssociee", requete, "sousType", ESousTypeDelivrance):
      case requete.type === "MISE_A_JOUR" && valeurDtoAbsenteDansEnum("RequeteAssociee", requete, "sousType", ESousTypeMiseAJour):
      case requete.type === "INFORMATION" && valeurDtoAbsenteDansEnum("RequeteAssociee", requete, "sousType", ESousTypeInformation):
        return null;
    }

    return new RequeteAssociee<TTypeRequete>(
      requete.id,
      DateRECE.depuisTimestamp(requete.dateCreation).format("JJ/MM/AAAA"),
      requete.titulaires
        .map(TitulaireRequeteAssociee.depuisDto)
        .filter((titulaire): titulaire is TitulaireRequeteAssociee => titulaire !== null),
      requete.type,
      requete.sousType,
      EStatutRequete[requete.statut],
      requete.numero
    );
  };
}
