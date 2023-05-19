import { IPrenom } from "@model/etatcivil/fiche/IPrenom";
import {
  aucuneProprieteRenseignee,
  auMoinsUneProprieteEstRenseigne,
  chainesEgalesIgnoreCasse,
  chainesEgalesIgnoreCasseEtAccent,
  changeLaPlaceDunElement,
  checkDirty,
  compareNombre,
  creerPlageDeNombres,
  enMajuscule,
  estRenseigne,
  estTableauNonVide,
  estUnNombre,
  finirAvec3petitsPoints,
  formatDe,
  formatNom,
  formatNoms,
  formatPrenom,
  formatPrenoms,
  getNombreCommeSuffix,
  getPremierElemOuVide,
  getValeurOuUndefined,
  getValeurOuVide,
  getValeurProprieteAPartirChemin,
  joint,
  jointAvec,
  jointPrenoms,
  numberToString,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  seulementUneProprieteRenseignee,
  supprimeElement,
  supprimerNullEtUndefinedDuTableau,
  tousNonRenseignes,
  tousRenseignes,
  triListeObjetsSurPropriete
} from "@util/Utils";

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

test("Attendu: getValeurOuUndefined fonctionne correctement", () => {
  expect(getValeurOuUndefined()).toBe(undefined);
  expect(getValeurOuUndefined("")).toBe(undefined);
  expect(getValeurOuUndefined("azer")).toBe("azer");
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

test("Attendu: tousRenseignes fonctionne correctement", () => {
  expect(tousRenseignes(undefined)).toBeFalsy();
  expect(tousRenseignes("a", "b", null)).toBeFalsy();
  expect(tousRenseignes("a", "b", undefined)).toBeFalsy();
  expect(tousRenseignes("a", "b", "")).toBeFalsy();
  expect(tousRenseignes("a", "b", "c")).toBeTruthy();
  expect(tousRenseignes("a", "b", 1)).toBeTruthy();
  expect(tousRenseignes("a", "b", 0)).toBeFalsy();
});

test("Attendu: tousNonRenseignes fonctionne correctement", () => {
  expect(tousNonRenseignes()).toBeTruthy();
  expect(tousNonRenseignes(undefined)).toBeTruthy();
  expect(tousNonRenseignes("a", undefined, null)).toBeFalsy();
  expect(tousNonRenseignes(undefined, "b", undefined)).toBeFalsy();
  expect(tousNonRenseignes("", "", "")).toBeTruthy();
  expect(tousNonRenseignes(undefined, null, "")).toBeTruthy();
  expect(tousNonRenseignes("", "", 0)).toBeTruthy();
  expect(tousNonRenseignes("a", "b", 0)).toBeFalsy();
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

test("Attendu: checkDirty fonctionne correctement", () => {
  const sauvegardeFonctionConfirm = window.confirm;
  window.confirm = () => true;
  expect(checkDirty(true, jest.fn())).toBeTruthy();
  window.confirm = () => false;
  expect(checkDirty(true, jest.fn())).toBeFalsy();
  window.confirm = sauvegardeFonctionConfirm;
});

test("Attendu: auMoinsUneProprieteEstRenseigne fonctionne correctement", () => {
  const objet1 = {
    a: "",
    b: 0,
    c: {
      c1: "",
      c2: [],
      c3: {
        c3a: [],
        c3b: {}
      }
    },
    d: {
      d1: "",
      d2: [],
      d3: {
        d3a: [],
        d3b: { d31: "test" }
      }
    }
  };
  expect(auMoinsUneProprieteEstRenseigne(objet1)).toBeTruthy();

  objet1.d.d3.d3b.d31 = "";
  expect(auMoinsUneProprieteEstRenseigne(objet1)).toBeFalsy();

  objet1.c.c3.c3b = { c3b1: "test" };
  expect(auMoinsUneProprieteEstRenseigne(objet1)).toBeTruthy();

  objet1.c.c3.c3b = { c3b1: "" };
  expect(auMoinsUneProprieteEstRenseigne(objet1)).toBeFalsy();

  //@ts-ignore
  objet1.c.c3.c3a = ["test"];
  expect(auMoinsUneProprieteEstRenseigne(objet1)).toBeTruthy();
});

test("Attendu: estUnNombre fonctionne correctement", () => {
  expect(estUnNombre("1")).toBeTruthy();
  expect(estUnNombre("0")).toBeTruthy();
  expect(estUnNombre("999")).toBeTruthy();
  //@ts-ignore
  expect(estUnNombre(null)).toBeFalsy();
  expect(estUnNombre("")).toBeFalsy();
  expect(estUnNombre(undefined)).toBeFalsy();
});

test("Attendu: getValeurProprieteAPartirChemin fonctionne correctement", () => {
  const objet = {
    a: {
      a1: "valeur a1",
      a2: "",
      a3: null
    },
    b: {
      b1: {
        b11: "valeur b11"
      }
    },
    c: {
      c1: {
        c11: undefined,
        a1: "valeur c.c1.a1"
      }
    },
    e: "valeur e"
  };
  expect(getValeurProprieteAPartirChemin("e", objet)).toBe("valeur e");
  expect(getValeurProprieteAPartirChemin("a.a1", objet)).toBe("valeur a1");
  expect(getValeurProprieteAPartirChemin("b.b1.b11", objet)).toBe("valeur b11");
  expect(getValeurProprieteAPartirChemin("c.c1.a1", objet)).toBe(
    "valeur c.c1.a1"
  );
  expect(getValeurProprieteAPartirChemin("c.c1.c11", objet)).toBeUndefined();
  expect(getValeurProprieteAPartirChemin("a.a2", objet)).toBe("");
});

test("Attendu: seulementUnAttributRenseigne fonctionne correctement", () => {
  const objet = {
    a: {
      a1: "a1",
      a2: "",
      a3: null
    },
    b: {
      b1: {
        b11: ""
      }
    },
    c: {
      c1: {
        c11: undefined
      }
    }
  };

  expect(seulementUneProprieteRenseignee("a.a1", objet)).toBeTruthy();
  expect(seulementUneProprieteRenseignee("a.a2", objet)).toBeFalsy();

  objet.a.a1 = "";
  objet.b.b1.b11 = "b11";
  expect(seulementUneProprieteRenseignee("b.b1.b11", objet)).toBeTruthy();

  // @ts-ignore
  objet.c.c1.c11 = "c11";
  expect(seulementUneProprieteRenseignee("b.b1.b11", objet)).toBeFalsy();

  // @ts-ignore
  objet.b.b1.b11 = 0;
  expect(seulementUneProprieteRenseignee("c.c1.c11", objet)).toBeTruthy();

  // @ts-ignore
  objet.b.b1.b11 = undefined;
  expect(seulementUneProprieteRenseignee("c.c1.c11", objet)).toBeTruthy();

  const objet2 = {
    a: { a1: { a11: "valeur a11" } }
  };
  expect(seulementUneProprieteRenseignee("a.a1.a11", objet2)).toBeTruthy();

  const objet3 = {
    a: {
      a1: "",
      a2: "",
      a3: null
    },
    b: {
      b1: {
        b11: {
          b111: "b111",
          b112: "b112",
          b113: "b113"
        }
      }
    },
    c: {
      c1: {
        c11: undefined
      }
    }
  };
  expect(seulementUneProprieteRenseignee("b.b1.b11", objet3)).toBeTruthy();

  const objet4 = {
    a: {
      a1: "",
      a2: "",
      a3: null
    },
    b: {
      b1: {
        b11: {}
      }
    },
    c: {
      c1: {
        c11: undefined
      }
    }
  };
  expect(seulementUneProprieteRenseignee("b.b1.b11", objet4)).toBeFalsy();
});

test("Attendu: aucunAttributRenseigne fonctionne correctement", () => {
  const objet = {
    a: {
      a1: 0,
      a2: "",
      a3: undefined
    },
    b: {
      b1: {
        b11: ""
      }
    },
    c: {
      c1: {
        c11: null
      }
    },
    d: {}
  };

  expect(aucuneProprieteRenseignee(objet)).toBeTruthy();

  objet.b.b1.b11 = "b11";
  expect(aucuneProprieteRenseignee(objet)).toBeFalsy();
});

test("Attendu: chainesEgalesIgnoreCasseEtAccent fonctionne correctement", () => {
  expect(chainesEgalesIgnoreCasseEtAccent("", "")).toBeTruthy();
  expect(chainesEgalesIgnoreCasseEtAccent("test", "")).toBeFalsy();
  expect(chainesEgalesIgnoreCasseEtAccent("test", "TesT")).toBeTruthy();
  expect(chainesEgalesIgnoreCasseEtAccent("test", "TEST")).toBeTruthy();
  expect(chainesEgalesIgnoreCasseEtAccent("tést", "TEST")).toBeTruthy();
  expect(chainesEgalesIgnoreCasseEtAccent("testee", "testéè")).toBeTruthy();
  expect(chainesEgalesIgnoreCasseEtAccent("TEST", "test")).toBeTruthy();
  expect(chainesEgalesIgnoreCasseEtAccent("test", "test2")).toBeFalsy();
  expect(chainesEgalesIgnoreCasseEtAccent(undefined, undefined)).toBeTruthy();
  expect(chainesEgalesIgnoreCasseEtAccent(null!, null!)).toBeTruthy();
  expect(chainesEgalesIgnoreCasseEtAccent(undefined, "")).toBeFalsy();
  expect(chainesEgalesIgnoreCasseEtAccent("", null!)).toBeFalsy();
});

test("Attendu: chainesEgalesIgnoreCasse fonctionne correctement", () => {
  expect(chainesEgalesIgnoreCasse("", "")).toBeTruthy();
  expect(chainesEgalesIgnoreCasse("test", "")).toBeFalsy();
  expect(chainesEgalesIgnoreCasse("test", "TesT")).toBeTruthy();
  expect(chainesEgalesIgnoreCasse("test", "TEST")).toBeTruthy();
  expect(chainesEgalesIgnoreCasse("tést", "TEST")).toBeFalsy();
  expect(chainesEgalesIgnoreCasse("TEST", "test")).toBeTruthy();
  expect(chainesEgalesIgnoreCasse("test", "test2")).toBeFalsy();
  expect(chainesEgalesIgnoreCasse("testee", "testéè")).toBeFalsy();
  expect(chainesEgalesIgnoreCasse(undefined, undefined)).toBeTruthy();
  expect(chainesEgalesIgnoreCasse(null!, null!)).toBeTruthy();
  expect(chainesEgalesIgnoreCasse(undefined, "")).toBeFalsy();
  expect(chainesEgalesIgnoreCasse("", null!)).toBeFalsy();
});

test("Attendu: estRenseigne fonctionne correctement", () => {
  expect(estRenseigne("")).toBeFalsy();
  expect(estRenseigne(0)).toBeFalsy();
  expect(estRenseigne("  ")).toBeFalsy();
  expect(estRenseigne([])).toBeFalsy();
  expect(estRenseigne(null)).toBeFalsy();
  expect(estRenseigne(undefined)).toBeFalsy();
  expect(estRenseigne("abc")).toBeTruthy();
  expect(estRenseigne(123)).toBeTruthy();
  expect(estRenseigne([1])).toBeTruthy();
  expect(estRenseigne(["a"])).toBeTruthy();
  expect(estRenseigne({ a: "a" })).toBeTruthy();
  expect(estRenseigne({})).toBeFalsy();
});

test("Attendu: getNombreCommeSuffix fonctionne correctement", () => {
  expect(getNombreCommeSuffix("")).toBe(undefined);
  expect(getNombreCommeSuffix(undefined!)).toBe(undefined);
  expect(getNombreCommeSuffix("abc")).toBe(undefined);
  expect(getNombreCommeSuffix("abc123")).toBe(123);
  expect(getNombreCommeSuffix("abc 123")).toBe(123);
  expect(getNombreCommeSuffix("abc_123")).toBe(123);
  expect(getNombreCommeSuffix("abc1")).toBe(1);
  expect(getNombreCommeSuffix("abc 1")).toBe(1);
  expect(getNombreCommeSuffix("abc_1")).toBe(1);
  expect(getNombreCommeSuffix("ab1c_1")).toBe(1);
  expect(getNombreCommeSuffix("ab1c 1")).toBe(1);
  expect(getNombreCommeSuffix("ab1 c1")).toBe(1);
});

test("DOIT retourner un tableau de la longueur de 5 quand le nombre passer en paramètre est 5", () => {
  const NUMBER = 5;

  expect(creerPlageDeNombres(NUMBER)).toHaveLength(5);
});
