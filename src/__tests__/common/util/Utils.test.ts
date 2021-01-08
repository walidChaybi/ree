import {
  sortObjectWithNumeroOrdre,
  normaliserNomOec,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  formatDe
} from "../../../views/common/util/Utils";

test("Utils sortObjectWithNumeroOrdre ", async () => {
  const order1 = sortObjectWithNumeroOrdre(
    { propertyName: 1, id: "obj1" },
    { propertyName: 2, id: "obj1" },
    "propertyName"
  );
  expect(order1).toBe(-1);
  const order2 = sortObjectWithNumeroOrdre(
    { propertyName: 0, id: "obj1" },
    { propertyName: 2, id: "obj1" },
    "propertyName"
  );
  expect(order2).toBe(-1);
  const order3 = sortObjectWithNumeroOrdre(
    { propertyName: 2, id: "obj1" },
    { propertyName: 2, id: "obj1" },
    "propertyName"
  );
  expect(order3).toBe(0);
});

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
