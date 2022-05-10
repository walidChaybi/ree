import { IPrenom } from "../../../model/etatcivil/fiche/IPrenom";
import {
  changeLaPlaceDunElement,
  checkDirty,
  compareNombre,
  enMajuscule,
  estTableauNonVide,
  finirAvec3petitsPoints,
  formatDe,
  formatNom,
  formatNoms,
  formatPrenom,
  formatPrenoms,
  getPremierElemOuVide,
  getValeurOuVide,
  joint,
  jointAvec,
  jointPrenoms,
  numberToString,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  supprimeElement,
  supprimerNullEtUndefinedDuTableau,
  tousNonVides,
  triListeObjetsSurPropriete,
  valeurOuUndefined
} from "../../../views/common/util/Utils";

test("Attendu: premiereLettreEnMajusculeLeResteEnMinuscule fonctionne correctement", () => {
  expect(premiereLettreEnMajusculeLeResteEnMinuscule("NAISSANCE")).toBe(
    "Naissance"
  );
});

test("Attendu: formatDe fonctionne correctement", () => {
  let str = "Naissance";
  let de = formatDe(str);
  let fullStr = `${de}${str}`;
  expect(fullStr).toBe("de Naissance");

  str = "Absence";
  de = formatDe(str);
  fullStr = `${de}${str}`;
  expect(fullStr).toBe("d'Absence");
});

test("Attendu: getValeurOuVide fonctionne correctement", () => {
  expect(getValeurOuVide("")).toBe("");
  expect(getValeurOuVide(undefined)).toBe("");
  expect(getValeurOuVide(null!)).toBe("");
  expect(getValeurOuVide("aze")).toBe("aze");
});

test("Attendu: jointAvec fonctionne correctement", () => {
  const sep = " et ";
  expect(jointAvec(["", "", ""], sep)).toBe("");
  expect(jointAvec(["martin ", " dupe", "aurelia mines"], sep)).toBe(
    "martin et dupe et aurelia mines"
  );
  expect(jointAvec([" martin ", " dupe", "aurelia minet"], sep)).toBe(
    "martin et dupe et aurelia minet"
  );
});

test("Attendu: joint fonctionne correctement", () => {
  expect(joint(["", "", ""])).toBe("");
  expect(joint(["martin ", " dupe", "aurelia mine"])).toBe(
    "martin, dupe, aurelia mine"
  );
  expect(joint([" martin ", " dupe", "aurelia mine"])).toBe(
    "martin, dupe, aurelia mine"
  );
});

test("Attendu: getPremierElemOuVide fonctionne correctement", () => {
  expect(getPremierElemOuVide(null!)).toBe("");
  expect(getPremierElemOuVide(undefined)).toBe("");
  expect(getPremierElemOuVide([])).toBe("");
  expect(getPremierElemOuVide(["aze"])).toBe("aze");
});

test("Attendu: triListeObjetsSurPropriete fonctionne correctement", () => {
  expect(triListeObjetsSurPropriete(null!, "")).toEqual([]);
  expect(triListeObjetsSurPropriete(undefined!, "")).toEqual([]);
  expect(triListeObjetsSurPropriete([], "")).toEqual([]);
  const liste = [
    { nom: "martin", ordre: 3 },
    { nom: "dupe", ordre: 1 },
    { nom: "dupont", ordre: 2 },
    { nom: "dd", ordre: 4 }
  ];
  const listeTriee = [
    { nom: "dupe", ordre: 1 },
    { nom: "dupont", ordre: 2 },
    { nom: "martin", ordre: 3 },
    { nom: "dd", ordre: 4 }
  ];
  expect(triListeObjetsSurPropriete(liste, "ordre")).toEqual(listeTriee);
});

test("Attendu: compareNombre fonctionne correctement", () => {
  const nbInf = 4;
  const nbSup = 5;
  const nbEg = 6;
  expect(compareNombre(nbInf, nbSup)).toBe(-1);
  expect(compareNombre(nbSup, nbInf)).toBe(1);
  expect(compareNombre(nbEg, nbEg)).toBe(0);
});

test("Attendu: estTableauNonVide fonctionne correctement", () => {
  expect(estTableauNonVide()).toBe(false);
  expect(estTableauNonVide([])).toBe(false);
  expect(estTableauNonVide([1])).toBe(true);
});

test("Attendu: enMajuscule fonctionne correctement", () => {
  expect(enMajuscule()).toBe("");
  expect(enMajuscule("aa")).toBe("AA");
});

test("Attendu: premiereLettreEnMajuscule fonctionne correctement", () => {
  expect(premiereLettreEnMajusculeLeResteEnMinuscule()).toBe("");
  expect(premiereLettreEnMajusculeLeResteEnMinuscule("pierre durant")).toBe(
    "Pierre durant"
  );
});

test("Attendu: formatPrenom fonctionne correctement", () => {
  expect(formatPrenom()).toBe("");
  expect(formatPrenom("marie chantAl")).toBe("Marie Chantal");
});

test("Attendu: formatNom fonctionne correctement", () => {
  expect(formatNom()).toBe("");
  expect(formatNom("duponté durant")).toBe("DUPONTÉ DURANT");
});

test("Attendu: formatNoms fonctionne correctement", () => {
  expect(formatNoms()).toBe("");
  expect(formatNoms(["duponté", "durant"])).toBe("DUPONTÉ, DURANT");
});

test("Attendu: formatPrenoms fonctionne correctement", () => {
  expect(formatPrenoms()).toBe("");
  expect(formatPrenoms(["marie chantal", "jean-paul"])).toBe(
    "Marie Chantal, Jean-Paul"
  );
});

test("Attendu: jointPrenoms fonctionne correctement", () => {
  expect(jointPrenoms()).toBe("");
  const p1: IPrenom = {
    numeroOrdre: 1,
    valeur: "marie chantal"
  };
  const p2: IPrenom = {
    numeroOrdre: 2,
    valeur: "jean-paul"
  };

  expect(jointPrenoms([p2, p1])).toBe("Marie Chantal, Jean-Paul");
});

test("Attendu: numberToString fonctionne correctement", () => {
  expect(numberToString()).toBe("");
  const nb = 7;
  expect(numberToString(nb)).toBe("7");
});

test("Attendu: valeurOuUndefined fonctionne correctement", () => {
  expect(valeurOuUndefined()).toBe(undefined);
  expect(valeurOuUndefined("")).toBe(undefined);
  expect(valeurOuUndefined("azer")).toBe("azer");
});

test("Attendu: changeLaPlaceDunElement fonctionne correctement", () => {
  let tab: any[] = [];
  changeLaPlaceDunElement(tab, 1, 2);
  expect(tab).toEqual([]);

  tab = ["a", "b", "c", "d"];
  changeLaPlaceDunElement(tab, 1, 2);
  expect(tab).toEqual(["a", "c", "b", "d"]);

  tab = ["a", "b", "c", "d"];
  changeLaPlaceDunElement(tab, 1, 3);
  expect(tab).toEqual(["a", "c", "d", "b"]);

  tab = ["a", "b", "c", "d"];
  changeLaPlaceDunElement(tab, 1, 99);
  expect(tab).toEqual(["a", "c", "d", "b"]);

  tab = ["a", "b", "c", "d"];
  changeLaPlaceDunElement(tab, 1, 0);
  expect(tab).toEqual(["b", "a", "c", "d"]);

  tab = ["a", "b", "c", "d"];
  changeLaPlaceDunElement(tab, 1, -1);
  expect(tab).toEqual(["a", "b", "c", "d"]);
});

test("3 petits points si la phrase en grande", () => {
  const phrase1 =
    "Je fais beaucoup plus de 30 charactères et vous ne pourrez pas lire ma fin";
  expect(finirAvec3petitsPoints(phrase1, 30)).toStrictEqual(
    "Je fais beaucoup plus de 30..."
  );
  const phrase2 = "Je ne fais pas 30 charactères";
  expect(finirAvec3petitsPoints(phrase2, 30)).toStrictEqual(
    "Je ne fais pas 30 charactères"
  );
});

test("Attendu: supprimerNullEtUndefinedDuTableau fonctionne correctement", () => {
  expect(supprimerNullEtUndefinedDuTableau([null, undefined])).toEqual([]);
  expect(
    supprimerNullEtUndefinedDuTableau(["", "a", null, "b", undefined])
  ).toEqual(["", "a", "b"]);
});

test("Attendu: tousNonVides fonctionne correctement", () => {
  expect(tousNonVides(undefined)).toBeFalsy();
  expect(tousNonVides("a", "b", null)).toBeFalsy();
  expect(tousNonVides("a", "b", undefined)).toBeFalsy();
  expect(tousNonVides("a", "b", "")).toBeFalsy();
  expect(tousNonVides("a", "b", "c")).toBeTruthy();
});

test("Attendu: supprimeElement fonctionne correctement", () => {
  const tableau = [{ a: 1 }, { a: 2 }, { a: 3 }];
  expect(supprimeElement(tableau, (elt: any) => elt.a === 2)).toEqual([
    { a: 1 },
    { a: 3 }
  ]);
  expect(supprimeElement(tableau, (elt: any) => elt.a === 1)).toEqual([
    { a: 2 },
    { a: 3 }
  ]);
  expect(supprimeElement(tableau, (elt: any) => elt.a === 3)).toEqual([
    { a: 1 },
    { a: 2 }
  ]);
  expect(supprimeElement(tableau, (elt: any) => elt.a === 4)).toEqual(tableau);
});

test("checkDirty", () => {
  window.confirm = () => true;
  expect(checkDirty(true, jest.fn())).toBeTruthy();
  window.confirm = () => false;
  expect(checkDirty(true, jest.fn())).toBeFalsy();
});
