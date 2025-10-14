import { ObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { expect, test } from "vitest";

test("DOIT remplacer par une string vide toutes les valeurs vides de l'objet", () => {
  const objetModifie = ObjetFormulaire.remplacerValeursAbsentesParChainesVides({
    rempli: "rempli",
    vide: null,
    nonDefini: undefined,
    nombre: 5,
    objetEnfant: {
      rempli: "rempli",
      vide: null,
      nonDefini: undefined,
      nombre: 5,
      objetEnfant: {
        rempli: "rempli",
        vide: null,
        nonDefini: undefined,
        nombre: 5
      }
    }
  });

  expect(objetModifie).toEqual({
    rempli: "rempli",
    vide: "",
    nonDefini: "",
    nombre: 5,
    objetEnfant: {
      rempli: "rempli",
      vide: "",
      nonDefini: "",
      nombre: 5,
      objetEnfant: {
        rempli: "rempli",
        vide: "",
        nonDefini: "",
        nombre: 5
      }
    }
  });
});
