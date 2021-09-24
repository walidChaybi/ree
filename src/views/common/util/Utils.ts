import { IPrenom } from "../../../model/etatcivil/fiche/IPrenom";

export const SPC = "SPC";
export const SANS_PRENOM_CONNU = "Sans prénom connu";
export const SNP = "SNP";
export const SANS_NOM_PATRONYMIQUE = "Sans nom patronymique";

export const UN = 1;
export const DEUX = 2;
export const TROIS = 3;
export const QUATRE = 4;
export const CINQ = 5;
export const SIX = 6;
export const SEPT = 7;
export const HUIT = 8;
export const NEUF = 9;
export const DIX = 10;
export const ONZE = 11;
export const DOUZE = 12;

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

export function formatMajusculesMinusculesAvecSeparateur(
  str?: string,
  sep?: string
) {
  let res = "";
  sep = sep ? sep : "-";
  if (str) {
    const strParts = str.split(/[ -]+/);
    res = strParts
      .map(p => premiereLettreEnMajusculeLeResteEnMinuscule(p))
      .join(sep);
  }
  return res;
}

export function formatPremieresLettresMajusculesNomCompose(str?: string) {
  let res = "";
  if (str) {
    str = str.toLowerCase();
    // Selectionne les caractères de debut et ceux aprés un espace ou un tiret
    // mais qui ne sont pas des mots de liaison ou des lettres suivis d'une apostrophe
    const reg = /(?![ -](de|du|la|le|sous|sur|en|des|les|et)[ -])(?! [a-z]')(^.|[' -].)/gi;
    res = str.replace(reg, function (s) {
      return s.toUpperCase();
    });
  }
  return res;
}

export function enMajuscule(str?: string): string {
  return str ? str.toLocaleUpperCase() : "";
}

export function formatPrenom(prenom?: string): string {
  let prenomFormate = "";
  if (prenom === SPC) {
    prenomFormate = SANS_PRENOM_CONNU;
  } else {
    prenomFormate = formatMajusculesMinusculesAvecSeparateur(prenom);
  }

  return prenomFormate;
}

export function formatNom(nom?: string): string {
  let nomFormate = "";
  if (nom === SNP) {
    nomFormate = SANS_NOM_PATRONYMIQUE;
  } else {
    nomFormate = enMajuscule(nom);
  }

  return nomFormate;
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

export function getValeurOuVide(str?: any) {
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

export function jointAvecEspace(tab: string[]): string {
  return jointAvec(tab, " ");
}

export function compareNombre(n1: number, n2: number): number {
  return n1 > n2 ? 1 : n1 === n2 ? 0 : -1;
}

export function estTableauNonVide(tab?: any[]): boolean {
  return Array.isArray(tab) && tab.length > 0;
}

export function premiereLettreEnMajusculeLeResteEnMinuscule(str?: string) {
  let res = "";
  if (str) {
    res = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return res;
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
  return prenoms ? joint(prenoms.map(p => formatPrenom(p))) : "";
}

// Tous les prénom(s)/autre(s) prénom(s) sont affichés dans l'ordre et séparés par une ","
export function jointPrenoms(prenoms?: IPrenom[]): string {
  return prenoms
    ? joint(
        prenoms
          .sort((p1, p2) => compareNombre(p1.numeroOrdre, p2.numeroOrdre))
          .map(p => formatPrenom(p.valeur))
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
export function valeurOuUndefined(valeur?: any) {
  return valeur ? valeur : undefined;
}

export function changeLaPlaceDunElement(
  tab: any[],
  index: number,
  nouvelIndex: number
) {
  if (tab && tab.length > 0 && index >= 0 && nouvelIndex >= 0) {
    const elements = tab.splice(index, 1);
    tab.splice(nouvelIndex, 0, ...elements);
  }
}

export function finirAvec3petitsPoints(
  texte: string,
  charactereAvantPoints: number
) {
  return texte.length > charactereAvantPoints
    ? `${texte.slice(0, charactereAvantPoints - "...".length)}...`
    : texte;
}

export function supprimerNullEtUndefinedDuTableau(elements?: any[]) {
  return elements?.filter((el: any) => el != null);
}

export function replaceIndexByValue(
  phrase: string,
  values: (string | number)[]
) {
  if (phrase && values) {
    values.forEach((value: string | number, index: number) => {
      const valueToUse = typeof value === "number" ? value.toString() : value;
      phrase = phrase.replace(`{${index}}`, valueToUse);
    });
  }
  return phrase;
}

export function aplatirTableau(tableau: any[]): any[] {
  return [].concat(...tableau);
}

export function compactObject(object: any): any {
  for (const property in object) {
    if (
      object[property] === undefined ||
      object[property] === null ||
      object[property] === ""
    ) {
      delete object[property];
    }
  }
  return object;
}

export function tousNonVides(...args: any[]): boolean {
  return args.length > 0 && args.every(elem => elem);
}
