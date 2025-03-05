import { IPrenom } from "@model/etatcivil/fiche/IPrenom";
import { Prenoms } from "@model/form/delivrance/ISaisirRequetePageForm";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";

export const SPC = "SPC";
export const SANS_PRENOM_CONNU = "Sans prénom connu";
export const SANS_NOM_CONNU = "Sans nom connu";
export const SNP = "SNP";
export const SANS_NOM_PATRONYMIQUE = "Sans nom patronymique";
export const ABSENCE_VALIDEE = "ABSENCE_VALIDEE";
const TIME_OUT_MS = 100;

export const ZERO = 0;
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
export const QUINZE = 15;
export const SEIZE = 16;
export const VINGT = 20;
export const VINGT_QUATRE = 24;
export const TRENTE_ET_UN = 31;
export const SOIXANTE = 60;
export const CENT = 100;
export const DIX_MILLE = 10000;

export const CAR_ETOILE = "*";

const triObjetsSurPropriete = (o1: any, o2: any, propertyName: string) => {
  if (o1[propertyName] < o2[propertyName]) {
    return -1;
  } else if (o1[propertyName] > o2[propertyName]) {
    return 1;
  }
  return 0;
};

export const triListeObjetsSurPropriete = (objets: any[], propriete: string) => {
  return objets ? objets.sort((o1, o2) => triObjetsSurPropriete(o1, o2, propriete)) : [];
};

export const chiffreEstPair = (chiffre: number) => {
  return chiffre % DEUX === 0;
};

export const triListeObjetsSurDate = (objets: any[], nomPropriete: string) => {
  return objets
    ? objets.sort((o1, o2) => {
        let res = 0;
        if (o1[nomPropriete] instanceof Date && o2[nomPropriete] instanceof Date) {
          res = o1[nomPropriete].getTime() - o2[nomPropriete].getTime();
        }
        return res;
      })
    : [];
};

export const formatMajusculesMinusculesMotCompose = (str?: string) => {
  let res = "";
  if (str) {
    let espaceOuTiret = true;
    for (const c of str) {
      // On formate le mot suivant les tirets et espaces avec une majuscule et le reste en minuscule
      res += espaceOuTiret ? c.toUpperCase() : c.toLowerCase();
      espaceOuTiret = c === "-" || c === " ";
    }
  }
  return res;
};

export const formatPremieresLettresMajusculesNomCompose = (str?: string) => {
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
};

/** @deprecated méthode inutile, opération trop simple pour justifier une fonction */
export const enMajuscule = (str?: string): string => {
  return str ? str.toLocaleUpperCase() : "";
};

export const remplaceSPC = (prenom: string) => {
  if (prenom === SPC) {
    return SANS_PRENOM_CONNU;
  }
  return prenom;
};

export const formatPrenom = (prenom?: string, prenomParDefaut = SANS_PRENOM_CONNU, enMajuscules = true): string => {
  let prenomFormate = "";
  if (prenom === SPC) {
    prenomFormate = prenomParDefaut;
  } else {
    prenomFormate = enMajuscules ? formatMajusculesMinusculesMotCompose(prenom) : (prenom ?? "");
  }

  return prenomFormate;
};

export const triPrenoms = (prenoms: IPrenomOrdonnes[]): string[] => {
  return [...prenoms].sort((a, b) => a.numeroOrdre - b.numeroOrdre).map(prenom => prenom.prenom);
};

export const remplaceSNP = (nom: string) => {
  if (nom === SNP) {
    return SANS_NOM_PATRONYMIQUE;
  }
  return nom;
};

export const formatNom = (nom?: string, nomParDefaut = SANS_NOM_PATRONYMIQUE, enMajuscules = true): string => {
  switch (nom) {
    case SANS_NOM_PATRONYMIQUE:
      return SANS_NOM_PATRONYMIQUE;
    case SNP:
      return nomParDefaut;
    default:
      return (enMajuscules ? nom?.toLocaleUpperCase() : nom) ?? "";
  }
};

export const formatDe = (str: string) => {
  const lettres = ["A", "E", "I", "O", "U", "Y", "H"];
  const premiereLettre = str.charAt(0).toUpperCase();
  return lettres.includes(premiereLettre) ? "d'" : "de ";
};

/** @deprecated méthode inutile (idem que getLibelle) */
export const getValeurOuVide = (str?: any) => {
  return str ?? "";
};

export const getTableauOuVide = (arr?: any[]) => {
  return arr?.length ? arr : [];
};

export const getPremierElemOuVide = (tab?: string[]): string => {
  return tab?.[0] ? tab[0] : "";
};

export const jointAvec = (tab: string[], sep: string) => {
  let res = "";
  if (tab) {
    tab.forEach(elem => {
      if (elem?.trim()) {
        if (res) {
          res = res + sep + elem.trim();
        } else {
          res = elem.trim();
        }
      }
    });
  }

  return res;
};

export const joint = (tab: string[]): string => {
  return jointAvec(tab, ", ");
};

export const jointAvecEspace = (tab: string[]): string => {
  return jointAvec(tab, " ");
};

export const jointAvecRetourALaLigne = (tab: string[]): string => {
  return jointAvec(tab, "\n");
};

export const compareNombre = (n1: number, n2: number): number => {
  return n1 > n2 ? 1 : n1 === n2 ? 0 : -1;
};

export const estTableauNonVide = (tab?: any[]): boolean => {
  return Array.isArray(tab) && tab.length > 0;
};

export const premiereLettreEnMajusculeLeResteEnMinuscule = (str?: string) => {
  let res = "";
  if (str) {
    res = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return res;
};

export const premiereLettreEnMinuscule = (str?: string) => {
  let res = "";
  if (str) {
    res = str.charAt(0).toLowerCase() + str.slice(1);
  }
  return res;
};

export const premiereLettreEnMajuscule = (str?: string) => {
  let res = "";
  if (str) {
    res = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return res;
};

// Tous les autre(s) nom(s) sont affichés en majuscule et sont séparés par une ","
export const formatNoms = (noms?: string[]): string => {
  return noms ? joint(noms.map(n => n?.toLocaleUpperCase() ?? "")) : "";
};

// Tous les prénom(s)/autre(s) prénom(s) sont affichés dans l'ordre et séparés par une ","
export const formatPrenoms = (prenoms?: string[], prenomParDefaut = SANS_PRENOM_CONNU, enMajuscules = true): string => {
  return prenoms ? joint(prenoms.map(p => formatPrenom(p, prenomParDefaut, enMajuscules))) : "";
};

// Tous les prénom(s)/autre(s) prénom(s) sont affichés dans l'ordre et séparés par une ","
export const jointPrenoms = (prenoms?: IPrenom[]): string => {
  return prenoms ? joint(prenoms.sort((p1, p2) => compareNombre(p1.numeroOrdre, p2.numeroOrdre)).map(p => formatPrenom(p.valeur))) : "";
};

/**  @deprecated fonction inutile */
export const numberToString = (nb?: number): string => {
  return nb ? nb.toString() : "";
};

export const rempliAGauche = (nb: number | string, c: string, long: number) => {
  return nb ? String(nb).padStart(long, c) : "";
};

export const rempliAGaucheAvecZero = (nb: number | string, long = DEUX) => {
  return rempliAGauche(nb, "0", long);
};

export const supprimerEspacesInutiles = (value: string) => {
  return value.trim().replace(new RegExp(/\s{2,}/g), " ");
};

export const supprimeSautDeLigneEtEspaceInutiles = (value?: string) => {
  let res = "";
  if (value) {
    res = value.trim().replace(new RegExp(/\s+/g), " ");
  }
  return res;
};

export const changeLaPlaceDunElement = (tab: any[], index: number, nouvelIndex: number) => {
  if (tab && tab.length > 0 && index >= 0 && nouvelIndex >= 0) {
    const elements = tab.splice(index, 1);
    tab.splice(nouvelIndex, 0, ...elements);
  }
};

export const finirAvec3petitsPoints = (texte: string, charactereAvantPoints: number) => {
  return texte.length > charactereAvantPoints ? `${texte.slice(0, charactereAvantPoints - "...".length)}...` : texte;
};

export const supprimerNullEtUndefinedDuTableau = (elements?: any[]) => {
  return elements?.filter((el: any) => el != null);
};

export const replaceIndexByValue = (phrase: string, values: (string | number)[]) => {
  if (phrase && values) {
    values.forEach((value: string | number, index: number) => {
      const valueToUse = typeof value === "number" ? value.toString() : value;
      phrase = phrase.replace(`{${index}}`, valueToUse);
    });
  }
  return phrase;
};

export const aplatirTableau = (tableau: any[]): any[] => {
  return [].concat(...tableau);
};

export const compactObject = (object: any): any => {
  for (const property in object) {
    if (
      object[property] === undefined ||
      object[property] === null ||
      object[property] === "" ||
      (typeof object[property] === "string" && object[property].trim() === "")
    ) {
      delete object[property];
    }
  }
  return object;
};

export const tousRenseignes = (...args: any[]): boolean => {
  return args.length > 0 && args.every(elem => elem);
};

export const tousNonRenseignes = (...args: any[]): boolean => {
  return args.length === 0 || args.every(elem => !elem);
};

export const supprimeElement = (tableau: any[], fct: any) => {
  let nouveauTableau;
  const indexASupprimer = tableau.findIndex(element => fct(element));
  if (indexASupprimer !== -1) {
    nouveauTableau = [...tableau.slice(0, indexASupprimer), ...tableau.slice(indexASupprimer + 1)];
  } else {
    nouveauTableau = [...tableau];
  }
  return nouveauTableau;
};

/** @deprecated méthode inutile (surtout lors du passage en paramètre d'un CDC statique) */
export const getLibelle = (msg?: string) => {
  return msg ?? "";
};

export const shallowEgalTableau = (tab1: Object[], tab2: Object[]) => {
  if (tab1.length !== tab2.length) {
    return false;
  }
  let res = true;
  tab1.forEach((elTab1, index) => {
    if (!shallowEgal(elTab1, tab2[index])) {
      res = false;
    }
  });
  return res;
};

export const shallowEgal = (obj1?: Object, obj2?: Object): boolean => {
  if (obj1 === undefined || obj2 === undefined) {
    return obj1 === undefined && obj2 === undefined;
  }
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    (Object.keys(obj1) as (keyof typeof obj1)[]).every(key => {
      const valeur1 = obj1[key];
      let resultat = false;
      if (obj2.hasOwnProperty(key)) {
        const valeur2 = obj2[key];
        resultat = Array.isArray(valeur1) && Array.isArray(valeur2) ? shallowEgalTableau(valeur1, valeur2) : obj1[key] === obj2[key];
      }
      return resultat;
    })
  );
};

export const estRenseigne = (valeur: any): boolean => {
  let valeurTrimee = valeur;
  if (valeur instanceof Array) {
    return valeur.length > 0;
  }
  if (valeur instanceof Object) {
    return Object.keys(valeur).length !== 0;
  }
  if (typeof valeur === "string") {
    valeurTrimee = valeur.trim();
  }
  return valeur != null && valeur !== "" && valeurTrimee !== "" && valeur !== 0;
};

export const estNonRenseigne = (valeur: any): boolean => {
  return !estRenseigne(valeur);
};

export const mapPrenomsVersPrenomsOrdonnes = (prenoms?: string[]) => {
  const prenomsOrdonnes: IPrenomOrdonnes[] = [];
  prenoms?.forEach((prenom, idx) => prenomsOrdonnes.push({ prenom, numeroOrdre: idx + 1 }));
  return prenomsOrdonnes;
};

export const mapPrenomsVersTableauString = (prenoms?: Prenoms): string[] => {
  const tableauPrenoms: string[] = [];
  if (prenoms) {
    Object.values(prenoms).forEach(prenom => {
      if (prenom) {
        tableauPrenoms.push(prenom);
      }
    });
  }
  return tableauPrenoms;
};

export const estHeureValide = (nbHeure: number, nbMinute: number) => {
  return (
    !Number.isNaN(nbHeure) &&
    !Number.isNaN(nbMinute) &&
    nbHeure >= ZERO &&
    nbHeure < VINGT_QUATRE &&
    nbMinute >= ZERO &&
    nbMinute < SOIXANTE
  );
};

export const checkDirty = (isDirty: boolean, setIsDirty: any) => {
  if (isDirty) {
    if (
      window.confirm(
        `Vous n'avez pas validé vos modifications. Si vous continuez, celles-ci seront perdues et les données réinitialisées.\n\nVoulez-vous continuer ?`
      )
    ) {
      setIsDirty(false);
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export const getNombreOuUndefined = (nombreStr?: string): number | undefined => {
  const nombre = parseInt(nombreStr ?? "", DIX);
  return isNaN(nombre) ? undefined : nombre;
};

export const getNombreOuNull = (nombreStr?: string): number | null => {
  const nombre = parseInt(nombreStr ?? "", DIX);
  return isNaN(nombre) ? null : nombre;
};

/** @deprecated méthode inutile, opération trop simple pour justifier une fonction */
export const getValeurOuUndefined = (valeur?: any): any | undefined => {
  return valeur || undefined;
};

/** @deprecated méthode inutile, opération trop simple pour justifier une fonction */
export const getValeurOuNull = <T>(valeur?: T): T | null => {
  return valeur ?? null;
};

export const getPremiereOuSecondeValeur = (valeur1: string | undefined | null, valeur2: string | undefined | null) => {
  return valeur1 ?? valeur2 ?? "";
};

export const getTableauAPartirElementsNonVides = (...args: any[]) => {
  const tableau: any[] = [];
  args.forEach((element: any) => {
    if (element) {
      tableau.push(element);
    }
  });
  return tableau;
};

export const executeEnDiffere = (fct: any, tempsMs?: number) => {
  setTimeout(fct, tempsMs ?? TIME_OUT_MS);
};

/** @deprecated méthode inutile, opération trop simple pour justifier une fonction  */
export const execute = (fct?: any) => {
  fct?.();
};

export const auMoinsUneProprieteEstRenseigne = (objet: Object): boolean => {
  let res = false;
  const proprietes = Object.getOwnPropertyNames(objet);
  for (const propriete of proprietes) {
    //@ts-ignore
    const valeur = objet[propriete];
    if (estUnObjet(valeur)) {
      res = auMoinsUneProprieteEstRenseigne(valeur);
      if (res) {
        break;
      }
    } else if (estRenseigne(valeur)) {
      res = true;
      break;
    }
  }
  return res;
};

export const estUnObjet = (objet: any): boolean => {
  return objet != null && typeof objet === "object" && !Array.isArray(objet);
};

export const estUnNombre = (str?: string): boolean => {
  return str != null && str !== "" && Number.isInteger(+str);
};

export const getValeurProprieteAPartirChemin = (chemin: string, objet?: Object) => {
  return objet
    ? chemin
        .split(".")
        //@ts-ignore
        .reduce((previous, current) => previous?.[current], objet)
    : undefined;
};

export const seulementUneProprieteRenseignee = (cheminPropriete: string, objet?: Object): boolean => {
  const valeurPropriete = getValeurProprieteAPartirChemin(cheminPropriete, objet);

  return (
    objet != null &&
    estRenseigne(valeurPropriete) &&
    (!estUnObjet(valeurPropriete) || auMoinsUneProprieteEstRenseigne(valeurPropriete as Object)) &&
    seulementUneProprieteRenseigneeAvecCheminCourant(cheminPropriete, objet, "")
  );
};

export const ajouteCheminCourant = (propriete: string, cheminCourant: string) => {
  return cheminCourant ? `${cheminCourant}.${propriete}` : propriete;
};

const seulementUneProprieteRenseigneeAvecCheminCourant = (cheminPropriete: string, objet: Object, cheminCourant: string): boolean => {
  let res = true;
  const proprietes = Object.getOwnPropertyNames(objet);
  for (const propriete of proprietes) {
    const cheminProprieteCourante = ajouteCheminCourant(propriete, cheminCourant);
    if (cheminPropriete !== cheminProprieteCourante) {
      //@ts-ignore
      const valeur = objet[propriete];
      if (estUnObjet(valeur)) {
        res = seulementUneProprieteRenseigneeAvecCheminCourant(cheminPropriete, valeur, cheminProprieteCourante);
        if (!res) {
          break;
        }
      } else if (estRenseigne(valeur)) {
        res = false;
        break;
      }
    }
  }
  return res;
};

export const supprimerZerosAGauche = (str?: string) => {
  return str ? str.replace(/^0+/, "") : "";
};

export const aucuneProprieteRenseignee = (objet?: Object): boolean => {
  if (!objet) {
    return true;
  }

  let res = true;
  const proprietes = Object.getOwnPropertyNames(objet);
  for (const propriete of proprietes) {
    //@ts-ignore
    const valeur = objet[propriete];
    if (estUnObjet(valeur)) {
      res = aucuneProprieteRenseignee(valeur);
      if (!res) {
        break;
      }
    } else if (estRenseigne(valeur)) {
      res = false;
      break;
    }
  }
  return res;
};

export const chainesEgales = (sensitivity: "base" | "accent", str1?: string, str2?: string): boolean => {
  let res;
  if (str1 === str2) {
    res = true;
  } else if (str1 == null) {
    res = false;
  } else {
    //@ts-ignore str2 non null ici
    res = str1.localeCompare(str2, "fr", { sensitivity }) === 0;
  }
  return res;
};

export const chainesEgalesIgnoreCasseEtAccent = (str1?: string, str2?: string): boolean => {
  return chainesEgales("base", str1, str2);
};

export const chainesEgalesIgnoreCasse = (str1?: string, str2?: string): boolean => {
  return chainesEgales("accent", str1, str2);
};

export const getPremiereLettreDunMot = (mot: string) => {
  return mot[0];
};

export type LigneType = string | false | undefined;

// Création d'un string "A, B, C..." où ", " est le séparateur par défaut et les valeurs vides sont supprimées
export const formatLigne = (tableau?: LigneType[], separateur = ", ") => {
  const resultat = tableau?.filter(Boolean).join(separateur);
  return estRenseigne(resultat) ? resultat : "";
};

/** Retourne le nombre en fin d'une chaîne de caractère (ex: abc_123 => 123) ou undefined s'il n'y en a pas */
export const getNombreCommeSuffix = (str: string): number | undefined => {
  let nombreStr = "";
  if (str) {
    let index = str.length - 1;
    while (index >= 0 && estUnNombre(str[index])) {
      nombreStr = `${str[index]}${nombreStr}`;
      index--;
    }
  }
  return nombreStr ? Number(nombreStr) : undefined;
};

// Vérifie si un élément 'obj' est de type 'type', retourne un boolean.
export const estDeType = (obj: any, type: string): boolean => {
  return typeof obj === type;
};

// La propriété initialiement obligatoire d'une interface devient optionnelle.
// >> PropsPartielles<IInterface, "prop1" | "prop2">
export type PropsPartielles<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export const estSuperieurA500Caracteres = (texte: string) => {
  const maxTexte = 500;
  if (texte.length > maxTexte) {
    return true;
  } else {
    return false;
  }
};
export const creerPlageDeNombres = (nb: number): number[] => {
  return Array.from({ length: nb }, (v, index) => index);
};

export const sontTableauxIdentiques = (arr1: any[], arr2: any) => {
  let bool = true;
  if (arr1 === arr2) {
    bool = true;
  } else if (arr1 == null || arr2 == null) {
    bool = false;
  } else if (arr1.length !== arr2.length) {
    bool = false;
  }
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) {
      bool = false;
      break;
    }
  }
  return bool;
};

export const objectsSontIdentiques = (object1: any, object2: any): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !objectsSontIdentiques(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }

  return true;
};

export const isObject = (object: any): boolean => {
  return object != null && typeof object === "object";
};

export const triAlphanumerique = (texteA: string, texteB: string) => {
  return texteA.localeCompare(texteB);
};

export const genererArrondissements = (length: number) =>
  Array.from({ length }, (_, i) => ({
    cle: `${i + 1}`,
    libelle: `${i + 1}`
  }));

export const rechercheExpressionReguliereAvecTimeout = (
  pattern: RegExp,
  input: string,
  timeout: number
): Promise<RegExpExecArray | null> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("La recherche d'expression régulière a dépassé la limite de temps alloué"));
    }, timeout);

    setImmediate(() => {
      try {
        const result = pattern.exec(input);
        clearTimeout(timer);
        resolve(result);
      } catch (error) {
        clearTimeout(timer);
        reject(error as Error);
      }
    });
  });
};
