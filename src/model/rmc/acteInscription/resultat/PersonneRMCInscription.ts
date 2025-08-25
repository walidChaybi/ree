import { IPrenomOrdonneDto } from "@model/form/commun/PrenomsForm";
import { IDateDto } from "@util/DateUtils";
import { formatNoms, jointPrenoms } from "@util/Utils";
import DateRECE from "../../../../utils/DateRECE";
import { champsObligatoiresDuDtoAbsents } from "../../../commun/dtoUtils";

export interface IPersonneRMCInscriptionDto {
  id: string;
  nom?: string;
  autresNoms: string[];
  prenoms: IPrenomOrdonneDto[];
  dateNaissance?: IDateDto;
  paysNaissance?: string;
}

export default class PersonneRMCInscription {
  private static champsObligatoires: (keyof IPersonneRMCInscriptionDto)[] = ["id", "autresNoms", "prenoms"];

  private constructor(
    public readonly id: string,
    public readonly nom: string,
    /** Séparés par des virgules */
    public readonly autresNoms: string,
    /** Ordonnés, séparés par des virgules */
    public readonly prenoms: string,
    /** Format JJ/MM/AAAA */
    public readonly dateNaissance: string,
    public readonly paysNaissance: string
  ) {}

  public static readonly depuisDto = (personne: IPersonneRMCInscriptionDto): PersonneRMCInscription | null => {
    if (champsObligatoiresDuDtoAbsents("IPersonneRMCInscriptionDto", personne, PersonneRMCInscription.champsObligatoires)) {
      return null;
    }

    return new PersonneRMCInscription(
      personne.id,
      personne.nom ?? "",
      formatNoms(personne.autresNoms),
      jointPrenoms(personne.prenoms),
      DateRECE.depuisObjetDate(personne.dateNaissance ?? {}).format("JJ/MM/AAAA"),
      personne.paysNaissance ?? ""
    );
  };
}
