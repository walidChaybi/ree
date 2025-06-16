import { ESexe } from "@model/etatcivil/enum/Sexe";
import { IPrenomOrdonneDto } from "@model/form/commun/PrenomsForm";
import { IAdresse } from "../../IAdresse";

export enum EIdentiteDeclarant {
  PERE = "Le père",
  MERE = "La mère",
  PERE_ET_MERE = "Le père et la mère",
  TIERS = "Un tiers"
}

export interface IDeclarantProjetActeTranscritDto {
  identiteDeclarant: keyof typeof EIdentiteDeclarant;
  sexe: keyof typeof ESexe;
  prenoms: IPrenomOrdonneDto[];
  nom: string | null;
  age: number | null;
  qualite: string | null;
  sansProfession: boolean | null;
  profession: string | null;
  adresseDomicile: IAdresse | null;
  complementDeclarant: string | null;
}

export const declarantTranscritDtoVide: IDeclarantProjetActeTranscritDto = {
  identiteDeclarant: "PERE",
  nom: null,
  prenoms: [],
  sexe: "INCONNU",
  age: null,
  qualite: null,
  profession: null,
  sansProfession: null,
  adresseDomicile: null,
  complementDeclarant: null
};

export class DeclarantProjetActeTranscrit {
  private static readonly champsObligatoires: (keyof IDeclarantProjetActeTranscritDto)[] = ["identiteDeclarant", "sexe", "prenoms"];

  private constructor(
    public readonly identiteDeclarant: keyof typeof EIdentiteDeclarant,
    public readonly sexe: keyof typeof ESexe,
    public readonly prenoms: IPrenomOrdonneDto[],
    public readonly nom: string | null,
    public readonly age: number | null,
    public readonly qualite: string | null,
    public readonly sansProfession: boolean | null,
    public readonly profession: string | null,
    public readonly adresseDomicile: IAdresse | null,
    public readonly complementDeclarant: string | null
  ) {}

  public static readonly depuisDto = (declarant: IDeclarantProjetActeTranscritDto): DeclarantProjetActeTranscrit | null => {
    switch (true) {
      case DeclarantProjetActeTranscrit.champsObligatoires.some(cle => declarant[cle] === undefined):
        console.error(`Un champ obligatoire d'un declarantTranscription n'est pas défini.`);
        return null;
      case !Object.keys(ESexe).includes(declarant.sexe):
        console.error(
          `Le sexe du declarantTranscription a la valeur ${declarant.sexe} au lieu d'une des suivantes : ${Object.keys(ESexe)}.`
        );
        return null;
      case !Object.keys(EIdentiteDeclarant).includes(declarant.identiteDeclarant):
        console.error(
          `L'identiteDeclarant du declarantTranscription a la valeur ${declarant.identiteDeclarant} au lieu d'une des suivantes : ${Object.keys(EIdentiteDeclarant)}.`
        );
        return null;
    }

    return new DeclarantProjetActeTranscrit(
      declarant.identiteDeclarant,
      declarant.sexe,
      declarant.prenoms,
      declarant.nom,
      declarant.age,
      declarant.qualite,
      declarant.sansProfession,
      declarant.profession,
      declarant.adresseDomicile,
      declarant.complementDeclarant
    );
  };
}
