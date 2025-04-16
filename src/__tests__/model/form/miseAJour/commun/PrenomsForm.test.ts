import { IPrenomOrdonneDto, PrenomsForm, TPrenomsForm } from "@model/form/commun/PrenomsForm";
import { describe, expect, test } from "vitest";

describe("Test du module PrenomsForm", () => {
  test("valeursInitiales retourne les valeurs par défaut quand aucun DTO n'est fourni", () => {
    const resultat = PrenomsForm.valeursInitiales([]);

    expect(resultat.nombrePrenomsAffiches).toBe(1);
    expect(resultat.prenom1).toBe("");
    expect(resultat.prenom2).toBe("");
  });

  test("valeursInitiales mappe correctement les DTOs en form values", () => {
    const prenomsDto: IPrenomOrdonneDto[] = [
      { prenom: "prenom1", numeroOrdre: 1 },
      { prenom: "prenom2", numeroOrdre: 2 },
      { prenom: "prenom3", numeroOrdre: 3 }
    ];

    const resultat = PrenomsForm.valeursInitiales(prenomsDto);

    expect(resultat.nombrePrenomsAffiches).toBe(3);
    expect(resultat.prenom1).toBe("prenom1");
    expect(resultat.prenom2).toBe("prenom2");
    expect(resultat.prenom3).toBe("prenom3");
    expect(resultat.prenom4).toBe("");
  });

  test("versPrenomsOrdonnesDto convertit correctement les valeurs du formulaire en DTOs", () => {
    const formValues: TPrenomsForm = PrenomsForm.depuisStringDto(["prenom1", "prenom2", "prenom3", ""]);

    const resultat = PrenomsForm.versPrenomsOrdonnesDto(formValues);

    expect(resultat).toHaveLength(3);
    expect(resultat[0]).toEqual({ prenom: "prenom1", numeroOrdre: 1 });
    expect(resultat[1]).toEqual({ prenom: "prenom2", numeroOrdre: 2 });
    expect(resultat[2]).toEqual({ prenom: "prenom3", numeroOrdre: 3 });
  });

  test("versPrenomsOrdonnesDto retourne un tableau vide si le formulaire est undefined", () => {
    const resultat = PrenomsForm.versPrenomsOrdonnesDto(undefined);

    expect(resultat).toEqual([]);
  });

  test("versPrenomsStringDto convertit correctement les valeurs du formulaire en tableau de strings", () => {
    const formValues: TPrenomsForm = PrenomsForm.depuisStringDto(["prenom1", "prenom2", "prenom3"]);

    const resultat = PrenomsForm.versPrenomsStringDto(formValues);

    expect(resultat).toHaveLength(3);
    expect(resultat).toEqual(["prenom1", "prenom2", "prenom3"]);
  });

  test("versPrenomsStringDto trie correctement les prénoms selon leur ordre", () => {
    const formValues: TPrenomsForm = {
      ...PrenomsForm.valeursInitiales(),
      nombrePrenomsAffiches: 3,
      prenom3: "Troisième",
      prenom1: "Premier",
      prenom2: "Deuxième"
    };

    const resultat = PrenomsForm.versPrenomsStringDto(formValues);

    expect(resultat).toEqual(["Premier", "Deuxième", "Troisième"]);
  });

  test("versPrenomsStringDto ignore les valeurs vides", () => {
    const formValues: TPrenomsForm = {
      ...PrenomsForm.valeursInitiales(),
      nombrePrenomsAffiches: 5,
      prenom1: "Premier",
      prenom2: "",
      prenom3: "Troisième",
      prenom4: "",
      prenom5: "Cinquième"
    };

    const resultat = PrenomsForm.versPrenomsStringDto(formValues);

    expect(resultat).toHaveLength(3);
    expect(resultat).toEqual(["Premier", "Troisième", "Cinquième"]);
  });
});
