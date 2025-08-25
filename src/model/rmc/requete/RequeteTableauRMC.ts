import { IService, Service } from "@model/agent/IService";
import { Utilisateur } from "@model/agent/Utilisateur";
import { EPriorite } from "@model/requete/enum/EPriorite";
import { EProvenance } from "@model/requete/enum/Provenance";
import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ESousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { ESousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { ESousTypeMiseAJour } from "@model/requete/enum/SousTypeMiseAJour";
import { TSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { ETagPriorisation } from "@model/requete/enum/TagPriorisation";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import DateRECE from "../../../utils/DateRECE";
import { valeurDtoAbsenteDansEnum } from "../../commun/dtoUtils";
import { ITitulaireRequeteTableauRMCDto, TitulaireRequeteTableauRMC } from "./TitulaireRequeteTableauRMC";

export interface IRequeteTableauRMCDto<TTypeRequete extends keyof typeof ETypeRequete> {
  id: string;
  numero: string;
  type: TTypeRequete;
  sousType: TSousTypeRequete<TTypeRequete>;
  statut: keyof typeof EStatutRequete;
  provenance: keyof typeof EProvenance;
  titulaires: ITitulaireRequeteTableauRMCDto[];
  observations: string[];
  dateCreation: number;
  dateDerniereMAJ: number;
  priorite: keyof typeof EPriorite;
  nomCompletRequerant: string;
  idUtilisateurRequerant?: string;
  numeroTeledossier?: string;
  idUtilisateur?: string;
  idService?: string;
  tagPriorisation?: keyof typeof ETagPriorisation;
}

export type TRequeteTableauRMCDto =
  | IRequeteTableauRMCDto<"CREATION">
  | IRequeteTableauRMCDto<"DELIVRANCE">
  | IRequeteTableauRMCDto<"INFORMATION">
  | IRequeteTableauRMCDto<"MISE_A_JOUR">;

export type TRequeteTableauRMC =
  | RequeteTableauRMC<"CREATION">
  | RequeteTableauRMC<"DELIVRANCE">
  | RequeteTableauRMC<"INFORMATION">
  | RequeteTableauRMC<"MISE_A_JOUR">;

export class RequeteTableauRMC<TTypeRequete extends keyof typeof ETypeRequete> {
  private static readonly champsObligatoires = <
    TTypeRequete extends keyof typeof ETypeRequete
  >(): (keyof IRequeteTableauRMCDto<TTypeRequete>)[] => [
    "id",
    "numero",
    "type",
    "sousType",
    "statut",
    "provenance",
    "titulaires",
    "observations",
    "dateCreation",
    "dateDerniereMAJ",
    "priorite",
    "nomCompletRequerant"
  ];

  private constructor(
    public readonly id: string,
    public readonly attribueeA: string,
    public readonly numero: string,
    public readonly type: TTypeRequete,
    public readonly sousType: TSousTypeRequete<TTypeRequete>,
    private _statut: keyof typeof EStatutRequete,
    public readonly provenance: EProvenance,
    public readonly titulaires: TitulaireRequeteTableauRMC[],
    public readonly observations: string[],
    /**Format JJ/MM/AAAA */
    public readonly dateCreation: string,
    /**Format JJ/MM/AAAA */
    public readonly dateDerniereMAJ: string,
    public readonly priorite: keyof typeof EPriorite,
    public readonly numeroTeledossier: string,
    public readonly nomCompletRequerant: string,
    public readonly idUtilisateurRequerant: string | null,
    public readonly tagPriorisation: ETagPriorisation | "",
    private _idUtilisateur: string | null,
    public readonly idService: string | null
  ) {}

  public static readonly depuisDto = <TTypeRequete extends keyof typeof ETypeRequete>(
    requete: IRequeteTableauRMCDto<TTypeRequete>,
    utilisateurs: Utilisateur[],
    services: IService[]
  ): RequeteTableauRMC<TTypeRequete> | null => {
    switch (true) {
      case RequeteTableauRMC.champsObligatoires<TTypeRequete>().some(cle => requete[cle] === undefined):
        console.error(`Un champ obligatoire d'une RequeteTableauRMC n'est pas défini. id: ${requete.id}`);
        return null;
      case valeurDtoAbsenteDansEnum("RequeteTableauRMC", requete, "type", ETypeRequete):
      case valeurDtoAbsenteDansEnum("RequeteTableauRMC", requete, "statut", EStatutRequete):
      case requete.type === "CREATION" && valeurDtoAbsenteDansEnum("RequeteTableauRMC", requete, "sousType", ESousTypeCreation):
      case requete.type === "DELIVRANCE" && valeurDtoAbsenteDansEnum("RequeteTableauRMC", requete, "sousType", ESousTypeDelivrance):
      case requete.type === "MISE_A_JOUR" && valeurDtoAbsenteDansEnum("RequeteTableauRMC", requete, "sousType", ESousTypeMiseAJour):
      case requete.type === "INFORMATION" && valeurDtoAbsenteDansEnum("RequeteTableauRMC", requete, "sousType", ESousTypeInformation):
      case requete.tagPriorisation && valeurDtoAbsenteDansEnum("RequeteTableauRMC", requete, "tagPriorisation", ETagPriorisation):
      case valeurDtoAbsenteDansEnum("RequeteTableauRMC", requete, "provenance", EProvenance):
      case valeurDtoAbsenteDansEnum("RequeteTableauRMC", requete, "priorite", EPriorite):
        return null;
    }

    return new RequeteTableauRMC<TTypeRequete>(
      requete.id,
      determinerNomServiceOuUtilisateur(requete.idUtilisateur, requete.idService, utilisateurs, services),
      requete.numero,
      requete.type,
      requete.sousType,
      requete.statut,
      EProvenance[requete.provenance],
      requete.titulaires
        .map(TitulaireRequeteTableauRMC.depuisDto)
        .filter((titulaire): titulaire is TitulaireRequeteTableauRMC => titulaire !== null),
      requete.observations,
      DateRECE.depuisTimestamp(requete.dateCreation).format("JJ/MM/AAAA"),
      DateRECE.depuisTimestamp(requete.dateDerniereMAJ).format("JJ/MM/AAAA"),
      requete.priorite,
      requete.numeroTeledossier ?? "",
      requete.nomCompletRequerant,
      requete.idUtilisateurRequerant ?? null,
      requete.tagPriorisation ? ETagPriorisation[requete.tagPriorisation] : "",
      requete.idUtilisateur ?? null,
      requete.idService ?? null
    );
  };

  public get statut(): keyof typeof EStatutRequete {
    return this._statut;
  }
  public set statut(value: keyof typeof EStatutRequete) {
    this._statut = value;
  }
  public get idUtilisateur(): string | null {
    return this._idUtilisateur;
  }
  public set idUtilisateur(value: string | null) {
    this._idUtilisateur = value;
  }
}

const determinerNomServiceOuUtilisateur = (
  idUtilisateur: string | undefined,
  idService: string | undefined,
  utilisateurs: Utilisateur[],
  services: IService[]
): string => {
  if (idUtilisateur) {
    return utilisateurs.find(utilisateur => utilisateur.id === idUtilisateur)?.prenomNom ?? "";
  }
  if (idService) {
    return Service.libelleDepuisId(idService, services) ?? "";
  }
  return "";
};
