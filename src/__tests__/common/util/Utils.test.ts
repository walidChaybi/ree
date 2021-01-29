import {
  normaliserNomOec,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  formatDe,
  getValeurOuVide,
  jointAvec,
  getPremierElemOuVide,
  triListeObjetsSurPropriete,
  joint,
  compareNombre,
  estTableauNonVide,
  enMajuscule,
  formatPrenom,
  formatNom,
  formatNoms,
  formatPrenoms,
  jointPrenoms,
  premiereLettreEnMajuscule,
  numberToString
} from "../../../views/common/util/Utils";
import { IPrenom } from "../../../model/etatcivil/FicheInterfaces";

test("Utils normaliserNomOec ", async () => {
  const normalize = normaliserNomOec("NFD");
  expect(normalize).toBe("nfd");

  const charNotAuthorized = normaliserNomOec("\u0300o ͯo");
  expect(charNotAuthorized).toBe("o o");

  const spaces = normaliserNomOec("a  a");
  expect(spaces).toBe("a a");

  const tiret = normaliserNomOec("a - a");
  expect(tiret).toBe("a-a");

  const apostrophe = normaliserNomOec("a 'a' ");
  expect(apostrophe).toBe("a'a'");

  const caractereColles = normaliserNomOec("æÆœŒ");
  expect(caractereColles).toBe("aeaeoeoe");

  const lowercase = normaliserNomOec(" AGHÉÀ ");
  expect(lowercase).toBe("aghea");
});

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
  expect(premiereLettreEnMajuscule()).toBe("");
  expect(premiereLettreEnMajuscule("pierre durant")).toBe("Pierre durant");
});

test("Attendu: formatPrenom fonctionne correctement", () => {
  expect(formatPrenom()).toBe("");
  expect(formatPrenom("marie chantAl")).toBe("Marie-Chantal");
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
    "Marie-Chantal, Jean-Paul"
  );
});

test("Attendu: jointPrenoms fonctionne correctement", () => {
  expect(jointPrenoms()).toBe("");
  const p1: IPrenom = {
    numeroOrdre: 1,
    prenom: "marie chantal"
  };
  const p2: IPrenom = {
    numeroOrdre: 2,
    prenom: "jean paul"
  };

  expect(jointPrenoms([p2, p1])).toBe("Marie-Chantal, Jean-Paul");
});

test("Attendu: numberToString fonctionne correctement", () => {
  expect(numberToString()).toBe("");
  const nb = 7;
  expect(numberToString(nb)).toBe("7");
});
