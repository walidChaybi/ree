/* v8 ignore start */

import { Option } from "@util/Type";
import { chainesEgalesIgnoreCasseEtAccent } from "@util/Utils";

const CODE_COULEUR_ALERTE_ROUGE = "CodeCouleurAlerteRouge";
const CODE_COULEUR_ALERTE_ORANGE = "CodeCouleurAlerteOrange";
const CODE_COULEUR_ALERTE_VERT = "CodeCouleurAlerteVert";
const CODE_COULEUR_ALERTE_NOIR = "CodeCouleurAlerteNoir";

export type TypeCodeCouleur =
  | typeof CODE_COULEUR_ALERTE_ROUGE
  | typeof CODE_COULEUR_ALERTE_ORANGE
  | typeof CODE_COULEUR_ALERTE_VERT
  | typeof CODE_COULEUR_ALERTE_NOIR;

export const A_NE_PAS_DELIVRER = "A ne pas délivrer";
const A_DELIVRER_SOUS_CONDITIONS = "A délivrer sous conditions";
const ACTE_NON_EXPLOITABLE = "Acte non exploitable";
const PROBLEME_FONCTIONNEL = "Problème fonctionnel";
export const DESCRIPTION_SAGA = "Description SAGA";

/**
 * types alerte associés à un code couleur rouge : types 'A ne pas délivrer' et 'Problème fonctionnel'
 * types alerte associés à un code couleur orange : type 'A délivrer sous conditions'
 * types alerte associés à un code couleur vert : type 'Acte non exploitable'
 * types alerte associés à un code couleur noir : type 'Description SAGA'
 */
const mapTypesAlerteCodeCouleur: any = {
  [A_NE_PAS_DELIVRER]: CODE_COULEUR_ALERTE_ROUGE,
  [A_DELIVRER_SOUS_CONDITIONS]: CODE_COULEUR_ALERTE_ORANGE,
  [ACTE_NON_EXPLOITABLE]: CODE_COULEUR_ALERTE_VERT,
  [PROBLEME_FONCTIONNEL]: CODE_COULEUR_ALERTE_ROUGE,
  [DESCRIPTION_SAGA]: CODE_COULEUR_ALERTE_NOIR
};

export interface ITypeAlerte {
  id: string;
  nom: string;
  code: string;
  type: string;
  sousType: string;
  description: string;
  libelle: string;
}

export class TypeAlerte {
  private static liste: ITypeAlerte[] | null = null;

  public static init(typesAlerte: ITypeAlerte[]) {
    if (TypeAlerte.liste !== null) {
      return;
    }

    TypeAlerte.liste = typesAlerte;
  }

  public static depuisId(id: string): ITypeAlerte | null {
    return TypeAlerte.liste?.find(typeAlerte => typeAlerte.id === id) ?? null;
  }

  public static versOptions(avecRetourSaga: boolean = true): Option[] {
    return (
      TypeAlerte.liste?.reduce((options: Option[], typeAlerte: ITypeAlerte) => {
        if (avecRetourSaga || typeAlerte.sousType !== "repris SAGA") {
          options.push({ cle: typeAlerte.id, libelle: typeAlerte.libelle });
        }

        return options;
      }, []) ?? []
    );
  }

  public static listeDepuisType(type: string): ITypeAlerte[] {
    return TypeAlerte.liste?.filter(typeAlerte => chainesEgalesIgnoreCasseEtAccent(typeAlerte.type, type)) ?? [];
  }

  public static listeDepuisSousType(sousType: string): ITypeAlerte[] {
    return TypeAlerte.liste?.filter(typeAlerte => chainesEgalesIgnoreCasseEtAccent(typeAlerte.sousType, sousType)) ?? [];
  }

  public static codeCouleurAlerte(typeAlerte: ITypeAlerte): string {
    return mapTypesAlerteCodeCouleur[typeAlerte.type];
  }
}
/* v8 ignore end */
