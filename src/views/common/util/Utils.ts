import { IPrenom } from "../../../model/etatcivil/FicheInterfaces";

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

export function reecriturePrenom(prenom: string) {
  let result = prenom;
  if (prenom) {
    result = `${prenom.charAt(0).toLocaleUpperCase()}${prenom
      .substring(1)
      .toLocaleLowerCase()}`;
  }
  return result;
}

export function premiereLettreEnMajusculeLeResteEnMinuscule(str?: string) {
  let res = "";
  if (str) {
    const strParts = str.split(/[ -]+/);
    res = strParts
      .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLocaleLowerCase())
      .join("-");
  }
  return res;
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

export function estTableauNonVide(tab: any[]): boolean {
  return Array.isArray(tab) && tab.length > 0;
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
export function jointPrenoms(prenoms: IPrenom[]): string {
  return prenoms
    ? joint(
        prenoms
          .sort((p1, p2) => compareNombre(p1.numeroOrdre, p2.numeroOrdre))
          .map(p => formatPrenom(p.prenom))
      )
    : "";
}
