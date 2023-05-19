import { genererDefaultValuesPrenoms } from "@composant/formulaire/nomsPrenoms/PrenomsForm";

describe("Test du composant Prenoms", () => {
  test("Doit créer la bonne structure de données avec 12 prénoms", async () => {
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
      prenom12: ""
    };
    const prenomsDefaultValuesGenerer = genererDefaultValuesPrenoms();

    expect(prenomsDefaultValuesGenerer).toEqual(prenomsDefaultValues);
  });
});
