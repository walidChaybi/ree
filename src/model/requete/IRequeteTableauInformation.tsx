import { IService } from "@model/agent/IService";
import { Utilisateur } from "@model/agent/Utilisateur";
import { champsObligatoiresDuDtoAbsents, valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import DateUtils, { TDateArrayDTO } from "@util/DateUtils";
import { TLigneTableau } from "../../composants/commun/tableau/Tableau";
import DateRECE from "../../utils/DateRECE";
import { IRequeteTableau } from "./IRequeteTableau";
import { mapAttribueA } from "./IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau, mapTitulaires } from "./ITitulaireRequeteTableau";
import { EObjetRequeteInfo } from "./enum/EObjetRequeteInfo";
import { EQualiteRequerant, Qualite } from "./enum/Qualite";
import { ELibelleSousTypeInformation, ESousTypeInformation, SousTypeInformation } from "./enum/SousTypeInformation";
import { EStatutRequete, StatutRequete } from "./enum/StatutRequete";
import { ETypeMandataire, TypeMandataireReq } from "./enum/TypeMandataireReq";
import { TypeRequete } from "./enum/TypeRequete";

export interface IRequeteTableauInformation extends IRequeteTableau {
  objet?: string;
  typeRequerant?: string;
  nomsTitulaires?: string;
  attribueA?: string;
  numeroTeledossier?: string;
}

export interface IRequeteInformationTableauDto {
  id: string;
  numero: string;
  sousType: keyof typeof ESousTypeInformation;
  dateCreation: TDateArrayDTO;
  statut: keyof typeof EStatutRequete;
  nomCompletRequerant: string;
  qualiteRequerant: keyof typeof EQualiteRequerant;
  typeMandataire?: keyof typeof ETypeMandataire;
  titulaires: string[];
  idUtilisateur: string;
  idService: string;
  objet: keyof typeof EObjetRequeteInfo;
}

export class RequeteInformationTableau {
  private static readonly champsObligatoires: (keyof IRequeteInformationTableauDto)[] = [
    "id",
    "numero",
    "sousType",
    "dateCreation",
    "statut",
    "nomCompletRequerant",
    "qualiteRequerant",
    "titulaires",
    "idService",
    "idUtilisateur",
    "objet"
  ];

  private constructor(
    public readonly id: string,
    public readonly numero: string,
    public readonly sousType: keyof typeof ESousTypeInformation,
    public readonly dateCreation: DateRECE,
    public readonly statut: keyof typeof EStatutRequete,
    public readonly nomCompletRequerant: string,
    public readonly qualiteRequerant: keyof typeof EQualiteRequerant,
    public readonly typeMandataire: keyof typeof ETypeMandataire | null,
    public readonly titulaires: string[],
    public readonly idUtilisateur: string,
    public readonly idService: string,
    public readonly objet: keyof typeof EObjetRequeteInfo
  ) {}

  public static readonly depuisDto = (requete: IRequeteInformationTableauDto): RequeteInformationTableau | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("IRequeteInformationTableauDto", requete, this.champsObligatoires):
      case valeurDtoAbsenteDansEnum("IRequeteInformationTableauDto", requete, "sousType", ESousTypeInformation):
      case valeurDtoAbsenteDansEnum("IRequeteInformationTableauDto", requete, "statut", EStatutRequete):
      case valeurDtoAbsenteDansEnum("IRequeteInformationTableauDto", requete, "objet", EObjetRequeteInfo):
      case valeurDtoAbsenteDansEnum("IRequeteInformationTableauDto", requete, "qualiteRequerant", EQualiteRequerant):
      case requete.typeMandataire && valeurDtoAbsenteDansEnum("IRequeteInformationTableauDto", requete, "typeMandataire", ETypeMandataire):
        return null;
    }

    return new RequeteInformationTableau(
      requete.id,
      requete.numero,
      requete.sousType,
      DateRECE.depuisDateArrayDTO(requete.dateCreation),
      requete.statut,
      requete.nomCompletRequerant,
      requete.qualiteRequerant,
      requete.typeMandataire ?? null,
      requete.titulaires,
      requete.idUtilisateur ?? "",
      requete.idService,
      requete.objet
    );
  };

  public readonly versLigneTableauMesRequetes = (): TLigneTableau["donnees"] => ({
    numero: this.numero,
    sousType: ELibelleSousTypeInformation[this.sousType].court,
    objet: EObjetRequeteInfo[this.objet],
    dateCreation: this.dateCreation.format("JJ/MM/AAAA"),
    statut: EStatutRequete[this.statut],
    typeRequerant: this.typeMandataire ? ETypeMandataire[this.typeMandataire] : EQualiteRequerant[this.qualiteRequerant],
    nomCompletRequerant: this.nomCompletRequerant,
    nomsTitulaires: (
      <div>
        {this.titulaires.map((titulaire, index) => (
          <div key={`requete-${this.id}-titulaire-${index}`}>{titulaire}</div>
        ))}
      </div>
    )
  });
}

/* v8 ignore start */
//////////////////////////////////////////
/** Requetes: mapping après appel d'api */
//////////////////////////////////////////

export const mappingRequetesTableauInformation = (
  resultatsRecherche: any,
  mappingSupplementaire: boolean,
  utilisateurs: Utilisateur[],
  services: IService[]
): IRequeteTableauInformation[] => {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauInformation(requete, mappingSupplementaire, utilisateurs, services);
  });
};

const mappingUneRequeteTableauInformation = (
  requete: any,
  mappingSupplementaire: boolean,
  utilisateurs: Utilisateur[],
  services: IService[]
): IRequeteTableauInformation => {
  return {
    idRequete: requete?.id || undefined,
    type: TypeRequete.INFORMATION.libelle,
    numero: requete?.numero ?? "",
    sousType: SousTypeInformation.getEnumFor(requete?.sousType).libelle,
    objet: EObjetRequeteInfo[requete.objet as keyof typeof EObjetRequeteInfo],
    dateCreation: DateUtils.getFormatDateFromTimestamp(requete?.dateCreation),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle,
    nomCompletRequerant: requete?.nomCompletRequerant ?? "",
    typeRequerant: getTypeRequerant(requete?.qualiteRequerant, requete?.typeMandataire),
    titulaires: mapTitulaires(requete?.titulaires, mappingSupplementaire),
    nomsTitulaires: getNomsTitulaires(requete?.titulaires),
    idUtilisateur: requete?.idUtilisateur || undefined,
    attribueA: mapAttribueA(requete, utilisateurs, services)
  } as IRequeteTableauInformation;
};

const getTypeRequerant = (qualiteRequerant: string, typeMandataire: string) => {
  if (typeMandataire != null) {
    return TypeMandataireReq.getEnumFor(typeMandataire ?? "").libelle;
  } else {
    return Qualite.getEnumFor(qualiteRequerant ?? "").libelle;
  }
};

const getNomsTitulaires = (titulaires: ITitulaireRequeteTableau[]) => {
  let res = "";
  let premiere = true;
  if (titulaires) {
    for (const titulaire of titulaires) {
      if (premiere) {
        premiere = false;
      } else {
        res += " ";
      }
      res += `${titulaire.nom} ${titulaire.prenoms?.[0]}`;
    }
  }
  return res;
};
/* v8 ignore stop */
