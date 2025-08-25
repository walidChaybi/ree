import { champsObligatoiresDuDtoAbsents, nettoyerAttributsDto, valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import { describe, expect, test } from "vitest";

describe("test nettoyerAttributsDto", () => {
  test("test objet simple", () => {
    const test11 = {};
    expect(nettoyerAttributsDto(test11)).toStrictEqual({});

    const test12 = {
      1: "1"
    };
    expect(nettoyerAttributsDto(test12)).toStrictEqual(test12);

    const test13 = {
      1: "1",
      "2": 2
    };
    expect(nettoyerAttributsDto(test13)).toStrictEqual(test13);

    expect(nettoyerAttributsDto(["1", 2, []])).toStrictEqual(["1", 2, []]);

    expect(nettoyerAttributsDto([true, false, 0, []])).toStrictEqual([true, false, 0, []]);
  });

  test("test objet avec un attribut vide", () => {
    const test21 = {
      "1": "1",
      "2": ""
    };
    expect(nettoyerAttributsDto(test21)).toStrictEqual({ "1": "1" });

    const test22 = {
      "1": [],
      "2": "2"
    };
    expect(nettoyerAttributsDto(test22)).toStrictEqual({ "1": [], "2": "2" });

    const test23 = ["1", {}];
    expect(nettoyerAttributsDto(test23)).toStrictEqual(["1"]);

    const test24 = {
      "1": "1",
      "2": undefined
    };
    expect(nettoyerAttributsDto(test24)).toStrictEqual({ "1": "1" });

    expect(nettoyerAttributsDto(["1", null, 3])).toStrictEqual(["1", 3]);
  });

  test("test visiteur mix", () => {
    const test31 = {
      "1": "1",
      "2": [1, 2, 3]
    };
    expect(nettoyerAttributsDto(test31)).toStrictEqual(test31);

    const test32 = {
      "1": "1",
      "2": { "1": "2", "2": "2", "3": "3" }
    };
    expect(nettoyerAttributsDto(test32)).toStrictEqual(test32);

    const test33 = {
      "1": "1",
      "2": {
        "1": "1",
        "2": [],
        "3": undefined
      },
      "3": null
    };
    expect(nettoyerAttributsDto(test33)).toStrictEqual({
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
    expect(nettoyerAttributsDto(test34)).toStrictEqual({
      "1": "1",
      "2": { "1": "1" }
    });

    const test35 = {
      "1": "1",
      "2": [1, []]
    };
    expect(nettoyerAttributsDto(test35)).toStrictEqual({
      "1": "1",
      "2": [1, []]
    });

    const test36 = {
      "1": "1",
      "2": [1, {}]
    };
    expect(nettoyerAttributsDto(test36)).toStrictEqual({ "1": "1", "2": [1] });
  });

  test("test visiteur ultime", () => {
    const test41 = {
      "1": "1",
      "2": [1, {}],
      "3": {},
      "4": [1, [1, [1, [[], 1]]]],
      "5": "",
      "6": { "1": "", "2": [{ "1": [1] }] },
      "7": ["", null, "", [{}, [{}, "", 1]]]
    };
    expect(nettoyerAttributsDto(test41)).toStrictEqual({
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
          a: undefined,
          b: "b",
          form3: {
            a: "a",
            b: true,
            c: false,
            d: {},
            e: {
              a: "",
              b: null
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
    expect(nettoyerAttributsDto(test42)).toStrictEqual({
      form1: {
        form2: {
          b: "b",
          form3: {
            a: "a",
            b: true,
            c: false
          }
        }
      }
    });
  });
});

describe("test valeurDtoAbsenteDansEnum", () => {
  enum EAnimal {
    CHAT = "CHAT",
    CHIEN = "Chien",
    POISSON = "Pwasson"
  }

  interface IMonDto {
    inutile: null;
    idem: string;
    animal: keyof typeof EAnimal;
  }

  test("Cas passant", () => {
    const monDto: IMonDto = {
      inutile: null,
      idem: "CHAT",
      animal: "CHIEN"
    };
    expect(valeurDtoAbsenteDansEnum("MonDto", monDto, "animal", EAnimal)).toBeFalsy();
  });

  test("Cas bloquant", () => {
    const monDto: IMonDto = {
      inutile: null,
      idem: "CHAT",
      animal: "CERF" as keyof typeof EAnimal
    };
    expect(valeurDtoAbsenteDansEnum("MonDto", monDto, "animal", EAnimal)).toBeTruthy();
  });
});

describe("test champsObligatoiresAbsents", () => {
  interface IMonDto {
    objet: {};
    nom: string;
    age: number;
    optionnel?: string;
  }
  test("Cas passant", () => {
    const monDto: IMonDto = {
      objet: {},
      nom: "CHAT",
      age: 15
    };
    expect(champsObligatoiresDuDtoAbsents("MonDto", monDto, ["age", "objet", "nom"])).toBeFalsy();
  });

  test("Cas bloquant", () => {
    const monDto: IMonDto = {} as IMonDto;
    expect(champsObligatoiresDuDtoAbsents("MonDto", monDto, ["age", "objet", "nom"])).toBeTruthy();
  });
});
