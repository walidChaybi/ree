import { ESexe } from "@model/etatcivil/enum/Sexe";
import { IPrenomOrdonneDto } from "@model/form/commun/PrenomsForm";
import { IAdresse } from "../../IAdresse";

export enum EIdentiteDeclarant {
  INCONNU = "Inconnu",
  PERE = "Le père",
  MERE = "La mère",
  PERE_ET_MERE = "Le père et la mère",
  LES_PARENTS = "Les parents",
  TIERS = "Un tiers"
}

export interface IDeclarantProjetActeTranscritDto {
  identiteDeclarant: keyof typeof EIdentiteDeclarant;
  sexe: keyof typeof ESexe;
  prenoms: IPrenomOrdonneDto[];
  nom?: string;
  age?: number;
  qualite?: string;
  sansProfession?: boolean;
  profession?: string;
  adresseDomicile?: IAdresse;
  complementDeclarant?: string;
}

export const declarantTranscritDtoVide: IDeclarantProjetActeTranscritDto = {
  identiteDeclarant: "PERE",
  nom: undefined,
  prenoms: [],
  sexe: "INCONNU",
  age: undefined,
  qualite: undefined,
  profession: undefined,
  sansProfession: undefined,
  adresseDomicile: undefined,
  complementDeclarant: undefined
};

export class DeclarantProjetActeTranscrit {
  private static readonly champsObligatoires: (keyof IDeclarantProjetActeTranscritDto)[] = ["identiteDeclarant", "sexe", "prenoms"];

  private constructor(
    public readonly identiteDeclarant: keyof typeof EIdentiteDeclarant,
    public readonly sexe: keyof typeof ESexe,
    public readonly prenoms: IPrenomOrdonneDto[],
    public readonly nom?: string,
    public readonly age?: number,
    public readonly qualite?: string,
    public readonly sansProfession?: boolean,
    public readonly profession?: string,
    public readonly adresseDomicile?: IAdresse,
    public readonly complementDeclarant?: string
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
