/* v8 ignore start */

import { ESexe } from "@model/etatcivil/enum/Sexe";
import { IAdresse } from "../../IAdresse";
import { EvenementProjetActeTranscrit, IEvenementProjetActeTranscritDto } from "./EvenementProjetActeTranscrit";
import {
  FiliationTitulaireProjetActeTranscrit,
  IFiliationTitulaireProjetActeTranscritDto,
  IFiliationsTitulaireProjetActeTranscrit
} from "./FiliationTitulaireProjetActeTranscrit";

export interface ITitulaireProjetActeTranscritDto {
  nomActeEtranger: string;
  nom: string;
  ordre: number;
  prenoms: string[];
  sexe: keyof typeof ESexe;
  naissance: IEvenementProjetActeTranscritDto;
  filiations: IFiliationTitulaireProjetActeTranscritDto[];
  domicile: IAdresse | null;
  nomPartie1: string | null;
  nomPartie2: string | null;
  pasDePrenom: boolean | null;
}

export class TitulaireProjetActeTranscrit {
  private static readonly champsObligatoires: (keyof ITitulaireProjetActeTranscritDto)[] = [
    "nomActeEtranger",
    "nom",
    "ordre",
    "prenoms",
    "sexe",
    "naissance",
    "filiations"
  ];

  private constructor(
    public readonly nomActeEtranger: string,
    public readonly nom: string,
    public readonly ordre: number,
    public readonly prenoms: string[],
    public readonly sexe: keyof typeof ESexe,
    public readonly naissance: EvenementProjetActeTranscrit,
    public readonly filiations: IFiliationsTitulaireProjetActeTranscrit,
    public readonly domicile: IAdresse | null,
    public readonly nomPartie1: string | null,
    public readonly nomPartie2: string | null,
    public readonly pasDePrenom: boolean | null
  ) {}

  public static readonly depuisDto = (
    titulaireProjetActeTranscrit: ITitulaireProjetActeTranscritDto
  ): TitulaireProjetActeTranscrit | null => {
    switch (true) {
      case TitulaireProjetActeTranscrit.champsObligatoires.some(cle => titulaireProjetActeTranscrit[cle] === undefined):
        console.error(`Un champ obligatoire d'un titulaireProjetActeTranscrit n'est pas défini.`);
        return null;
      case !Object.keys(ESexe).includes(titulaireProjetActeTranscrit.sexe):
        console.error(
          `Le sexe du titulaireProjetActeTranscrit a la valeur ${titulaireProjetActeTranscrit.sexe} au lieu d'une des suivantes : ${Object.keys(ESexe)}.`
        );
        return null;
    }

    const filiations: FiliationTitulaireProjetActeTranscrit[] = titulaireProjetActeTranscrit.filiations
      .map(FiliationTitulaireProjetActeTranscrit.depuisDto)
      .filter((filiation): filiation is FiliationTitulaireProjetActeTranscrit => filiation !== null);

    return new TitulaireProjetActeTranscrit(
      titulaireProjetActeTranscrit.nomActeEtranger,
      titulaireProjetActeTranscrit.nom,
      titulaireProjetActeTranscrit.ordre,
      titulaireProjetActeTranscrit.prenoms,
      titulaireProjetActeTranscrit.sexe,
      titulaireProjetActeTranscrit.naissance,
      {
        parent1: filiations.find(filiation => filiation.ordre === 1) ?? null,
        parent2: filiations.find(filiation => filiation.ordre === 2) ?? null
      },
      titulaireProjetActeTranscrit.domicile,
      titulaireProjetActeTranscrit.nomPartie1,
      titulaireProjetActeTranscrit.nomPartie2,
      titulaireProjetActeTranscrit.pasDePrenom
    );
  };
}
/* v8 ignore stop */
