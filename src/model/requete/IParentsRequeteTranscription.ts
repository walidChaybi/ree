import { ESexe } from "@model/etatcivil/enum/Sexe";
import { ILocalisation } from "./IParents";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";
import { ITitulaireRequeteCreation as ITitulaireRequeteTranscription } from "./ITitulaireRequeteCreation";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";

export interface IParentRequeteTranscription {
  id?: string;
  position?: number;
  nomUsage?: string;
  nomNaissance?: string;
  anneeNaissance?: number;
  moisNaissance?: number;
  jourNaissance?: number;
  villeNaissance?: string;
  arrondissementNaissance?: string;
  regionNaissance?: string;
  paysNaissance?: string;
  lieuNaissanceFormate?: string;
  sexe?: keyof typeof ESexe;
  prenoms: IPrenomOrdonnes[];
  domiciliation?: ILocalisation;
  typeObjetTitulaire?: TypeObjetTitulaire;
}

interface IParentsRequeteTranscription {
  parent1: IParentRequeteTranscription;
  parent2: IParentRequeteTranscription;
}

export const ParentsRequeteTranscription = {
  getDepuisTitulairesRequeteTranscription(titulaires?: ITitulaireRequeteTranscription[]): IParentsRequeteTranscription | undefined {
    if (!titulaires) return;
    const parents = titulaires?.filter(
      titulaire => titulaire?.typeObjetTitulaire?.toUpperCase() === "FAMILLE" && titulaire?.qualite?.libelle?.toUpperCase() === "PARENT"
    ) as IParentRequeteTranscription[];

    const mere = parents.find(parent => parent?.sexe?.toUpperCase() === "FEMININ");

    if (parents.length === 1 && mere) {
      return {
        parent1: { prenoms: [] },
        parent2: mere
      };
    }
    return { parent1: parents[0], parent2: parents[1] };
  }
};
