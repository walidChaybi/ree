import {
  normaliserNomOec,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  formatDe,
  getValeurOuVide,
  jointAvec,
  getPremierElemOuVide,
  triListeObjetsSurPropriete
} from "../../../views/common/util/Utils";

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
  expect(jointAvec(["martin ", " dupe", "aurelia mine"], sep)).toBe(
    "martin et dupe et aurelia mine"
  );
  expect(jointAvec([" martin ", " dupe", "aurelia mine"], sep)).toBe(
    "martin et dupe et aurelia mine"
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
