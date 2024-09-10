import { supprimeProprietesVides } from "@util/supprimeProprietesVides";
import { expect, test } from "vitest";

test("test visiteur simple", () => {
  const test11 = {};
  expect(supprimeProprietesVides(test11)).toStrictEqual(null);

  const test12 = {
    "1": "1"
  };
  expect(supprimeProprietesVides(test12)).toStrictEqual(test12);

  const test13 = {
    "1": "1",
    "2": "2"
  };
  expect(supprimeProprietesVides(test13)).toStrictEqual(test13);
});

test("test visiteur un vide", () => {
  const test21 = {
    "1": "1",
    "2": ""
  };
  expect(supprimeProprietesVides(test21)).toStrictEqual({ "1": "1" });

  const test22 = {
    "1": [],
    "2": "2"
  };
  expect(supprimeProprietesVides(test22)).toStrictEqual({ "1": [], "2": "2" });

  const test23 = {
    "1": "1",
    "2": {}
  };
  expect(supprimeProprietesVides(test23)).toStrictEqual({ "1": "1" });
});

test("test visiteur mix", () => {
  const test31 = {
    "1": "1",
    "2": [1, 2, 3]
  };
  expect(supprimeProprietesVides(test31)).toStrictEqual(test31);

  const test32 = {
    "1": "1",
    "2": { "1": "2", "2": "2", "3": "3" }
  };
  expect(supprimeProprietesVides(test32)).toStrictEqual(test32);

  const test33 = {
    "1": "1",
    "2": {
      "1": "1",
      "2": []
    }
  };
  expect(supprimeProprietesVides(test33)).toStrictEqual({
    "1": "1",
    "2": { "1": "1", "2": [] }
  });

  const test34 = {
    "1": "1",
    "2": {
      "1": "1",
      "2": {}
    }
  };
  expect(supprimeProprietesVides(test34)).toStrictEqual({
    "1": "1",
    "2": { "1": "1" }
  });

  const test35 = {
    "1": "1",
    "2": [1, []]
  };
  expect(supprimeProprietesVides(test35)).toStrictEqual({
    "1": "1",
    "2": [1, []]
  });

  const test36 = {
    "1": "1",
    "2": [1, {}]
  };
  expect(supprimeProprietesVides(test36)).toStrictEqual({ "1": "1", "2": [1] });
});

test("test visiteur ultime", () => {
  const test41 = {
    "1": "1",
    "2": [1, {}],
    "3": {},
    "4": [1, [1, [1, [[], 1]]]],
    "5": "",
    "6": { "1": "", "2": [{ "1": [1] }] },
    "7": ["", "", "", [{}, [{}, "", 1]]]
  };
  expect(supprimeProprietesVides(test41)).toStrictEqual({
    "1": "1",
    "2": [1],
    "4": [1, [1, [1, [[], 1]]]],
    "6": { "2": [{ "1": [1] }] },
    "7": [[[1]]]
  });
});

test("test visiteur ultime2", () => {
  const test42 = {
    form1: {
      form2: {
        a: "",
        b: "b",
        form3: {
          a: "a",
          b: "b",
          c: "",
          d: {},
          e: {
            a: "",
            b: ""
          }
        }
      },
      form4: {
        a: "",
        b: "",
        c: ""
      }
    }
  };
  expect(supprimeProprietesVides(test42)).toStrictEqual({
    form1: {
      form2: {
        b: "b",
        form3: {
          a: "a",
          b: "b"
        }
      }
    }
  });
});
