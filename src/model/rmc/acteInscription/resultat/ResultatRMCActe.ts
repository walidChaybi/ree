import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ETypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IPrenomOrdonneDto } from "@model/form/commun/PrenomsForm";
import { IDateDto } from "@util/DateUtils";
import { formatNoms, jointPrenoms } from "@util/Utils";
import DateRECE from "../../../../utils/DateRECE";
import { champsObligatoiresDuDtoAbsents, valeurDtoAbsenteDansEnum } from "../../../commun/dtoUtils";

// EXEMPLAR développement OBJET des modèles métier + contrôle des DTO

export interface IResultatRMCActeDto {
  id: string;
  nom: string;
  autresNoms: string[];
  prenoms: Omit<IPrenomOrdonneDto, "estPrenomFrRetenuSdanf">[];
  dateEvenement?: IDateDto;
  dateNaissance?: IDateDto;
  paysNaissance?: string;
  nature: keyof typeof ENatureActe;
  familleRegistre: keyof typeof ETypeFamille;
  type: keyof typeof ETypeActe;
  referenceRegistre?: string;
  referenceRece?: string;
}

export class ResultatRMCActe {
  private static readonly champsObligatoires: (keyof IResultatRMCActeDto)[] = [
    "id",
    "nom",
    "autresNoms",
    "nature",
    "familleRegistre",
    "type"
  ];

  private constructor(
    public readonly id: string,
    public readonly nom: string,
    /** Séparés par des virgules */
    public readonly autresNoms: string,
    /** Ordonnés, séparés par des virgules */
    public readonly prenoms: string,
    /** Format JJ/MM/AAAA */
    public readonly dateEvenement: string,
    /** Format JJ/MM/AAAA */
    public readonly dateNaissance: string,
    public readonly paysNaissance: string,
    public readonly nature: keyof typeof ENatureActe,
    public readonly familleRegistre: keyof typeof ETypeFamille,
    public readonly type: keyof typeof ETypeActe,
    public readonly referenceRegistre: string,
    public readonly referenceRece: string
  ) {}

  public static readonly depuisDto = (acte: IResultatRMCActeDto): ResultatRMCActe | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("IResultatRMCActeDto", acte, this.champsObligatoires):
      case valeurDtoAbsenteDansEnum("IResultatRMCActeDto", acte, "nature", ENatureActe):
      case valeurDtoAbsenteDansEnum("IResultatRMCActeDto", acte, "familleRegistre", ETypeFamille):
      case valeurDtoAbsenteDansEnum("IResultatRMCActeDto", acte, "type", ETypeActe):
        return null;
    }

    return new ResultatRMCActe(
      acte.id,
      acte.nom,
      formatNoms(acte.autresNoms),
      jointPrenoms(acte.prenoms),
      acte.dateEvenement ? DateRECE.depuisObjetDate(acte.dateEvenement).format("JJ/MM/AAAA") : "",
      acte.dateNaissance ? DateRECE.depuisObjetDate(acte.dateNaissance).format("JJ/MM/AAAA") : "",
      acte.paysNaissance ?? "",
      acte.nature,
      acte.familleRegistre,
      acte.type,
      acte.referenceRegistre ?? "",
      acte.referenceRece ?? ""
    );
  };
}
