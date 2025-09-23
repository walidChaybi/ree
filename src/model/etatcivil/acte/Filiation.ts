import { champsObligatoiresDuDtoAbsents, nettoyerAttributsDto, valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { ELienParente } from "../enum/ELienParente";
import { ESexe } from "../enum/Sexe";
import { IAdresse } from "./IAdresse";
import { IEvenementDto } from "./IEvenement";

export interface IFiliationDto {
  lienParente: keyof typeof ELienParente;
  ordre: number;
  nom?: string;
  prenoms: string[];
  sexe: keyof typeof ESexe;
  naissance?: IEvenementDto;
  age?: number;
  profession?: string;
  domicile?: IAdresse;
}

export class Filiation {
  private static readonly champsObligatoires: (keyof IFiliationDto)[] = ["lienParente", "ordre", "prenoms", "sexe"];

  private constructor(
    public readonly lienParente: keyof typeof ELienParente,
    public readonly ordre: number,
    public readonly nom: string | null,
    public readonly prenoms: string[],
    public readonly sexe: keyof typeof ESexe,
    public readonly naissance: IEvenementDto | null,
    public readonly age: number | null,
    public readonly profession: string | null,
    public readonly domicile: IAdresse | null
  ) {}

  public static readonly depuisDto = (filiation: IFiliationDto): Filiation | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("IFiliationDto", filiation, this.champsObligatoires):
      case valeurDtoAbsenteDansEnum("IFiliationDto", filiation, "lienParente", ELienParente):
      case valeurDtoAbsenteDansEnum("IFiliationDto", filiation, "sexe", ESexe):
        return null;
    }

    return new Filiation(
      filiation.lienParente,
      filiation.ordre,
      filiation.nom ?? null,
      filiation.prenoms,
      filiation.sexe,
      filiation.naissance ?? null,
      filiation.age ?? null,
      filiation.profession ?? null,
      filiation.domicile ?? null
    );
  };

  public readonly versDto = (): IFiliationDto =>
    nettoyerAttributsDto<IFiliationDto>({
      lienParente: this.lienParente,
      ordre: this.ordre,
      nom: this.nom ?? undefined,
      prenoms: this.prenoms,
      sexe: this.sexe,
      naissance: this.naissance ?? undefined,
      age: this.age ?? undefined,
      profession: this.profession ?? undefined,
      domicile: this.domicile ?? undefined
    });

  public readonly getLieuDeRepriseOuLieuNaissance = (paysInconnu = false): string => {
    if (this.naissance?.lieuReprise) {
      return this.naissance.lieuReprise;
    } else if (paysInconnu) {
      return LieuxUtils.getLocalisationEtrangerOuFrance(this.naissance?.ville, this.naissance?.region, "", this.naissance?.arrondissement);
    } else {
      return LieuxUtils.getLocalisationEtrangerOuFranceParDefaut(
        this.naissance?.ville,
        this.naissance?.region,
        this.naissance?.pays,
        this.naissance?.arrondissement
      );
    }
  };
}
