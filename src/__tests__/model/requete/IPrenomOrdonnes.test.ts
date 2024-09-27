import {
  IPrenomOrdonnes,
  PrenomsOrdonnes
} from "@model/requete/IPrenomOrdonnes";
import { describe, expect, test } from "vitest";

describe("Test du model Prénoms ordonnés d'un titulaire", () => {
  test("Doit retourner une liste ordonnée depuis un tableau", () => {
    const attendu: IPrenomOrdonnes[] = [
      { numeroOrdre: 1, prenom: "Jean" },
      { numeroOrdre: 2, prenom: "John" },
      { numeroOrdre: 3, prenom: "René" },
      { numeroOrdre: 4, prenom: "Paul" }
    ];

    const donneesPrenoms = ["Jean", "John", "René", "Paul"];

    expect(PrenomsOrdonnes.listeDepuisTableau(donneesPrenoms)).toStrictEqual(
      attendu
    );
  });
});
