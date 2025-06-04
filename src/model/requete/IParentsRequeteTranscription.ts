import { FiliationTitulaireProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/FiliationTitulaireProjetActeTranscrit";
import { IDateForm } from "@model/form/commun/DateForm";
import { PrenomsForm, TPrenomsForm } from "@model/form/commun/PrenomsForm";
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

  /* NOSONAR */ mappingParentRequeteTranscriptionVersParentForm(
    parentRequete?: IParentRequeteTranscription,
    parentProjetActe?: FiliationTitulaireProjetActeTranscrit | null
  ): IParentTranscription {
    const estNaissanceFranceOuEtranger = (() => {
      switch (true) {
        case Boolean(parentProjetActe?.naissance?.pays ?? parentRequete?.paysNaissance):
          return parentProjetActe?.naissance?.pays?.toUpperCase().trim() === "FRANCE" ||
            parentRequete?.paysNaissance?.toUpperCase().trim() === "FRANCE"
            ? "France"
            : "Étranger";
        case Boolean(parentProjetActe?.naissance?.ville ?? parentRequete?.villeNaissance) ||
          Boolean(parentProjetActe?.naissance?.region ?? parentRequete?.regionNaissance):
          return "Étranger";
        default:
          return "Inconnu";
      }
    })();

    const estDomicileFranceOuEtranger = (() => {
      switch (true) {
        case Boolean(parentProjetActe?.domicile?.pays ?? parentRequete?.domiciliation?.pays):
          return parentProjetActe?.domicile?.pays?.toUpperCase().trim() === "FRANCE" ||
            parentRequete?.domiciliation?.pays?.toUpperCase().trim() === "FRANCE"
            ? "France"
            : "Étranger";
        case Boolean(parentProjetActe?.domicile?.ville ?? parentRequete?.domiciliation?.ville) ||
          Boolean(
            parentProjetActe?.domicile?.region ?? parentRequete?.domiciliation?.departement ?? parentRequete?.domiciliation?.etatProvince
          ):
          return "Étranger";
        default:
          return "Inconnu";
      }
    })();
    return {
      sexe: parentProjetActe?.sexe ?? parentRequete?.sexe ?? "",
      nom: parentProjetActe?.nom ?? (parentRequete?.nomUsage || parentRequete?.nomNaissance) ?? "",
      prenomsChemin: PrenomsForm.valeursInitiales(
        parentProjetActe?.prenoms?.map((prenom: string, index: number) => ({ prenom: prenom, numeroOrdre: index + 1 })) ??
          parentRequete?.prenoms
      ),
      dateNaissance: {
        jour: (parentProjetActe?.naissance?.jour ?? parentRequete?.jourNaissance)?.toString().padStart(2, "0") ?? "",
        mois: (parentProjetActe?.naissance?.mois ?? parentRequete?.moisNaissance)?.toString().padStart(2, "0") ?? "",
        annee: (parentProjetActe?.naissance?.annee ?? parentRequete?.anneeNaissance)?.toString() ?? ""
      },
      lieuNaissance: {
        typeLieu: estNaissanceFranceOuEtranger,
        ville: parentProjetActe?.naissance?.ville ?? parentRequete?.villeNaissance ?? "",
        departement: (estNaissanceFranceOuEtranger === "France" && parentProjetActe?.naissance?.region) || parentRequete?.regionNaissance,
        etatProvince:
          (estNaissanceFranceOuEtranger === "Étranger" && parentProjetActe?.naissance?.region) || parentRequete?.regionNaissance || "",
        arrondissement: parentProjetActe?.naissance?.arrondissement ?? parentRequete?.arrondissementNaissance ?? "",
        pays: parentProjetActe?.naissance?.pays ?? parentRequete?.paysNaissance ?? "",
        adresse: parentProjetActe?.naissance?.voie ?? ""
      },
      sansProfession: parentProjetActe?.sansProfession ?? false,
      profession: parentProjetActe?.profession ?? "",
      domicile: {
        typeLieu: estDomicileFranceOuEtranger,
        ville: parentProjetActe?.domicile?.ville ?? parentRequete?.domiciliation?.ville ?? "",
        adresse: parentProjetActe?.domicile?.voie ?? parentRequete?.domiciliation?.adresse ?? "",
        departement:
          ((estDomicileFranceOuEtranger === "France" && parentProjetActe?.domicile?.region) || parentRequete?.domiciliation?.departement) ??
          "",
        arrondissement: parentProjetActe?.domicile?.arrondissement ?? parentRequete?.domiciliation?.arrondissement ?? "",
        pays: parentProjetActe?.domicile?.pays ?? parentRequete?.domiciliation?.pays ?? "",
        etatProvince:
          ((estDomicileFranceOuEtranger === "Étranger" && parentProjetActe?.domicile?.region) ||
            parentRequete?.domiciliation?.etatProvince) ??
          ""
      },
      renseignerAge: (parentProjetActe?.age && !parentProjetActe?.naissance?.annee) || false,
      age: parentProjetActe?.age?.toString() ?? ""
    };
  }
};
