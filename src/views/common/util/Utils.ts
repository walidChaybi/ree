import { IPrenom } from "../../../model/etatcivil/fiche/IPrenom";

function triObjetsSurPropriete(o1: any, o2: any, propertyName: string) {
  if (o1[propertyName] < o2[propertyName]) {
    return -1;
  } else if (o1[propertyName] > o2[propertyName]) {
    return 1;
  }
  return 0;
}

export function triListeObjetsSurPropriete(objets: any[], propriete: string) {
  return objets
    ? objets.sort((o1, o2) => triObjetsSurPropriete(o1, o2, propriete))
    : [];
}

export function normaliserNomOec(nom: string) {
  let result = nom;
  result = result.normalize("NFD");
  result = result.replace(/[\u0300-\u036F]/g, "");
  result = result.replace(/\s\s/g, " ");
  result = result.replace(/ -/g, "-");
  result = result.replace(/- /g, "-");
  result = result.replace(/\s'/g, "'");
  result = result.replace(/'\s/g, "'");
  result = result.replace("æ", "ae");
  result = result.replace("Æ", "ae");
  result = result.replace("œ", "oe");
  result = result.replace("Œ", "oe");
  result = result.toLowerCase().trim();
  return result;
}

export function premiereLettreEnMajusculeLeResteEnMinuscule(
  str?: string,
  sep?: string
) {
  let res = "";
  sep = sep ? sep : "-";
  if (str) {
    const strParts = str.split(/[ -]+/);
    res = strParts
      .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLocaleLowerCase())
      .join(sep);
  }
  return res;
}

export function enMajuscule(str?: string): string {
  return str ? str.toLocaleUpperCase() : "";
}

export function formatPrenom(prenom?: string): string {
  return premiereLettreEnMajusculeLeResteEnMinuscule(prenom);
}

export function formatNom(nom?: string): string {
  return enMajuscule(nom);
}

export function formatDe(str: string) {
  let de = "de ";
  const lettres = ["A", "E", "I", "O", "U", "Y", "H"];
  const premiereLettre = str.charAt(0);
  lettres.forEach(lettre => {
    if (lettre === premiereLettre) {
      de = "d'";
    }
  });
  return de;
}

export function getValeurOuVide(str?: string) {
  return str ? str : "";
}

export function getPremierElemOuVide(tab?: string[]): string {
  return tab && tab[0] ? tab[0] : "";
}

export function jointAvec(tab: string[], sep: string) {
  let res = "";
  if (tab) {
    tab.forEach(elem => {
      if (elem && elem.trim()) {
        if (res) {
          res = res + sep + elem.trim();
        } else {
          res = elem.trim();
        }
      }
    });
  }

  return res;
}

export function joint(tab: string[]): string {
  return jointAvec(tab, ", ");
}

export function compareNombre(n1: number, n2: number): number {
  return n1 > n2 ? 1 : n1 === n2 ? 0 : -1;
}

export function estTableauNonVide(tab?: any[]): boolean {
  return Array.isArray(tab) && tab.length > 0;
}

export function premiereLettreEnMajuscule(str?: string) {
  let res = "";
  if (str) {
    res = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return res;
}

// Tous les autre(s) nom(s) sont affichés en majuscule et sont séparés par une ","
export function formatNoms(noms?: string[]): string {
  return noms ? joint(noms.map(n => enMajuscule(n))) : "";
}

// Tous les prénom(s)/autre(s) prénom(s) sont affichés dans l'ordre et séparés par une ","
export function formatPrenoms(prenoms?: string[]): string {
  return prenoms
    ? joint(prenoms.map(p => premiereLettreEnMajusculeLeResteEnMinuscule(p)))
    : "";
}

// Tous les prénom(s)/autre(s) prénom(s) sont affichés dans l'ordre et séparés par une ","
export function jointPrenoms(prenoms?: IPrenom[]): string {
  return prenoms
    ? joint(
        prenoms
          .sort((p1, p2) => compareNombre(p1.numeroOrdre, p2.numeroOrdre))
          .map(p => formatPrenom(p.prenom))
      )
    : "";
}

export function numberToString(nb?: number): string {
  return nb ? nb.toString() : "";
}

export function rempliAGauche(nb: number | string, c: string, long: number) {
  return nb ? String(nb).padStart(long, c) : "";
}

export function rempliAGaucheAvecZero(nb: number | string, long = 2) {
  return rempliAGauche(nb, "0", long);
}

export function supprimerEspacesInutiles(value: string) {
  return value.trim().replace(new RegExp(/\s{2,}/g), " ");
}

// Util lors de l'envoi d'une chaîne de caractères au back: convertion des chaîne vide en undefined
export function valeurOuUndefined(valeur?: string) {
  return valeur || undefined;
}
