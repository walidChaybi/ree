/* v8 ignore start */
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { IAdresse } from "../../IAdresse";
import { EvenementProjetActeTranscrit, IEvenementProjetActeTranscritDto } from "./EvenementProjetActeTranscrit";

export interface IFiliationTitulaireProjetActeTranscritDto {
  lienParente: LienParente;
  ordre: number;
  nom: string;
  prenoms: string[];
  sexe: keyof typeof ESexe | null;
  naissance: IEvenementProjetActeTranscritDto | null;
  age: number | null;
  sansProfession: boolean | null;
  profession: string | null;
  domicile: IAdresse | null;
  domicileCommun: boolean | null;
}

export interface IFiliationsTitulaireProjetActeTranscrit {
  parent1: FiliationTitulaireProjetActeTranscrit | null;
  parent2: FiliationTitulaireProjetActeTranscrit | null;
}

export class FiliationTitulaireProjetActeTranscrit {
  private static readonly champsObligatoires: (keyof IFiliationTitulaireProjetActeTranscritDto)[] = [
    "lienParente",
    "ordre",
    "nom",
    "prenoms"
  ];

  private constructor(
    public readonly lienParente: keyof typeof LienParente,
    public readonly ordre: number,
    public readonly nom: string,
    public readonly prenoms: string[],
    public readonly sexe: keyof typeof ESexe | null,
    public readonly naissance: EvenementProjetActeTranscrit | null,
    public readonly age: number | null,
    public readonly sansProfession: boolean | null,
    public readonly profession: string | null,
    public readonly domicile: IAdresse | null,
    public readonly domicileCommun: boolean | null
  ) {}

  public static readonly depuisDto = (
    filiation: IFiliationTitulaireProjetActeTranscritDto
  ): FiliationTitulaireProjetActeTranscrit | null => {
    switch (true) {
      case FiliationTitulaireProjetActeTranscrit.champsObligatoires.some(cle => filiation[cle] === undefined):
        console.error(`Un champ obligatoire d'un filiationTitulaireProjetActeTranscritDto n'est pas défini.`);
        return null;
      case !Object.keys(LienParente).includes(filiation.lienParente):
        console.error(
          `Le lienParente d'un filiationTitulaireProjetActeTranscritDto a la valeur ${filiation.lienParente} au lieu d'une des suivantes : ${Object.keys(LienParente)}.`
        );
        return null;
    }

    return new FiliationTitulaireProjetActeTranscrit(
      filiation.lienParente,
      filiation.ordre,
      filiation.nom,
      filiation.prenoms,
      filiation.sexe,
      filiation.naissance && EvenementProjetActeTranscrit.depuisDto(filiation.naissance),
      filiation.age,
      filiation.sansProfession,
      filiation.profession,
      filiation.domicile,
      filiation.domicileCommun
    );
  };
}
/* v8 ignore stop */
