// A tester Alex 5/02/25

import { IDateForm } from "./DateForm";
import { INumeroRcRca } from "./NumeroInscriptionRcRcaForm";
import { TPrenomsForm } from "./PrenomsForm";

/* v8 ignore start */
export type TObjetFormulaire = { [cle: string]: TValeurFormulaire };

export type TValeurFormulaire =
  | string
  | boolean
  | number
  | TValeurFormulaire[]
  | TObjetFormulaire
  | IDateForm
  | TPrenomsForm
  | INumeroRcRca
  | undefined;

export const ObjetFormulaire = {
  depuisValeurs: (valeurs: object): TObjetFormulaire => valeurs as TObjetFormulaire,

  recupererValeur: ({ valeurs, cleAttribut }: { valeurs: TObjetFormulaire; cleAttribut: string }) =>
    cleAttribut
      .split(".")
      .reduce(
        (valeur: TValeurFormulaire, cle) =>
          typeof valeur === "object" || Array.isArray(valeur) ? (valeur[cle as keyof TValeurFormulaire] ?? undefined) : undefined,
        valeurs
      ),

  recupererValeurTexte: ({ valeurs, cleAttribut }: { valeurs: TObjetFormulaire; cleAttribut: string }) => {
    const valeurAttribut = ObjetFormulaire.recupererValeur({ valeurs, cleAttribut });

    return valeurAttribut === undefined || typeof valeurAttribut === "object" ? "" : valeurAttribut.toString();
  },

  valeursModifiees: ({ valeurs, valeursInitiales }: { valeurs: TObjetFormulaire; valeursInitiales: TObjetFormulaire }): boolean => {
    const comparerValeurs = (valeurA: TValeurFormulaire, valeurB: TValeurFormulaire): boolean => {
      switch (true) {
        case Array.isArray(valeurA) && Array.isArray(valeurB):
          return tableauModifie(valeurA as TValeurFormulaire[], valeurB as TValeurFormulaire[]);
        case typeof valeurA === "object" && typeof valeurB === "object":
          return objetModifie(valeurA as TObjetFormulaire, valeurB as TObjetFormulaire);
        default:
          return valeurA !== valeurB;
      }
    };

    const tableauModifie = (tabA: TValeurFormulaire[], tabB: TValeurFormulaire[]) => {
      if (tabA.length !== tabB.length) {
        return true;
      }

      for (let index in tabA) {
        if (comparerValeurs(tabA[index], tabB[index])) {
          return true;
        }
      }

      return false;
    };

    const objetModifie = (objA: TObjetFormulaire, objB: TObjetFormulaire) => {
      if (Object.keys(objA).length !== Object.keys(objB).length) {
        return true;
      }

      for (let cleObj of Object.keys(objA)) {
        if (comparerValeurs(objA[cleObj], objB[cleObj])) {
          return true;
        }
      }

      return false;
    };

    return objetModifie(valeurs, valeursInitiales);
  },

  estDate: (valeur: TValeurFormulaire): valeur is IDateForm => {
    return typeof valeur === "object" && "annee" in valeur;
  },

  estPrenoms: (valeur: TValeurFormulaire): valeur is TPrenomsForm => {
    return typeof valeur === "object" && "prenom1" in valeur;
  },

  estNumeroRcRca: (valeur: TValeurFormulaire): valeur is INumeroRcRca => {
    return typeof valeur === "object" && "anneeInscription" in valeur;
  }
} as const;
/* v8 ignore end */
