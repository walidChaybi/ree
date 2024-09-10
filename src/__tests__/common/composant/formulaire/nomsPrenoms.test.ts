import { genererDefaultValuesPrenoms } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { describe, expect, test } from "vitest";

describe("Test du composant Prenoms", () => {
  test("Doit créer la bonne structure de données avec 12 prénoms", () => {
    const prenomsDefaultValues = {
      prenom1: "",
      prenom2: "",
      prenom3: "",
      prenom4: "",
      prenom5: "",
      prenom6: "",
      prenom7: "",
      prenom8: "",
      prenom9: "",
      prenom10: "",
      prenom11: "",
      prenom12: "",
      prenom13: "",
      prenom14: "",
      prenom15: ""
    };
    const prenomsDefaultValuesGenerer = genererDefaultValuesPrenoms();

    expect(prenomsDefaultValuesGenerer).toEqual(prenomsDefaultValues);
  });
});
