export function sortObjectWithNumeroOrdre(
  o1: any,
  o2: any,
  propertyName: string
) {
  if (o1[propertyName] < o2[propertyName]) {
    return -1;
  } else if (o1[propertyName] > o2[propertyName]) {
    return 1;
  } else {
    return 0;
  }
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

export function premiereLettreEnMajusculeLeResteEnMinuscule(str: string) {
  let res = "";
  if (str) {
    res = str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
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

export function getValeurOuVide(str: string) {
  return str ? str : "";
}

export function getPremierElemOuVide(tab: string[]): string {
  return tab && tab[0] ? tab[0] : "";
}

export function jointAvec(tab: string[], sep: string) {
  let res = "";
  tab.forEach(elem => {
    if (elem && elem.trim()) {
      if (res) {
        res = res + sep + elem.trim();
      } else {
        res = elem.trim();
      }
    }
  });

  return res;
}
