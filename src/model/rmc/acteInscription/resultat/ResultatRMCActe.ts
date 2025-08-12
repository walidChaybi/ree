import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ETypeActe } from "@model/etatcivil/enum/TypeActe";
import { ETypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IPrenomOrdonneDto } from "@model/form/commun/PrenomsForm";
import { IDateDto } from "@util/DateUtils";
import { formatNoms, jointPrenoms } from "@util/Utils";
import DateRECE from "../../../../utils/DateRECE";

// CODE EXEMPLE développement OBJET des modèles métier + contrôle des DTO

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
    /** Format JJ/MM/AAA */
    public readonly dateEvenement: string,
    /** Format JJ/MM/AAA */
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
      case ResultatRMCActe.champsObligatoires.some(cle => acte[cle] === undefined):
        console.error(`Un champ obligatoire d'un ResultatRMCActeDto n'est pas défini.`);
        return null;
      case !Object.keys(ENatureActe).includes(acte.nature):
        console.error(
          `La nature d'un ResultatRMCActeDto a la valeur ${acte.nature} au lieu d'une des suivantes : ${Object.keys(ENatureActe)}.`
        );
        return null;
      case !Object.keys(ETypeFamille).includes(acte.familleRegistre):
        console.error(
          `La famille de registre d'un ResultatRMCActeDto a la valeur ${acte.familleRegistre} au lieu d'une des suivantes : ${Object.keys(ETypeFamille)}.`
        );
        return null;
      case !Object.keys(ETypeActe).includes(acte.type):
        console.error(`Le type d'un ResultatRMCActeDto a la valeur ${acte.type} au lieu d'une des suivantes : ${Object.keys(ETypeActe)}.`);
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
