import { ParentsRequeteConsulaire } from "@model/requete/IParentsRequeteConsulaire";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { describe, expect, test } from "vitest";

describe("ParentsRequeteConsulaire", () => {
  test("doit retourner undefined quand pas de titulaires", () => {
    expect(ParentsRequeteConsulaire.getParentsDepuisTitulaires()).toBeUndefined();
  });

  test("doit formatter parents avec une seule mère", () => {
    const titulaires = [
      {
        typeObjetTitulaire: "FAMILLE",
        qualite: { libelle: "PARENT" },
        sexe: "FEMININ"
      }
    ] as ITitulaireRequeteCreation[];

    const result = ParentsRequeteConsulaire.getParentsDepuisTitulaires(titulaires);

    expect(result).toEqual({
      parent1: {},
      parent2: titulaires[0]
    });
  });

  test("doit formatter deux parents", () => {
    const titulaires = [
      {
        typeObjetTitulaire: "FAMILLE",
        qualite: { libelle: "PARENT" },
        sexe: "MASCULIN"
      },
      {
        typeObjetTitulaire: "FAMILLE",
        qualite: { libelle: "PARENT" },
        sexe: "FEMININ"
      }
    ] as ITitulaireRequeteCreation[];

    const result = ParentsRequeteConsulaire.getParentsDepuisTitulaires(titulaires);

    expect(result).toEqual({
      parent1: titulaires[0],
      parent2: titulaires[1]
    });
  });
});
