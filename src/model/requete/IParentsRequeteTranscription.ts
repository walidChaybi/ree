import { IDateForm } from "@model/form/commun/DateForm";
import { TPrenomsForm } from "@model/form/commun/PrenomsForm";
import { ILocalisation } from "./IParents";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";
import { ITitulaireRequeteCreation as ITitulaireRequeteTranscription } from "./ITitulaireRequeteCreation";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";

export interface IParentTranscription {
  id?: string;
  position?: number;
  sexe?: string;
  nom?: string;
  nomNaissance?: string;
  prenoms?: IPrenomOrdonnes[];
  prenomsChemin?: TPrenomsForm;
  dateNaissance?: IDateForm | null;
  lieuNaissance?: ILocalisation;
  profession?: string;
  sansProfession?: boolean;
  renseignerAge?: boolean;
  age?: string;
  domicile?: ILocalisation;
}
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
  sexe?: string;
  prenoms?: IPrenomOrdonnes[];
  domiciliation?: ILocalisation;
  typeObjetTitulaire?: TypeObjetTitulaire;
}

export interface IParentsRequeteTranscription {
  parent1: IParentRequeteTranscription;
  parent2: IParentRequeteTranscription;
}

export const ParentsRequeteTranscription = {
  getParentsRequeteTranscription(titulaires?: ITitulaireRequeteTranscription[]): IParentsRequeteTranscription | undefined {
    if (!titulaires) return;
    const parents = titulaires?.filter(
      titulaire => titulaire?.typeObjetTitulaire?.toUpperCase() === "FAMILLE" && titulaire?.qualite?.libelle?.toUpperCase() === "PARENT"
    );

    const mere = parents.find(parent => parent?.sexe?.toUpperCase() === "FEMININ");

    if (parents.length === 1 && mere) {
      return {
        parent1: {},
        parent2: mere
      };
    }
    return { parent1: parents[0], parent2: parents[1] };
  },
  mappingParentRequeteTranscriptionVersParentForm(parent?: IParentRequeteTranscription): IParentTranscription {
    const estNaissanceFranceOuEtranger = parent?.paysNaissance?.toUpperCase() === "FRANCE" ? "France" : "Étranger";

    return {
      sexe: parent?.sexe ?? "",
      nom: (parent?.nomUsage || parent?.nomNaissance) ?? "",
      prenomsChemin: {
        nombrePrenomsAffiches: parent?.prenoms?.length ?? 1,
        ...parent?.prenoms?.reduce((prenoms, prenom) => {
          (prenoms as any)[`prenom${prenom.numeroOrdre}`] = prenom.prenom;
          return prenoms;
        }, {} as TPrenomsForm)
      },
      dateNaissance: {
        jour: parent?.jourNaissance ? `${parent?.jourNaissance}`.padStart(2, "0") : "",
        mois: parent?.moisNaissance ? `${parent?.moisNaissance}`.padStart(2, "0") : "",
        annee: parent?.anneeNaissance?.toString() ?? ""
      },
      lieuNaissance: {
        typeLieu: parent?.paysNaissance ? estNaissanceFranceOuEtranger : "Inconnu",
        ville: parent?.villeNaissance ?? "",
        departement: parent?.regionNaissance,
        arrondissement: parent?.arrondissementNaissance ?? "",
        pays: parent?.paysNaissance ?? "",
        etatProvince: parent?.regionNaissance ?? "",
        adresse: ""
      },
      sansProfession: false,
      profession: "",
      domicile: {
        typeLieu: parent?.domiciliation?.typeLieu ?? "Inconnu",
        ville: parent?.domiciliation?.ville ?? "",
        adresse: parent?.domiciliation?.adresse ?? "",
        departement: parent?.domiciliation?.departement ?? "",
        arrondissement: parent?.domiciliation?.arrondissement ?? "",
        pays: parent?.domiciliation?.pays ?? "",
        etatProvince: parent?.domiciliation?.etatProvince ?? ""
      },
      renseignerAge: false,
      age: ""
    };
  }
};
