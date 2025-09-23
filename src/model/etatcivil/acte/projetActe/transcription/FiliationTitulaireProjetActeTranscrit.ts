import { ELienParente } from "@model/etatcivil/enum/ELienParente";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { IAdresse } from "../../IAdresse";
import { EvenementProjetActeTranscrit, IEvenementProjetActeTranscritDto } from "./EvenementProjetActeTranscrit";

export interface IFiliationTitulaireProjetActeTranscritDto {
  lienParente: ELienParente;
  ordre: number;
  nom: string;
  prenoms: string[];
  sexe?: keyof typeof ESexe;
  naissance?: IEvenementProjetActeTranscritDto;
  age?: number;
  sansProfession: boolean;
  profession?: string;
  domicile?: IAdresse;
  domicileCommun?: boolean;
}

export interface IFiliationsTitulaireProjetActeTranscrit {
  parent1: FiliationTitulaireProjetActeTranscrit | null;
  parent2: FiliationTitulaireProjetActeTranscrit | null;
}

export class FiliationTitulaireProjetActeTranscrit {
  private static readonly champsObligatoires: (keyof IFiliationTitulaireProjetActeTranscritDto)[] = ["lienParente", "ordre", "sexe"];

  private constructor(
    public readonly lienParente: keyof typeof ELienParente,
    public readonly sansProfession: boolean,
    public readonly ordre: number,
    public readonly nom: string,
    public readonly prenoms: string[],
    public readonly sexe?: keyof typeof ESexe,
    public readonly naissance?: EvenementProjetActeTranscrit,
    public readonly domicile?: IAdresse,
    public readonly age?: number,
    public readonly profession?: string,
    public readonly domicileCommun?: boolean
  ) {}

  public static readonly depuisDto = (
    filiation: IFiliationTitulaireProjetActeTranscritDto
  ): FiliationTitulaireProjetActeTranscrit | null => {
    switch (true) {
      case !filiation.nom && filiation.prenoms.length === 0:
        console.error(`Au moins un des champs 'nom' ou 'prenoms' doit être défini pour un filiationTitulaireProjetActeTranscritDto.`);
        return null;

      case FiliationTitulaireProjetActeTranscrit.champsObligatoires.some(cle => filiation[cle] === undefined):
        console.error(`Un champ obligatoire d'un filiationTitulaireProjetActeTranscritDto n'est pas défini.`);
        return null;
      case !Object.keys(ELienParente).includes(filiation.lienParente):
        console.error(
          `Le lienParente d'un filiationTitulaireProjetActeTranscritDto a la valeur ${filiation.lienParente} au lieu d'une des suivantes : ${Object.keys(ELienParente)}.`
        );
        return null;
    }

    return new FiliationTitulaireProjetActeTranscrit(
      filiation.lienParente,
      filiation.sansProfession,
      filiation.ordre,
      filiation.nom,
      filiation.prenoms,
      filiation.sexe,
      filiation.naissance && EvenementProjetActeTranscrit.depuisDto(filiation.naissance),
      filiation.domicile,
      filiation.age,
      filiation.profession,
      filiation.domicileCommun
    );
  };
}
